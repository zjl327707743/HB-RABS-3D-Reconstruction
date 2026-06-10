export function createCameraControls({ presets, onPreset, onToggle, initialVisibility, versionTitle = "HB-RABS v0.2" }) {
  const panel = document.createElement("section");
  panel.className = "control-panel";

  const title = document.createElement("h1");
  title.textContent = versionTitle;
  panel.appendChild(title);

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
  panel.appendChild(cameraGroup);

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
  panel.appendChild(visibility);

  const currentCamera = document.createElement("div");
  currentCamera.className = "current-camera";
  currentCamera.id = "current-camera";
  panel.appendChild(currentCamera);

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
