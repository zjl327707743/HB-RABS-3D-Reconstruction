import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

function setId(object, id) {
  object.userData.id = id;
  object.traverse?.((child) => {
    child.userData.id = id;
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function makeTube(name, points, radius, material, id) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 36, radius, 18, false),
    material
  );
  mesh.name = name;
  setId(mesh, id);
  return mesh;
}

function horizontalPipe(id, name, x, y, z, length, materials) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, length, 36),
    materials.equipmentSteel
  );
  mesh.name = name;
  mesh.rotation.z = Math.PI / 2;
  mesh.position.set(x, y, z);
  setId(mesh, id);
  const group = new THREE.Group();
  group.name = id;
  group.userData.id = id;
  group.add(mesh);

  [-0.62, 0.62].forEach((offset, index) => {
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 32), materials.equipmentDarkSteel);
    flange.name = `${name}_flange_${index + 1}`;
    flange.rotation.z = Math.PI / 2;
    flange.position.set(x + offset, y, z);
    setId(flange, id);
    group.add(flange);
  });

  return group;
}

export function createLeftHorizontalPipeBlockout(materials) {
  return horizontalPipe("left_horizontal_pipe_blockout", "left_horizontal_stainless_pipe", -2.45, 1.62, SCENE_SCALE.valvePipeZ, 1.8, materials);
}

export function createRightHorizontalPipeBlockout(materials) {
  return horizontalPipe("right_horizontal_pipe_blockout", "right_horizontal_stainless_pipe", 2.45, 1.62, SCENE_SCALE.valvePipeZ, 1.8, materials);
}

export function createLeftWhiteHoseBlockout(materials) {
  const group = new THREE.Group();
  group.name = "left_white_hose_blockout";
  group.userData.id = "left_white_hose_blockout";
  group.add(makeTube("left_white_hose_curve", [
    [-3.18, 1.62, SCENE_SCALE.valvePipeZ],
    [-3.65, 1.9, -0.65],
    [-3.85, 2.4, SCENE_SCALE.rearWallZ + 0.2]
  ], 0.15, materials.tubeBlockout, "left_white_hose_blockout"));
  return group;
}

export function createRightWhiteHoseBlockout(materials) {
  const group = new THREE.Group();
  group.name = "right_white_hose_blockout";
  group.userData.id = "right_white_hose_blockout";
  group.add(makeTube("right_white_hose_curve", [
    [3.18, 1.62, SCENE_SCALE.valvePipeZ],
    [3.65, 1.9, -0.65],
    [3.85, 2.4, SCENE_SCALE.rearWallZ + 0.2]
  ], 0.15, materials.tubeBlockout, "right_white_hose_blockout"));
  return group;
}

export function createMainTubingBlockout(materials) {
  const group = new THREE.Group();
  group.name = "main_tubing_blockout";
  group.userData.id = "main_tubing_blockout";
  const s = SCENE_SCALE;

  group.add(makeTube("left_funnel_neck_to_left_valve_pipe", [
    [-0.58, 3.25, s.centerEquipmentZ],
    [-0.74, 2.55, s.centerEquipmentZ + 0.05],
    [-1.35, 1.95, s.valvePipeZ],
    [-1.72, 1.62, s.valvePipeZ]
  ], 0.14, materials.tubeBlockout, "main_tubing_blockout"));

  group.add(makeTube("right_funnel_neck_to_right_valve_pipe", [
    [0.58, 3.25, s.centerEquipmentZ],
    [0.74, 2.55, s.centerEquipmentZ + 0.05],
    [1.35, 1.95, s.valvePipeZ],
    [1.72, 1.62, s.valvePipeZ]
  ], 0.14, materials.tubeBlockout, "main_tubing_blockout"));

  return group;
}
