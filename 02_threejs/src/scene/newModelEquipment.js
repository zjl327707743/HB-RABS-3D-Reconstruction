import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

const REAR_Z = SCENE_SCALE.rearWallZ + 0.05;
const DRUM_RADIUS = 0.54;
const DRUM_INNER_RADIUS = 0.42;
const DRUM_HEIGHT = 0.95;
const DRUM_X = 0;
const DRUM_Z = 0.18;
const DRUM_BASE_Y = SCENE_SCALE.tableHeight + 0.2;
const DRUM_TOP_Y = DRUM_BASE_Y + DRUM_HEIGHT;
const DRUM_HOSE_PORT_X = DRUM_X + DRUM_RADIUS * 0.68;
const DRUM_HOSE_PORT_Y = DRUM_TOP_Y + 0.06;
const DRUM_HOSE_PORT_Z = DRUM_Z + 0.02;

function mark(object, id) {
  object.userData.id = id;
  object.traverse?.((child) => {
    child.userData.id = id;
    child.castShadow = true;
    child.receiveShadow = true;
  });
  return object;
}

function box(name, size, position, material, id) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mark(mesh, id);
}

function cylinder(name, radiusTop, radiusBottom, length, material, id, segments = 64) {
  return mark(
    new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, length, segments), material),
    id
  );
}

function cylinderY(name, radiusTop, radiusBottom, length, position, material, id, segments = 64) {
  const mesh = cylinder(name, radiusTop, radiusBottom, length, material, id, segments);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

function cylinderX(name, radius, length, position, material, id, segments = 64) {
  const mesh = cylinder(name, radius, radius, length, material, id, segments);
  mesh.name = name;
  mesh.rotation.z = Math.PI / 2;
  mesh.position.set(...position);
  return mesh;
}

function cylinderZ(name, radius, length, position, material, id, segments = 64) {
  const mesh = cylinder(name, radius, radius, length, material, id, segments);
  mesh.name = name;
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(...position);
  return mesh;
}

function tube(name, points, radius, material, id, tubularSegments = 72, radialSegments = 24) {
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.35);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false),
    material
  );
  mesh.name = name;
  mesh.userData.points = points.map((point) => point.toArray());
  return mark(mesh, id);
}

function cubicTube(name, start, controlA, controlB, end, radius, material, id, tubularSegments = 72, radialSegments = 24) {
  const curve = new THREE.CubicBezierCurve3(start, controlA, controlB, end);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false),
    material
  );
  mesh.name = name;
  mesh.userData.points = [start, controlA, controlB, end].map((point) => point.toArray());
  return mark(mesh, id);
}

function torus(name, radius, tubeRadius, position, material, id, rotation = [Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tubeRadius, 14, 72), material);
  mesh.name = name;
  mesh.rotation.set(...rotation);
  mesh.position.set(...position);
  return mark(mesh, id);
}

function createFlange(name, x, y, z, radius, thickness, material, id) {
  const group = new THREE.Group();
  group.name = name;
  group.userData.id = id;

  const disk = cylinderY(`${name}_solid_disk`, radius, radius, thickness, [x, y, z], material, id, 72);
  const rim = torus(`${name}_rounded_outer_rim`, radius, 0.035, [x, y + thickness / 2 + 0.01, z], material, id);
  group.add(disk, rim);
  return group;
}

function createRearWallPort({ name, x, y, radius, material, id }) {
  const group = new THREE.Group();
  group.name = name;
  group.userData.id = id;

  group.add(
    torus(`${name}_rear_wall_flange_ring`, radius + 0.09, 0.035, [x, y, REAR_Z + 0.004], material, id),
    cylinderZ(`${name}_short_wall_sleeve`, radius, 0.24, [x, y, REAR_Z + 0.1], material, id)
  );

  return group;
}

export function createFullLengthTransportTrack(materials) {
  const group = new THREE.Group();
  group.name = "new_model_work_area";
  group.userData.id = "new_model_work_area";

  const y = SCENE_SCALE.tableHeight + 0.03;
  const rollerY = y + 0.17;
  const rollerLength = 3.24;
  const xStart = -4.32;
  const rollerCount = 33;
  const spacing = 0.27;

  group.add(
    box("new_model_front_metal_plate", [9.15, 0.14, 0.58], [0, y, 1.52], materials.workbench, "new_model_work_area"),
    box("new_model_rear_metal_plate", [9.15, 0.14, 0.64], [0, y, -1.56], materials.workbench, "new_model_work_area"),
    box("new_model_track_front_guide_beam", [8.95, 0.13, 0.08], [0, rollerY + 0.02, 1.12], materials.brushedDark, "new_model_track"),
    box("new_model_track_rear_guide_beam", [8.95, 0.13, 0.08], [0, rollerY + 0.02, -1.12], materials.brushedDark, "new_model_track")
  );

  for (let index = 0; index < rollerCount; index += 1) {
    const x = xStart + index * spacing;
    group.add(cylinderZ(
      `new_model_track_full_length_roller_${String(index + 1).padStart(2, "0")}`,
      0.043,
      rollerLength,
      [x, rollerY, 0],
      materials.equipmentDarkSteel,
      "new_model_track",
      36
    ));
  }

  return group;
}

export function createHollowMetalDrum(materials) {
  const group = new THREE.Group();
  group.name = "new_model_drum";
  group.userData.id = "new_model_drum";

  const outerRadius = DRUM_RADIUS;
  const innerRadius = DRUM_INNER_RADIUS;
  const height = DRUM_HEIGHT;
  const x = DRUM_X;
  const z = DRUM_Z;
  const baseY = DRUM_BASE_Y;
  const centerY = baseY + height / 2;

  const outerMaterial = materials.polishedSteel.clone();
  outerMaterial.side = THREE.FrontSide;
  outerMaterial.roughness = 0.26;
  const innerMaterial = materials.equipmentSteel.clone();
  innerMaterial.side = THREE.BackSide;
  innerMaterial.roughness = 0.34;

  group.add(
    cylinderY("new_model_drum_outer_opaque_wall", outerRadius, outerRadius, height, [x, centerY, z], outerMaterial, "new_model_drum"),
    cylinderY("new_model_drum_inner_visible_wall", innerRadius, innerRadius, height - 0.08, [x, centerY + 0.03, z], innerMaterial, "new_model_drum"),
    cylinderY("new_model_drum_solid_bottom_disk", outerRadius * 0.96, outerRadius * 0.96, 0.06, [x, baseY + 0.03, z], materials.equipmentDarkSteel, "new_model_drum"),
    torus("new_model_drum_thick_top_open_rim", outerRadius, 0.045, [x, baseY + height + 0.015, z], materials.equipmentDarkSteel, "new_model_drum"),
    torus("new_model_drum_inner_lip", innerRadius, 0.025, [x, baseY + height + 0.018, z], materials.polishedSteel, "new_model_drum")
  );

  const opening = new THREE.Mesh(new THREE.CircleGeometry(innerRadius * 0.72, 56), materials.portShadow);
  opening.name = "new_model_drum_dark_opening_depth";
  opening.rotation.x = -Math.PI / 2;
  opening.position.set(x, baseY + height - 0.035, z);
  group.add(mark(opening, "new_model_drum"));

  group.add(
    cylinderY(
      "new_model_drum_single_top_hose_socket",
      0.12,
      0.12,
      0.12,
      [DRUM_HOSE_PORT_X, DRUM_HOSE_PORT_Y, DRUM_HOSE_PORT_Z],
      materials.equipmentSteel,
      "new_model_drum",
      40
    ),
    torus(
      "new_model_drum_single_top_hose_socket_rim",
      0.125,
      0.018,
      [DRUM_HOSE_PORT_X, DRUM_HOSE_PORT_Y + 0.065, DRUM_HOSE_PORT_Z],
      materials.equipmentDarkSteel,
      "new_model_drum"
    )
  );

  return group;
}

export function createCenterHardPipeAssembly(materials) {
  const group = new THREE.Group();
  group.name = "centerHardPipeGroup";
  group.userData.id = "new_model_center_elbow";

  const id = "new_model_center_elbow";
  const x = 0;
  const pipeY = 2.72;
  const pipeRadius = 0.2;
  const turnZ = DRUM_Z;
  const rearTubeStartZ = REAR_Z + 0.12;
  const rearTubeLength = turnZ - rearTubeStartZ + 0.08;
  const rearTubeCenterZ = rearTubeStartZ + rearTubeLength / 2;

  group.add(
    createRearWallPort({
      name: "new_model_center_hard_pipe_rear_wall_port",
      x,
      y: pipeY,
      radius: pipeRadius,
      material: materials.equipmentSteel,
      id
    }),
    cylinderZ(
      "new_model_center_hard_pipe_straight_rear_to_front_tube",
      pipeRadius,
      rearTubeLength,
      [x, pipeY, rearTubeCenterZ],
      materials.polishedSteel,
      id
    )
  );

  const housingTop = cylinderY(
    "new_model_center_hard_pipe_faceted_turning_shell_top",
    0.3,
    0.38,
    0.32,
    [x, 2.52, turnZ],
    materials.polishedSteel,
    id,
    12
  );
  housingTop.scale.z = 0.82;
  const housingLower = cylinderY(
    "new_model_center_hard_pipe_short_taper_lower_shell",
    0.36,
    0.27,
    0.28,
    [x, 2.22, turnZ],
    materials.equipmentSteel,
    id,
    16
  );
  housingLower.scale.z = 0.88;
  group.add(housingTop, housingLower);

  group.add(
    cylinderY(
      "new_model_center_hard_pipe_front_lower_vertical_cylinder",
      0.22,
      0.22,
      0.68,
      [x, 1.88, turnZ],
      materials.equipmentSteel,
      id
    ),
    createFlange(
      "new_model_center_hard_pipe_large_horizontal_flange",
      x,
      1.56,
      turnZ,
      0.46,
      0.12,
      materials.equipmentDarkSteel,
      id
    )
  );

  return group;
}

export function createLeftSuctionCupAssembly(materials) {
  const group = new THREE.Group();
  group.name = "leftSuctionCupGroup";
  group.userData.id = "new_model_left_suction_cup";

  const id = "new_model_left_suction_cup";
  const beamY = 3.05;
  const beamZ = -0.78;
  const cupX = -2.45;
  const cupCenterY = 1.66;

  group.add(
    cylinderX("new_model_suction_cup_high_short_support_beam", 0.07, 1.28, [cupX, beamY, beamZ], materials.equipmentDarkSteel, id, 32),
    cylinderY("new_model_suction_cup_vertical_hanger", 0.045, 0.045, 1.24, [cupX, 2.41, beamZ], materials.equipmentDarkSteel, id, 24),
    cylinderY("new_model_suction_cup_upper_short_connector", 0.065, 0.055, 0.18, [cupX, 1.72, beamZ], materials.equipmentDarkSteel, id, 32),
    torus("new_model_suction_cup_beam_hanger_clamp", 0.085, 0.014, [cupX, beamY, beamZ], materials.equipmentSteel, id)
  );

  const cupProfile = [
    new THREE.Vector2(0.09, 0.1),
    new THREE.Vector2(0.16, 0.06),
    new THREE.Vector2(0.27, -0.02),
    new THREE.Vector2(0.35, -0.09),
    new THREE.Vector2(0.32, -0.14),
    new THREE.Vector2(0.2, -0.16)
  ];
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 64), materials.blackRubber);
  cup.name = "new_model_suction_cup_bell_shaped_vacuum_head";
  cup.position.set(cupX, cupCenterY, beamZ);
  mark(cup, id);
  const lip = torus(
    "new_model_suction_cup_soft_outer_lip",
    0.34,
    0.045,
    [cupX, cupCenterY - 0.14, beamZ],
    materials.blackRubber,
    id
  );
  const underside = new THREE.Mesh(new THREE.CircleGeometry(0.25, 56), materials.portShadow);
  underside.name = "new_model_suction_cup_dark_recess_under_lip";
  underside.rotation.x = -Math.PI / 2;
  underside.position.set(cupX, cupCenterY - 0.155, beamZ);
  group.add(cup, lip, mark(underside, id));

  return group;
}

export function createRightVacuumHoseAssembly(materials) {
  const group = new THREE.Group();
  group.name = "rightVacuumHoseGroup";
  group.userData.id = "new_model_right_white_pipe";

  const id = "new_model_right_white_pipe";
  const wallX = 1.62;
  const wallY = 2.08;

  group.add(createRearWallPort({
    name: "new_model_right_vacuum_hose_rear_wall_port",
    x: wallX,
    y: wallY,
    radius: 0.13,
    material: materials.whitePlastic,
    id
  }));

  group.add(tube(
    "new_model_right_vacuum_hose_white_wall_to_drum_path",
    [
      new THREE.Vector3(wallX, wallY, REAR_Z + 0.16),
      new THREE.Vector3(1.62, 2.04, -1.45),
      new THREE.Vector3(1.38, 1.78, -0.92),
      new THREE.Vector3(1.08, 1.48, -0.32),
      new THREE.Vector3(0.78, 1.33, 0.04),
      new THREE.Vector3(DRUM_HOSE_PORT_X + 0.24, DRUM_HOSE_PORT_Y + 0.08, DRUM_HOSE_PORT_Z)
    ],
    0.075,
    materials.whitePlastic,
    id,
    88,
    24
  ));

  group.add(tube(
    "new_model_right_vacuum_hose_clean_terminal_metal_sleeve",
    [
      new THREE.Vector3(0.86, 1.34, -0.04),
      new THREE.Vector3(0.74, 1.31, 0.04),
      new THREE.Vector3(DRUM_HOSE_PORT_X + 0.24, DRUM_HOSE_PORT_Y + 0.08, DRUM_HOSE_PORT_Z)
    ],
    0.082,
    materials.equipmentSteel,
    id,
    28,
    18
  ));

  const endCoupling = tube(
    "new_model_right_vacuum_hose_short_metal_connector_into_single_top_socket",
    [
      new THREE.Vector3(DRUM_HOSE_PORT_X + 0.24, DRUM_HOSE_PORT_Y + 0.08, DRUM_HOSE_PORT_Z),
      new THREE.Vector3(DRUM_HOSE_PORT_X + 0.14, DRUM_HOSE_PORT_Y + 0.055, DRUM_HOSE_PORT_Z),
      new THREE.Vector3(DRUM_HOSE_PORT_X + 0.045, DRUM_HOSE_PORT_Y + 0.02, DRUM_HOSE_PORT_Z)
    ],
    0.085,
    materials.equipmentSteel,
    id,
    24,
    18
  );
  const blueBand = cylinderX(
    "new_model_right_vacuum_hose_blue_gray_terminal_band",
    0.108,
    0.07,
    [DRUM_HOSE_PORT_X + 0.23, DRUM_HOSE_PORT_Y + 0.08, DRUM_HOSE_PORT_Z],
    materials.blueSterileWrap,
    id,
    32
  );
  group.add(endCoupling, blueBand);

  return group;
}

export function createNewModelObjects(materials) {
  return {
    new_model_work_area: createFullLengthTransportTrack(materials),
    new_model_drum: createHollowMetalDrum(materials),
    new_model_center_elbow: createCenterHardPipeAssembly(materials),
    new_model_left_suction_cup: createLeftSuctionCupAssembly(materials),
    new_model_right_white_pipe: createRightVacuumHoseAssembly(materials)
  };
}
