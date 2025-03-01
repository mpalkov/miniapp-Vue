import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { h } from 'vue';
// Import component after mock is set up
import GalleryComponent from '@/components/GalleryComponent.vue';
import * as getImagesModule from '@/scripts/getImages';

import initConfig from '@/assets/appConfig';
const { IMAGES_FETCH_LIMIT, API_URL_BASE } = initConfig;

// Create better mock data with unique IDs
const createMockImagesForPage = (pageNumber) => {
  const startId = (pageNumber - 1) * IMAGES_FETCH_LIMIT + 1;
  return Array.from({ length: IMAGES_FETCH_LIMIT }, (_, i) => ({ 
    id: startId + i,
    author: `Author ${startId + i}`,
    url: `https://picsum.photos/id/${startId + i}/300/200`
  }));
};

// Mock the getImages function with page-specific data
vi.mock('@/scripts/getImages.js', () => {
  return {
    default: vi.fn((pageNumber = 1) => {
      const startId = (pageNumber - 1) * 50 + 1;
      return Promise.resolve(Array.from({ length: 50 }, (_, i) => ({ 
        id: startId + i,
        author: `Author ${startId + i}`,
        url: `https://picsum.photos/id/${startId + i}/300/200`
      })));
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
    // Try direct DOM query instead of components API
    const galleryItems = wrapper.findAll('.gallery-item');
    
    // Print debug info
    console.log('Gallery items found:', galleryItems.length);
    
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

    // Debug
    console.log('Gallery items found after scroll (should be double):', galleryItemsAfterScroll.length);
    
    // Should have twice as many items now (second page loaded)
    expect(galleryItemsAfterScroll.length).toBe(IMAGES_FETCH_LIMIT * 2);
  });

  describe('an image is removed after clicking on it', () => {
    // every image has onclick event
    // click the element
    // after clicking on image:
      // this is not anymore rendered (timeOffset (animation etc.))
      // and it appears in the deletedImages Set;
    // check number of elements is correct (one less)
    
    // do a while (gallery-items) and click every image
      // assure after each click, the current clicked id is in the deletedImages Set
      // and count of rendered items is one less
    test('')
  })

});