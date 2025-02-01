import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

// Floor textures
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorARMTexture = textureLoader.load(
  "/floor/aerial_grass_rock_1k/aerial_grass_rock_arm_1k.jpg"
);
const floorColorTexture = textureLoader.load(
  "/floor/aerial_grass_rock_1k/aerial_grass_rock_diff_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "/floor/aerial_grass_rock_1k/aerial_grass_rock_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "/floor/aerial_grass_rock_1k/aerial_grass_rock_disp_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Wall textures
const wallColorTexture = textureLoader.load(
  "/walls/mossy_brick_1k/mossy_brick_diff_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "/walls/mossy_brick_1k/mossy_brick_nor_gl_1k.jpg"
);
const wallARMTexture = textureLoader.load(
  "/walls/mossy_brick_1k/mossy_brick_arm_1k.jpg"
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof textures
const roofColorTexture = textureLoader.load(
  "/roof/ceramic_roof_01_1k/ceramic_roof_01_diff_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "/roof/ceramic_roof_01_1k/ceramic_roof_01_nor_gl_1k.jpg"
);
const roofARMTexture = textureLoader.load(
  "/roof/ceramic_roof_01_1k/ceramic_roof_01_arm_1k.jpg"
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;

roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;

roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;

// Bush textures
const bushColorTexture = textureLoader.load(
  "/bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.jpg"
);
const bushNormalTexture = textureLoader.load(
  "/bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.jpg"
);
const bushARMTexture = textureLoader.load(
  "/bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.jpg"
);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

// Graves textures
const graveColorTexture = textureLoader.load(
  "/grave/concrete_floor_worn_001_1k/concrete_floor_worn_001_diff_1k.jpg"
);

const graveNormalTexture = textureLoader.load(
  "/grave/concrete_floor_worn_001_1k/concrete_floor_worn_001_nor_gl_1k.jpg"
);

const graveARMTexture = textureLoader.load(
  "/grave/concrete_floor_worn_001_1k/concrete_floor_worn_001_arm_1k.jpg"
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);

// Door textures
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */
// Temporary sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ roughness: 0.7 })
);
scene.add(sphere);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    // wireframe: true,
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.1,
    displacementBias: -0.082,
  })
);

floor.rotation.x = -Math.PI * 0.5;
// floor.position.y = -1;

scene.add(floor);

gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("displacement scale");

gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("displacement bias");

// House
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    normalMap: wallNormalTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
  })
);

walls.position.y = 2.5 / 2;

house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    normalMap: roofNormalTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
  })
);

roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;

house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    displacementBias: -0.04,
    displacementScale: 0.15,
  })
);

door.position.y = 1;
door.position.z = 2 + 0.01;

house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  normalMap: bushNormalTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.setScalar(0.5);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.5, 0.1, 2.1);
bush2.scale.setScalar(0.25);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-1.5, 0.1, 2.1);
bush3.scale.setScalar(0.25);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-0.8, 0.2, 2.2);
bush4.scale.setScalar(0.5);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  const angle = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 4;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  grave.position.x = x;
  grave.position.y = 0.4 * Math.random();
  grave.position.z = z;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
doorLight.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

roof.castShadow = true;
floor.receiveShadow = true;

graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// Sky

const sky = new Sky();
sky.scale.set(100, 100, 100);
sky.material.map = floorColorTexture;
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

// Fog

// scene.fog = new THREE.Fog('#04343f', 1, 13)
scene.fog = new THREE.FogExp2("#02343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update ghosts
  const ghost1Angle = elapsedTime * 0.6;
  ghost1.position.x = Math.cos(ghost1Angle) * 5;
  ghost1.position.z = Math.sin(ghost1Angle) * 3;
  ghost1.position.y =
    (Math.sin(ghost1Angle) * (Math.sin(ghost1Angle * 2.34) * 2)) / 2;

  const ghost2Angle = -elapsedTime * 0.3;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 3;
  ghost2.position.y =
    (Math.sin(ghost2Angle) * (Math.sin(ghost2Angle * 2.34) * 2)) / 2;

  const ghost3Angle = elapsedTime * 0.9;
  ghost3.position.x = Math.cos(ghost3Angle) * 7;
  ghost3.position.z = Math.sin(ghost3Angle) * 7;
  ghost3.position.y =
    (Math.sin(ghost3Angle) * (Math.sin(ghost3Angle * 2.34) * 2)) / 2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
