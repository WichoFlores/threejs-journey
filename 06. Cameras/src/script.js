import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls";

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Cursor

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

  console.log(cursor.x, cursor.y);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // One rotation per second
  // mesh.rotation.y = elapsedTime;

  // Update camera
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;

  // MANUAL CAMERA CONTROL
  // Go around
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;

  // camera.position.y = cursor.y * 5;

  // camera.lookAt(mesh.position);
  // These two give the same result because the cube is not moving and it's already in the center (0, 0, 0)
  // camera.lookAt(new THREE.Vector3());

  // CAMERA CONTROL WITH ORBIT CONTROLS
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
