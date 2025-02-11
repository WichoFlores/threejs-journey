import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights

const ambientLight = new THREE.AmbientLight("#ffffff", 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#ffffff", 2.1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

// const objectsToTest = [object1, object2, object3];
const objectsToTest = [];

// Model

const gltfLoader = new GLTFLoader();

let duckObject = null;

gltfLoader.load("/models/Duck/glTF-Binary/Duck.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.position.y = -2;

  duckObject = gltf.scene;
  objectsToTest.push(duckObject);
  console.log(duckObject);

  gui
    .add(gltf.scene.rotation, "y")
    .min(0)
    .max(Math.PI * 2)
    .step(0.01);
});

// Raycaster

const raycaster = new THREE.Raycaster();

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

// Mouse
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", () => {
  if (witness) {
    if (witness === object1) {
      console.log("click on object1");
    }
    if (witness === object2) {
      console.log("click on object2");
    }
    if (witness === object3) {
      console.log("click on object3");
    }
  }
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
camera.position.z = 3;
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

let witness = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  // Cast a ray

  raycaster.setFromCamera(mouse, camera);

  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(1, 0, 0);

  // rayDirection.normalize();

  // raycaster.set(rayOrigin, rayDirection);

  const intersects = raycaster.intersectObjects(objectsToTest);
  // console.log(intersects);

  objectsToTest.forEach((object) => {
    object.material?.color.set("#ff0000");
  });

  intersects.forEach((intersect) => {
    // Check for duck
    console.log(intersect.object);
    if (duckObject && intersect.object === duckObject) {
      console.log("Duck intersected");
    } else {
      intersect.object.material?.color.set("#0000ff");
    }
  });

  if (intersects.length) {
    if (!witness) {
      witness = intersects[0].object;
    }
  } else {
    witness = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
