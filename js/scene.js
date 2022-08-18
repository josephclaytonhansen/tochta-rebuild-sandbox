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
var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
renderer.setSize(w, h);
container.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);



const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'/mattress/mattress.obj',
	// called when resource is loaded
	function ( object ) {
        object.scale.set(2,2,2);

		scene.add( object );


	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);




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