import * as THREE from "three";

export function createMaterials() {
  return {
    steel: new THREE.MeshStandardMaterial({
      color: 0xb8bec4,
      metalness: 0.72,
      roughness: 0.34
    }),
    brushedDark: new THREE.MeshStandardMaterial({
      color: 0x7c858c,
      metalness: 0.82,
      roughness: 0.46
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xe8f6fb,
      transparent: true,
      opacity: 0.22,
      roughness: 0.06,
      metalness: 0,
      transmission: 0.25,
      thickness: 0.06,
      side: THREE.DoubleSide
    }),
    rearWall: new THREE.MeshStandardMaterial({
      color: 0xaeb5ba,
      metalness: 0.66,
      roughness: 0.42
    }),
    workbench: new THREE.MeshStandardMaterial({
      color: 0xc4c9cc,
      metalness: 0.86,
      roughness: 0.31
    }),
    portRing: new THREE.MeshStandardMaterial({
      color: 0xe8edf0,
      metalness: 0.12,
      roughness: 0.5
    }),
    portShadow: new THREE.MeshBasicMaterial({
      color: 0x101820,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    }),
    hole: new THREE.MeshBasicMaterial({
      color: 0x343a40,
      transparent: true,
      opacity: 0.7
    }),
    guideLine: new THREE.LineBasicMaterial({
      color: 0x7f8a94,
      transparent: true,
      opacity: 0.45
    }),
    equipmentSteel: new THREE.MeshStandardMaterial({
      color: 0xc4c9ce,
      metalness: 0.9,
      roughness: 0.22
    }),
    equipmentDarkSteel: new THREE.MeshStandardMaterial({
      color: 0x8d959b,
      metalness: 0.78,
      roughness: 0.36
    }),
    polishedSteel: new THREE.MeshStandardMaterial({
      color: 0xd4d8dc,
      metalness: 0.94,
      roughness: 0.18
    }),
    blackControl: new THREE.MeshStandardMaterial({
      color: 0x0f1115,
      metalness: 0.22,
      roughness: 0.24
    }),
    blackRubber: new THREE.MeshStandardMaterial({
      color: 0x07080a,
      metalness: 0.08,
      roughness: 0.34
    }),
    tubeBlockout: new THREE.MeshStandardMaterial({
      color: 0xf1f4f2,
      metalness: 0.18,
      roughness: 0.48
    }),
    hardPipeDark: new THREE.MeshStandardMaterial({
      color: 0x252b31,
      metalness: 0.62,
      roughness: 0.28
    }),
    rearPort: new THREE.MeshStandardMaterial({
      color: 0xa9b1b7,
      metalness: 0.74,
      roughness: 0.34
    }),
    whitePlastic: new THREE.MeshStandardMaterial({
      color: 0xf3f2ea,
      metalness: 0.04,
      roughness: 0.42
    }),
    dishGlass: new THREE.MeshPhysicalMaterial({
      color: 0xe7f1f4,
      transparent: true,
      opacity: 0.38,
      roughness: 0.04,
      metalness: 0,
      transmission: 0.22,
      thickness: 0.04,
      side: THREE.DoubleSide
    }),
    mist: new THREE.MeshBasicMaterial({
      color: 0xe8edf0,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      side: THREE.DoubleSide
    }),
    blueSterileWrap: new THREE.MeshPhysicalMaterial({
      color: 0xb9e3ed,
      transparent: true,
      opacity: 0.54,
      roughness: 0.28,
      metalness: 0,
      transmission: 0.08,
      side: THREE.DoubleSide
    }),
    dishAmber: new THREE.MeshStandardMaterial({
      color: 0xd2a53a,
      metalness: 0.02,
      roughness: 0.34,
      transparent: true,
      opacity: 0.78
    })
  };
}
