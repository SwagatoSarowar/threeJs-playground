import * as THREE from "three";
import "./style.css";
import earthImg from "/assets/earth-night.jpg";

// Scene
const scene = new THREE.Scene();

// Window size
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
  ratio: function () {
    return this.width / this.height;
  },
};

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.ratio(), 0.1, 100);
camera.position.z = 40;

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
const directionalLight = new THREE.DirectionalLight(0xfcffb0);
directionalLight.intensity = 2;
directionalLight.position.set(20, 20, 0);
scene.add(ambientLight, directionalLight);

// Earth
const earthGeometry = new THREE.SphereGeometry(10, 64, 64);
const earthTexture = new THREE.TextureLoader().load(earthImg);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.rotation.z = Math.PI / 5;
earth.rotation.reorder("ZYX");
scene.add(earth);

// Renderer
const canvas = document.querySelector("#webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Animation
function animate() {
  earth.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
