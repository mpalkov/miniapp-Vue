import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, test, vi, beforeEach, has } from 'vitest';
import GalleryComponent from '@/components/GalleryComponent.vue';
import * as getImagesModule from '@/scripts/getImages';
import initConfig from '@/assets/appConfig';
const { IMAGES_FETCH_LIMIT, TRANSITION_DURATION_MS } = initConfig;

const createMockPageData = (pageNumber) => {
  const startId = (pageNumber - 1) * IMAGES_FETCH_LIMIT;
  return Array.from({ length: IMAGES_FETCH_LIMIT }, (_, i) => ({ 
    id: startId + i,
  }));
};
vi.mock('@/scripts/getImages.js', () => ({
  default: vi.fn(pageNumber => Promise.resolve(createMockPageData(pageNumber)))
}));

/**
 * Wait for the `wrapper` component to update
 * @param {VueWrapper} wrapper 
 */
const waitForComponentUpdate = async (wrapper) => {
  await flushPromises();
  await wrapper.vm.$nextTick();
};

/**
 * Finds all `'.gallery-item'` in the wrapper
 * @param {VueWrapper} wrapper 
 * @returns {VueWrapper}
 */
const getGalleryItems = (wrapper) => wrapper.findAll('.gallery-item')

/**
 * Confirms, that correct number of images was loaded after fetching the data for `pagesLoadedCount` number of pages from the API.
 * 
 * returns the found `galleryItems` for further testing if desired to make use of.
 * @param {VueWrapper} wrapper 
 * @param {number} pagesLoadedCount 
 * @returns {VueWrapper} galleryItems
 */
const checkGalleryItemsCount = (wrapper, pagesLoadedCount) => {
  const expectedCount = pagesLoadedCount * IMAGES_FETCH_LIMIT;
  const items = getGalleryItems(wrapper);
  expect(items.length).toBe(expectedCount);
  return items;
};

describe('GalleryComponent.vue', () => {
  let wrapper;

  beforeEach(async () => {
    vi.clearAllMocks();
    wrapper = mount({
      template: `
        <div>
          <Suspense>
            <GalleryComponent />
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </div>
      `,
      components: {
        GalleryComponent
      }
    });
    await waitForComponentUpdate(wrapper);
  });

  test('Ensure, that initial gallery items are rendered', async () => {
    checkGalleryItemsCount(wrapper, 1)
    expect(getImagesModule.default).toHaveBeenCalledTimes(1);
    expect(getImagesModule.default).toHaveBeenCalledWith(1);
  });

  test('Scroll event loads more images', async () => {
    checkGalleryItemsCount(wrapper, 1)
    window.dispatchEvent(new CustomEvent('scroll', { 
      detail: IMAGES_FETCH_LIMIT * (200 + 16), // Height of each item is 200px + 16px for gap.
      bubbles: true
    }));
    await waitForComponentUpdate(wrapper);
    checkGalleryItemsCount(wrapper, 2)
    expect(getImagesModule.default).toHaveBeenCalledTimes(3);
    expect(getImagesModule.default).toHaveBeenCalledWith(2);
  });

  // confirm that image id is added to the removedImages Set
  // confirm, there is one image less rendered
  // confirm, there is no image with the removed img id

  const testImageRemoval = async (wrapper, imageIndex) => {
    const items = getGalleryItems(wrapper);
    const imagesCountBefore = items.length;
    const item = items[imageIndex];
    const renderedGalleryComponent = wrapper.findComponent(GalleryComponent);

    const removedId = item.attributes('item-id');
    await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION_MS + 200));
    const itemsAfter = getGalleryItems(wrapper);
    expect(itemsAfter.length).toBe(imagesCountBefore - 1);
    expect(renderedGalleryComponent.vm.deletedImages.has(parseInt(removedId))).toBe(true);
    expect(itemsAfter.filter((element) => element.attributes('item-id') === removedId).length).toBe(0);
  }

  test('First, last and inbetween images are removed after clicking on them', async () => {
    await testImageRemoval(wrapper, 49);
    await testImageRemoval(wrapper, 0);
    // await testImageRemoval(wrapper, Math.trunc(IMAGES_FETCH_LIMIT / 2));
  });
});