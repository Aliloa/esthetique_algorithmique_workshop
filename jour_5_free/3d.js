import * as THREE from 'https://unpkg.com/three@0.175.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.175.0/examples/jsm/loaders/GLTFLoader.js?module';
import { OrbitControls } from 'https://unpkg.com/three@0.175.0/examples/jsm/controls/OrbitControls.js?module';

import { currentCharacter } from './state.js';

// canvas
const canvas = document.getElementById('robot');

// scène
const scene = new THREE.Scene();

// caméra
const camera = new THREE.PerspectiveCamera(
    22,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 19;
camera.position.y = 2.8;
// renderer (lié au canvas existant)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

//taile du canvas
function resizeRendererToCanvas() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

//personnages
const models = {};

function loadCharacter(name, path, scale = 1) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.scale.set(scale, scale, scale);

        // centre automatique
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.visible = false; // invisible par défaut
        scene.add(model);

        models[name] = model;
    });
}

// charger tous tes persos
loadCharacter('robot1', 'assets/models/ps1__robot/scene.gltf', 0.5);
// loadCharacter('robot2', '/assets/models/b1n_walking/scene.gltf', 0.5);

function showCharacter(name) {
    for (const key in models) {
        models[key].visible = (key === name);
    }
}

//modèle 3D
// loader.load(
//     '/assets/models/ps1__robot/scene.gltf',
//     (gltf) => {
//         const model = gltf.scene;
//         model.scale.set(0.5, 0.5, 0.5); // ajuste si trop gros/petit
//         model.position.set(0, -2.5, 0);
//         scene.add(model);

//         // si tu veux le faire tourner
//         animateModel(model);
//     },
//     undefined,
//     (error) => {
//         console.error('erreur chargement GLTF', error);
//     }
// );

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

controls.enablePan = false;
controls.enableZoom = false;
controls.rotateSpeed = 0.8;

// loop
function animate() {
    resizeRendererToCanvas();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    if (currentCharacter) {
        console.log(currentCharacter);
        showCharacter(currentCharacter);
    }
}
animate();