export function createCameraControls({
  presets,
  onPreset,
  onToggle,
  onDisplayMode,
  initialVisibility,
  initialDisplayMode = "dynamic",
  versionTitle = "HB-RABS v0.2",
  currentPage = "dynamic",
  pageLinks = [],
  displayModes = [
    ["static", "静态结构"],
    ["dynamic", "动态演示"]
  ]
}) {
  const panel = document.createElement("section");
  panel.className = "control-panel";

  const header = document.createElement("div");
  header.className = "panel-header";

  const title = document.createElement("h1");
  title.textContent = versionTitle;
  header.appendChild(title);

  const collapseBtn = document.createElement("button");
  collapseBtn.type = "button";
  collapseBtn.className = "panel-collapse-btn";
  collapseBtn.textContent = "Hide panel";
  collapseBtn.title = "Hide control panel";
  header.appendChild(collapseBtn);

  panel.appendChild(header);

  const body = document.createElement("div");
  body.className = "panel-body";

  if (pageLinks.length > 0) {
    const pageGroup = document.createElement("div");
    pageGroup.className = "page-nav-control";

    const pageLabel = document.createElement("span");
    pageLabel.textContent = "场景页面";
    pageGroup.appendChild(pageLabel);

    const pageButtons = document.createElement("div");
    pageButtons.className = "page-nav-buttons";
    pageLinks.forEach(([id, label, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.dataset.page = id;
      link.textContent = label;
      link.classList.toggle("active", id === currentPage);
      pageButtons.appendChild(link);
    });

    pageGroup.appendChild(pageButtons);
    body.appendChild(pageGroup);
  }

  const cameraGroup = document.createElement("div");
  cameraGroup.className = "button-grid";
  Object.keys(presets).forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.camera = key;
    button.textContent = key.replace("camera_", "");
    button.addEventListener("click", () => onPreset(key));
    cameraGroup.appendChild(button);
  });
  body.appendChild(cameraGroup);

  const visibility = document.createElement("div");
  visibility.className = "toggle-list";
  const toggles = [
    ["chamber_shell", "舱体外框"],
    ["glass_panels", "玻璃面板"],
    ["workbench", "工作台"],
    ["glove_ports", "手套孔"]
  ];
  toggles.forEach(([id, label]) => {
    const row = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = initialVisibility[id] !== false;
    input.addEventListener("change", () => onToggle(id, input.checked));
    row.appendChild(input);
    row.append(label);
    visibility.appendChild(row);
  });
  body.appendChild(visibility);

  if (displayModes.length > 0) {
    const displayModeGroup = document.createElement("div");
    displayModeGroup.className = "display-mode-control";

    const displayModeLabel = document.createElement("span");
    displayModeLabel.textContent = "展示模式";
    displayModeGroup.appendChild(displayModeLabel);

    const displayModeButtons = document.createElement("div");
    displayModeButtons.className = "display-mode-buttons";

    displayModes.forEach(([mode, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.displayMode = mode;
      button.textContent = label;
      button.classList.toggle("active", mode === initialDisplayMode);
      button.addEventListener("click", () => {
        onDisplayMode?.(mode);
        displayModeButtons.querySelectorAll("[data-display-mode]").forEach((candidate) => {
          candidate.classList.toggle("active", candidate.dataset.displayMode === mode);
        });
      });
      displayModeButtons.appendChild(button);
    });

    displayModeGroup.appendChild(displayModeButtons);
    body.appendChild(displayModeGroup);
  }

  const currentCamera = document.createElement("div");
  currentCamera.className = "current-camera";
  currentCamera.id = "current-camera";
  body.appendChild(currentCamera);

  panel.appendChild(body);

  // Show-button that appears when panel is collapsed
  const showBtn = document.createElement("button");
  showBtn.type = "button";
  showBtn.className = "panel-show-btn";
  showBtn.textContent = "Show panel";
  showBtn.title = "Show control panel";
  showBtn.style.display = "none";
  document.body.appendChild(showBtn);

  function collapsePanel() {
    body.style.display = "none";
    collapseBtn.style.display = "none";
    title.style.display = "none";
    panel.classList.add("control-panel--collapsed");
    showBtn.style.display = "";
  }

  function expandPanel() {
    body.style.display = "";
    collapseBtn.style.display = "";
    title.style.display = "";
    panel.classList.remove("control-panel--collapsed");
    showBtn.style.display = "none";
  }

  collapseBtn.addEventListener("click", collapsePanel);
  showBtn.addEventListener("click", expandPanel);

  document.body.appendChild(panel);
  return {
    setCurrentCamera(name) {
      currentCamera.textContent = `Current: ${name}`;
      panel.querySelectorAll("[data-camera]").forEach((button) => {
        button.classList.toggle("active", button.dataset.camera === name);
      });
    }
  };
}
