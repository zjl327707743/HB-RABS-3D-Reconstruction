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

const LOWER_HARD_PIPE_CONFIGS = {
  left: {
    funnelKey: "left",
    startY: 3.40,
    bendY: 3.05,
    turnX: -1.24,
    endX: -1.52
  },
  right: {
    funnelKey: "right",
    startY: 3.40,
    bendY: 3.05,
    turnX: 3.04,
    endX: 3.32
  }
};

function createLowerHardPipe(side, materials) {
  const config = LOWER_HARD_PIPE_CONFIGS[side];
  const id = `funnel_lower_hard_pipe_${side}`;
  const s = SCENE_SCALE;
  const pipeX = s.funnelDeviceXs[config.funnelKey];
  const sign = pipeX < config.endX ? 1 : -1;
  const turnX = config.turnX;
  const valveInnerX = config.endX;
  const startY = config.startY;
  const bendY = config.bendY;
  const valveCenterY = s.valvePipeY;
  const neckZ = s.centerEquipmentZ;
  const valveCenterZ = s.valvePipeZ;
  const radius = 0.16;

  const anchors = {
    start: new THREE.Vector3(pipeX, startY, neckZ),
    verticalEnd: new THREE.Vector3(pipeX, bendY, neckZ),
    elbowControlA: new THREE.Vector3(pipeX, valveCenterY, neckZ),
    elbowControlB: new THREE.Vector3(turnX - sign * 0.13, valveCenterY, valveCenterZ),
    horizontalStart: new THREE.Vector3(turnX, valveCenterY, valveCenterZ),
    end: new THREE.Vector3(valveInnerX, valveCenterY, valveCenterZ)
  };

  const path = new THREE.CurvePath();
  path.add(new THREE.LineCurve3(anchors.start, anchors.verticalEnd));
  path.add(new THREE.CubicBezierCurve3(
    anchors.verticalEnd,
    anchors.elbowControlA,
    anchors.elbowControlB,
    anchors.horizontalStart
  ));
  path.add(new THREE.LineCurve3(anchors.horizontalStart, anchors.end));

  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(path, 48, radius, 28, false),
    materials.polishedSteel
  );
  mesh.name = id;
  setId(mesh, id);
  mesh.userData.anchors = Object.fromEntries(
    Object.entries(anchors).map(([key, value]) => [key, value.toArray()])
  );
  mesh.userData.vesselAvoidance = {
    vesselRadius: s.centerVesselAvoidRadius,
    clearance: s.centerVesselPipeClearance,
    frontOffsetZ: Math.abs(valveCenterZ - neckZ),
    minAbsXAfterTurn: Math.abs(turnX)
  };
  return mesh;
}

function createLowerFunnelConnectorSleeve(side, materials) {
  const config = LOWER_HARD_PIPE_CONFIGS[side];
  const id = `funnel_lower_hard_pipe_${side}`;
  const s = SCENE_SCALE;
  const x = s.funnelDeviceXs[config.funnelKey];
  const y = config.startY + 0.08;

  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.17, 0.24, 40),
    materials.polishedSteel
  );
  sleeve.name = `${id}_upper_connector_sleeve`;
  sleeve.position.set(x, y, s.centerEquipmentZ);
  setId(sleeve, id);
  return sleeve;
}

export function createLeftHorizontalPipeBlockout(materials) {
  return horizontalPipe("left_horizontal_pipe_blockout", "left_horizontal_stainless_pipe", -1.58, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, 0.48, materials);
}

export function createRightHorizontalPipeBlockout(materials) {
  return horizontalPipe("right_horizontal_pipe_blockout", "right_horizontal_stainless_pipe", 3.38, SCENE_SCALE.valvePipeY, SCENE_SCALE.valvePipeZ, 0.48, materials);
}

export function createMainTubingBlockout(materials) {
  const group = new THREE.Group();
  group.name = "main_tubing_blockout";
  group.userData.id = "main_tubing_blockout";
  group.add(createLowerHardPipe("left", materials));
  group.add(createLowerHardPipe("right", materials));
  group.add(createLowerFunnelConnectorSleeve("left", materials));
  group.add(createLowerFunnelConnectorSleeve("right", materials));

  return group;
}
