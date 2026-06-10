import * as THREE from "three";

export const CAMERA_PRESETS = {
  camera_overall_front: {
    label: "camera_overall_front",
    position: new THREE.Vector3(0, 3.15, 9.8),
    target: new THREE.Vector3(0, 2.25, 0)
  },
  camera_front_straight: {
    label: "camera_front_straight",
    position: new THREE.Vector3(0, 2.55, 10.5),
    target: new THREE.Vector3(0, 2.45, 0)
  },
  camera_table_view: {
    label: "camera_table_view",
    position: new THREE.Vector3(0, 1.15, 7.4),
    target: new THREE.Vector3(0, 0.45, -0.45)
  },
  camera_side_depth: {
    label: "camera_side_depth",
    position: new THREE.Vector3(10.8, 2.8, 4.35),
    target: new THREE.Vector3(0.4, 2.05, 0.15)
  },
  camera_top_overview: {
    label: "camera_top_overview",
    position: new THREE.Vector3(0.05, 10.8, 0.05),
    target: new THREE.Vector3(0, 0.9, 0)
  }
};

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 120);
  const preset = CAMERA_PRESETS.camera_overall_front;
  camera.position.copy(preset.position);
  camera.lookAt(preset.target);
  camera.userData.id = "lights_camera";
  return camera;
}
