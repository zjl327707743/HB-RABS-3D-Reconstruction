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

function markBag(object, id) {
  object.userData.id = id;
  object.traverse?.((child) => {
    child.userData.id = id;
    child.castShadow = false;
    child.receiveShadow = true;
  });
}

function createRoundedRectShape(width, depth, radius) {
  const x = width / 2;
  const z = depth / 2;
  const r = Math.min(radius, x, z);
  const shape = new THREE.Shape();

  shape.moveTo(-x + r, -z);
  shape.lineTo(x - r, -z);
  shape.quadraticCurveTo(x, -z, x, -z + r);
  shape.lineTo(x, z - r);
  shape.quadraticCurveTo(x, z, x - r, z);
  shape.lineTo(-x + r, z);
  shape.quadraticCurveTo(-x, z, -x, z - r);
  shape.lineTo(-x, -z + r);
  shape.quadraticCurveTo(-x, -z, -x + r, -z);
  return shape;
}

function createRoundedRectPath(width, depth, radius) {
  const x = width / 2;
  const z = depth / 2;
  const r = Math.min(radius, x, z);
  const path = new THREE.Path();

  path.moveTo(-x + r, -z);
  path.quadraticCurveTo(-x, -z, -x, -z + r);
  path.lineTo(-x, z - r);
  path.quadraticCurveTo(-x, z, -x + r, z);
  path.lineTo(x - r, z);
  path.quadraticCurveTo(x, z, x, z - r);
  path.lineTo(x, -z + r);
  path.quadraticCurveTo(x, -z, x - r, -z);
  path.lineTo(-x + r, -z);
  return path;
}

function createRoundedRectSideShell(width, depth, height, radius, thickness) {
  const outer = createRoundedRectShape(width, depth, radius);
  outer.holes.push(
    createRoundedRectPath(
      width - thickness * 2,
      depth - thickness * 2,
      Math.max(0.02, radius - thickness)
    )
  );

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth: height,
    bevelEnabled: false,
    curveSegments: 20
  });
  geometry.computeVertexNormals();
  return geometry;
}

function createSterileBag(dims, materials) {
  const bag = new THREE.Group();
  const shape = createRoundedRectShape(dims.w, dims.d, dims.r ?? 0.12);

  const bottom = new THREE.Mesh(new THREE.ShapeGeometry(shape), materials.sterileBag);
  bottom.name = "sterile_bag_bottom_film";
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.02;
  bag.add(bottom);

  const topGeometry = new THREE.ShapeGeometry(shape, 4);
  const positions = topGeometry.attributes.position;
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i) / (dims.w / 2);
    const z = positions.getY(i) / (dims.d / 2);
    const dome = Math.max(0, 1 - 0.34 * (x * x + z * z));
    positions.setZ(i, (dims.h ?? 0.22) * dome);
  }
  topGeometry.computeVertexNormals();

  const top = new THREE.Mesh(topGeometry, materials.sterileBag);
  top.name = "sterile_bag_top_soft_film";
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.025;
  bag.add(top);

  const sideHeight = (dims.h ?? 0.22) * 0.72 + 0.055;
  const sideShell = new THREE.Mesh(
    createRoundedRectSideShell(dims.w, dims.d, sideHeight, dims.r ?? 0.12, dims.sideThickness ?? 0.038),
    materials.sterileBag
  );
  sideShell.name = "sterile_bag_continuous_side_wall";
  sideShell.rotation.x = -Math.PI / 2;
  sideShell.position.y = -0.02;
  bag.add(sideShell);

  if (dims.crease) {
    const crease = new THREE.Mesh(
      new THREE.PlaneGeometry(dims.w * 0.72, 0.018),
      materials.sterileBagSeal
    );
    crease.name = "sterile_bag_soft_crease";
    crease.rotation.set(-Math.PI / 2, 0, dims.creaseRot ?? -0.18);
    crease.position.set(0, (dims.h ?? 0.22) + 0.018, 0);
    bag.add(crease);
  }
  return bag;
}

export function createTableItems(materials) {
  const group = new THREE.Group();
  group.name = "table-items";
  group.userData.id = "table-items";
  const y = SCENE_SCALE.tableHeight + 0.08;

  const dishX = 3.22;
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
  dishLid.position.set(3.86, y + 0.075, -1.72);
  mark(dishLid, "static_dish_lid");

  const dishMedia = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.018, 40), materials.dishAmber);
  dishMedia.name = "static_dish_yellow_media";
  dishMedia.position.set(dishX + 0.18, y + 0.055, dishZ - 0.04);
  mark(dishMedia, "static_dish");

  const funnelTool = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.48, 36, 1, true), materials.polishedSteel);
  funnelTool.name = "small_metal_funnel_part";
  funnelTool.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelTool.position.set(1.62, y + 0.33, -0.88);
  mark(funnelTool, "small_metal_funnel_part");

  const funnelRim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 10, 36), materials.equipmentDarkSteel);
  funnelRim.name = "small_metal_funnel_part_rim";
  funnelRim.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelRim.position.set(1.41, y + 0.33, -0.76);
  mark(funnelRim, "small_metal_funnel_part");

  const funnelNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.34, 24), materials.equipmentDarkSteel);
  funnelNeck.name = "small_metal_funnel_part_short_tube";
  funnelNeck.rotation.set(Math.PI / 2, 0.15, -0.55);
  funnelNeck.position.set(1.92, y + 0.32, -1.04);
  mark(funnelNeck, "small_metal_funnel_part");

  const elbowPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.92, y + 0.32, -1.18),
    new THREE.Vector3(2.04, y + 0.32, -1.28),
    new THREE.Vector3(2.18, y + 0.32, -1.28),
    new THREE.Vector3(2.28, y + 0.32, -1.12)
  ], false, "centripetal", 0.4);
  const funnelElbow = new THREE.Mesh(
    new THREE.TubeGeometry(elbowPath, 24, 0.065, 18, false),
    materials.equipmentDarkSteel
  );
  funnelElbow.name = "small_metal_funnel_part_90_degree_elbow";
  mark(funnelElbow, "small_metal_funnel_part");

  const looseConnector = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 10, 32), materials.equipmentDarkSteel);
  looseConnector.name = "loose_connector_part";
  looseConnector.rotation.set(Math.PI / 2, 0.05, 0.35);
  looseConnector.position.set(1.16, y + 0.23, -0.48);
  mark(looseConnector, "loose_connector_part");

  const clampArc = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.045, 10, 42, Math.PI * 1.52), materials.equipmentDarkSteel);
  clampArc.name = "left_loose_clamp_arc";
  clampArc.rotation.set(Math.PI / 2, 0, 0.42);
  clampArc.position.set(-1.62, y + 0.08, -0.16);
  mark(clampArc, "left_loose_clamp");

  const clampLock = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), materials.equipmentDarkSteel);
  clampLock.name = "left_loose_clamp_lock_block";
  clampLock.position.set(-1.3, y + 0.1, -0.02);
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

  // --- Sterile bags ---

  // Clamp sterile bag
  const clampBag = createSterileBag(
    { w: 1.16, h: 0.34, d: 1.02, r: 0.16 },
    materials
  );
  clampBag.name = "clamp_sterile_bag";
  clampBag.position.set(-1.56, y - 0.005, -0.1);
  clampBag.rotation.set(0, 0.18, 0);
  markBag(clampBag, "clamp_sterile_bag");

  // Funnel part sterile bag
  const funnelBag = createSterileBag(
    { w: 1.68, h: 0.46, d: 1.5, r: 0.18 },
    materials
  );
  funnelBag.name = "funnel_elbow_part_sterile_bag";
  funnelBag.position.set(1.78, y - 0.005, -0.98);
  funnelBag.rotation.set(0, 0.22, 0);
  markBag(funnelBag, "funnel_part_sterile_bag");

  // Petri dish sterile bag (covers dish + lid together)
  const petriBag = createSterileBag(
    { w: 1.84, h: 0.3, d: 1.28, r: 0.18 },
    materials
  );
  petriBag.name = "petri_dish_sterile_bag";
  petriBag.position.set(3.56, y - 0.005, -1.61);
  petriBag.rotation.set(0, -0.06, 0);
  markBag(petriBag, "petri_dish_sterile_bag");

  group.add(
    dishBase,
    dishRim,
    dishLid,
    dishMedia,
    funnelTool,
    funnelRim,
    funnelNeck,
    funnelElbow,
    looseConnector,
    clampArc,
    clampLock,
    smallStand,
    wrenchHandle,
    wrenchJaw,
    clampBag,
    funnelBag,
    petriBag
  );
  return group;
}

export function createSmallStaticParts(materials) {
  const group = createTableItems(materials);
  group.name = "small_static_parts";
  group.userData.id = "small_static_parts";
  return group;
}
