import * as THREE from 'https://unpkg.com/three@0.175.0/build/three.module.js';

// scène
const scene = new THREE.Scene();

// caméra
const camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

//lumière
const lights = [];

for (let i = 0; i < 20; i++) {
    const light = new THREE.PointLight(0xffffff, 300, 300);
    light.position.set(
        Math.cos(i) * 2,
        Math.sin(i) * 2,
        -i * 15
    );
    scene.add(light);
    lights.push(light);
}

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//couleurs et textures
let hue = 0.55; //bleu
const hue_min = 0.55;
const hue_max = 0.7;
let hue_step = 0.005;

function getNextColor() {
    const color = new THREE.Color();
    color.setHSL(hue, 1, 0.5);
    hue += hue_step;
    if (hue > hue_max || hue < hue_min) hue_step *= -1; // inverser la direction

    return color;
}

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/texture.jpg');

//spawn cubes
let angle = 0;
const radius = 5;
const angleStep = Math.PI / 8;

function spawnCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: getNextColor(),
        metalness: 0.6,
        roughness: 0.3
    });

    const cube = new THREE.Mesh(geometry, material);

    // calcul position circulaire
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -250; // distance de spawn

    cube.position.set(x, y, z);

    scene.add(cube);
    cubes.push(cube);

    // incrémente l'angle pour la spirale
    angle += angleStep;
}

let fractal_angle = 0;
const childRadius = 1;

function spawnFractale(parentCube) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: getNextColor(),
        metalness: 0.6,
        roughness: 0.3
    });
    const child = new THREE.Mesh(geometry, material);

    // calcule position circulaire autour du cube
    const x = parentCube.position.x + Math.cos(fractal_angle) * childRadius;
    const y = parentCube.position.y + Math.sin(fractal_angle) * childRadius;
    const z = parentCube.position.z;

    child.position.set(x, y, z);
    scene.add(child);
    fractals.push(child);

    fractal_angle += 0.015; // distance de rotation

    // supprime le cube après quelques secondes
    setTimeout(() => {
        scene.remove(child);
        const index = fractals.indexOf(child);
        if (index > -1) fractals.splice(index, 1);
    }, 500); // 1000ms = 1 secondes
}

const cubes = [];
const fractals = [];

setInterval(spawnCube, 100);
setInterval(() => {
    cubes.forEach(cube => spawnFractale(cube));
}, 100);

function animate() {
    requestAnimationFrame(animate);

    // bouge tous les cubes vers la caméra
    for (let i = cubes.length - 1; i >= 0; i--) {
        cubes[i].position.z += 0.6; // vitesse
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;


        // supprimmer les cubes hors champ
        if (cubes[i].position.z > camera.position.z + 1) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
        }
    }

    for (let i = fractals.length - 1; i >= 0; i--) {
        fractals[i].position.z += 0.6; // vitesse
        fractals[i].rotation.x += 0.03;
        fractals[i].rotation.y += 0.03;

        if (fractals[i].position.z > camera.position.z + 1) {
            scene.remove(fractals[i]);
            fractals.splice(i, 1);
        }
    }

    camera.rotation.z += 0.01;
    camera.position.x = Math.sin(performance.now() * 0.005) * 2;
    camera.position.y = Math.cos(performance.now() * 0.003) * 2;


    renderer.render(scene, camera);
}

animate();