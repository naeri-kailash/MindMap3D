

if (Detector.webgl) {   //----Detecting WebGL and browser compatibility
   var scene
   var camera
   var renderer
   var container
   var controls
   var FAR = 125
   main()
} else {
   var warning = Detector.getWebGLErrorMessage()
   document.getElementById('container').appendChild(warning)
}

function main () {
   //-----SET UP SCENE CAMERA AND RENDERER------
   scene = new THREE.Scene()
   scene.fog = new THREE.Fog( 0x340907, 10, FAR )

   camera = new THREE.PerspectiveCamera(
      50, 													//--FOV-CAMERA FRUSTRAM FIELD OF VIEW-FROM TOP TO BOTTOM OF VIEW IN DEGREES
      window.innerWidth / window.innerHeight, 	//--Camera frustum aspect ratio, usually the canvas width / canvas height. Default is 1 (square canvas)
      1, 													//--Camera frustum near plane, default 0.1
      FAR  												   //--Camera frustum far plane, default 2000
   )
   camera.lookAt( new THREE.Vector3() )

   controls = new THREE.TrackballControls( camera )
   // controls.rotateSpeed = 1.0
	// controls.zoomSpeed = 1.2;
	// controls.panSpeed = 0.8;
	// controls.noZoom = false;
	// controls.noPan = false;

   // controls = new THREE.OrbitControls( Camera, Renderer.domElement )

   renderer = new THREE.WebGLRenderer()
   renderer.setSize( window.innerWidth, window.innerHeight )
   document.body.appendChild( renderer.domElement )
   //-----SET UP SCENE CAMERA AND RENDERER------

   // var geometry = new THREE.BoxGeometry( 1, 1, 1 )
   // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
   // var cube = new THREE.Mesh( geometry, material )
   // scene.add( cube )

   camera.position.z = 5

   function render() {
      requestAnimationFrame( render )
      cube.rotation.x += 0.1
      cube.rotation.y += 0.1
      // line.rotation.x += 0.1
      // line.rotation.y += 0.1
      renderer.render(scene, camera)
   }
   render()
}
