import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

export function createAirflowMistPlanes(materials) {
  const group = new THREE.Group();
  group.name = "airflow_mist_planes";
  group.userData.id = "airflow_mist_planes";
  return group;
}
