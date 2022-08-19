import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.module.js';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

import {
    OBJLoader
} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js';

import {
    MTLLoader
} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/MTLLoader.js';


var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var container = document.getElementById('canvas');
document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});

var w = container.offsetWidth;
var h = container.offsetHeight;
var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
renderer.setSize(w, h);
container.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

document.body.appendChild(renderer.domElement);



var mtlLoader = new MTLLoader();

mtlLoader.setPath('/mattress/textures');
var url = "/mattress.mtl";
mtlLoader.load(url, function (materials) {

    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/mattress');
    objLoader.load('/mattress.obj', function (object) {

        scene.add(object);

    });

});


var light_scale = 1.6;

// Lights
// Lights

var light = new THREE.HemisphereLight(0xfcf4e8, 0xfff7d9, 0.38 * light_scale);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xdcfafa, 0.3 * light_scale);
light2.position.set(2.5, 0, 8); // ~60º
light2.name = 'main_light';
scene.add(light2);

// const helper2 = new THREE.DirectionalLightHelper(light2, 1);
// scene.add(helper2);

const light3 = new THREE.DirectionalLight(0xffeacc, 0.35 * light_scale);
light3.position.set(8, 9, -4); // ~60º
light3.name = 'main_light';
scene.add(light3);

// const helper3 = new THREE.DirectionalLightHelper(light3, 1);
// scene.add(helper3);

const light4 = new THREE.DirectionalLight(0xffeacc, 0.3 * light_scale);
light4.position.set(4, 3, -8); // ~60º
light4.name = 'main_light';
scene.add(light4);

// const helper4 = new THREE.DirectionalLightHelper(light4, 1);
// scene.add(helper4);

var geometry = new THREE.BoxBufferGeometry(.001, .75, 2.53);
var edges = new THREE.EdgesGeometry(geometry);
var hinge = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: 0xff0000
}));

geometry = new THREE.BoxBufferGeometry(.42, .73, .42);
var edges = new THREE.EdgesGeometry(geometry);
var corner = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: 0xffffff
}));

hinge.position.set(0, .39, 0);
corner.position.set(1.65, .38, 1.02);
scene.add(hinge);
scene.add(corner);

geometry = new THREE.BoxGeometry(.42, .73, .42);
var material = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(1.65, .38, 1.02);
scene.add(cube);




camera.position.z = 10;


var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    hinge.position.x = Math.sin(renderer.info.render.frame / 40) * 1.4;
};

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

animate();