// Set up the scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set initial background color to black

// Load the background image
var bgTexture = new THREE.TextureLoader().load('galaxy.jpg');
bgTexture.wrapS = THREE.RepeatWrapping;
bgTexture.wrapT = THREE.RepeatWrapping;
bgTexture.repeat.set(1, 1);

// Set the background of the scene to the loaded image
scene.background = bgTexture;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a globe geometry
var geometry = new THREE.SphereGeometry(5, 32, 32);

// Load a texture for the globe
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('world.png');

// Create a material with the texture
var material = new THREE.MeshBasicMaterial({ map: texture });

// Create a mesh with the geometry and material
var globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Set up the camera position
camera.position.z = 10;

// Add mouse controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Render the scene
function render() {
    requestAnimationFrame(render);
    controls.update(); // Update the controls in each frame
    globe.rotation.y += 0.003;
    renderer.render(scene, camera);
}
render();

// Function to update the globe's position based on user input
function goToCountry(countryName) {
    // Use d3-geo to get the coordinates of the country
    var projection = d3.geoOrthographic().scale(5).translate([0, 0]);
    var path = d3.geoPath().projection(projection);
    var country = { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [0, 0] } }] };

    var countryData = country.features[0];
    d3.json("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json").then(function(data) {
        var features = data.features;
        features.forEach(function(feature) {
            if (feature.properties.name === countryName) {
                countryData.geometry.coordinates = feature.geometry.coordinates;
            }
        });

        // Calculate the centroid of the country
        var centroid = path.centroid(countryData);

        // Set the globe's rotation to show the country
        var rotation = {
            x: -centroid[0] / 100,
            y: centroid[1] / 100,
            z: 0
        };
        globe.rotation.set(rotation.x, rotation.y, rotation.z);

        // Animate the camera to the location of the country
        new TWEEN.Tween(camera.position)
            .to({ x: centroid[0] / 10, y: centroid[1] / 10, z: 15 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                camera.lookAt(scene.position);
            })
            .start();
    });
}

// Function to handle search button click
function searchCountry() {
    var countryName = document.getElementById('country-input').value;
    goToCountry(countryName);
}

// Handle user input
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        var countryName = prompt('Enter country name:');
        goToCountry(countryName);
    }
});
