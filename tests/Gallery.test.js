import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { h } from 'vue';
// Import component after mock is set up
import GalleryComponent from '@/components/GalleryComponent.vue';
import * as getImagesModule from '@/scripts/getImages';

import initConfig from '@/assets/appConfig';
const { IMAGES_FETCH_LIMIT } = initConfig;

// Mock the getImages function
vi.mock('@/scripts/getImages.js', () => {
  return {
    default: vi.fn().mockResolvedValue(
      Array.from({ length: 50 }, (_, i) => ({ 
        id: i + 1,
        url: `https://picsum.photos/id/${i}/300/200`
      }))
    )
  };
});

describe('GalleryComponent.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Ensure initial images are rendered', async () => {
    // Mount the async component with Suspense
    const wrapper = mount({
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
    
    // Debug - print the HTML to see what's rendered
    // console.log(wrapper.html());
    
    // Try direct DOM query instead of components API
    const galleryItems = wrapper.findAll('.gallery-item > img');
    
    // Print debug info
    // console.log('Gallery items found:', galleryItems.length);
    
    expect(galleryItems.length).toBe(IMAGES_FETCH_LIMIT);
    
    // Verify that getImages was called correctly
    expect(getImagesModule.default).toHaveBeenCalledTimes(1);
    expect(getImagesModule.default).toHaveBeenCalledWith(1);
  });
});