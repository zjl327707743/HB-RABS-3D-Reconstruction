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

function horizontalCylinder(name, x, y, z, length, radius, material, id) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 36),
    material
  );
  mesh.name = name;
  mesh.rotation.z = Math.PI / 2;
  mesh.position.set(x, y, z);
  setId(mesh, id);
  return mesh;
}

function makeHandwheel(id, x, y, z, side, materials) {
  const group = new THREE.Group();
  group.name = id;
  group.userData.id = id;

  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.16, 48),
    materials.blackControl
  );
  wheel.name = `${id}_black_round_wheel`;
  wheel.rotation.x = Math.PI / 2;
  wheel.position.set(x, y, z + 0.22);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.24, 32),
    materials.equipmentDarkSteel
  );
  hub.name = `${id}_hub`;
  hub.rotation.x = Math.PI / 2;
  hub.position.copy(wheel.position);

  const stem = horizontalCylinder(
    `${id}_short_stem_to_pipe`,
    x + side * 0.22,
    y,
    z + 0.1,
    0.48,
    0.08,
    materials.equipmentDarkSteel,
    id
  );

  group.add(wheel, hub, stem);

  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.26), materials.blackRubber);
    blade.name = `${id}_grip_blade_${String(i + 1).padStart(2, "0")}`;
    blade.position.set(
      x + Math.cos(angle) * 0.26,
      y + Math.sin(angle) * 0.26,
      z + 0.31
    );
    blade.rotation.z = angle;
    group.add(blade);
  }

  setId(group, id);
  return group;
}

export function createLeftBlackHandwheel(materials) {
  return makeHandwheel("left_black_handwheel", -2.45, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, -1, materials);
}

export function createRightBlackHandwheel(materials) {
  return makeHandwheel("right_black_handwheel", 2.45, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, 1, materials);
}

export function createRightPipeCouplings(materials) {
  const group = new THREE.Group();
  group.name = "right_pipe_couplings";
  group.userData.id = "right_pipe_couplings";

  const y = SCENE_SCALE.valvePipeY;
  const z = SCENE_SCALE.valvePipeZ;
  [
    ["right_coupling_inner", 1.72]
  ].forEach(([name, x]) => {
    const ring = horizontalCylinder(name, x, y, z, 0.18, 0.2, materials.equipmentDarkSteel, "right_pipe_couplings");
    group.add(ring);
  });

  setId(group, "right_pipe_couplings");
  return group;
}

export function createLeftPipeCouplings(materials) {
  const group = new THREE.Group();
  group.name = "left_pipe_couplings";
  group.userData.id = "left_pipe_couplings";

  const y = SCENE_SCALE.valvePipeY;
  const z = SCENE_SCALE.valvePipeZ;
  [
    ["left_coupling_inner", -1.68],
    ["left_coupling_outer", -3.28]
  ].forEach(([name, x]) => {
    const ring = horizontalCylinder(name, x, y, z, 0.18, 0.2, materials.equipmentDarkSteel, "left_horizontal_pipe_blockout");
    group.add(ring);
  });

  setId(group, "left_horizontal_pipe_blockout");
  return group;
}
