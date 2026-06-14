import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createChamberShell, createGlassPanels, createRearWall } from "../scene/chamber.js";
import { createWorkbench, createWorkbenchPerforation } from "../scene/workbench.js";
import { createGlovePorts } from "../scene/glovePorts.js";
import { createMaterials } from "../scene/materials.js";
import { createCamera, CAMERA_PRESETS, TABLE_ITEMS_CAMERA_PRESETS, NEW_MODEL_CAMERA_PRESETS } from "../scene/cameras.js";
import { createLights } from "../scene/lights.js";
import {
  createCenterFunnelPair,
  createUpperInletPipePair,
  createCenterVessel,
  createCenterVesselLidStack,
  createCenterVesselFlangeRing,
  createCenterVesselClampBlocks,
  createDynamicProductionFlow,
  createFloatingTweezerGasket
} from "../scene/centerEquipment.js";
import { createLeftBlackHandwheel, createRightBlackHandwheel, createRightPipeCouplings } from "../scene/rightEquipment.js";
import {
  createLeftHorizontalPipeBlockout,
  createRightHorizontalPipeBlockout,
  createMainTubingBlockout
} from "../scene/pipesBlockout.js";
import { createTopAssemblyBlockout } from "../scene/topAssembly.js";
import { createAirflowMistPlanes } from "../scene/airflowMist.js";
import { createSideLiftDoors } from "../scene/sideLiftDoors.js";
import { createTableItems } from "../scene/smallParts.js";
import { createNewModelObjects } from "../scene/newModelEquipment.js";
import { objectRegistry } from "../scene/objectRegistry.js";
import { SCENE_SCALE, VERSION_LABEL } from "../scene/scale.js";
import { createCameraControls } from "../ui/cameraButtons.js";

function createBaseObjects(materials, { includeWorkbench = true, includeWorkbenchPerforation = true } = {}) {
  const baseObjects = {
    chamber_shell: createChamberShell(materials),
    glass_panels: createGlassPanels(materials),
    rear_wall: createRearWall(materials),
    side_lift_doors: createSideLiftDoors(materials),
    glove_ports: createGlovePorts(materials),
    lights_camera: createLights()
  };
  if (includeWorkbench) {
    baseObjects.workbench = createWorkbench(materials);
  }
  if (includeWorkbenchPerforation) {
    baseObjects.workbench_perforation = createWorkbenchPerforation(materials);
  }
  return baseObjects;
}

function createProcessObjects(materials) {
  return {
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
    airflow_mist_planes: createAirflowMistPlanes(materials)
  };
}

function addRegistryPanel({ label, detail }) {
  const registryPanel = document.createElement("aside");
  registryPanel.className = "registry-panel";
  registryPanel.innerHTML = `
    <strong>${label}</strong>
    <span>${detail}</span>
  `;
  document.body.appendChild(registryPanel);
}

function resolvePageHref(targetPage, currentPage) {
  if (targetPage === currentPage) return "./";
  if (currentPage === "dynamic") {
    if (targetPage === "tableItems") return "./table-items/";
    if (targetPage === "newModel") return "./new-model/";
  }
  if (currentPage === "tableItems") {
    if (targetPage === "dynamic") return "../";
    if (targetPage === "newModel") return "../new-model/";
  }
  if (currentPage === "newModel") {
    if (targetPage === "dynamic") return "../";
    if (targetPage === "tableItems") return "../table-items/";
  }
  return "./";
}

export function createRabsSceneApp({
  app = document.querySelector("#app"),
  page = "dynamic",
  versionTitle = "HB-RABS v0.6",
  initialDisplayMode = "dynamic"
} = {}) {
  const scene = new THREE.Scene();
  scene.name = page === "tableItems"
    ? "hb-rabs-v0-6-table-items-showcase"
    : page === "newModel"
      ? "hb-rabs-v0-7-new-production-white-model"
      : "hb-rabs-v0-6-dynamic-production-demo";
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
  controls.minDistance = 4;
  controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI * 0.49;

  const cameraPresets = page === "tableItems"
    ? TABLE_ITEMS_CAMERA_PRESETS
    : page === "newModel"
      ? NEW_MODEL_CAMERA_PRESETS
      : CAMERA_PRESETS;
  const initialCamera = page === "tableItems"
    ? "camera_table_items_front"
    : page === "newModel"
      ? "camera_front_overall"
      : "camera_overall_front";
  controls.target.copy(cameraPresets[initialCamera].target);

  const materials = createMaterials();
  const objects = {
    ...createBaseObjects(materials, {
      includeWorkbench: page !== "newModel",
      includeWorkbenchPerforation: page !== "newModel"
    }),
    ...(page === "tableItems"
      ? { table_items: createTableItems(materials) }
      : page === "newModel"
        ? createNewModelObjects(materials)
        : createProcessObjects(materials))
  };
  Object.values(objects).forEach((object) => scene.add(object));

  const floorGrid = new THREE.GridHelper(12, 12, 0x8f9aa7, 0xd0d6dd);
  floorGrid.name = "visual_scale_floor_grid";
  floorGrid.position.y = SCENE_SCALE.tableHeight - 0.32;
  floorGrid.userData.id = "lights_camera";
  scene.add(floorGrid);

  addRegistryPanel({
    label: page === "tableItems"
      ? "v0.6 table items showcase"
      : page === "newModel"
        ? "v0.7 new production white model"
        : VERSION_LABEL,
    detail: page === "dynamic" ? `${objectRegistry.length} registered draft objects` : `${Object.keys(objects).length} active scene groups`
  });

  const displayModes = page === "tableItems" || page === "newModel"
    ? []
    : [
        ["static", "静态结构"],
        ["dynamic", "动态演示"]
      ];

  const visibilityToggles = page === "newModel"
    ? [
        ["chamber_shell", "舱体外框"],
        ["front_glass_panel", "前玻璃"],
        ["glove_ports", "手套孔"],
        ["new_model_work_area", "板/轨道"],
        ["new_model_drum", "圆桶"],
        ["new_model_center_elbow", "中央弯管"],
        ["new_model_left_suction_cup", "左侧吸盘"],
        ["new_model_right_white_pipe", "右侧白管"]
      ]
    : undefined;

  const ui = createCameraControls({
    presets: cameraPresets,
    initialVisibility: Object.fromEntries(Object.keys(objects).map((key) => [key, true])),
    initialDisplayMode,
    versionTitle,
    currentPage: page,
    pageLinks: [
      ["dynamic", "动态生产版", resolvePageHref("dynamic", page)],
      ["tableItems", "桌面物品版", resolvePageHref("tableItems", page)],
      ["newModel", "新增生产场景", resolvePageHref("newModel", page)]
    ],
    visibilityToggles,
    actionButtons: page === "newModel"
      ? [
          ["toggleAutoRotate", "自动旋转"],
          ["resetCamera", "重置相机"]
        ]
      : [],
    displayModes,
    onPreset: applyCameraPreset,
    onToggle: (id, visible) => {
      const object = objects[id] ?? scene.getObjectByName(id);
      if (object) object.visible = visible;
    },
    onDisplayMode: (mode) => {
      applyDisplayMode(mode);
    },
    onAction: (id, button) => {
      if (id === "toggleAutoRotate") {
        controls.autoRotate = !controls.autoRotate;
        controls.autoRotateSpeed = 0.8;
        button.classList.toggle("active", controls.autoRotate);
      }
      if (id === "resetCamera") {
        applyCameraPreset(initialCamera);
      }
    }
  });

  let displayMode = initialDisplayMode;
  const clock = new THREE.Clock();
  applyDisplayMode(displayMode);
  applyCameraPreset(initialCamera);

  function applyCameraPreset(name) {
    const preset = cameraPresets[name];
    if (!preset) return;
    camera.position.copy(preset.position);
    controls.target.copy(preset.target);
    controls.update();
    ui.setCurrentCamera(name);
  }

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
    const animation = objects.dynamic_production_flow?.userData.animation;
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

  return {
    scene,
    camera,
    controls,
    renderer,
    objects,
    objectRegistry,
    applyCameraPreset,
    cameraPresets,
    get displayMode() {
      return displayMode;
    },
    setDisplayMode(mode) {
      applyDisplayMode(mode);
    }
  };
}
