import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Doors
import alpha from "/textures/door/alpha.jpg";
import ambientOcclusion from "/textures/door/ambientOcclusion.jpg";
import color from "/textures/door/color.jpg";
import height from "/textures/door/height.jpg";
import metalness from "/textures/door/metalness.jpg";
import normal from "/textures/door/normal.jpg";
import roughness from "/textures/door/roughness.jpg";

// Matcap
import matcap from "/textures/matcaps/1.png";

// Gradient
import gradient from "/textures/gradients/5.jpg";

// Environment map
import environmentMap from "/textures/environmentMap/2k.hdr?url";

// Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load(color);
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load(alpha);
const doorAmbientOcclusionTexture = textureLoader.load(ambientOcclusion);
const doorHeightTexture = textureLoader.load(height);
const doorMetalnessTexture = textureLoader.load(metalness);
const doorNormalTexture = textureLoader.load(normal);
const doorRoughnessTexture = textureLoader.load(roughness);

const matcapTexture = textureLoader.load(matcap);
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const gradientTexture = textureLoader.load(gradient);
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

// GUI
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// material.minFilter = THREE.NearestFilter;
// material.magFilter = THREE.NearestFilter;
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

const material = new THREE.MeshPhysicalMaterial();
material.metalness = 1;
material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0.1;

// gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);

// Sheen (Fabric)
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(material, "sheenColor");

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
// gui
//   .add(material.iridescenceThicknessRange, "0")
//   .min(0)
//   .max(1000)
//   .step(1)
//   .name("iridescenceThicknessMin");

// gui
//   .add(material.iridescenceThicknessRange, "1")
//   .min(0)
//   .max(1000)
//   .step(1)
//   .name("iridescenceThicknessMax");

// Transmission (Glass)
material.transmission = 1;
material.ior = 1.5; // Depends on the material you're trying to simulate [Diamond: 2.42, Water: 1.33, Air: 1.0003, Glass: 1.5]
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(1).max(2).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

const sphere = new THREE.SphereGeometry(0.5, 64, 64);
const plane = new THREE.PlaneGeometry(1, 1, 100, 100);
const torus = new THREE.TorusGeometry(0.3, 0.2, 64, 128);

const sphereMesh = new THREE.Mesh(sphere, material);
const planeMesh = new THREE.Mesh(plane, material);
const torusMesh = new THREE.Mesh(torus, material);

sphereMesh.position.x = -1.5;
planeMesh.position.x = 0;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

// Lights

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

// Environment map

const rgbeLoader = new RGBELoader();
rgbeLoader.load(environmentMap, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

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
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 2;

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphereMesh.rotation.y = elapsedTime * 0.1;
  planeMesh.rotation.y = elapsedTime * 0.1;
  torusMesh.rotation.y = elapsedTime * 0.1;

  sphereMesh.rotation.x = elapsedTime * -0.15;
  planeMesh.rotation.x = elapsedTime * -0.15;
  torusMesh.rotation.x = elapsedTime * -0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
