console.log("a");
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");
console.log(canvas);
// Scene
const scene = new THREE.Scene();

// Objects

const group = new THREE.Group();
group.position.y = -0.5;
group.position.z = -0.8;
group.scale.y = 2;
group.rotation.y = Math.PI;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);

cube2.position.x = -2;

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

cube3.position.x = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

// ONE OBJECT //
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: "red" });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;

// mesh.scale.set(2, 0.5, 0.5);

// Rotation

// Reorder before setting the value of rotation
// mesh.rotation.reorder("YXZ");

// Value of rotation is in radians, which is why we use Math.PI
// mesh.rotation.x = Math.PI / 4; // 45 degrees
// mesh.rotation.y = Math.PI / 4; // 45 degrees
// ONE OBJECT //

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
