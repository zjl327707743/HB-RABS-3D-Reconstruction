import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

export function createAirflowMistPlanes(materials) {
  const group = new THREE.Group();
  group.name = "airflow_mist_planes";
  group.userData.id = "airflow_mist_planes";

  const placements = [
    [-2.1, 3.3, SCENE_SCALE.rearWallZ + 0.22, 1.35, 0.58, 0.18],
    [-0.55, 3.58, SCENE_SCALE.centerEquipmentZ + 0.12, 0.9, 0.45, -0.22],
    [0.78, 3.32, SCENE_SCALE.centerEquipmentZ + 0.2, 0.95, 0.42, 0.28],
    [2.95, 2.58, SCENE_SCALE.rearWallZ + 0.24, 1.15, 0.5, -0.16],
    [-3.4, 2.1, -0.75, 0.95, 0.38, 0.4]
  ];

  placements.forEach(([x, y, z, width, height, rot], index) => {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), materials.mist.clone());
    plane.name = `airflow_mist_plane_${String(index + 1).padStart(2, "0")}`;
    plane.position.set(x, y, z);
    plane.rotation.set(-0.18, rot, 0.08);
    plane.userData.id = "airflow_mist_planes";
    group.add(plane);
  });

  return group;
}
