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

export const TABLE_ITEMS_CAMERA_PRESETS = {
  camera_table_items_front: {
    label: "camera_table_items_front",
    position: new THREE.Vector3(1.15, 5.15, 6.45),
    target: new THREE.Vector3(1.18, 0.18, -0.72)
  },
  camera_table_items_oblique: {
    label: "camera_table_items_oblique",
    position: new THREE.Vector3(5.1, 3.0, 5.65),
    target: new THREE.Vector3(1.15, 0.42, -0.58)
  },
  camera_table_items_top: {
    label: "camera_table_items_top",
    position: new THREE.Vector3(1.1, 8.2, 1.15),
    target: new THREE.Vector3(1.1, 0.16, -0.62)
  },
  camera_table_items_left_detail: {
    label: "camera_table_items_left_detail",
    position: new THREE.Vector3(-3.2, 1.85, 4.6),
    target: new THREE.Vector3(-0.7, 0.36, -0.18)
  }
};

export const NEW_MODEL_CAMERA_PRESETS = {
  camera_front_overall: {
    label: "camera_front_overall",
    position: new THREE.Vector3(0, 2.6, 9.7),
    target: new THREE.Vector3(0, 1.35, -0.15)
  },
  camera_left_front: {
    label: "camera_left_front",
    position: new THREE.Vector3(-5.8, 2.85, 6.5),
    target: new THREE.Vector3(-0.15, 1.22, -0.25)
  },
  camera_right_front: {
    label: "camera_right_front",
    position: new THREE.Vector3(5.7, 2.85, 6.2),
    target: new THREE.Vector3(0.18, 1.24, -0.25)
  },
  camera_center_hard_pipe_side_reference: {
    label: "camera_center_hard_pipe_side_reference",
    position: new THREE.Vector3(5.35, 2.35, -1.0),
    target: new THREE.Vector3(0, 1.5, -1.08)
  },
  camera_center_hard_pipe_front_closeup: {
    label: "camera_center_hard_pipe_front_closeup",
    position: new THREE.Vector3(0.7, 2.05, 3.05),
    target: new THREE.Vector3(0, 1.34, -0.66)
  },
  camera_left_suction_cup_closeup: {
    label: "camera_left_suction_cup_closeup",
    position: new THREE.Vector3(-4.7, 2.25, 3.0),
    target: new THREE.Vector3(-2.16, 1.7, -0.68)
  },
  camera_drum_and_full_track: {
    label: "camera_drum_and_full_track",
    position: new THREE.Vector3(0, 3.05, 7.35),
    target: new THREE.Vector3(0, 0.35, 0.12)
  },
  camera_right_hose_wall_to_drum: {
    label: "camera_right_hose_wall_to_drum",
    position: new THREE.Vector3(3.65, 2.25, 3.4),
    target: new THREE.Vector3(0.92, 1.36, -0.5)
  },
  camera_worktable_top_oblique: {
    label: "camera_worktable_top_oblique",
    position: new THREE.Vector3(1.0, 7.25, 4.75),
    target: new THREE.Vector3(0, 0.3, 0)
  },
  camera_centerline_alignment: {
    label: "camera_centerline_alignment",
    position: new THREE.Vector3(0, 6.2, 0.08),
    target: new THREE.Vector3(0, 0.4, 0.04)
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
