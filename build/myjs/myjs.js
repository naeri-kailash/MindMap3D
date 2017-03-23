
if (Detector.webgl) {
   var scene, camera, renderer, controls
	var FAR = 300
	var clock = new THREE.Clock()
    main()
   //  animate()
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

function main() {

   var container = document.getElementById( 'container' )

   // SCENE

   scene = new THREE.Scene();
   scene.fog = new THREE.Fog( 0x49EEEF, 10, FAR )

   // CAMERA

   camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, FAR );
   camera.position.set( 0, 15, 150 );
   camera.lookAt( new THREE.Vector3() );


   // CONTROLS

   controls = new THREE.OrbitControls( camera );

   // TEXTURES

	var textureLoader = new THREE.TextureLoader();
	var texture = textureLoader.load( "textures/disturb.jpg" );
	texture.repeat.set( 20, 10 );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.format = THREE.RGBFormat;

	// MATERIALS

	var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
	var objectMaterial = new THREE.MeshStandardMaterial( { color: 0x210708, roughness: 0.5, metalness: 1.0 } );

	// GROUND

	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 800, 400, 2, 2 ), groundMaterial );
	mesh.position.y = - 20;
	mesh.rotation.x = - Math.PI / 2;
	scene.add( mesh );

   // OBJECTS

   var objectGeometry = new THREE.SphereGeometry( 15, 32, 32 );
      for ( var i = 0; i < 30; i ++ ) {
         var sphere = new THREE.Mesh( objectGeometry, objectMaterial );
         sphere.position.x = 400 * ( 0.5 - Math.random() );
         sphere.position.y = 50 * ( 0.5 - Math.random() ) + 25;
         sphere.position.z = 200 * ( 0.5 - Math.random() );
         // sphere.rotation.y = 3.14 * ( 0.5 - Math.random() );
         // sphere.rotation.x = 3.14 * ( 0.5 - Math.random() );
         sphere.matrixAutoUpdate = false;
         sphere.updateMatrix();
         scene.add( sphere );
      }

   // RENDERER

   renderer = new THREE.WebGLRenderer();
   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.setClearColor( scene.fog.color, 0.7 );
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

   // STATS Performance Monitor

   stats = new Stats();
   container.appendChild( stats.dom );

   window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
}

// function animate() {
// 	requestAnimationFrame( animate );
// 	render();
// 	stats.update();
// }

var render = function () {
   requestAnimationFrame( render );

   // cube.rotation.x += 0.1;
   // cube.rotation.y += 0.1;

   renderer.render(scene, camera);
};

render();
