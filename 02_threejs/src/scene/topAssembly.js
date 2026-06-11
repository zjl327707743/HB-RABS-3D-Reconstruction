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
  const s = SCENE_SCALE;

  const block = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.28, 0.5), materials.blackRubber);
  block.name = "top_black_center_block";
  block.position.set(s.centerEquipmentX, 4.96, s.centerEquipmentZ + 0.02);
  block.userData.id = "top_black_center_block";

  group.add(
    block,
    horizontalBar("top_left_handle_bar", -1.42, 4.95, s.centerEquipmentZ, 0.9, materials.equipmentDarkSteel, "top_assembly_blockout"),
    horizontalBar("top_right_handle_bar", 1.42, 4.95, s.centerEquipmentZ, 0.9, materials.equipmentDarkSteel, "top_assembly_blockout")
  );

  mark(group, "top_assembly_blockout");
  block.userData.id = "top_black_center_block";
  return group;
}
