import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

function mark(object, id) {
  object.userData.id = id;
  object.traverse?.((child) => {
    child.userData.id = child.userData.id || id;
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function rail(name, x, y, z, material, id) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.95, 0.055), material);
  mesh.name = name;
  mesh.position.set(x, y, z);
  mark(mesh, id);
  return mesh;
}

function makeDoor(side, materials) {
  const group = new THREE.Group();
  group.name = `${side}_lift_door`;
  const sign = side === "left" ? -1 : 1;
  const panelId = `${side}_lift_door_panel`;
  const frameId = `${side}_lift_door_frame`;
  const railId = `${side}_lift_door_guide_rails`;
  const x = sign * (SCENE_SCALE.sideWallX + 0.075);
  const y = 0.72;
  const z = 0.02;

  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.58, 0.78), materials.glass);
  panel.name = panelId;
  panel.position.set(x, y, z);
  mark(panel, panelId);

  const frame = new THREE.Group();
  frame.name = frameId;
  frame.userData.id = frameId;
  const frameParts = [
    ["top", [0.07, 0.055, 0.92], [x + sign * 0.01, y + 0.34, z]],
    ["bottom", [0.07, 0.055, 0.92], [x + sign * 0.01, y - 0.34, z]],
    ["front", [0.07, 0.68, 0.055], [x + sign * 0.01, y, z + 0.46]],
    ["rear", [0.07, 0.68, 0.055], [x + sign * 0.01, y, z - 0.46]]
  ];
  frameParts.forEach(([suffix, size, position]) => {
    const part = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.brushedDark);
    part.name = `${frameId}_${suffix}`;
    part.position.set(...position);
    mark(part, frameId);
    frame.add(part);
  });

  const rails = new THREE.Group();
  rails.name = railId;
  rails.userData.id = railId;
  rails.add(
    rail(`${railId}_front`, x + sign * 0.045, y, z + 0.55, materials.equipmentDarkSteel, railId),
    rail(`${railId}_rear`, x + sign * 0.045, y, z - 0.55, materials.equipmentDarkSteel, railId)
  );

  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.28), materials.blackRubber);
  handle.name = `${side}_lift_door_black_stop_handle`;
  handle.position.set(x + sign * 0.08, y - 0.22, z + 0.32);
  mark(handle, panelId);

  group.add(panel, frame, rails, handle);
  return group;
}

export function createSideLiftDoors(materials) {
  const group = new THREE.Group();
  group.name = "side_lift_doors";
  group.userData.id = "side_lift_doors";
  group.add(makeDoor("left", materials), makeDoor("right", materials));
  return group;
}
