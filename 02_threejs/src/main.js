import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createChamberShell, createGlassPanels, createRearWall } from "./scene/chamber.js";
import { createWorkbench, createWorkbenchPerforation } from "./scene/workbench.js";
import { createGlovePorts } from "./scene/glovePorts.js";
import { createMaterials } from "./scene/materials.js";
import { createCamera, CAMERA_PRESETS } from "./scene/cameras.js";
import { createLights } from "./scene/lights.js";
import {
  createCenterFunnelPair,
  createUpperInletPipePair,
  createCenterVessel,
  createCenterVesselLidStack,
  createCenterVesselFlangeRing,
  createCenterVesselClampBlocks,
  createDynamicProductionFlow,
  createFloatingTweezerGasket
} from "./scene/centerEquipment.js";
import { createLeftBlackHandwheel, createRightBlackHandwheel, createRightPipeCouplings } from "./scene/rightEquipment.js";
import {
  createLeftHorizontalPipeBlockout,
  createRightHorizontalPipeBlockout,
  createMainTubingBlockout
} from "./scene/pipesBlockout.js";
import { createTopAssemblyBlockout } from "./scene/topAssembly.js";
import { createAirflowMistPlanes } from "./scene/airflowMist.js";
import { createSideLiftDoors } from "./scene/sideLiftDoors.js";
import { objectRegistry } from "./scene/objectRegistry.js";
import { SCENE_SCALE, VERSION_LABEL } from "./scene/scale.js";
import { createCameraControls } from "./ui/cameraButtons.js";

import "./styles.css";

const app = document.querySelector("#app");

const scene = new THREE.Scene();
scene.name = "hb-rabs-v0-6-dynamic-production-demo";
scene.background = new THREE.Color(0xf4f6f8);

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const camera = createCamera(window.innerWidth / window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.copy(CAMERA_PRESETS.camera_overall_front.target);
controls.minDistance = 4;
controls.maxDistance = 22;
controls.maxPolarAngle = Math.PI * 0.49;

const materials = createMaterials();

const objects = {
  chamber_shell: createChamberShell(materials),
  glass_panels: createGlassPanels(materials),
  rear_wall: createRearWall(materials),
  workbench: createWorkbench(materials),
  side_lift_doors: createSideLiftDoors(materials),
  workbench_perforation: createWorkbenchPerforation(materials),
  glove_ports: createGlovePorts(materials),
  top_assembly_blockout: createTopAssemblyBlockout(materials),
  upper_inlet_pipe_pair: createUpperInletPipePair(materials),
  center_funnel_pair: createCenterFunnelPair(materials),
  center_vessel: createCenterVessel(materials),
  center_vessel_lid_stack: createCenterVesselLidStack(materials),
  center_vessel_flange_ring: createCenterVesselFlangeRing(materials),
  center_vessel_clamp_blocks: createCenterVesselClampBlocks(materials),
  dynamic_production_flow: createDynamicProductionFlow(materials),
  floating_tweezer_gasket: createFloatingTweezerGasket(materials),
  left_horizontal_pipe_blockout: createLeftHorizontalPipeBlockout(materials),
  right_horizontal_pipe_blockout: createRightHorizontalPipeBlockout(materials),
  left_black_handwheel: createLeftBlackHandwheel(materials),
  right_black_handwheel: createRightBlackHandwheel(materials),
  right_pipe_couplings: createRightPipeCouplings(materials),
  main_tubing_blockout: createMainTubingBlockout(materials),
  airflow_mist_planes: createAirflowMistPlanes(materials),
  lights_camera: createLights()
};

Object.values(objects).forEach((object) => scene.add(object));

const floorGrid = new THREE.GridHelper(12, 12, 0x8f9aa7, 0xd0d6dd);
floorGrid.name = "visual_scale_floor_grid";
floorGrid.position.y = SCENE_SCALE.tableHeight - 0.32;
floorGrid.userData.id = "lights_camera";
scene.add(floorGrid);

const registryPanel = document.createElement("aside");
registryPanel.className = "registry-panel";
registryPanel.innerHTML = `
  <strong>${VERSION_LABEL}</strong>
  <span>${objectRegistry.length} registered draft objects</span>
`;
document.body.appendChild(registryPanel);

const ui = createCameraControls({
  presets: CAMERA_PRESETS,
  initialVisibility: Object.fromEntries(Object.keys(objects).map((key) => [key, true])),
  initialDisplayMode: "dynamic",
  versionTitle: "HB-RABS v0.6",
  onPreset: applyCameraPreset,
  onToggle: (id, visible) => {
    if (objects[id]) objects[id].visible = visible;
  },
  onDisplayMode: (mode) => {
    applyDisplayMode(mode);
  }
});

let displayMode = "dynamic";
const clock = new THREE.Clock();
applyDisplayMode(displayMode);

function applyCameraPreset(name) {
  const preset = CAMERA_PRESETS[name];
  if (!preset) return;
  camera.position.copy(preset.position);
  controls.target.copy(preset.target);
  controls.update();
  ui.setCurrentCamera(name);
}

applyCameraPreset("camera_overall_front");

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize);

function applyDisplayMode(mode) {
  displayMode = mode;
  const frontGlass = scene.getObjectByName("front_glass_panel");
  if (frontGlass?.material) {
    frontGlass.material.opacity = mode === "dynamic" ? 0.12 : 0.22;
    frontGlass.material.depthWrite = false;
    frontGlass.material.needsUpdate = true;
  }
}

function updateDynamicProductionFlow(elapsedTime) {
  const animation = objects.dynamic_production_flow.userData.animation;
  if (!animation) return;

  animation.flowParticles.forEach((particle, index) => {
    const offset = animation.flowOffsets[index];
    const t = ((elapsedTime * 0.14 + offset) % 1 + 1) % 1;
    particle.position.copy(animation.hosePath.getPointAt(t));
    const breathe = 0.88 + Math.sin(elapsedTime * 1.8 + index * 0.7) * 0.10;
    particle.scale.setScalar(breathe);
  });

  animation.liquidSurface.rotation.y = elapsedTime * 0.24;
}

function animate() {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  if (displayMode === "dynamic") {
    updateDynamicProductionFlow(elapsedTime);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.__HB_RABS_APP__ = {
  scene,
  camera,
  controls,
  renderer,
  objects,
  objectRegistry,
  applyCameraPreset,
  cameraPresets: CAMERA_PRESETS,
  get displayMode() {
    return displayMode;
  },
  setDisplayMode(mode) {
    applyDisplayMode(mode);
  }
};
