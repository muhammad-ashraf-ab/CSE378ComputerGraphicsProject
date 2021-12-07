// Import three.js module
import * as THREE from '../node_modules/three/build/three.module.js'

let boxMesh, planeMesh;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera( 70,                                         // FoV
                                            window.innerWidth / window.innerHeight,     // Aspect ratio
                                            1,                                          // Near
                                            1000);                                      // Far
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

window.addEventListener('resize', onWindowResize);

createGeometry();
createLight();
animate();

function createGeometry() {
    const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    const texture = new THREE.TextureLoader().load('../images/crateTexture.png');
    const boxMaterial = new THREE.MeshStandardMaterial({map: texture});
    // const boxMaterial = new THREE.MeshStandardMaterial({color: 0x20aaaa});
    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = 30;

    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0x404040});
    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.castShadow = true;
    planeMesh.receiveShadow = true;

    scene.add(boxMesh);
    scene.add(planeMesh);
}

function createLight() {
    const ambientLight = new THREE.AmbientLight({color: 0x404040}, 1);

    const pointLight = new THREE.PointLight(0xffffff, 1, 0);
    pointLight.position.set(50, 100, 50);
    pointLight.castShadow = true;

    scene.add(ambientLight);
    scene.add(pointLight);
}

// Function to animate scene
function animate() {
    requestAnimationFrame(animate);
    boxMesh.rotation.x += 0.005;
    boxMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
