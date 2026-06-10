import * as THREE from "three";
import { SCENE_SCALE } from "./scale.js";

function createPort(id, x, y, radius, sleeveDepth, materials) {
  const group = new THREE.Group();
  group.name = id;
  group.userData.id = "glove_ports";
  group.userData.portId = id;
  const z = SCENE_SCALE.frontGlassZ + SCENE_SCALE.glovePortZOffset;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, radius * 0.12, 20, 64),
    materials.portRing
  );
  ring.name = `${id}_outer_ring`;
  ring.position.set(x, y, z);
  ring.userData.id = "glove_ports";
  ring.castShadow = true;
  group.add(ring);

  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.76, radius * 0.88, sleeveDepth, 40, 1, true),
    materials.portRing
  );
  sleeve.name = `${id}_soft_sleeve_collar`;
  sleeve.rotation.x = Math.PI / 2;
  sleeve.position.set(x, y, z + sleeveDepth * 0.42);
  sleeve.userData.id = "glove_ports";
  sleeve.userData.portId = id;
  sleeve.castShadow = true;
  group.add(sleeve);

  const darkOpening = new THREE.Mesh(
    new THREE.CircleGeometry(radius * 0.68, 48),
    materials.portShadow
  );
  darkOpening.name = `${id}_glass_opening_shadow`;
  darkOpening.position.set(x, y, SCENE_SCALE.frontGlassZ + 0.035);
  darkOpening.userData.id = "glove_ports";
  darkOpening.userData.portId = id;
  group.add(darkOpening);

  return group;
}

export function createGlovePorts(materials) {
  const group = new THREE.Group();
  group.name = "glove_ports";
  group.userData.id = "glove_ports";
  const s = SCENE_SCALE;

  const ports = s.glovePortXs.map((x, index) => ({
    id: `glove_port_${String(index + 1).padStart(2, "0")}`,
    x,
    y: s.glovePortY,
    radius: s.glovePortRadius,
    depth: s.glovePortSleeveDepth
  }));

  ports.forEach(({ id, x, y, radius, depth }) => {
    group.add(createPort(id, x, y, radius, depth, materials));
  });
  group.userData.portLayout = ports.map(({ id, x, y, radius }) => ({ id, x, y, radius }));

  return group;
}
