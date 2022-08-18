import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

var geometry = new THREE.IcosahedronGeometry(1.5, 4);
var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.8,
});
var ico = new THREE.Mesh(geometry, material);
scene.add(ico);

var shiny_material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: .7,
    roughness: 0.35,
});
var sh = new THREE.Mesh(geometry, shiny_material);
sh.translateZ(3);
scene.add(sh);

var box = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(box, material);
cube.translateX(-3);
scene.add(cube);

const shiny_cube = new THREE.Mesh(box, shiny_material);
shiny_cube.translateX(-3);
shiny_cube.translateZ(3);
scene.add(shiny_cube);

// Lights
// Lights

var light = new THREE.HemisphereLight(0xfcf4e8, 0xfff7d9, 0.38);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xdcfafa, 0.3);
light2.position.set(2.5, 0, 8); // ~60º
light2.name = 'main_light';
scene.add(light2);

const helper2 = new THREE.DirectionalLightHelper(light2, 1);
scene.add(helper2);

const light3 = new THREE.DirectionalLight(0xffeacc, 0.35);
light3.position.set(8, 9, -4); // ~60º
light3.name = 'main_light';
scene.add(light3);

const helper3 = new THREE.DirectionalLightHelper(light3, 1);
scene.add(helper3);

const light4 = new THREE.DirectionalLight(0xffeacc, 0.3);
light4.position.set(4, 3, -8); // ~60º
light4.name = 'main_light';
scene.add(light4);

const helper4 = new THREE.DirectionalLightHelper(light4, 1);
scene.add(helper4);

camera.position.z = 10;


var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

animate();