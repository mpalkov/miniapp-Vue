# Miniapp - Vue Gallery

This project is a simple Tech Challenge to create an optimized Infinite-Scroll Gallery with user inteaction using Vue.js.

Developed by [mpalkov](https://github.com/mpalkov)

### [The DEMO version of the project can be viewed here](https://miniapp-gallery-vue.vercel.app/).

## Technical Requirements

**Objective:**

Complete the following user story, provided that:

- The code must be easy to run (if a build process is needed, it must be well documented).
- You must use JavaScript as the platform.
- You can use any framework, library or package you consider necessary.
- Style can be applied with any method you prefer (CSS, frameworks like Tailwind, preprocessors, etc.).
- You can use this API to get images or any other that you know and find easy to implement: https://picsum.photos/.

**User Story:**

As a user visiting the page, I want to see a grid of images that:

- Load when I enter the page.
- Load more images when I scroll.
- Are removed from the grid when I click on an image.

**Acceptance Criteria:**

- The grid must be responsive: show 2 columns on small screens and more columns on larger screens.
- Images should load smoothly without flickering or jumps when scrolling.

**Recommendations (desirable):**

- Tests: Including automated tests (unit or E2E) is a plus.
- Optimization: Implement Lazy Loading for images and ensure they load efficiently.
- Recommended Technologies: Vue (preferred), React, Next.js, Pinia, Redux, CSS Grid, Flexbox.
- Code Delivery: Upload your code to a Git repository (GitHub, GitLab, Bitbucket or another of your preference).

## Getting Started

Clone the repository and install the dependencies:

```sh
git clone https://github.com/mpalkov/miniapp-Vue.git
cd abtesting-admin-fe
npm install
```

## Development

**Required environment for development:**

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- an IDE of your choice (for example [VSCode](https://code.visualstudio.com/))

---

**Technology used:**

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) + [Vue test-utils](https://next.vue-test-utils.vuejs.org/)
- [ESLint](https://eslint.org/)

---

**API:**

The API used to fetch images data is [Lorem Picsum](https://picsum.photos/).

I am fetching paginated data from the API with a limit of 50 images per page.

Also, I specify custom size in the URL to load optimized images instead of full-size images which is very resource-limiting in terms of load times and rendering.

---

**Compile and Hot-Reload for Development:**

The current state of the project can be viewed in the browser by running:

```sh
npm run dev
```

and opening the provided link in the browser. (e.g. `http://localhost:4173/`)

---

**Compile and Minify for Production:**

All the project files are compiled and minified for production in the `dist` folder by running:

```sh
npm run build
```

---

**Run the Tests:**

```sh
npm run test
```

Currently, following tests are written for the `GalleryComponent.vue`:

- Ensure, that initial gallery items are rendered
- Scroll event loads more images
- First, last and inbetween images are removed after clicking on them

---

## Release

**Pipelines:**

We use [Vercel](https://vercel.com/) for deployment and hosting

The deployment is done automatically on every push to the `main` branch of the GitHub repository and is publicly accessible [HERE](https://miniapp-gallery-vue.vercel.app/).
