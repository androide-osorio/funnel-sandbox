# Block funnel previewer

This is a funnel preview tool for web platforms.

## My Approach

### Functional requirements

For the basic functionality of a previewer, I wanted to meet the following criteria:

- [x] As a user, I want to be able to:
  - [x] Upload a funnel JSON file from local computer and generate a mobile preview of the funnel.
  - [x] I want to navigate between the different funnel pages by
    - [x] an external navigation
  - [x] select another funnel JSON file without having to reload the page.

### Solution design

Afterward, I designed the overall look I wanted the tool to have on Figma. From the criteria, I decided the tool should:

- Have a friendly user interface that only suggests the user to focus on one thing at a time.
- Additional information, such as the code and the funnel specs, are presented as auxiliary content.
- When possible, users shouldn't have to deal with the funnel code directly, so they should be able to inspect the details of each page and block individually.

After having the basic concept, I iterated over it in real-time using the application (designing in the browser). The main feature I introduced after this first step was to make 2 views:

- The code view would show the funnel's uploaded source code, for power or tech-savvy users
- An inspector view for regular users, where each property and block can be inspected at a glance.

### Solution Architecture

- Framework: React and NextJS
- Styling: Tailwind CSS
- State management: Zustand
- Storage: Browser's local storage (to reduce the scope of work and keep things simple).

The overall state shape for the application is similar to the following:

```js
{
  version: 0,
  funnels: [
    { id: ..., name: "funnel name", pages: [...] },
    { id: ..., name: "funnel name", pages: [...] },
    ...
  ]
}
```

The app's URL controls the inspector's state, so each funnel part can be accessed and shared directly. The URLS available are:

| URL                                 | Section   | Description                                         |
| ----------------------------------- | --------- | --------------------------------------------------- |
| `/`                                 | Home      | Loads the home page with an upload area             |
| `/funnels/[funnelId]`               | Inspector | Loads the funnel inspector on the first funnel page |
| `/funnels/[funnelId]?page=[pageId]` | Inspector | Loads the funnel inspector at the specified page    |

### Results

You can upload a valid JSON funnel file to the inspector by dragging-and-dropping or navigating through your file system. The inspector will:

- Parse the JSON file
- Extract funnel and page data from it.
- Navigate to the inspection page, where you can inspect your funnel's block by page or see the full code.
- Highlight a specific block from the funnel and inspect its properties

## Improvement opportunities

The following are some of the aspects that I have left pending due to time constraints, but that are important for this to be production-ready.

### Migrate to a full-stack application

This NextJS app uses mostly client components, and stores funnel data on the browser's local storage, which is flaky and insecure. To have better security and a better experience, funnels should be uploaded and stored on some kind of server.

### Funnel file validation

Currently, the app only throws an error when trying to upload any other file than `.json` files (like a PDF). The app should also be able to assert that the provided file indeed contains a valid funnel JSON. For this, I would define a JSON schema spec and consume it from the app to validate the structure.

### Loading States

Use loading states to provide feedback to the user when processing the current funnel file. I deprioritized this because I resorted to use front-end storage, and thus the parsing is almost immediate.

## Running the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running tests

```bash
npm test
```

Tests use Jest, Typescript, and `@testing-library/react`.

---

Made with ✨ by Androide Osorio.
