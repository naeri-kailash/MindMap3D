
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
	var texture = textureLoader.load( "./underwater.jpg" );
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

   var numSpheres = 30;

   var spheres = [];

   var objectGeometry = new THREE.SphereGeometry( 15, 32, 32 );
      for ( var i = 0; i < numSpheres; i ++ ) {
         var newSphere = new THREE.Mesh( objectGeometry, objectMaterial );
         var grayness = Math.random() * 0.5 + 0.25
         newSphere.position.x = 400 * ( 0.5 - Math.random() );
         newSphere.position.y = 50 * ( 0.5 - Math.random() ) + 25;
         newSphere.position.z = 200 * ( 0.5 - Math.random() );
         // sphere.color.setRGB( greyness, greyness, greyness );
         // sphere.greyness = greyness
         // sphere.rotation.set( Math.random(), Math.random(), Math.random() ).multiplyScalar( 2 * Math.PI )
         // sphere.rotation.y = 3.14 * ( 0.5 - Math.random() );
         // sphere.rotation.x = 3.14 * ( 0.5 - Math.random() );
         newSphere.matrixAutoUpdate = false;
         newSphere.updateMatrix();
         scene.add( newSphere );

         spheres.push(newSphere);
      }

      // LIGHTS
      				var intensity = 5.0;
      				var distance = 100;
      				var decay = 2.0;
      				var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
      				var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );
      				light1 = new THREE.PointLight( c1, intensity, 150, decay );
      				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
      				scene.add( light1 );
      				light2 = new THREE.PointLight( c2, intensity, distance, decay );
      				light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
      				scene.add( light2 );
      				light3 = new THREE.PointLight( c3, intensity, distance, decay );
      				light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
      				scene.add( light3 );
      				light4 = new THREE.PointLight( c4, intensity, 200, decay );
      				light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
      				scene.add( light4 );
      				light5 = new THREE.PointLight( c5, intensity, 150, decay );
      				light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
      				scene.add( light5 );
      				light6 = new THREE.PointLight( c6, intensity, distance, decay );
      				light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
      				scene.add( light6 );
      				var dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
      				dlight.position.set( 0.5, 1, 0 ).normalize();
      				scene.add( dlight );

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
   window.requestAnimationFrame( render );

   // OBJECT ROTATION
   // for (var i = 0; i < numSpheres; i++){
      // spheres.rotation.z += 0.06;
   // }

   var time = Date.now() * 0.00025;
		var z = 20, d = 150;
		light1.position.x = Math.sin( time * 0.7 ) * d;
		light1.position.z = Math.cos( time * 0.3 ) * d;
		light2.position.x = Math.cos( time * 0.3 ) * d;
		light2.position.z = Math.sin( time * 0.7 ) * d;
		light3.position.x = Math.sin( time * 0.7 ) * d;
		light3.position.z = Math.sin( time * 0.5 ) * d;
		light4.position.x = Math.sin( time * 0.3 ) * d;
		light4.position.z = Math.sin( time * 0.5 ) * d;
		light5.position.x = Math.cos( time * 0.3 ) * d;
		light5.position.z = Math.sin( time * 0.5 ) * d;
		light6.position.x = Math.cos( time * 0.7 ) * d;
		light6.position.z = Math.cos( time * 0.5 ) * d;
		controls.update( clock.getDelta() );

   renderer.render(scene, camera);
};

render();
