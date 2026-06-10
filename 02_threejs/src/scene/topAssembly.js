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

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.68, 0.16, 72), materials.polishedSteel);
  base.name = "top_large_round_flange";
  base.position.set(s.centerEquipmentX, 4.62, s.centerEquipmentZ);

  const upperPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.3, 0.12, 72), materials.equipmentSteel);
  upperPlate.name = "top_raised_plate";
  upperPlate.position.set(s.centerEquipmentX, 4.78, s.centerEquipmentZ);

  const block = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.28, 0.5), materials.blackRubber);
  block.name = "top_black_center_block";
  block.position.set(s.centerEquipmentX, 4.96, s.centerEquipmentZ + 0.02);
  block.userData.id = "top_black_center_block";

  group.add(
    base,
    upperPlate,
    block,
    horizontalBar("top_left_handle_bar", -1.35, 4.95, s.centerEquipmentZ, 1.35, materials.equipmentDarkSteel, "top_assembly_blockout"),
    horizontalBar("top_right_handle_bar", 1.35, 4.95, s.centerEquipmentZ, 1.35, materials.equipmentDarkSteel, "top_assembly_blockout")
  );

  mark(group, "top_assembly_blockout");
  block.userData.id = "top_black_center_block";
  return group;
}
