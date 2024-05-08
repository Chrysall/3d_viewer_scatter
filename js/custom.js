// Necessary for camera/plane rotation
var degree = Math.PI / 180;

// Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize after viewport-size-change
window.addEventListener("resize", function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Adding controls
controls = new THREE.OrbitControls(camera, renderer.domElement);

// Ground (comment out line: "scene.add( plane );" if Ground is not needed...)
var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(500, 500),
    new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
);
plane.rotation.x = -90 * degree;
plane.position.y = 0;
scene.add(plane);
plane.receiveShadow = true;

// ASCII file - STL Import
var loader = new THREE.STLLoader();
loader.load('./stl/1.stl', function (geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, specular: 0x111111, shininess: 200 });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
});

// Binary files - STL Import
loader.load('./stl/2.stl', function (geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, specular: 0x111111, shininess: 200 });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 20, 0);
    scene.add(mesh);
});

// Camera positioning
camera.position.z = 100;
camera.position.y = 100;
camera.rotation.x = -45 * degree;

// Ambient light (necessary for Phong/Lambert-materials, not for Basic)
var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Draw scene
var render = function () {
    renderer.render(scene, camera);
};

// Run game loop (render,repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);

    render();
};

GameLoop();