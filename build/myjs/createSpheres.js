

function createSpheres() {
   // for( var j = 0; j < 30; j++ ){
   //    abgeometry2 = new THREE.SphereGeometry ( 1, 32 , 32 );
   //    abmesh2 = new THREE.MeshPhongMaterial({color: 0x3B170B,
   //       wireframe: false });
   //    mesh2 = new THREE.Mesh(abgeometry2, abmesh2);
   //       mesh2.position.x = Math.random() * 2
   //       mesh2.position.y = Math.random() * 2
   //       mesh2.position.z = Math.random()* 2
   //       scene.add( mesh2 );
   //    }

   var geometry = new THREE.SphereGeometry( 1, 32, 32 );
   var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
   var sphere = new THREE.Mesh( geometry, material );
   scene.add( sphere );
}
createSpheres()
