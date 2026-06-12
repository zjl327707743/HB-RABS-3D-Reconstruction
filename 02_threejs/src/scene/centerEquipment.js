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
  const xs = SCENE_SCALE.funnelDeviceXs;
  group.add(
    createFunnel("left_funnel_blockout", xs.left, materials),
    createFunnel("middle_funnel_blockout", xs.middle, materials),
    createFunnel("right_funnel_blockout", xs.right, materials)
  );
  return group;
}

export function createUpperInletPipePair(materials) {
  const group = new THREE.Group();
  group.name = "upper_inlet_pipe_pair";
  group.userData.id = "upper_inlet_pipe_pair";

  [
    ["left", SCENE_SCALE.funnelDeviceXs.left],
    ["right", SCENE_SCALE.funnelDeviceXs.right]
  ].forEach(([side, x]) => {
    const pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.66, 64),
      materials.polishedSteel
    );
    pipe.name = `upper_inlet_pipe_${side}`;
    pipe.position.set(x, SCENE_SCALE.funnelPairY + 0.86, SCENE_SCALE.centerEquipmentZ);
    pipe.userData.id = `upper_inlet_pipe_${side}`;

    const topCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.58, 0.08, 64),
      materials.equipmentDarkSteel
    );
    topCollar.name = `upper_inlet_pipe_${side}_top_collar`;
    topCollar.position.set(x, SCENE_SCALE.funnelPairY + 1.22, SCENE_SCALE.centerEquipmentZ);
    topCollar.userData.id = `upper_inlet_pipe_${side}`;

    const lowerCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.6, 0.1, 64),
      materials.polishedSteel
    );
    lowerCollar.name = `upper_inlet_pipe_${side}_lower_collar`;
    lowerCollar.position.set(x, SCENE_SCALE.funnelPairY + 0.49, SCENE_SCALE.centerEquipmentZ);
    lowerCollar.userData.id = `upper_inlet_pipe_${side}`;

    const lowerFlange = new THREE.Mesh(
      new THREE.TorusGeometry(0.57, 0.035, 10, 56),
      materials.equipmentDarkSteel
    );
    lowerFlange.name = `upper_inlet_pipe_${side}_short_flange_ring`;
    lowerFlange.rotation.x = Math.PI / 2;
    lowerFlange.position.set(x, SCENE_SCALE.funnelPairY + 0.42, SCENE_SCALE.centerEquipmentZ);
    lowerFlange.userData.id = `upper_inlet_pipe_${side}`;

    group.add(pipe, topCollar, lowerCollar, lowerFlange);
  });

  setId(group, "upper_inlet_pipe_pair");
  group.children.forEach((child) => {
    if (child.name.includes("_left")) child.userData.id = "upper_inlet_pipe_left";
    if (child.name.includes("_right")) child.userData.id = "upper_inlet_pipe_right";
  });
  return group;
}

export function createCenterVessel(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel";
  group.userData.id = "center_vessel";

  const cx = SCENE_SCALE.centerEquipmentX;
  const cy = SCENE_SCALE.centerVesselY;
  const cz = SCENE_SCALE.centerEquipmentZ;

  const bodyMaterial = materials.equipmentSteel.clone();
  bodyMaterial.side = THREE.DoubleSide;
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.86, 1.55, 64, 1, true),
    bodyMaterial
  );
  body.name = "open_mixer_bucket_wall";
  body.position.set(cx, cy - 0.12, cz);

  const bucketFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.82, 0.08, 64),
    materials.equipmentDarkSteel
  );
  bucketFloor.name = "open_mixer_bucket_bottom";
  bucketFloor.position.set(cx, cy - 0.94, cz);

  const lowerBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.88, 0.12, 64),
    materials.equipmentDarkSteel
  );
  lowerBand.name = "center_vessel_lower_band";
  lowerBand.position.set(cx, cy + 0.06, cz);

  const topRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.82, 0.05, 14, 64),
    materials.polishedSteel
  );
  topRim.name = "open_mixer_bucket_top_rim";
  topRim.rotation.x = Math.PI / 2;
  topRim.position.set(cx, cy + 0.62, cz);

  const topBandMaterial = materials.equipmentSteel.clone();
  topBandMaterial.side = THREE.DoubleSide;
  const topBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.84, 0.82, 0.10, 64, 1, true),
    topBandMaterial
  );
  topBand.name = "open_mixer_bucket_top_band";
  topBand.position.set(cx, cy + 0.55, cz);

  const innerCatchSpace = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.66, 0.34, 64, 1, true),
    materials.mixerMaterial
  );
  innerCatchSpace.name = "open_mixer_bucket_visible_material_space";
  innerCatchSpace.position.set(cx, cy - 0.36, cz);

  group.add(body, bucketFloor, lowerBand, topRim, topBand, innerCatchSpace);
  setId(group, "center_vessel");
  innerCatchSpace.userData.id = "center_vessel_material_space";
  return group;
}

export function createCenterVesselLidStack(materials) {
  const group = new THREE.Group();
  group.name = "center_vessel_lid_stack";
  group.userData.id = "center_vessel_lid_stack";
  const x = SCENE_SCALE.centerEquipmentX;
  const z = 0.62;
  const y = SCENE_SCALE.tableHeight + 0.12;

  [
    ["detached_mixer_lower_round_lid", 0.82, 0.08, y],
    ["detached_mixer_upper_round_lid", 0.66, 0.08, y + 0.08]
  ].forEach(([name, radius, height, py]) => {
    const part = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), materials.polishedSteel);
    part.name = name;
    part.position.set(x, py, z);
    group.add(part);
  });

  setId(group, "center_vessel_lid_stack");
  return group;
}

function createCurvedSoftHosePath() {
  const x = SCENE_SCALE.funnelDeviceXs.middle;
  const z = SCENE_SCALE.centerEquipmentZ;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(x, SCENE_SCALE.funnelPairY - 0.66, z),
    new THREE.Vector3(x - 0.24, 2.58, z + 0.34),
    new THREE.Vector3(x - 0.56, 2.04, z + 0.48),
    new THREE.Vector3(SCENE_SCALE.centerEquipmentX, SCENE_SCALE.centerVesselY + 0.64, z)
  ]);
}

export function createDynamicProductionFlow(materials) {
  const group = new THREE.Group();
  group.name = "dynamic_production_flow";
  group.userData.id = "dynamic_production_flow";

  const hosePath = createCurvedSoftHosePath();
  const hose = new THREE.Mesh(
    new THREE.TubeGeometry(hosePath, 72, 0.11, 24, false),
    materials.transparentSoftHose
  );
  hose.name = "middle_funnel_transparent_soft_hose";
  group.add(hose);

  [0, 1].forEach((pointIndex) => {
    const point = hosePath.getPoint(pointIndex);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.018, 10, 32), materials.equipmentDarkSteel);
    ring.name = pointIndex === 0 ? "soft_hose_upper_clamp_ring" : "soft_hose_bucket_clamp_ring";
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(point);
    group.add(ring);
  });

  const flowParticles = [];
  for (let i = 0; i < 22; i += 1) {
    const size = 0.028 + Math.random() * 0.032;
    const particle = new THREE.Mesh(new THREE.SphereGeometry(size, 10, 8), materials.flowMaterial);
    particle.name = `soft_hose_flow_particle_${String(i + 1).padStart(2, "0")}`;
    group.add(particle);
    flowParticles.push(particle);
  }

  const liquidSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(0.56, 0.60, 0.05, 64),
    materials.mixerMaterial
  );
  liquidSurface.name = "open_mixer_rotating_material_surface";
  liquidSurface.position.set(
    SCENE_SCALE.centerEquipmentX,
    SCENE_SCALE.centerVesselY - 0.14,
    SCENE_SCALE.centerEquipmentZ
  );
  group.add(liquidSurface);

  const liquidRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.44, 0.008, 6, 56),
    materials.flowMaterial
  );
  liquidRing.name = "open_mixer_subtle_inner_ring";
  liquidRing.rotation.x = Math.PI / 2;
  liquidRing.position.set(
    SCENE_SCALE.centerEquipmentX,
    SCENE_SCALE.centerVesselY - 0.06,
    SCENE_SCALE.centerEquipmentZ
  );
  group.add(liquidRing);

  setId(group, "dynamic_production_flow");

  const offsets = flowParticles.map(() => Math.random());
  group.userData.animation = {
    hosePath,
    flowParticles,
    liquidSurface,
    liquidRing,
    flowOffsets: offsets
  };

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
