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

function setTransparentPackageId(object, id) {
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

function createFlatWasherGeometry(innerRadius, outerRadius, thickness) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: 96
  });
  geometry.center();
  return geometry;
}

function createSoftSterilePackage(dims, materials) {
  const bag = new THREE.Group();
  const shape = createRoundedRectShape(dims.w, dims.d, dims.r ?? 0.12);

  const bottom = new THREE.Mesh(new THREE.ShapeGeometry(shape), materials.sterileBag);
  bottom.name = "floating_sterile_package_bottom_film";
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.018;
  bag.add(bottom);

  const topGeometry = new THREE.ShapeGeometry(shape, 4);
  const positions = topGeometry.attributes.position;
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i) / (dims.w / 2);
    const z = positions.getY(i) / (dims.d / 2);
    const dome = Math.max(0, 1 - 0.32 * (x * x + z * z));
    positions.setZ(i, (dims.h ?? 0.22) * dome);
  }
  topGeometry.computeVertexNormals();

  const top = new THREE.Mesh(topGeometry, materials.sterileBag);
  top.name = "floating_sterile_package_top_soft_film";
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.022;
  bag.add(top);

  const sideHeight = (dims.h ?? 0.22) * 0.72 + 0.055;
  const sideThickness = dims.sideThickness ?? 0.038;
  const sideShell = new THREE.Mesh(
    createRoundedRectSideShell(dims.w, dims.d, sideHeight, dims.r ?? 0.12, sideThickness),
    materials.sterileBag
  );
  sideShell.name = "floating_sterile_package_continuous_side_wall";
  sideShell.rotation.x = -Math.PI / 2;
  sideShell.position.y = -0.018;
  bag.add(sideShell);

  if (dims.crease !== false) {
    const crease = new THREE.Mesh(
      new THREE.PlaneGeometry(dims.w * 0.72, 0.018),
      materials.sterileBagSeal
    );
    crease.name = "floating_sterile_package_soft_crease";
    crease.rotation.set(-Math.PI / 2, 0, dims.creaseRot ?? -0.12);
    crease.position.set(0, (dims.h ?? 0.22) + 0.018, 0);
    bag.add(crease);
  }

  return bag;
}

function createFunnel(id, x, materials) {
  const group = new THREE.Group();
  group.name = id;

  const isMiddle = id.startsWith("middle");

  if (isMiddle) {
    const brightFlangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2f4f5,
      metalness: 0.92,
      roughness: 0.12,
      emissive: 0x3a3f42,
      emissiveIntensity: 0.08
    });
    const topFlange = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.84, 0.22, 64),
      brightFlangeMaterial
    );
    topFlange.name = `${id}_wide_sloped_metal_flange`;
    topFlange.position.set(x, SCENE_SCALE.funnelPairY + 0.32, SCENE_SCALE.centerEquipmentZ);

    const topLip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.68, 0.045, 64),
      brightFlangeMaterial
    );
    topLip.name = `${id}_wide_flange_flat_top_lip`;
    topLip.position.set(x, SCENE_SCALE.funnelPairY + 0.455, SCENE_SCALE.centerEquipmentZ);

    const lowerLip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.84, 0.84, 0.045, 64),
      brightFlangeMaterial
    );
    lowerLip.name = `${id}_wide_flange_flat_lower_lip`;
    lowerLip.position.set(x, SCENE_SCALE.funnelPairY + 0.205, SCENE_SCALE.centerEquipmentZ);

    group.add(topFlange, topLip, lowerLip);
  } else {
    const upperRim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.66, 0.2, 56),
      materials.polishedSteel
    );
    upperRim.name = `${id}_thick_upper_rim`;
    upperRim.position.set(x, SCENE_SCALE.funnelPairY + 0.44, SCENE_SCALE.centerEquipmentZ);

    // Left/right funnel: cone truncated to flat bottom (r=0.16), fuses directly into hard pipe
    const cone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.54, 0.76, 56, 1, true),
      materials.equipmentSteel
    );
    cone.name = `${id}_stainless_cone`;
    cone.rotation.x = Math.PI;
    cone.position.set(x, SCENE_SCALE.funnelPairY + 0.04, SCENE_SCALE.centerEquipmentZ);

    group.add(upperRim, cone);
  }

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
    ["middle", SCENE_SCALE.funnelDeviceXs.middle]
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
    if (child.name.includes("_middle")) child.userData.id = "upper_inlet_pipe_middle";
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
  const x = -2.22;
  const z = 0.78;
  const y = SCENE_SCALE.tableHeight + 0.12;

  const lowerCover = new THREE.Mesh(
    new THREE.CylinderGeometry(0.82, 0.82, 0.09, 64),
    materials.blackControl
  );
  lowerCover.name = "detached_black_round_lid_lower_layer";
  lowerCover.position.set(x, y, z);

  const upperCover = new THREE.Mesh(
    new THREE.CylinderGeometry(0.66, 0.66, 0.08, 64),
    materials.blackControl
  );
  upperCover.name = "detached_black_round_lid_upper_layer";
  upperCover.position.set(x, y + 0.085, z);

  const lowerRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.82, 0.022, 10, 64),
    materials.blackRubber
  );
  lowerRim.name = "detached_black_round_lid_lower_rim";
  lowerRim.rotation.x = Math.PI / 2;
  lowerRim.position.set(x, y + 0.052, z);

  const upperRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.66, 0.018, 10, 64),
    materials.blackRubber
  );
  upperRim.name = "detached_black_round_lid_upper_rim";
  upperRim.rotation.x = Math.PI / 2;
  upperRim.position.set(x, y + 0.13, z);

  group.add(lowerCover, upperCover, lowerRim, upperRim);

  setId(group, "center_vessel_lid_stack");
  return group;
}

function createCurvedSoftHosePath() {
  const x = SCENE_SCALE.funnelDeviceXs.middle;
  const z = SCENE_SCALE.centerEquipmentZ;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(x, SCENE_SCALE.funnelPairY + 0.21, z),
    new THREE.Vector3(x - 0.10, 3.02, z + 0.08),
    new THREE.Vector3(x - 0.34, 2.42, z + 0.04),
    new THREE.Vector3(SCENE_SCALE.centerEquipmentX + 0.04, SCENE_SCALE.centerVesselY + 0.86, z),
    new THREE.Vector3(SCENE_SCALE.centerEquipmentX, SCENE_SCALE.centerVesselY + 0.28, z)
  ], false, "centripetal", 0.35);
}

export function createDynamicProductionFlow(materials) {
  const group = new THREE.Group();
  group.name = "dynamic_production_flow";
  group.userData.id = "dynamic_production_flow";

  const hosePath = createCurvedSoftHosePath();
  const hose = new THREE.Mesh(
    new THREE.TubeGeometry(hosePath, 96, 0.68, 48, false),
    materials.transparentSoftHose
  );
  hose.name = "middle_funnel_transparent_soft_hose";
  group.add(hose);

  const clampMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8dde0,
    metalness: 0.9,
    roughness: 0.16
  });
  const upperConnectorClamp = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.038, 12, 72), clampMaterial);
  upperConnectorClamp.name = "middle_funnel_lower_connector_clamp_ring";
  upperConnectorClamp.rotation.x = Math.PI / 2;
  upperConnectorClamp.position.set(
    SCENE_SCALE.funnelDeviceXs.middle,
    SCENE_SCALE.funnelPairY + 0.205,
    SCENE_SCALE.centerEquipmentZ
  );
  group.add(upperConnectorClamp);

  [0.14, Math.PI - 0.12, Math.PI * 0.42, Math.PI * 0.58, Math.PI * 1.32, Math.PI * 1.72].forEach((angle, index) => {
    const isFrontBlock = index === 2 || index === 3;
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(isFrontBlock ? 0.22 : 0.18, 0.14, isFrontBlock ? 0.14 : 0.1),
      clampMaterial
    );
    block.name = `middle_funnel_lower_connector_clamp_block_${String(index + 1).padStart(2, "0")}`;
    block.position.set(
      SCENE_SCALE.funnelDeviceXs.middle + Math.cos(angle) * 0.92,
      SCENE_SCALE.funnelPairY + 0.205,
      SCENE_SCALE.centerEquipmentZ + Math.sin(angle) * 0.92
    );
    block.rotation.y = -angle;
    group.add(block);
  });

  [
    {
      name: "soft_hose_bucket_connection_clamp_ring",
      point: new THREE.Vector3(
        SCENE_SCALE.centerEquipmentX,
        SCENE_SCALE.centerVesselY + 0.64,
        SCENE_SCALE.centerEquipmentZ
      ),
      material: materials.polishedSteel,
      lockAngle: 0.7
    }
  ].forEach(({ name, point, material, lockAngle }) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.71, 0.04, 12, 72), material);
    ring.name = name;
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(point);

    const lock = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.12), material);
    lock.name = `${name}_lock_block`;
    lock.position.set(
      point.x + Math.cos(lockAngle) * 0.72,
      point.y,
      point.z + Math.sin(lockAngle) * 0.72
    );
    lock.rotation.y = -lockAngle;
    group.add(ring, lock);
  });

  const flowParticles = [];
  for (let i = 0; i < 28; i += 1) {
    const size = 0.045 + Math.random() * 0.055;
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

  setId(group, "dynamic_production_flow");

  const offsets = flowParticles.map(() => Math.random());
  group.userData.animation = {
    hosePath,
    flowParticles,
    liquidSurface,
    flowOffsets: offsets
  };

  return group;
}

export function createFloatingTweezerGasket(materials) {
  const group = new THREE.Group();
  group.name = "floating_tweezer_gasket";
  group.userData.id = "floating_tweezer_gasket";

  const baseY = SCENE_SCALE.tableHeight + 1.34;
  const gasketX = 1.86;
  const gasketZ = 0.52;
  const tweezerX = 3.38;
  const tweezerZ = 0.92;

  const flatGasketMaterial = materials.whitePlastic.clone();
  flatGasketMaterial.name = "floating_flat_white_gasket_material";
  flatGasketMaterial.side = THREE.DoubleSide;

  const gasket = new THREE.Mesh(
    createFlatWasherGeometry(0.35, 0.47, 0.012),
    flatGasketMaterial
  );
  gasket.name = "floating_white_flat_washer_gasket";
  gasket.rotation.set(Math.PI / 2, 0.12, -0.2);
  gasket.position.set(gasketX, baseY, gasketZ);
  group.add(gasket);

  [
    ["floating_tweezer_upper_arm", 0.055],
    ["floating_tweezer_lower_arm", -0.055]
  ].forEach(([name, offset]) => {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 0.03, 0.038),
      materials.polishedSteel
    );
    arm.name = name;
    arm.position.set(tweezerX, baseY + offset, tweezerZ);
    arm.rotation.set(0.04, 0.42, 0.08 - offset * 1.0);
    group.add(arm);
  });

  const gasketPackage = createSoftSterilePackage(
    { w: 1.18, h: 0.2, d: 1.16, r: 0.14, crease: false },
    materials
  );
  gasketPackage.name = "floating_gasket_sterile_bag";
  gasketPackage.position.set(gasketX, baseY - 0.045, gasketZ);
  gasketPackage.rotation.set(0, -0.2, 0);
  group.add(gasketPackage);

  const tweezerPackage = createSoftSterilePackage(
    { w: 1.34, h: 0.26, d: 0.5, r: 0.1, crease: false },
    materials
  );
  tweezerPackage.name = "floating_tweezer_sterile_bag";
  tweezerPackage.position.set(tweezerX, baseY - 0.12, tweezerZ);
  tweezerPackage.rotation.set(0, 0.42, 0);
  group.add(tweezerPackage);

  setId(group, "floating_tweezer_gasket");
  setTransparentPackageId(gasketPackage, "floating_gasket_sterile_bag");
  setTransparentPackageId(tweezerPackage, "floating_tweezer_sterile_bag");
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
