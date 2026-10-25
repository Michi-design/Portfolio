# Ajiboye Michael — portfolio

A responsive, midnight-navy editorial portfolio with a restrained glass design system for UI/UX design and frontend development, designed to adapt from compact phones through wide desktop screens. This site uses plain HTML, CSS, and JavaScript modules; it has no build step or third-party runtime dependencies.

## Run locally

Serve the folder over HTTP (ES modules are not supported when opened directly as a `file://` URL). For example, with Python installed:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. In VS Code, a static preview extension such as Live Server works too.

## Update portfolio content

- Edit the name, availability, location, biography, skills, and contact information in `src/data.js`.
- Add or edit projects in the `projects` array in `src/data.js`. Each project has a stable `id`, category, description, tags, status, and project-specific case-study fields.
- Project details are opened at `#/project/<project-id>`. The site supports direct links, browser history, previous/next navigation, and a not-found state.
- Set `designUrl` for a UI/UX project's Figma design link and `liveUrl` for a deployed website. An optional `prototypeUrl` is shown separately when provided. Empty or invalid links are not shown.
- External project actions appear on the project card and detail page, open in a new tab, and do not interfere with the card's internal project route.
- The portfolio contains six projects: SOVANA, Fintech banking app, and Taskflow under UI/UX Design; MICH Fashion Store, SaaS Dashboard Website, and VERDANT under Website Development.

## Project galleries

- Open any project card to visit its hash-routed detail page (`#/project/<project-id>`). Direct links and refreshes keep the selected project.
- Each project has its own top-level folder (`savora/`, `fintech-banking/`, `taskflow/`, `mich-fashion/`, `saas-dashboard/`, or `verdant/`) containing its card thumbnail and gallery images.
- Select any gallery image to open the keyboard-accessible lightbox. Use Previous/Next buttons or the arrow keys to browse, Escape or Close to exit, and the backdrop to dismiss it.
- The supplied files are presentation boards containing groups of screens, not separate single-screen exports. Taskflow currently has its presentation image only; additional gallery screenshots were not present in the project files.
- To test locally, serve the project over HTTP as described above, then open a project directly, for example `http://localhost:8000/#/project/savora`.

## Manage project images

1. Run the site from this folder over localhost (for example, `python -m http.server 8000`) and open `http://localhost:8000/manage.html` in current desktop Chrome or Edge.
2. Choose a project, then choose or replace its JPG, JPEG, PNG, or WebP thumbnail (maximum 12 MB per image). The manager previews images before saving.
3. Add 2–5 gallery images. Reorder with the arrow buttons, remove an image, or choose a gallery image as the card thumbnail. A gallery with fewer than 2 images shows a warning and may be completed later.
4. Select **Save changes to portfolio folder** and grant folder access to the portfolio root—the folder containing `index.html`. The manager copies images into the selected top-level project folder and updates `src/data/project-images.js`.
5. Refresh the public portfolio to review. The Work cards use the saved thumbnail, and each project's detail page displays its gallery. Publish/deploy the changed assets and manifest to make the images available to visitors.

This is a static website, so an uploaded image in a browser preview cannot automatically be written to a hosted GitHub Pages or other deployed copy. The manager uses the browser File System Access API to persist selected images directly into a local project folder. It requires a supported browser and a secure context (localhost or HTTPS); the deployed website itself cannot write back to your repository. If folder access is unavailable, use desktop Chrome/Edge on localhost. No account, backend, database, or paid storage is used.

The manager validates image type, decodability, and 12 MB per-file size. Projects without a saved thumbnail continue to use the existing preview placeholder, which is not an actual project screenshot.

The portfolio cards and project galleries use high-quality WebP images included in each project's top-level folder; the original PNG files are retained. Gallery images load as visitors open a project and scroll through its gallery. Verdant, SaaS Dashboard Website, and MICH Fashion Store have case-study summaries based on their supplied project briefs and visuals. Their supplied live website URLs are configured in `src/data.js`; external availability can change independently of the portfolio. Separate application source code was not included, so project-specific technology stacks and working commerce/dashboard functionality are not claimed.

## Visual system

The shared glass tokens (`--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-radius`, and related values) are defined in `styles.css`. Reusable surface classes include `glass-panel`, `glass-control`, `glass-chip`, `glass-segment`, `glass-nav`, and `glass-link`. Solid translucent backgrounds remain as a fallback when backdrop blur is unavailable.

Glass controls are grouped by section and share one pointer-following highlight per group. Pointer, keyboard focus, selected filters, and coarse-pointer states are handled by the reusable interaction utility in `src/main.js`; the highlight does not replace or intercept the controls' native actions.

## Build and publish

There is no compilation step. Publish `index.html`, `styles.css`, `favicon.svg`, the `src/` directory, and all six top-level project image folders to any static web host. Configure the host to serve `index.html` for the site root. The project detail routes use hash URLs, so they work on static hosting without rewrite configuration.

The Google Fonts stylesheet is an optional external font request; local system sans-serif fallbacks are defined in `styles.css`.
