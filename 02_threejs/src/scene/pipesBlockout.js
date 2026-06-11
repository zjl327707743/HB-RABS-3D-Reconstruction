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

function horizontalPipe(id, name, x, y, z, length, materials) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, length, 36),
    materials.equipmentSteel
  );
  mesh.name = name;
  mesh.rotation.z = Math.PI / 2;
  mesh.position.set(x, y, z);
  setId(mesh, id);
  const group = new THREE.Group();
  group.name = id;
  group.userData.id = id;
  group.add(mesh);

  [-0.34, 0.34].forEach((offset, index) => {
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 32), materials.equipmentDarkSteel);
    flange.name = `${name}_flange_${index + 1}`;
    flange.rotation.z = Math.PI / 2;
    flange.position.set(x + offset, y, z);
    setId(flange, id);
    group.add(flange);
  });

  return group;
}

function createLowerHardPipe(side, materials) {
  const id = `funnel_lower_hard_pipe_${side}`;
  const s = SCENE_SCALE;
  const sign = side === "left" ? -1 : 1;
  const pipeX = sign * 0.58;
  const vesselRadius = s.centerVesselAvoidRadius;
  const clearance = s.centerVesselPipeClearance;
  const turnX = sign * (vesselRadius + clearance - 0.08);
  const valveInnerX = sign * 1.48;
  const neckBottomY = 3.12;
  const dropY = 2.48;
  const valveCenterY = s.valvePipeY;
  const neckZ = s.centerEquipmentZ;
  const valveCenterZ = s.valvePipeZ;
  const radius = 0.16;

  const anchors = {
    start: new THREE.Vector3(pipeX, neckBottomY, neckZ),
    drop: new THREE.Vector3(pipeX, dropY, neckZ),
    elbowControl: new THREE.Vector3(pipeX, valveCenterY, valveCenterZ),
    horizontalStart: new THREE.Vector3(turnX, valveCenterY, valveCenterZ),
    end: new THREE.Vector3(valveInnerX, valveCenterY, valveCenterZ)
  };

  const path = new THREE.CurvePath();
  path.add(new THREE.LineCurve3(anchors.start, anchors.drop));
  path.add(new THREE.QuadraticBezierCurve3(anchors.drop, anchors.elbowControl, anchors.horizontalStart));
  path.add(new THREE.LineCurve3(anchors.horizontalStart, anchors.end));

  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(path, 36, radius, 24, false),
    materials.polishedSteel
  );
  mesh.name = id;
  setId(mesh, id);
  mesh.userData.anchors = Object.fromEntries(
    Object.entries(anchors).map(([key, value]) => [key, value.toArray()])
  );
  mesh.userData.vesselAvoidance = {
    vesselRadius,
    clearance,
    frontOffsetZ: Math.abs(valveCenterZ - neckZ),
    minAbsXAfterTurn: Math.abs(turnX)
  };
  return mesh;
}

export function createLeftHorizontalPipeBlockout(materials) {
  return horizontalPipe("left_horizontal_pipe_blockout", "left_horizontal_stainless_pipe", -2.12, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, 1.25, materials);
}

export function createRightHorizontalPipeBlockout(materials) {
  return horizontalPipe("right_horizontal_pipe_blockout", "right_horizontal_stainless_pipe", 2.12, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, 1.25, materials);
}

export function createMainTubingBlockout(materials) {
  const group = new THREE.Group();
  group.name = "main_tubing_blockout";
  group.userData.id = "main_tubing_blockout";
  group.add(createLowerHardPipe("left", materials));
  group.add(createLowerHardPipe("right", materials));

  return group;
}
