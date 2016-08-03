<?php
$fitsFilePath = '3C279_binned_ccube.fits'
?>
<html>
<head>
  <title>Test FITS Cube</title>
  <script type="text/javascript" src="scripts/fits.js" charset="utf-8"></script>
  <script src="scripts/three.min.js"></script>

  <script id="vertexShader" type="x-shader/x-vertex">

  void main()	{

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

  }

  </script>

  <script id="fragmentShader" type="x-shader/x-fragment">

  void main()	{

    gl_FragColor = vec4(0.5, 0.0, 0.0, 0.5);

  }

  </script>

  <script type="text/javascript">
  // Add rotate method to all Array subclasses
  Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
    splice = Array.prototype.splice;

    return function(count) {
      var len = this.length >>> 0, // convert to uint
      count = count >> 0; // convert to int

      // convert count to value in range [0, len)
      count = ((count % len) + len) % len;

      // use splice.call() instead of this.splice() to make function generic
      push.apply(this, splice.call(this, 0, count));
      return this;
    };
  })();
  </script>

  <script type="text/javascript">
  // Create an instance of the FITS handling class
  var FITS = astro.FITS;
  var fitsHDU = null;

  // Global variables for 3D rendering
  var scene, camera, renderer, geometry;
  var intersectionRayCaster, intersectedObject;
  var materials = new Array();
  var meshes = new Array();
  var textures = new Array();
  var frameOrder = new Array();

  var fovRadius = 75;

  var mouseCoords = new THREE.Vector2();

  /* Start rendering the 3D scene once the FITS data have loaded
  */
  function render3dOnFITSload(){
    setFrameOrdering(0);
    render3d();
  }

  /* DOM callback - React to a mouse click.
  */
  function onDocumentMouseClick(){
    // set direction of ray to cast (from the camera to the mouse coords)
    intersectionRayCaster.setFromCamera(mouseCoords, camera);

    // compute the (ordered) list of objects that the cast ray transects
    var intersects = intersectionRayCaster.intersectObjects(scene.children);

    // if there were any intersections
    if (intersects.length > 0) {
      var arrayPosition = meshes.indexOf(intersects[0].object);
      //console.log(String(intersects[0].object.id) + " => " + String(arrayPosition) + " => " + intersects[0].object.name);
    }

    setFrameOrdering(arrayPosition);

    // re-render the frame when the display refreshes
    // (never call the render method directly!)
    requestAnimationFrame( render3d );
  }

  /* DOM callback - Update the current mouse coordinates.
  */
  function onDocumentMouseMove(event){
    event.preventDefault();

    mouseCoords.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouseCoords.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  /* Define the z-ordering of cube frames.
  */
  function setFrameOrdering(topFrameIndex){
    //console.log('Called => ' + String(frameOrder.length));
    frameOrder.rotate(frameOrder.indexOf(topFrameIndex));
    for(var frameIndex = 0; frameIndex < frameOrder.length; ++frameIndex){
      //console.log('Called => ' + String(500 - 50*frameIndex));
      meshes[frameOrder[frameIndex]].position.z = 500 - 50*frameIndex;
    }
  }

  /* Update rendered mesh parameters based upon user interaction.
  */
  function reactToUser(){
    // set direction of ray to cast (from the camera to the mouse coords)
    intersectionRayCaster.setFromCamera(mouseCoords, camera);

    // compute the (ordered) list of objects that the cast ray transects
    var intersects = intersectionRayCaster.intersectObjects(scene.children);

    // if there were any intersections
    if (intersects.length > 0) {
      // If the closest intersecting object has changed
      if (intersectedObject != intersects[0].object) {
        // if an intersection was detected previously.
        if (intersectedObject) {
          intersectedObject.material.transparent = true;
        }
        // (re)set persistent storage of the closest intersected object
        intersectedObject = intersects[0].object;
        intersectedObject.material.transparent = false;
      }
    }
    // Otherwise, if there were no intersections
    else {
      // if there was a previous intersection
      if (intersectedObject) {
        //intersectedObject.material.emissive.setHex( intersectedObject.currentHex );
        intersectedObject.material.transparent = true;
      }
      // clear the persistent storage of the closest intersected object
      intersectedObject = null;

    }
  }

  /* Render a frame of the 3D scene.
  */
  function render3d(){
    // re-render the frame when the display refreshes
    requestAnimationFrame( render3d );
    // react to mouse interaction with scene.
    reactToUser();
    // render the scene
    renderer.render( scene, camera );
  }

  /* Generate a texture for a slice of the data cube.
  */
  function generateFrameMesh(frame, frameIndex){
    // instantiate a Int32Array to handle the HDU's data and assign to global
    var range = FITS.ImageUtils.getExtent(frame);

    var textureDimension = 256;

    // instantiate new array of floats using data from FITS file
    var alphaMapArray = new Uint8Array(4*textureDimension*textureDimension);
    /* remap onto a grid with a power-of-two element number and
    * scale values into the range [0,255] before assigning to alpha channel
    * TODO: Could also set up a better color ramp.
    */
    frame.forEach(function(val, index, array){
      var sourceRow = Math.floor(index/fitsHDU.data.width);
      var sourceCol = index - fitsHDU.data.width*sourceRow;
      var destIndex = sourceRow*textureDimension + sourceCol;

      alphaMapArray[4*destIndex] = Math.floor(255*2*val/range[1]);
      alphaMapArray[4*destIndex + 1] = Math.floor(255*Math.sin(val/range[1]*Math.PI/2));//alphaMapArray[3*index];
      alphaMapArray[4*destIndex + 2] = Math.floor(255*3*val/range[1]);//alphaMapArray[3*index];
      alphaMapArray[4*destIndex + 3] = 25 + Math.floor(230.0*val/range[1]);
    });

    textures[frameIndex] = new THREE.DataTexture(alphaMapArray, 256, 256, THREE.RGBAFormat);//, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy );
    textures[frameIndex].needsUpdate = true;
    textures[frameIndex].repeat.x = fitsHDU.data.width/textureDimension;
    textures[frameIndex].repeat.y = fitsHDU.data.height/textureDimension;

    materials[frameIndex] = new THREE.MeshBasicMaterial( {map : textures[frameIndex], transparent: true } );

    meshes[frameIndex] = new THREE.Mesh( geometry, materials[frameIndex] );
    meshes[frameIndex].name = 'frame_' + String(frameIndex);

    scene.add( meshes[frameIndex] );

    if(meshes.length == fitsHDU.data.depth){
      // All FITS data are loaded, so render 3D environment.
      render3dOnFITSload();
    }
  }

  /* Initialize the 3D rendering environment.
  */
  function init3dEnvironment(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( fovRadius, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 700;
    camera.position.x = 700;
    camera.position.x = 700;

    camera.lookAt( scene.position );

    camera.updateMatrixWorld();

    geometry = new THREE.PlaneGeometry( 500, 500);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xbfd1e5 );

    intersectionRayCaster = new THREE.Raycaster();
  }


  /* Define a callback that will be called once the FITS file has loaded
  * note that the function will be called in the context of the FITS handler
  * so the "this" keyword will refer to the FITS handler.
  */
  var onFitsLoadCallback = function(){
    // Retrieve a reference to the first header-dataunit containing a dataunit
    fitsHDU = this.getHDU();

    // Extract the header portion of the HDU
    var header = fitsHDU.header;
    // Write information about the header to the log
    //console.log(header);

    // Extract the data portion of the HDU
    var data = fitsHDU.data;
    // Write information about the data to the log

    for (var frameIndex = 0; frameIndex < fitsHDU.data.depth; ++frameIndex){
      data.getFrame(frameIndex, generateFrameMesh, frameIndex);
      frameOrder.push(frameIndex);
    }

  }

  /* Load the FITS data.
  */
  function loadFits(){
    var url = '<?php echo $fitsFilePath; ?>';

    // Initialize a new FITS File object
    var fitsCube = new FITS(url, onFitsLoadCallback);
  }

  /* Initial setup after document loads.
  */
  function onloadInit(){
    init3dEnvironment();
    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'click', onDocumentMouseClick, false );
    loadFits();
  }

  </script>

</head>
<body onload='onloadInit();'>
  <h1>Counts Cube Plotter</h1>
  <h3>Plotting:<?php echo $fitsFilePath; ?></h3>

</body>
</html>
