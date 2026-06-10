import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

export function createRearPortsBlockout(materials) {
  const group = new THREE.Group();
  group.name = "rear_ports_blockout";
  group.userData.id = "rear_ports_blockout";

  const positions = [
    [-3.25, 2.55, SCENE_SCALE.rearWallZ + 0.08],
    [-1.55, 2.95, SCENE_SCALE.rearWallZ + 0.08],
    [1.45, 2.85, SCENE_SCALE.rearWallZ + 0.08],
    [3.25, 2.4, SCENE_SCALE.rearWallZ + 0.08],
    [0.15, 3.55, SCENE_SCALE.rearWallZ + 0.08],
    [2.35, 3.65, SCENE_SCALE.rearWallZ + 0.08]
  ];

  positions.forEach((position, index) => {
    const port = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.12, 32),
      materials.rearPort
    );
    port.name = `rear_port_blockout_${String(index + 1).padStart(2, "0")}`;
    port.rotation.x = Math.PI / 2;
    port.position.set(...position);
    port.userData.id = "rear_ports_blockout";
    port.castShadow = true;
    group.add(port);
  });

  return group;
}

export function createRearWhiteDisc(materials) {
  const group = new THREE.Group();
  group.name = "rear_white_disc";
  group.userData.id = "rear_white_disc";

  [
    [-2.45, 3.55, 0.24],
    [0.72, 3.18, 0.18],
    [2.7, 3.02, 0.22]
  ].forEach(([x, y, radius], index) => {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.045, 40), materials.whitePlastic);
    disc.name = `rear_white_disc_${String(index + 1).padStart(2, "0")}`;
    disc.rotation.x = Math.PI / 2;
    disc.position.set(x, y, SCENE_SCALE.rearWallZ + 0.09);
    disc.userData.id = "rear_white_disc";
    disc.castShadow = true;
    group.add(disc);
  });

  return group;
}

export function createRearRightCorrugatedHoseBlockout(materials) {
  const group = new THREE.Group();
  group.name = "rear_right_corrugated_hose_blockout";
  group.userData.id = "rear_right_corrugated_hose_blockout";

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.28, 3.65, SCENE_SCALE.rearWallZ + 0.16),
    new THREE.Vector3(3.65, 3.25, SCENE_SCALE.rearWallZ + 0.34),
    new THREE.Vector3(3.78, 2.7, SCENE_SCALE.rearWallZ + 0.52)
  ]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, 0.16, 16, false), materials.tubeBlockout);
  hose.name = "rear_right_grey_white_corrugated_hose";
  hose.userData.id = "rear_right_corrugated_hose_blockout";
  group.add(hose);

  [
    [3.38, 3.48, SCENE_SCALE.rearWallZ + 0.23],
    [3.58, 3.15, SCENE_SCALE.rearWallZ + 0.36],
    [3.72, 2.82, SCENE_SCALE.rearWallZ + 0.48]
  ].forEach((position, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.018, 8, 24), materials.equipmentDarkSteel);
    ring.name = `rear_right_hose_corrugation_${String(index + 1).padStart(2, "0")}`;
    ring.position.set(...position);
    ring.rotation.x = Math.PI / 2;
    ring.userData.id = "rear_right_corrugated_hose_blockout";
    group.add(ring);
  });

  return group;
}
