import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

function mark(object, id) {
  object.userData.id = id;
  object.traverse?.((child) => {
    child.userData.id = id;
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

export function createSmallStaticParts(materials) {
  const group = new THREE.Group();
  group.name = "small_static_parts";
  group.userData.id = "small_static_parts";
  const y = SCENE_SCALE.tableHeight + 0.08;

  const dishX = 3.08;
  const dishZ = -1.52;
  const dishBase = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.045, 56), materials.dishGlass);
  dishBase.name = "static_dish";
  dishBase.position.set(dishX, y + 0.015, dishZ);
  mark(dishBase, "static_dish");

  const dishRim = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.026, 12, 56), materials.dishGlass);
  dishRim.name = "static_dish_rim";
  dishRim.rotation.x = Math.PI / 2;
  dishRim.position.set(dishX, y + 0.06, dishZ);
  mark(dishRim, "static_dish");

  const dishLid = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.016, 10, 48), materials.dishGlass);
  dishLid.name = "static_dish_lid";
  dishLid.rotation.x = Math.PI / 2;
  dishLid.position.set(3.72, y + 0.075, -1.72);
  mark(dishLid, "static_dish_lid");

  const dishMedia = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.018, 40), materials.dishAmber);
  dishMedia.name = "static_dish_yellow_media";
  dishMedia.position.set(dishX + 0.18, y + 0.055, dishZ - 0.04);
  mark(dishMedia, "static_dish");

  const wrap = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 0.92, 2, 2), materials.blueSterileWrap);
  wrap.name = "blue_sterile_wrap";
  wrap.position.set(1.66, y + 0.032, -0.9);
  wrap.rotation.set(-Math.PI / 2, 0, -0.18);
  mark(wrap, "blue_sterile_wrap");

  const wrapFold = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 0.32), materials.blueSterileWrap);
  wrapFold.name = "blue_sterile_wrap_fold";
  wrapFold.position.set(1.98, y + 0.075, -0.68);
  wrapFold.rotation.set(-Math.PI / 2.25, 0.12, -0.28);
  mark(wrapFold, "blue_sterile_wrap");

  const funnelTool = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.48, 36, 1, true), materials.polishedSteel);
  funnelTool.name = "small_metal_funnel_part";
  funnelTool.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelTool.position.set(1.62, y + 0.19, -0.88);
  mark(funnelTool, "small_metal_funnel_part");

  const funnelRim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 10, 36), materials.equipmentDarkSteel);
  funnelRim.name = "small_metal_funnel_part_rim";
  funnelRim.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelRim.position.set(1.41, y + 0.19, -0.76);
  mark(funnelRim, "small_metal_funnel_part");

  const funnelNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.34, 24), materials.equipmentDarkSteel);
  funnelNeck.name = "small_metal_funnel_part_short_tube";
  funnelNeck.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelNeck.position.set(1.92, y + 0.18, -1.04);
  mark(funnelNeck, "small_metal_funnel_part");

  const looseConnector = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 10, 32), materials.equipmentDarkSteel);
  looseConnector.name = "loose_connector_part";
  looseConnector.rotation.set(Math.PI / 2, 0.05, 0.35);
  looseConnector.position.set(1.16, y + 0.09, -0.48);
  mark(looseConnector, "loose_connector_part");

  const clampArc = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.045, 10, 42, Math.PI * 1.52), materials.equipmentDarkSteel);
  clampArc.name = "left_loose_clamp_arc";
  clampArc.rotation.set(Math.PI / 2, 0, 0.42);
  clampArc.position.set(-1.42, y + 0.08, -0.16);
  mark(clampArc, "left_loose_clamp");

  const clampLock = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), materials.equipmentDarkSteel);
  clampLock.name = "left_loose_clamp_lock_block";
  clampLock.position.set(-1.1, y + 0.1, -0.02);
  clampLock.rotation.y = 0.35;
  mark(clampLock, "left_loose_clamp");

  const smallStand = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.14, 0.54), materials.brushedDark);
  smallStand.name = "static_wrench_side_stand";
  smallStand.position.set(3.58, y + 0.04, 0.72);
  mark(smallStand, "small_static_parts");

  const wrenchHandle = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.055, 0.12), materials.equipmentDarkSteel);
  wrenchHandle.name = "static_wrench_blockout";
  wrenchHandle.position.set(3.58, y + 0.165, 0.72);
  wrenchHandle.rotation.y = -0.32;
  mark(wrenchHandle, "static_wrench_blockout");

  const wrenchJaw = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 10, 24, Math.PI * 1.45), materials.equipmentDarkSteel);
  wrenchJaw.name = "static_wrench_open_jaw";
  wrenchJaw.position.set(3.24, y + 0.175, 0.6);
  wrenchJaw.rotation.set(Math.PI / 2, 0, -0.32);
  mark(wrenchJaw, "static_wrench_blockout");

  group.add(
    dishBase,
    dishRim,
    dishLid,
    dishMedia,
    wrap,
    wrapFold,
    funnelTool,
    funnelRim,
    funnelNeck,
    looseConnector,
    clampArc,
    clampLock,
    smallStand,
    wrenchHandle,
    wrenchJaw
  );
  return group;
}
