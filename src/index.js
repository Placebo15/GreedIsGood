import "./style.css";
import * as THREE from "three";
import React from "react";
import ReactDOM from "react-dom";
import MainMint from "./MainMint";
import { useState } from "react";
import NavBar from "./NavBar";
import { randFloatSpread } from "three/src/math/MathUtils";



function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div id="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}
const glava = ReactDOM.createRoot(document.getElementById("glava"));
glava.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  85,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(1);
camera.position.setX();


renderer.render(scene, camera);




// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(1, 50);
//scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {

  const goldTexture = new THREE.TextureLoader().load('goldcoin.jpg');
  goldTexture.encoding = THREE.sRGBEncoding;
  const geometry = new THREE.CylinderGeometry(1, 1, 0.4, 50);
  const material = new THREE.MeshStandardMaterial({ map: goldTexture });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  star.rotateX(-Math.PI * randFloatSpread(100));
  scene.add(star);

}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("backgr.png");
spaceTexture.encoding = THREE.sRGBEncoding; // Adjust the encoding if needed
scene.background = spaceTexture;

let width = window.innerWidth;
let height = window.innerHeight;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
camera.aspect = width / height;
camera.updateProjectionMatrix();

// Update size on window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Avatar

const frontTexture = new THREE.TextureLoader().load("jeff.png");
frontTexture.encoding = THREE.sRGBEncoding;
const backTexture = new THREE.TextureLoader().load("logo.png");
backTexture.encoding = THREE.sRGBEncoding;
const leftTexture = new THREE.TextureLoader().load("318.jpg");
leftTexture.encoding = THREE.sRGBEncoding;
const topTexture = new THREE.TextureLoader().load("443.jpg");
topTexture.encoding = THREE.sRGBEncoding;
const sideTexture = new THREE.TextureLoader().load("289.jpg");
sideTexture.encoding = THREE.sRGBEncoding;


const materials1 = [
  new THREE.MeshBasicMaterial({ map: sideTexture }),
  new THREE.MeshBasicMaterial({ map: backTexture }),
  new THREE.MeshBasicMaterial({ map: frontTexture }),
]
const materials2 = [
  new THREE.MeshBasicMaterial({ map: sideTexture }),
  new THREE.MeshBasicMaterial({ map: backTexture }),
  new THREE.MeshBasicMaterial({ map: leftTexture }),
]
const materials3 = [

  new THREE.MeshBasicMaterial({ map: sideTexture }),
  new THREE.MeshBasicMaterial({ map: topTexture }),
  new THREE.MeshBasicMaterial({ map: backTexture }),
];

const cliff = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.4, 100), materials2);
cliff.rotateX(-Math.PI * 0.5);
scene.add(cliff);

const steff = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.4, 100), materials3);
steff.rotateX(-Math.PI * 0.5);
scene.add(steff);



const jeff = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.4, 100), materials1);
jeff.rotateX(-Math.PI * 0.5);
scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
moonTexture.encoding = THREE.sRGBEncoding;
//const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 0.4, 100),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    //normalMap: normalTexture,
  })
);

scene.add(moon);



moon.position.z = 30;
moon.position.setX(-10);



jeff.position.z = -5;
jeff.position.x = 2;

steff.position.z = -5
steff.position.x = -10;
steff.position.y = 3

cliff.position.x = 10;
cliff.position.y = 7


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.015;
  moon.rotation.z += 0.01;



  jeff.rotation.x += 0.04;
  jeff.rotation.y += 0.04;

  cliff.rotation.x += 0.04;
  cliff.rotation.z += 0.04;

  steff.rotation.z += 0.04;
  steff.rotation.y += 0.04;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.z += 0.005;

  // controls.update();

  renderer.render(scene, camera);

}







animate();
