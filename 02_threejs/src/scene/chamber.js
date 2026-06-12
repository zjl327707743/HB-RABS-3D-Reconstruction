import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

function boxMesh(name, size, position, material, id) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.id = id;
  return mesh;
}

export function createChamberShell(materials) {
  const group = new THREE.Group();
  group.name = "chamber_shell";
  group.userData.id = "chamber_shell";

  const s = SCENE_SCALE;
  const t = s.frameThickness;
  const width = s.chamberWidth;
  const height = s.chamberHeight;
  const depth = s.chamberDepth;
  const zCenter = (s.frontGlassZ + s.rearWallZ) / 2;
  const sideHeight = height;

  const frameParts = [
    ["top_front_frame", [width, t, t], [s.centerX, s.topY, s.frontGlassZ], materials.steel],
    ["top_rear_frame", [width, t, t], [s.centerX, s.topY, s.rearWallZ], materials.steel],
    ["bottom_front_frame", [width, t, t], [s.centerX, s.bottomY, s.frontGlassZ], materials.steel],
    ["bottom_rear_frame", [width, t, t], [s.centerX, s.bottomY, s.rearWallZ], materials.steel],
    ["left_top_depth_frame", [t, t, depth], [-s.sideWallX, s.topY, zCenter], materials.steel],
    ["right_top_depth_frame", [t, t, depth], [s.sideWallX, s.topY, zCenter], materials.steel],
    ["left_bottom_depth_frame", [t, t, depth], [-s.sideWallX, s.bottomY, zCenter], materials.steel],
    ["right_bottom_depth_frame", [t, t, depth], [s.sideWallX, s.bottomY, zCenter], materials.steel],
    ["left_front_post", [t, sideHeight, t], [-s.sideWallX, height / 2 - 0.2, s.frontGlassZ], materials.steel],
    ["right_front_post", [t, sideHeight, t], [s.sideWallX, height / 2 - 0.2, s.frontGlassZ], materials.steel],
    ["left_rear_post", [t, sideHeight, t], [-s.sideWallX, height / 2 - 0.2, s.rearWallZ], materials.steel],
    ["right_rear_post", [t, sideHeight, t], [s.sideWallX, height / 2 - 0.2, s.rearWallZ], materials.steel],
    ["left_side_lower_rail", [t, t, depth], [-s.sideWallX, 1.12, zCenter], materials.brushedDark],
    ["right_side_lower_rail", [t, t, depth], [s.sideWallX, 1.12, zCenter], materials.brushedDark]
  ];

  frameParts.forEach(([name, size, position, material]) => {
    group.add(boxMesh(name, size, position, material, "chamber_shell"));
  });

  const leftSide = boxMesh(
    "left_side_panel",
    [0.05, height - 0.55, depth - 0.2],
    [-s.sideWallX - 0.03, height / 2 - 0.12, zCenter],
    materials.glass,
    "chamber_shell"
  );
  const rightSide = boxMesh(
    "right_side_panel",
    [0.05, height - 0.55, depth - 0.2],
    [s.sideWallX + 0.03, height / 2 - 0.12, zCenter],
    materials.glass,
    "chamber_shell"
  );
  group.add(leftSide, rightSide);

  return group;
}

export function createGlassPanels(materials) {
  const group = new THREE.Group();
  group.name = "glass_panels";
  group.userData.id = "glass_panels";

  const s = SCENE_SCALE;
  const panelWidth = s.chamberWidth - 0.42;
  const panelHeight = s.chamberHeight - 0.64;
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(panelWidth, panelHeight, 0.035),
    materials.frontGlass
  );
  glass.name = "front_glass_panel";
  glass.position.set(s.centerX, panelHeight / 2 + 0.08, s.frontGlassZ + 0.012);
  glass.userData.id = "glass_panels";
  glass.receiveShadow = true;
  group.add(glass);

  const seamGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.28, s.frontGlassZ + 0.045),
    new THREE.Vector3(0, s.topY - 0.22, s.frontGlassZ + 0.045)
  ]);
  const seam = new THREE.Line(seamGeom, materials.guideLine);
  seam.name = "front_glass_center_seam";
  seam.userData.id = "glass_panels";
  group.add(seam);

  return group;
}

export function createRearWall(materials) {
  const group = new THREE.Group();
  group.name = "rear_wall";
  group.userData.id = "rear_wall";
  const s = SCENE_SCALE;

  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(s.chamberWidth - 0.32, s.chamberHeight - 0.48, 0.08),
    materials.rearWall
  );
  wall.name = "rear_wall_panel";
  wall.position.set(s.centerX, (s.chamberHeight - 0.48) / 2 + 0.02, s.rearWallZ - 0.04);
  wall.receiveShadow = true;
  wall.userData.id = "rear_wall";
  group.add(wall);

  const seamYs = [1.35, 3.05, 4.75];
  seamYs.forEach((y, index) => {
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-s.sideWallX + 0.28, y, s.rearWallZ + 0.015),
      new THREE.Vector3(s.sideWallX - 0.28, y, s.rearWallZ + 0.015)
    ]);
    const line = new THREE.Line(geom, materials.guideLine);
    line.name = `rear_wall_panel_seam_${index + 1}`;
    line.userData.id = "rear_wall";
    group.add(line);
  });

  return group;
}
