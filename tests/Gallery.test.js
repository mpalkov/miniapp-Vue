import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, test, vi, beforeEach, has } from 'vitest';
import GalleryComponent from '@/components/GalleryComponent.vue';
import * as getImagesModule from '@/scripts/getImages';

import initConfig from '@/assets/appConfig';
const { IMAGES_FETCH_LIMIT } = initConfig;

// Keep this helper function
const createMockImagesForPage = (pageNumber) => {
  const startId = (pageNumber - 1) * IMAGES_FETCH_LIMIT + 1;
  return Array.from({ length: IMAGES_FETCH_LIMIT }, (_, i) => ({ 
    id: startId + i,
  }));
};

// Use the helper in the mock
vi.mock('@/scripts/getImages.js', () => {
  return {
    default: vi.fn((pageNumber = 1) => {
      return Promise.resolve(createMockImagesForPage(pageNumber));
    })
  };
});

describe('GalleryComponent.vue', () => {
  let wrapper;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Mount the async component with Suspense - fix the variable scope issue
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
  
    // Wait for all promises to resolve
    await flushPromises();
    
    // Wait for component to update
    await wrapper.vm.$nextTick();
  });

  test('Ensure initial gallery items are rendered', async () => {
    const galleryItems = wrapper.findAll('.gallery-item');
    expect(galleryItems.length).toBe(IMAGES_FETCH_LIMIT);
    
    // Verify that getImages was called correctly
    expect(getImagesModule.default).toHaveBeenCalledTimes(1);
    expect(getImagesModule.default).toHaveBeenCalledWith(1);
  });

  test('scroll event loads more images', async () => {
    // First verify initial count
    const initialItems = wrapper.findAll('.gallery-item');
    expect(initialItems.length).toBe(IMAGES_FETCH_LIMIT);
    
    // Trigger scroll event
    window.dispatchEvent(new CustomEvent('scroll', { 
      detail: IMAGES_FETCH_LIMIT * (200 + 15), //height is 200px + 15px for gap aprox.
      bubbles: true
    }));
    
    // Wait for promises to resolve after scroll event
    await flushPromises();
    await wrapper.vm.$nextTick();
    
    // Verify more images were loaded
    const galleryItemsAfterScroll = wrapper.findAll('.gallery-item');

    // Should have twice as many items now (second page loaded)
    expect(galleryItemsAfterScroll.length).toBe(IMAGES_FETCH_LIMIT * 2);
  });

  test('two images are removed after clicking on them', async () => {
    const galleryItems = wrapper.findAll('.gallery-item');
    const itemsCountBeforeClick = galleryItems.length;
    
    // get the `item-id` attribute value of the element to be removed
    const id1 = galleryItems[0].attributes('item-id');
    galleryItems[0].trigger('click');
    
    // Wait for transition to complete (slightly longer than animation duration)
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Confirm there is 1 item less in gallery
    expect(wrapper.findAll('.gallery-item').length).toBe(itemsCountBeforeClick - 1);
    
    // Find the GalleryComponent inside the wrapper
    const galleryComponent = wrapper.findComponent(GalleryComponent);
    
    // Now check if the ID is in the deletedImages Set
    expect(galleryComponent.vm.deletedImages.has(parseInt(id1))).toBe(true);

    // Click and remove another image (same logic)
    const remainingItems = wrapper.findAll('.gallery-item');
    const id2 = remainingItems[0].attributes('item-id');
    await remainingItems[0].trigger('click');
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(wrapper.findAll('.gallery-item').length).toBe(itemsCountBeforeClick - 2);
    expect(galleryComponent.vm.deletedImages.has(parseInt(id2))).toBe(true);
  });
});