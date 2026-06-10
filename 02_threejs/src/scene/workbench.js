import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

export function createWorkbench(materials) {
  const group = new THREE.Group();
  group.name = "workbench";
  group.userData.id = "workbench";

  const s = SCENE_SCALE;
  const table = new THREE.Mesh(
    new THREE.BoxGeometry(s.tableWidth, s.tableThickness, s.tableDepth),
    materials.workbench
  );
  table.name = "workbench_slab";
  table.position.set(s.centerX, s.tableHeight - s.tableThickness / 2, 0);
  table.castShadow = true;
  table.receiveShadow = true;
  table.userData.id = "workbench";
  group.add(table);

  const lipBack = new THREE.Mesh(
    new THREE.BoxGeometry(s.tableWidth, 0.16, 0.16),
    materials.brushedDark
  );
  lipBack.name = "workbench_rear_lip";
  lipBack.position.set(s.centerX, s.tableHeight + 0.04, s.rearWallZ + 0.18);
  lipBack.userData.id = "workbench";
  group.add(lipBack);

  return group;
}

export function createWorkbenchPerforation(materials) {
  const group = new THREE.Group();
  group.name = "workbench_perforation";
  group.userData.id = "workbench_perforation";

  const s = SCENE_SCALE;
  const holeGeom = new THREE.CircleGeometry(0.064, 14);
  const holes = new THREE.InstancedMesh(holeGeom, materials.hole, 132);
  holes.name = "workbench_mid_rear_perforation_marks";
  holes.userData.id = "workbench_perforation";
  let index = 0;
  const matrix = new THREE.Matrix4();
  for (let x = -2.2; x <= 4.05; x += 0.48) {
    for (let z = -1.72; z <= 1.28; z += 0.42) {
      if (index >= holes.count) break;
      matrix.makeRotationX(-Math.PI / 2);
      matrix.setPosition(x, s.tableHeight + 0.012, z);
      holes.setMatrixAt(index, matrix);
      index += 1;
    }
  }
  holes.count = index;
  holes.instanceMatrix.needsUpdate = true;
  group.add(holes);

  return group;
}
