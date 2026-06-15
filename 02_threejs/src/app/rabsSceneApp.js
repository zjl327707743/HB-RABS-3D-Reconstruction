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
import { NEW_MODEL_DEMO_LAYOUT, createNewModelObjects } from "../scene/newModelEquipment.js";
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

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smootherStep(value) {
  const t = clamp01(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function easeBetween(value, start, end) {
  return smootherStep((value - start) / (end - start));
}

function lerpVector(target, start, end, alpha) {
  target.set(
    THREE.MathUtils.lerp(start.x, end.x, alpha),
    THREE.MathUtils.lerp(start.y, end.y, alpha),
    THREE.MathUtils.lerp(start.z, end.z, alpha)
  );
}

function lerpEuler(target, start, end, alpha) {
  target.set(
    THREE.MathUtils.lerp(start.x, end.x, alpha),
    THREE.MathUtils.lerp(start.y, end.y, alpha),
    THREE.MathUtils.lerp(start.z, end.z, alpha)
  );
}

const NEW_MODEL_DEMO_MODE = "newModelProductionDemo";
const NEW_MODEL_DEMO_STATES = {
  IDLE: "IDLE",
  MOVE_TO_SUCTION: "MOVE_TO_SUCTION",
  SUCTION_DOWN: "SUCTION_DOWN",
  PICK_COVER: "PICK_COVER",
  SUCTION_UP: "SUCTION_UP",
  MOVE_TO_CENTER: "MOVE_TO_CENTER",
  LIFT_UP: "LIFT_UP",
  DOCKING: "DOCKING",
  LIFT_DOWN: "LIFT_DOWN",
  RETURN_LEFT: "RETURN_LEFT",
  FINISHED: "FINISHED",
  PAUSED: "PAUSED"
};

const NEW_MODEL_DEMO_TIMELINE = [
  { state: NEW_MODEL_DEMO_STATES.MOVE_TO_SUCTION, duration: 2.5 },
  { state: NEW_MODEL_DEMO_STATES.SUCTION_DOWN, duration: 1 },
  { state: NEW_MODEL_DEMO_STATES.PICK_COVER, duration: 0.5 },
  { state: NEW_MODEL_DEMO_STATES.SUCTION_UP, duration: 1 },
  { state: NEW_MODEL_DEMO_STATES.MOVE_TO_CENTER, duration: 2.5 },
  { state: NEW_MODEL_DEMO_STATES.LIFT_UP, duration: 1.8 },
  { state: NEW_MODEL_DEMO_STATES.DOCKING, duration: 1.4 },
  { state: NEW_MODEL_DEMO_STATES.LIFT_DOWN, duration: 1.8 },
  { state: NEW_MODEL_DEMO_STATES.RETURN_LEFT, duration: 2.5 }
];

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
        ? "v0.7 production scene 2"
        : VERSION_LABEL,
    detail: page === "dynamic" ? `${objectRegistry.length} registered draft objects` : `${Object.keys(objects).length} active scene groups`
  });

  const displayModes = page === "newModel"
    ? [[NEW_MODEL_DEMO_MODE, "动态演示"]]
    : page === "tableItems"
    ? []
    : [
        ["static", "静态结构"],
        ["dynamic", "动态演示"],
        ["dynamic2", "动态演示2"]
      ];

  const visibilityToggles = page === "newModel"
    ? [
        ["chamber_shell", "舱体外框"],
        ["front_glass_panel", "前玻璃"],
        ["glove_ports", "手套孔"],
        ["new_model_work_area", "板/轨道"],
        ["new_model_drum", "圆桶"],
        ["new_model_center_elbow", "中央弯管"],
        ["new_model_center_lift_table", "中心升降台"],
        ["new_model_left_suction_cup", "左侧吸盘"],
        ["new_model_right_white_pipe", "右侧白管"]
      ]
    : undefined;

  let newModelDemo;
  const ui = createCameraControls({
    presets: cameraPresets,
    initialVisibility: Object.fromEntries(Object.keys(objects).map((key) => [key, true])),
    initialDisplayMode,
    versionTitle,
    currentPage: page,
    pageLinks: [
      ["dynamic", "动态生产版", resolvePageHref("dynamic", page)],
      ["tableItems", "桌面物品版", resolvePageHref("tableItems", page)],
      ["newModel", "生产场景2", resolvePageHref("newModel", page)]
    ],
    visibilityToggles,
    actionButtons: page === "newModel"
      ? [
          ["toggleAutoRotate", "自动旋转"]
        ]
      : [],
    demoActionButtons: page === "newModel"
      ? [
          ["startNewModelDemo", "开始演示"],
          ["pauseNewModelDemo", "暂停 / 继续"],
          ["restartNewModelDemo", "重新开始"]
        ]
      : [],
    demoDisplayMode: NEW_MODEL_DEMO_MODE,
    displayModes,
    onPreset: applyCameraPreset,
    onToggle: (id, visible) => {
      const object = objects[id] ?? scene.getObjectByName(id);
      if (object) object.visible = visible;
      if (page === "newModel" && id === "new_model_drum") {
        ["new_model_transport_platform", "new_model_drum_cover_plate"].forEach((relatedId) => {
          if (objects[relatedId]) objects[relatedId].visible = visible;
        });
      }
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
      if (id === "startNewModelDemo") {
        newModelDemo?.start();
      }
      if (id === "pauseNewModelDemo") {
        newModelDemo?.togglePause();
      }
      if (id === "restartNewModelDemo") {
        newModelDemo?.restart();
      }
    }
  });

  newModelDemo = page === "newModel"
    ? createNewModelProductionDemoController({
        scene,
        objects,
        controls,
        onPauseLabel: (label) => ui.setDemoButtonLabel("pauseNewModelDemo", label)
      })
    : undefined;

  let displayMode = initialDisplayMode;
  let demo2ModeStartTime = 0;
  const clock = new THREE.Clock();
  let previousElapsedTime = 0;
  applyDisplayMode(displayMode);
  applyCameraPreset(initialCamera);

  function createNewModelProductionDemoController({ scene, objects, controls, onPauseLabel }) {
    const layout = NEW_MODEL_DEMO_LAYOUT;
    const drum = objects.new_model_drum;
    const platform = objects.new_model_transport_platform;
    const cover = objects.new_model_drum_cover_plate;
    const liftTable = objects.new_model_center_lift_table;
    const suctionAnimation = objects.new_model_left_suction_cup?.userData.animation;
    const suctionHead = suctionAnimation?.motionHead;
    const coverHomeParent = cover?.parent ?? scene;
    const worldPosition = new THREE.Vector3();
    const worldQuaternion = new THREE.Quaternion();
    const worldScale = new THREE.Vector3();
    const demo = {
      state: NEW_MODEL_DEMO_STATES.IDLE,
      resumeState: NEW_MODEL_DEMO_STATES.IDLE,
      stageIndex: -1,
      stageElapsed: 0,
      coverAttached: false
    };

    function setState(state) {
      demo.state = state;
      if (state !== NEW_MODEL_DEMO_STATES.PAUSED) {
        demo.resumeState = state;
      }
    }

    function attachCoverToHome() {
      if (!cover || cover.parent === coverHomeParent) return;
      cover.updateMatrixWorld(true);
      cover.getWorldPosition(worldPosition);
      cover.getWorldQuaternion(worldQuaternion);
      cover.getWorldScale(worldScale);
      coverHomeParent.add(cover);
      cover.position.copy(worldPosition);
      cover.quaternion.copy(worldQuaternion);
      cover.scale.copy(worldScale);
    }

    function attachCoverToSuction() {
      if (!cover || !suctionHead || cover.parent === suctionHead) return;
      cover.updateMatrixWorld(true);
      cover.getWorldPosition(worldPosition);
      cover.getWorldQuaternion(worldQuaternion);
      cover.getWorldScale(worldScale);
      suctionHead.add(cover);
      cover.position.copy(suctionHead.worldToLocal(worldPosition));
      cover.quaternion.copy(worldQuaternion);
      cover.scale.copy(worldScale);
      demo.coverAttached = true;
    }

    function resetObjects() {
      attachCoverToHome();
      if (drum) {
        drum.position.set(layout.drumStartX, 0, 0);
        drum.rotation.set(0, 0, 0);
      }
      if (platform) {
        platform.position.set(layout.drumStartX, 0, 0);
        platform.rotation.set(0, 0, 0);
      }
      if (cover) {
        cover.position.set(layout.drumStartX, 0, 0);
        cover.rotation.set(0, 0, 0);
      }
      if (suctionHead) {
        suctionHead.position.set(0, 0, 0);
      }
      if (liftTable) {
        liftTable.position.set(0, layout.liftTableLowY, 0);
      }
      demo.stageIndex = -1;
      demo.stageElapsed = 0;
      demo.coverAttached = false;
      setState(NEW_MODEL_DEMO_STATES.IDLE);
      onPauseLabel?.("暂停 / 继续");
    }

    function beginStage(index) {
      demo.stageIndex = index;
      demo.stageElapsed = 0;
      setState(NEW_MODEL_DEMO_TIMELINE[index].state);
      if (demo.state === NEW_MODEL_DEMO_STATES.PICK_COVER) {
        attachCoverToSuction();
      }
    }

    function finishStage() {
      if (demo.stageIndex >= NEW_MODEL_DEMO_TIMELINE.length - 1) {
        demo.stageIndex = -1;
        demo.stageElapsed = 0;
        setState(NEW_MODEL_DEMO_STATES.FINISHED);
        return;
      }
      beginStage(demo.stageIndex + 1);
    }

    function moveAlongTrack(x) {
      if (drum) drum.position.x = x;
      if (platform) platform.position.x = x;
      if (cover && cover.parent === coverHomeParent) cover.position.x = x;
    }

    function updateCurrentStage(alpha) {
      const eased = smootherStep(alpha);
      switch (demo.state) {
        case NEW_MODEL_DEMO_STATES.MOVE_TO_SUCTION:
          moveAlongTrack(THREE.MathUtils.lerp(layout.drumStartX, layout.suctionX, eased));
          break;
        case NEW_MODEL_DEMO_STATES.SUCTION_DOWN:
          if (suctionHead) suctionHead.position.y = -layout.suctionDownY * eased;
          break;
        case NEW_MODEL_DEMO_STATES.PICK_COVER:
          if (!demo.coverAttached) attachCoverToSuction();
          if (suctionHead) suctionHead.position.y = -layout.suctionDownY;
          break;
        case NEW_MODEL_DEMO_STATES.SUCTION_UP:
          if (suctionHead) suctionHead.position.y = -layout.suctionDownY * (1 - eased);
          break;
        case NEW_MODEL_DEMO_STATES.MOVE_TO_CENTER:
          moveAlongTrack(THREE.MathUtils.lerp(layout.suctionX, layout.centerX, eased));
          break;
        case NEW_MODEL_DEMO_STATES.LIFT_UP: {
          const contactPortion = 0.22;
          if (eased < contactPortion) {
            const contactAlpha = smootherStep(eased / contactPortion);
            if (liftTable) {
              liftTable.position.y = THREE.MathUtils.lerp(
                layout.liftTableLowY,
                layout.liftTableContactY,
                contactAlpha
              );
            }
            if (drum) drum.position.y = 0;
          } else {
            const liftAlpha = smootherStep((eased - contactPortion) / (1 - contactPortion));
            if (liftTable) {
              liftTable.position.y = THREE.MathUtils.lerp(
                layout.liftTableContactY,
                layout.liftTableRaisedY,
                liftAlpha
              );
            }
            if (drum) drum.position.y = layout.drumLiftY * liftAlpha;
          }
          break;
        }
        case NEW_MODEL_DEMO_STATES.DOCKING:
          if (liftTable) liftTable.position.y = layout.liftTableRaisedY;
          if (drum) drum.position.y = layout.drumLiftY;
          break;
        case NEW_MODEL_DEMO_STATES.LIFT_DOWN: {
          const lowerPortion = 0.78;
          if (eased < lowerPortion) {
            const lowerAlpha = smootherStep(eased / lowerPortion);
            if (liftTable) {
              liftTable.position.y = THREE.MathUtils.lerp(
                layout.liftTableRaisedY,
                layout.liftTableContactY,
                lowerAlpha
              );
            }
            if (drum) drum.position.y = layout.drumLiftY * (1 - lowerAlpha);
          } else {
            const retractAlpha = smootherStep((eased - lowerPortion) / (1 - lowerPortion));
            if (liftTable) {
              liftTable.position.y = THREE.MathUtils.lerp(
                layout.liftTableContactY,
                layout.liftTableLowY,
                retractAlpha
              );
            }
            if (drum) drum.position.y = 0;
          }
          break;
        }
        case NEW_MODEL_DEMO_STATES.RETURN_LEFT:
          moveAlongTrack(THREE.MathUtils.lerp(layout.centerX, layout.drumStartX, eased));
          if (drum) drum.position.y = 0;
          if (liftTable) liftTable.position.y = layout.liftTableLowY;
          break;
        default:
          break;
      }
    }

    resetObjects();

    return {
      start() {
        if (demo.state === NEW_MODEL_DEMO_STATES.FINISHED || demo.state === NEW_MODEL_DEMO_STATES.IDLE) {
          resetObjects();
          controls.autoRotate = false;
          ui.setActionActive("toggleAutoRotate", false);
          beginStage(0);
        }
      },
      togglePause() {
        if (demo.state === NEW_MODEL_DEMO_STATES.IDLE || demo.state === NEW_MODEL_DEMO_STATES.FINISHED) return;
        if (demo.state === NEW_MODEL_DEMO_STATES.PAUSED) {
          setState(demo.resumeState);
          onPauseLabel?.("暂停 / 继续");
          return;
        }
        demo.resumeState = demo.state;
        demo.state = NEW_MODEL_DEMO_STATES.PAUSED;
        onPauseLabel?.("继续");
      },
      restart() {
        resetObjects();
      },
      reset: resetObjects,
      update(deltaTime) {
        if (demo.state === NEW_MODEL_DEMO_STATES.IDLE || demo.state === NEW_MODEL_DEMO_STATES.FINISHED || demo.state === NEW_MODEL_DEMO_STATES.PAUSED) {
          return;
        }
        const stage = NEW_MODEL_DEMO_TIMELINE[demo.stageIndex];
        if (!stage) return;
        demo.stageElapsed += deltaTime;
        updateCurrentStage(Math.min(1, demo.stageElapsed / stage.duration));
        if (demo.stageElapsed >= stage.duration) {
          updateCurrentStage(1);
          finishStage();
        }
      },
      get state() {
        return demo.state;
      }
    };
  }

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
    if (mode === NEW_MODEL_DEMO_MODE) {
      controls.autoRotate = false;
      ui.setActionActive("toggleAutoRotate", false);
      applyCameraPreset(initialCamera);
    }
    if (mode === "dynamic2") {
      demo2ModeStartTime = clock.getElapsedTime();
    }
    const frontGlass = scene.getObjectByName("front_glass_panel");
    if (frontGlass?.material) {
      frontGlass.material.opacity = mode === "dynamic" || mode === "dynamic2" ? 0.12 : 0.22;
      frontGlass.material.depthWrite = false;
      frontGlass.material.needsUpdate = true;
    }
    updateDynamicDemo2Visibility(mode);
    if (mode !== "dynamic2") {
      resetDynamicDemo2Objects();
    } else {
      updateDynamicDemo2(0);
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

  function updateDynamicDemo2Visibility(mode) {
    const productionAnimation = objects.dynamic_production_flow?.userData.animation;
    if (productionAnimation) {
      productionAnimation.hosePackage.visible = mode === "dynamic2";
      productionAnimation.hose.visible = true;
      productionAnimation.baggedHose.visible = false;
      productionAnimation.flowParticles.forEach((particle) => {
        particle.visible = mode === "dynamic";
      });
      productionAnimation.liquidSurface.visible = mode === "dynamic";
    }

    const materialSpace = scene.getObjectByName("open_mixer_bucket_visible_material_space");
    if (materialSpace) {
      materialSpace.visible = mode !== "dynamic2";
    }

    const toolAnimation = objects.floating_tweezer_gasket?.userData.animation;
    if (toolAnimation) {
      toolAnimation.gasketPackage.visible = mode !== "dynamic2";
      toolAnimation.tweezerPackage.visible = mode !== "dynamic2";
    }
  }

  function resetDynamicDemo2Objects() {
    const productionAnimation = objects.dynamic_production_flow?.userData.animation;
    if (productionAnimation?.hose) {
      productionAnimation.hose.visible = true;
      productionAnimation.hose.position.set(0, 0, 0);
      productionAnimation.hose.rotation.set(0, 0, 0);
      productionAnimation.hose.scale.set(1, 1, 1);
      productionAnimation.baggedHose.visible = false;
    }

    const toolAnimation = objects.floating_tweezer_gasket?.userData.animation;
    if (!toolAnimation) return;

    toolAnimation.gasket.position.copy(toolAnimation.gasketStartPosition);
    toolAnimation.gasket.rotation.copy(toolAnimation.gasketStartRotation);
    toolAnimation.gasketPackage.visible = true;
    toolAnimation.tweezerPackage.visible = true;
    toolAnimation.tweezerArms.forEach((arm) => {
      arm.mesh.position.copy(arm.startPosition);
      arm.mesh.rotation.copy(arm.startRotation);
    });
  }

  function updateDynamicDemo2(elapsedTime) {
    const productionAnimation = objects.dynamic_production_flow?.userData.animation;
    const toolAnimation = objects.floating_tweezer_gasket?.userData.animation;
    if (!productionAnimation || !toolAnimation) return;

    updateDynamicDemo2Visibility("dynamic2");

    const phase = (elapsedTime % 14) / 14;
    const hoseReset = easeBetween(phase, 0.9, 0.99);
    const hoseStartPosition = new THREE.Vector3(0, 0, 0);
    const hoseLeftPosition = new THREE.Vector3(-1.62, 0, 0);
    const hoseBagPosition = new THREE.Vector3(-3.3, -1.02, -0.28);
    const hoseStartRotation = new THREE.Euler(0, 0, 0);
    const hoseBagRotation = new THREE.Euler(-0.74, 0.08, -0.12);
    const hoseStartScale = new THREE.Vector3(1, 1, 1);
    const hoseBagScale = new THREE.Vector3(0.42, 0.42, 0.42);

    productionAnimation.hose.visible = phase < 0.32 || phase >= 0.9;
    productionAnimation.baggedHose.visible = phase >= 0.3 && phase < 0.9;

    if (phase < 0.22) {
      const horizontalSlide = easeBetween(phase, 0.04, 0.22);
      lerpVector(productionAnimation.hose.position, hoseStartPosition, hoseLeftPosition, horizontalSlide);
      productionAnimation.hose.rotation.copy(hoseStartRotation);
      productionAnimation.hose.scale.copy(hoseStartScale);
    } else if (phase < 0.38) {
      const intoBag = easeBetween(phase, 0.22, 0.38);
      lerpVector(productionAnimation.hose.position, hoseLeftPosition, hoseBagPosition, intoBag);
      lerpEuler(productionAnimation.hose.rotation, hoseStartRotation, hoseBagRotation, intoBag);
      lerpVector(productionAnimation.hose.scale, hoseStartScale, hoseBagScale, intoBag);
    } else if (phase < 0.9) {
      productionAnimation.hose.position.copy(hoseBagPosition);
      productionAnimation.hose.rotation.copy(hoseBagRotation);
      productionAnimation.hose.scale.copy(hoseBagScale);
    } else {
      lerpVector(productionAnimation.hose.position, hoseBagPosition, hoseStartPosition, hoseReset);
      lerpEuler(productionAnimation.hose.rotation, hoseBagRotation, hoseStartRotation, hoseReset);
      lerpVector(productionAnimation.hose.scale, hoseBagScale, hoseStartScale, hoseReset);
    }

    const gasketStart = toolAnimation.gasketStartPosition;
    const gasketLift = new THREE.Vector3(1.86, 1.86, 0.52);
    const gasketCarry = new THREE.Vector3(0.82, 2.0, -0.22);
    const gasketTarget = new THREE.Vector3(0, 1.66, -0.85);
    const tweezerStart = toolAnimation.tweezerArms[0].startPosition.clone().lerp(
      toolAnimation.tweezerArms[1].startPosition,
      0.5
    );
    const tweezerClampOffset = new THREE.Vector3(1.29, 0.02, 0);
    const tweezerClamp = gasketStart.clone().add(tweezerClampOffset);
    const tweezerLift = gasketLift.clone().add(tweezerClampOffset);
    const tweezerCarry = gasketCarry.clone().add(tweezerClampOffset);
    const tweezerPlace = gasketTarget.clone().add(tweezerClampOffset);
    const tweezerRetreat = new THREE.Vector3(1.46, 1.9, -0.54);

    const approach = easeBetween(phase, 0.36, 0.46);
    const clamp = easeBetween(phase, 0.46, 0.54);
    const carry = easeBetween(phase, 0.54, 0.82);
    const place = easeBetween(phase, 0.82, 0.9);
    const reset = hoseReset;
    const gasketPosition = new THREE.Vector3();
    const tweezerCenter = new THREE.Vector3();

    if (phase < 0.36) {
      gasketPosition.copy(gasketStart);
      tweezerCenter.copy(tweezerStart);
    } else if (phase < 0.46) {
      gasketPosition.copy(gasketStart);
      lerpVector(tweezerCenter, tweezerStart, tweezerClamp, approach);
    } else if (phase < 0.54) {
      gasketPosition.copy(gasketStart);
      tweezerCenter.copy(tweezerClamp);
    } else if (phase < 0.82) {
      if (carry < 0.28) {
        const segment = carry / 0.28;
        lerpVector(gasketPosition, gasketStart, gasketLift, segment);
        lerpVector(tweezerCenter, tweezerClamp, tweezerLift, segment);
      } else if (carry < 0.68) {
        const segment = (carry - 0.28) / 0.4;
        lerpVector(gasketPosition, gasketLift, gasketCarry, segment);
        lerpVector(tweezerCenter, tweezerLift, tweezerCarry, segment);
      } else {
        const segment = (carry - 0.68) / 0.32;
        lerpVector(gasketPosition, gasketCarry, gasketTarget, segment);
        lerpVector(tweezerCenter, tweezerCarry, tweezerPlace, segment);
      }
    } else if (phase < 0.9) {
      gasketPosition.copy(gasketTarget);
      lerpVector(tweezerCenter, tweezerPlace, tweezerRetreat, place);
    } else {
      lerpVector(gasketPosition, gasketTarget, gasketStart, reset);
      lerpVector(tweezerCenter, tweezerRetreat, tweezerStart, reset);
    }

    toolAnimation.gasket.position.copy(gasketPosition);
    const gasketTargetRotation = new THREE.Euler(Math.PI / 2, 0, 0);
    const gasketRotationBlend = phase < 0.54 ? 0 : phase < 0.9 ? clamp01(carry * 1.25) : 1 - reset;
    lerpEuler(toolAnimation.gasket.rotation, toolAnimation.gasketStartRotation, gasketTargetRotation, gasketRotationBlend);

    const carryRotation = new THREE.Euler(0.02, 0, 0.015);
    const tweezerRotationBlend = phase < 0.36 ? 0 : phase < 0.9 ? Math.max(approach, clamp, carry) : 1 - reset;
    toolAnimation.tweezerArms.forEach((arm, index) => {
      const side = index === 0 ? 1 : -1;
      const clampBlend = Math.max(clamp, carry, place);
      const gap = THREE.MathUtils.lerp(Math.abs(arm.offset), 0.02, clampBlend);
      arm.mesh.position.set(tweezerCenter.x, tweezerCenter.y + gap * side, tweezerCenter.z);
      lerpEuler(arm.mesh.rotation, arm.startRotation, carryRotation, tweezerRotationBlend);
      arm.mesh.rotation.z += side * 0.025 * tweezerRotationBlend;
    });
  }

  function animate() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = Math.min(0.25, Math.max(0, elapsedTime - previousElapsedTime));
    previousElapsedTime = elapsedTime;
    controls.update();
    if (displayMode === "dynamic") {
      updateDynamicProductionFlow(elapsedTime);
    }
    if (displayMode === "dynamic2") {
      updateDynamicDemo2(elapsedTime - demo2ModeStartTime);
    }
    if (displayMode === NEW_MODEL_DEMO_MODE) {
      newModelDemo?.update(deltaTime);
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
