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

function horizontalBar(name, x, y, z, length, material, id) {
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, length, 24), material);
  bar.name = name;
  bar.rotation.z = Math.PI / 2;
  bar.position.set(x, y, z);
  mark(bar, id);
  return bar;
}

export function createTopAssemblyBlockout(materials) {
  const group = new THREE.Group();
  group.name = "top_assembly_blockout";
  group.userData.id = "top_assembly_blockout";

  mark(group, "top_assembly_blockout");
  return group;
}
