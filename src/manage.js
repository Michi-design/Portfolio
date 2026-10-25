import { projects } from "./data.js";
import { projectImages } from "./data/project-images.js";

const MAX_GALLERY_IMAGES = 5;
const MIN_GALLERY_IMAGES = 2;
const MAX_FILE_SIZE = 12 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXTENSIONS = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const projectList = document.querySelector("#project-list");
const editor = document.querySelector("#editor");
const status = document.querySelector("#manager-status");

let selectedId = projects[0]?.id ?? "";
let thumbnail = null;
let gallery = [];
let dirty = false;
let saving = false;
const objectUrls = new Set();

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);

function projectRecord(project) {
  return { ...project, ...projectImages[project.id] };
}

function makeAsset(src, alt = "", file = null, name = "") {
  return { id: crypto.randomUUID(), src, alt, file, name };
}

function rememberObjectUrl(file) {
  const url = URL.createObjectURL(file);
  objectUrls.add(url);
  return url;
}

function clearObjectUrls() {
  for (const url of objectUrls) URL.revokeObjectURL(url);
  objectUrls.clear();
}

function setStatus(message = "", kind = "") {
  status.textContent = message;
  status.className = `manager-status${kind ? ` is-${kind}` : ""}`;
}

function loadProject(id) {
  clearObjectUrls();
  selectedId = id;
  const project = projects.find((item) => item.id === id);
  const saved = projectRecord(project);
  thumbnail = saved.image
    ? makeAsset(saved.image, saved.imageAlt || `${project.name} thumbnail`, null, "Saved thumbnail")
    : null;
  gallery = (saved.gallery || []).map((item) =>
    makeAsset(item.src, item.alt || `${project.name} screen`, null, "Saved image"),
  );
  dirty = false;
  setStatus();
  render();
}

function renderProjectList() {
  projectList.innerHTML = [...projects].sort((a, b) => a.number.localeCompare(b.number)).map((project) => `
    <button class="project-choice${project.id === selectedId ? " is-selected" : ""}" type="button" data-project-id="${escapeHtml(project.id)}" aria-pressed="${project.id === selectedId}">
      <strong>${escapeHtml(project.name)}</strong><span>${escapeHtml(project.category)}</span>
    </button>`).join("");
}

function renderImagePreview(asset, { thumbnailPreview = false, index = -1 } = {}) {
  if (!asset) return '<div class="empty-preview">No thumbnail selected. Choose an image file to preview it here.</div>';
  const isMain = thumbnail && thumbnail.id === asset.id;
  return `<figure class="image-preview${thumbnailPreview ? " thumbnail-preview" : " gallery-preview"}${isMain && !thumbnailPreview ? " is-thumbnail" : ""}">
    <img src="${escapeHtml(asset.src)}" alt="${escapeHtml(asset.alt)}" />
    ${isMain && !thumbnailPreview ? '<span class="preview-badge">Main thumbnail</span>' : ""}
    ${asset.name ? `<span class="preview-badge${isMain && !thumbnailPreview ? " badge-second" : ""}">${escapeHtml(asset.name)}</span>` : ""}
    <figcaption class="image-preview-actions">
      ${!thumbnailPreview ? `<button class="image-action" type="button" data-action="make-thumbnail" data-index="${index}" ${isMain ? "disabled" : ""}>${isMain ? "Main thumbnail" : "Use as thumbnail"}</button>` : ""}
      ${!thumbnailPreview ? `<button class="image-action" type="button" data-action="move-left" data-index="${index}" aria-label="Move image ${index + 1} earlier" ${index === 0 ? "disabled" : ""}>←</button><button class="image-action" type="button" data-action="move-right" data-index="${index}" aria-label="Move image ${index + 1} later" ${index === gallery.length - 1 ? "disabled" : ""}>→</button>` : ""}
      <button class="image-action is-danger" type="button" data-action="remove-${thumbnailPreview ? "thumbnail" : "gallery"}" ${index >= 0 ? `data-index="${index}"` : ""}>Remove</button>
    </figcaption>
  </figure>`;
}

function render() {
  renderProjectList();
  const project = projects.find((item) => item.id === selectedId);
  if (!project) {
    editor.innerHTML = '<p class="empty-preview">No projects are available.</p>';
    return;
  }

  const galleryIncomplete = gallery.length < MIN_GALLERY_IMAGES;
  editor.innerHTML = `
    <header class="editor-heading">
      <div><p class="eyebrow">${escapeHtml(project.category)} · ${escapeHtml(project.number)}</p><h2>${escapeHtml(project.name)}</h2><p>${escapeHtml(project.type)}</p></div>
      <span class="image-count">${gallery.length} of ${MAX_GALLERY_IMAGES} images</span>
    </header>
    <section class="image-section">
      <div class="image-section-head"><div><h3>Main thumbnail</h3><p>Used in the Work gallery and project previews.</p></div>
        <label class="upload-button">Choose or replace image<input class="file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" data-upload="thumbnail" /></label>
      </div>
      ${renderImagePreview(thumbnail, { thumbnailPreview: true })}
    </section>
    <section class="image-section">
      <div class="image-section-head"><div><h3>Project gallery</h3><p>Add between 2 and 5 images. Reorder with the arrow controls; choose any gallery image as the thumbnail.</p></div>
        <label class="upload-button" aria-disabled="${gallery.length >= MAX_GALLERY_IMAGES}">Add gallery images<input class="file-input" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" data-upload="gallery" multiple ${gallery.length >= MAX_GALLERY_IMAGES ? "disabled" : ""} /></label>
      </div>
      ${gallery.length ? `<div class="gallery-grid">${gallery.map((asset, index) => renderImagePreview(asset, { index })).join("")}</div>` : '<div class="empty-preview">No gallery images yet. Select 2–5 project screens to create a gallery.</div>'}
      ${galleryIncomplete ? `<p class="gallery-warning">This gallery has ${gallery.length} of 5 images. Add at least ${MIN_GALLERY_IMAGES - gallery.length} more before the gallery is complete. You may still save the thumbnail and return later.</p>` : ""}
    </section>
    <div class="editor-actions">
      <button class="save-button" type="button" data-action="save" ${saving ? "disabled" : ""}>${saving ? "Saving images…" : "Save changes to portfolio folder"}</button>
      <p class="save-help">Save copies images into <code>assets/projects/${escapeHtml(project.id)}/</code> and writes the portfolio image manifest. Deploy the updated site to publish them.</p>
    </div>`;
}

function validateFile(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const extensionValid = ["jpg", "jpeg", "png", "webp"].includes(extension);
  if (!ACCEPTED_TYPES.has(file.type) || !extensionValid) {
    throw new Error(`${file.name}: choose a JPG, PNG, or WebP image.`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`${file.name}: image must be 12 MB or smaller.`);
  }
  if (file.size === 0) throw new Error(`${file.name}: the selected file is empty.`);
}

async function readImageDimensions(file) {
  const url = rememberObjectUrl(file);
  const image = new Image();
  image.src = url;
  await image.decode().catch(() => {
    throw new Error(`${file.name}: the image could not be read.`);
  });
  if (!image.naturalWidth || !image.naturalHeight) throw new Error(`${file.name}: the image has invalid dimensions.`);
  return url;
}

async function selectFiles(files, target) {
  const incoming = [...files];
  if (!incoming.length) return;
  try {
    incoming.forEach(validateFile);
    if (target === "gallery" && gallery.length + incoming.length > MAX_GALLERY_IMAGES) {
      throw new Error(`A project gallery can contain up to ${MAX_GALLERY_IMAGES} images. Remove an image or choose fewer files.`);
    }
    const assets = [];
    for (const file of incoming) {
      const src = await readImageDimensions(file);
      assets.push(makeAsset(src, file.name, file, file.name));
    }
    if (target === "thumbnail") thumbnail = assets[0];
    else gallery.push(...assets);
    dirty = true;
    setStatus(target === "thumbnail" ? "Thumbnail preview ready. Save changes to write it to your portfolio folder." : `${assets.length} gallery image${assets.length === 1 ? "" : "s"} added. Save changes to write them to your portfolio folder.`, "success");
    render();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

function moveGalleryImage(index, offset) {
  const newIndex = index + offset;
  if (newIndex < 0 || newIndex >= gallery.length) return;
  [gallery[index], gallery[newIndex]] = [gallery[newIndex], gallery[index]];
  dirty = true;
  render();
}

function moveThumbnailToGallery(index) {
  const selected = gallery[index];
  if (selected) {
    thumbnail = selected;
    dirty = true;
    setStatus(`${selected.name || "Gallery image"} selected as the main thumbnail.`, "success");
    render();
  }
}

function toAssetRecord(asset, src) {
  const alt = asset.alt || `${projects.find((project) => project.id === selectedId).name} screen`;
  return { src, alt };
}

function extensionFor(asset) {
  if (asset.file?.type) return EXTENSIONS[asset.file.type];
  const ext = asset.src.split("?")[0].split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "webp";
}

async function writeFile(directory, name, bytes) {
  const handle = await directory.getFileHandle(name, { create: true });
  const writable = await handle.createWritable();
  await writable.write(bytes);
  await writable.close();
}

async function assetBytes(asset) {
  if (asset.file) return asset.file.arrayBuffer();
  const response = await fetch(asset.src);
  if (!response.ok) throw new Error(`Could not read saved image ${asset.src}.`);
  return response.arrayBuffer();
}

async function saveImages() {
  if (saving) return;
  if (!window.showDirectoryPicker) {
    setStatus("Folder saving is not supported in this browser. Open this local site in current Chrome or Edge, then try Save again. The project files are not changed by a browser preview.", "error");
    return;
  }
  if (gallery.length > MAX_GALLERY_IMAGES) {
    setStatus(`A project gallery can contain up to ${MAX_GALLERY_IMAGES} images.`, "error");
    return;
  }

  saving = true;
  render();
  setStatus("Choose the portfolio project folder (the folder containing index.html).", "");
  try {
    const root = await window.showDirectoryPicker({ mode: "readwrite" });
    await root.getFileHandle("index.html");
    const source = await root.getDirectoryHandle("src");
    const imagesDir = await source.getDirectoryHandle("data", { create: true });
    const assetsDir = await root.getDirectoryHandle("assets", { create: true });
    const projectsDir = await assetsDir.getDirectoryHandle("projects", { create: true });
    const projectDir = await projectsDir.getDirectoryHandle(selectedId, { create: true });
    const manifest = structuredClone(projectImages);
    const galleryRecords = [];

    for (let index = 0; index < gallery.length; index += 1) {
      const asset = gallery[index];
      const extension = extensionFor(asset);
      const filename = `gallery-${String(index + 1).padStart(2, "0")}.${extension}`;
      const src = `./assets/projects/${selectedId}/${filename}`;
      await writeFile(projectDir, filename, await assetBytes(asset));
      galleryRecords.push(toAssetRecord(asset, src));
    }

    let thumbnailRecord = null;
    if (thumbnail) {
      const extension = extensionFor(thumbnail);
      const filename = `thumbnail.${extension}`;
      const src = `./assets/projects/${selectedId}/${filename}`;
      await writeFile(projectDir, filename, await assetBytes(thumbnail));
      thumbnailRecord = toAssetRecord(thumbnail, src);
    }

    manifest[selectedId] = {
      image: thumbnailRecord?.src || "",
      imageAlt: thumbnailRecord?.alt || "",
      gallery: galleryRecords,
    };
    const moduleSource = `export const projectImages = ${JSON.stringify(manifest, null, 2)};\n`;
    await writeFile(imagesDir, "project-images.js", new TextEncoder().encode(moduleSource));

    dirty = false;
    setStatus(`Saved ${projects.find((project) => project.id === selectedId).name} images to assets/projects/${selectedId}/ and updated src/data/project-images.js. Refresh the portfolio to verify; publish these changed files to update the live site.`, "success");
  } catch (error) {
    if (error.name === "AbortError") {
      setStatus("Save cancelled. No changes were written.", "");
    } else if (error.name === "NotFoundError") {
      setStatus("That folder does not contain index.html. Choose the portfolio project folder, not its assets or src subfolder.", "error");
    } else if (error.name === "SecurityError" || error.name === "NotAllowedError") {
      setStatus("Folder access was not granted. Allow read/write access and choose the project folder to save images.", "error");
    } else {
      setStatus(`Could not save images: ${error.message}`, "error");
    }
  } finally {
    saving = false;
    render();
  }
}

projectList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-id]");
  if (!button) return;
  if (dirty && !window.confirm("Discard unsaved image selections and switch projects?")) return;
  loadProject(button.dataset.projectId);
});

editor.addEventListener("change", (event) => {
  const input = event.target.closest("[data-upload]");
  if (!input) return;
  void selectFiles(input.files, input.dataset.upload);
  input.value = "";
});

editor.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control || control.disabled) return;
  const index = Number(control.dataset.index);
  switch (control.dataset.action) {
    case "remove-thumbnail":
      thumbnail = null;
      dirty = true;
      setStatus("Thumbnail removed. Save changes to update the portfolio.", "success");
      render();
      break;
    case "remove-gallery":
      gallery.splice(index, 1);
      dirty = true;
      setStatus("Gallery image removed. Save changes to update the portfolio.", "success");
      render();
      break;
    case "make-thumbnail":
      moveThumbnailToGallery(index);
      break;
    case "move-left":
      moveGalleryImage(index, -1);
      break;
    case "move-right":
      moveGalleryImage(index, 1);
      break;
    case "save":
      void saveImages();
      break;
    default:
      break;
  }
});

window.addEventListener("beforeunload", (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

loadProject(selectedId);
