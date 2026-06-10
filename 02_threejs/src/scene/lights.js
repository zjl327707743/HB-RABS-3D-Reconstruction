import * as THREE from "three";

export function createLights() {
  const group = new THREE.Group();
  group.name = "lights_camera";
  group.userData.id = "lights_camera";

  const ambient = new THREE.AmbientLight(0xffffff, 0.62);
  ambient.name = "ambient_light";
  ambient.userData.id = "lights_camera";
  group.add(ambient);

  const topSoft = new THREE.RectAreaLight(0xffffff, 4.4, 8, 3);
  topSoft.name = "top_softbox_light";
  topSoft.position.set(0, 6.6, 0.65);
  topSoft.lookAt(0, 0, 0);
  topSoft.userData.id = "lights_camera";
  group.add(topSoft);

  const frontFill = new THREE.DirectionalLight(0xf8fbff, 1.45);
  frontFill.name = "front_fill_light";
  frontFill.position.set(0, 3.4, 6);
  frontFill.userData.id = "lights_camera";
  group.add(frontFill);

  const rearGlimmer = new THREE.DirectionalLight(0xdde8f2, 0.95);
  rearGlimmer.name = "rear_wall_grazing_light";
  rearGlimmer.position.set(-4, 3.2, -4);
  rearGlimmer.userData.id = "lights_camera";
  group.add(rearGlimmer);

  return group;
}
