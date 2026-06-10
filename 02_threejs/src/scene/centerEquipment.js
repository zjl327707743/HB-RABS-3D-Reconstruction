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

function createFunnel(id, x, materials) {
  const group = new THREE.Group();
  group.name = id;

  const upperRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.66, 0.2, 56),
    materials.polishedSteel
  );
  upperRim.name = `${id}_thick_upper_rim`;
  upperRim.position.set(x, SCENE_SCALE.funnelPairY + 0.44, SCENE_SCALE.centerEquipmentZ);

  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.54, 0.76, 56, 1, true),
    materials.equipmentSteel
  );
  cone.name = `${id}_stainless_cone`;
  cone.position.set(x, SCENE_SCALE.funnelPairY + 0.04, SCENE_SCALE.centerEquipmentZ);
  cone.rotation.x = Math.PI;

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 0.46, 36),
    materials.equipmentDarkSteel
  );
  neck.name = `${id}_short_neck`;
  neck.position.set(x, SCENE_SCALE.funnelPairY - 0.43, SCENE_SCALE.centerEquipmentZ);

  const clamp = new THREE.Mesh(
    new THREE.TorusGeometry(0.21, 0.028, 10, 32),
    materials.equipmentDarkSteel
  );
  clamp.name = `${id}_neck_clamp_ring`;
  clamp.rotation.x = Math.PI / 2;
  clamp.position.set(x, SCENE_SCALE.funnelPairY - 0.22, SCENE_SCALE.centerEquipmentZ);

  group.add(upperRim, cone, neck, clamp);
  setId(group, "center_funnel_pair");
  return group;
}

export function createCenterFunnelPair(materials) {
  const group = new THREE.Group();
  group.name = "center_funnel_pair";
  group.userData.id = "center_funnel_pair";
  group.add(createFunnel("left_funnel_blockout", -0.58, materials));
  group.add(createFunnel("right_funnel_blockout", 0.58, materials));
  return group;
}

export function createCenterVessel(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel";
  group.userData.id = "center_vessel";

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.86, 1.55, 64),
    materials.equipmentSteel
  );
  body.name = "center_vessel_main_cylinder";
  body.position.set(SCENE_SCALE.centerEquipmentX, SCENE_SCALE.centerVesselY - 0.12, SCENE_SCALE.centerEquipmentZ);

  const lowerBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.88, 0.12, 64),
    materials.equipmentDarkSteel
  );
  lowerBand.name = "center_vessel_lower_band";
  lowerBand.position.set(SCENE_SCALE.centerEquipmentX, SCENE_SCALE.centerVesselY + 0.06, SCENE_SCALE.centerEquipmentZ);

  group.add(body, lowerBand);
  setId(group, "center_vessel");
  return group;
}

export function createCenterVesselLidStack(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel_lid_stack";
  group.userData.id = "center_vessel_lid_stack";
  const x = SCENE_SCALE.centerEquipmentX;
  const z = SCENE_SCALE.centerEquipmentZ;
  const y = SCENE_SCALE.centerVesselY + 0.72;

  [
    ["center_vessel_lower_lid", 0.95, 0.16, y],
    ["center_vessel_upper_lid", 0.78, 0.14, y + 0.16],
    ["center_vessel_center_short_standpipe", 0.16, 0.35, y + 0.39]
  ].forEach(([name, radius, height, py]) => {
    const part = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), materials.polishedSteel);
    part.name = name;
    part.position.set(x, py, z);
    group.add(part);
  });

  setId(group, "center_vessel_lid_stack");
  return group;
}

export function createCenterVesselFlangeRing(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel_flange_ring";
  group.userData.id = "center_vessel_flange_ring";

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.94, 0.045, 12, 64),
    materials.equipmentDarkSteel
  );
  ring.name = "center_vessel_top_flange_ring";
  ring.rotation.x = Math.PI / 2;
  ring.position.set(SCENE_SCALE.centerEquipmentX, SCENE_SCALE.centerVesselY + 0.62, SCENE_SCALE.centerEquipmentZ);

  group.add(ring);
  setId(group, "center_vessel_flange_ring");
  return group;
}

export function createCenterVesselClampBlocks(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel_clamp_blocks";
  group.userData.id = "center_vessel_clamp_blocks";
  const radius = 0.98;
  const y = SCENE_SCALE.centerVesselY + 0.64;

  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6;
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.11), materials.equipmentDarkSteel);
    block.name = `center_vessel_clamp_block_${String(i + 1).padStart(2, "0")}`;
    block.position.set(
      SCENE_SCALE.centerEquipmentX + Math.cos(angle) * radius,
      y,
      SCENE_SCALE.centerEquipmentZ + Math.sin(angle) * radius
    );
    block.rotation.y = -angle;
    group.add(block);
  }

  setId(group, "center_vessel_clamp_blocks");
  return group;
}
