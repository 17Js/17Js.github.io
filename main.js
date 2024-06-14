import * as THREE from "./modules/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControlsBlender.js";
import { OBJLoader } from "./jsm/loaders/OBJLoader.js";

// import * as THREE from "three";
// import { OrbitControls } from "jsm/controls/OrbitControlsBlender.js";
// import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

const pi = 3.14159;

const w = globalThis.innerWidth;
const h = globalThis.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

const gridScale = 10;

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = gs(500);
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(gs(5),gs(5),gs(5));

const guiScale = 50;
const width = w/guiScale;
const height = h/guiScale;
const guiCamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
// const guiCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// guiCamera.position.set(gs(5),gs(5),gs(5));

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x333333 ); 

const gui = new THREE.Scene();
//gui.background = new THREE.Color( 0x333333 ); 

scene.add( camera );
gui.add( guiCamera );

const axesHelper = new THREE.AxesHelper( gridScale );
scene.add( axesHelper );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.rotateSpeed = 0.8;
controls.panSpeed = 1.0;
controls.zoomSpeed = 8.0;
controls.mouseWheelSpeed = 0.125;
controls.keys = { LEFT: 'KeyA', UP: 'KeyW', RIGHT: 'KeyD', BOTTOM: 'KeyS' };
controls.mouseButtons = { LEFT: -1, MIDDLE: 0, RIGHT: -1 };
// controls.keys = [ '' /*A*/, 'ControlLeft' /*S*/, 'ShiftLeft' /*D*/ ];
// controls.mouseButtons = { LEFT: 1, MIDDLE: -1, RIGHT: -1 };

const buttonNames = ["left", "right", "wheel", "back", "forward"];

const blockNames = ["2x1HalfSlopedPanel", "2x1HalfSlopedPanelInv", "2x1HalfSlopedTipPanel", 
	"2x1HalfSlopedTipPanelInv", "2x1SlopedPanel", "2x1SlopedPanelTip", "2x1SlopedSideBasePanel", 
	"2x1SlopeSideBasePanelInv", "2x1SlopeSideTipPanel", "2x1SlopeSideTipPanelInv", "Block", 
	"CenterPanel", "Corner", "Corner2x1Base", "Corner2x1BaseInv", "Corner2x1Tip", "Corner2x1TipInv", 
	"CornerInv", "CornerSquare", "CornerSquareInv", "HalfBlock", "HalfCenterPanel", "HalfCorner", 
	"HalfCornerSloped", "HalfPanel", "HalfSlope", "HalfSlopeCorner", "HalfSlopeCornerInv", 
	"HalfSlopedCornerBase", "HalfSlopedPanel", "HalfSlopeInv", "Panel", "QuarterPanel", "RaisedSlopedCorner", 
	"RoundCorner", "RoundInvertedCorner", "RoundPanel", "RoundPanelCorner", "RoundPanelFace", 
	"RoundPanelInvertedCorner", "RoundSlope", "Slope", "Slope2x1Base", "Slope2x1Tip", "SlopedCorner", 
	"SlopedCornerBase", "SlopedCornerTip", "SlopedPanel", "SlopedSidePanel", "SlopeTransition", 
	"SlopeTransitionBase", "SlopeTransitionBaseMirrored", "SlopeTransitionMirrored", "SlopeTransitionTip", 
	"SlopeTransitionTipMirrored", "SquareSlopedCornerBase", "SquareSlopedCornerTip", "SquareSlopedCornerTipInv"];

const loader = new OBJLoader();

const blockMeshes = loadBlockMeshes("./Assets/SE Blocks/obj/");

const blockTypes = {
	block: ["Block","Slope","Corner","CornerInv","CornerSquare","CornerSquareInv"],
	corner2x1: ["Corner2x1Base","Corner2x1Tip","Corner2x1BaseInv","Corner2x1TipInv", "HalfSlopeCorner","HalfSlopeInv"],
	slope2x1: ["Slope2x1Base","Slope2x1Tip","HalfBlock","HalfSlope","HalfSlopeCorner","HalfCorner","HalfCornerSloped"],
	slopedCorner: ["SlopedCornerTip","RaisedSlopedCorner","SquareSlopedCornerTip","SquareSlopedCornerBase",
					"SquareSlopedCornerTipInv","SlopedCornerBase","SlopedCorner","HalfSlopedCornerBase"],
	slopeTransition: ["SlopeTransitionBase","SlopeTransition","SlopeTransitionTip","SlopeTransitionBaseMirrored",
					"SlopeTransitionMirrored","SlopeTransitionTipMirrored"],
	panel: ["CenterPanel","SlopedPanel","SlopedSidePanel","2x1SlopedPanel","2x1SlopedPanelTip","2x1SlopedSideBasePanel",
			"2x1SlopeSideTipPanel","2x1SlopeSideBasePanelInv","2x1SlopeSideTipPanelInv","HalfSlopedPanel",
			"2x1HalfSlopedPanel","2x1HalfSlopedTipPanel","2x1HalfSlopedPanelInv","2x1HalfSlopedTipPanelInv",
			"RoundPanel","RoundPanelCorner","RoundPanelFace","RoundPanelInvertedCorner","HalfCenterPanel",
			"HalfPanel","QuarterPanel","Panel"],
	slopeRound: ["RoundSlope","RoundCorner","RoundInvertedCorner"]
};

// selectorBlocks = {
// 	block: {
// 		Block:,
// 		Slope:,
// 		Corner:,
// 		CornerInv:,
// 		CornerSquare:,
// 		CornerSquareInv:
// 	},
// 	corner2x1: {
// 		Corner2x1Base:,
// 		Corner2x1Tip:,
// 		Corner2x1BaseInv:,
// 		Corner2x1TipInv:, 
// 		HalfSlopeCorner:,
// 		HalfSlopeInv:
// 	},
// 	slope2x1: {
// 		Slope2x1Base:,
// 		Slope2x1Tip:,
// 		HalfBlock:,
// 		HalfSlope:,
// 		HalfSlopeCorner:,
// 		HalfCorner:,
// 		HalfCornerSloped:
// 	},
// 	slopedCorner: {
// 		SlopedCornerTip:,
// 		RaisedSlopedCorner:,
// 		SquareSlopedCornerTip:,
// 		SquareSlopedCornerBase:,
// 		SquareSlopedCornerTipInv:,
// 		SlopedCornerBase:,
// 		SlopedCorner:,
// 		HalfSlopedCornerBase:
// 	},
// 	slopeTransition: {
// 		SlopeTransitionBase:,
// 		SlopeTransition:,
// 		SlopeTransitionTip:,
// 		SlopeTransitionBaseMirrored:,
// 		SlopeTransitionMirrored:,
// 		SlopeTransitionTipMirrored:
// 	},
// 	panel: {
// 		CenterPanel:,
// 		SlopedPanel,
// 		SlopedSidePanel,
// 		2x1SlopedPanel,
// 		2x1SlopedPanelTip,
// 		2x1SlopedSideBasePanel,
// 		2x1SlopeSideTipPanel,
// 		2x1SlopeSideBasePanelInv,
// 		2x1SlopeSideTipPanelInv,
// 		HalfSlopedPanel,
// 		2x1HalfSlopedPanel,
// 		2x1HalfSlopedTipPanel,
// 		2x1HalfSlopedPanelInv,
// 		2x1HalfSlopedTipPanelInv,
// 		RoundPanel,
// 		RoundPanelCorner,
// 		RoundPanelFace,
// 		RoundPanelInvertedCorner,
// 		HalfCenterPanel,
// 		HalfPanel,
// 		QuarterPanel,
// 		Panel
// 	},
// 	slopeRound: {
// 		RoundSlope,
// 		RoundCorner,
// 		RoundInvertedCorner
// 	}
// }

let selectorBlocks = {};
const selectorBlockMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000
});

for (let i = 0; i < blockNames.length; i++) {

	const block = new THREE.Mesh(blockMeshes[blockNames[i]], selectorBlockMaterial);

	selectorBlocks[blockNames[i]] = block;

}

const testSelectorBlock = new THREE.Mesh(blockMeshes["Block"], selectorBlockMaterial);

/*
loader.load( './Block.obj', function (obj) {

	//const loadedGeo = obj.scene;
	const loadedMat = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	})

	//const loadedMesh = new THREE.Mesh(loadedGeo, loadedMat);


	obj.material = loadedMat;
	obj.materialLibraries = null;
	obj.material.needsUpdate = true;

	obj.needsUpdate = true;

	const loadedGeo = obj.children[0].geometry;

	loadedGeo.scale(20, 20, 20);

	const loadedObj = new THREE.Mesh(loadedGeo, loadedMat);

	console.log(loadedObj);
	console.log(obj);

	//scene.add(loadedObj);

}, undefined, function ( error ) {

	console.error( error );

} );*/

// const geo = new THREE.IcosahedronGeometry(1.0, 2);
// const mat = new THREE.MeshStandardMaterial({
// 	color: 0xffffff,
// 	flatShading: true
// })
// const mesh = new THREE.Mesh(geo, mat);
// gui.add(mesh);

// const wireMat = new THREE.MeshBasicMaterial({
// 	color: 0xffffff,
// 	wireframe: true
// })
// const wireMesh = new THREE.Mesh(geo, wireMat);
// wireMesh.scale.setScalar(1.001)
// mesh.add(wireMesh);

// const hemiLight = new THREE.HemisphereLight(0x000000, 0x000000);
// scene.add(hemiLight);

const lightTarget = new THREE.Object3D();
lightTarget.position.set(-0.25,-1,-0.5);
scene.add(lightTarget);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.target = lightTarget;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const trackerGeo = new THREE.BoxGeometry(gridScale,gridScale,gridScale);
const trackerMat = new THREE.MeshPhongMaterial({
	color: 0x55ff66,
	opacity: 0.5,
	transparent: true,
	wireframe: false
});
const cursorTracker = new THREE.Mesh(trackerGeo, trackerMat);
scene.add(cursorTracker);

const ringSize = 5;
const selectorWheelGeo = new THREE.RingGeometry( ringSize, ringSize*0.45, 128 );
selectorWheelGeo.rotateX(pi);
const selectorWheelMat = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });
const selectorWheel = new THREE.Mesh(selectorWheelGeo, selectorWheelMat);
selectorWheel.position.set(0,0,-10);
selectorWheel.visible = false;

gui.add(selectorWheel);

// selectorBlocks["Block"].position.set(0,0,-10);
// gui.add(selectorBlocks["Block"]);

// const gridHelper = new THREE.GridHelper(1000, 100);
// scene.add(gridHelper);

const pointer = new THREE.Vector2();

const objects = [];

// const geometry = new THREE.PlaneGeometry( 1000, 1000 );
//geometry.rotateX( - Math.PI / 2 );
const geometry = new THREE.PlaneGeometry(gs(300), gs(300));

const maxPlaneDist = gs(-52);
const minPlaneDist = gs(-2);
const planeDistFactor = (gridScale / 340);
let planeDist = gs(-8);
const plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
plane.position.set(0,0,planeDist);
camera.add( plane );
objects.push( plane );


//console.log(blockMeshes);

setTimeout(() => {
	
	//console.log(blockMeshes["2x1HalfSlopedPanel"]); // why does this need a 500 ms delay when loading the whole json doesn't? We may never know
	cursorTracker.geometry = blockMeshes["Block"];

	//cursorTracker.add(new THREE.Mesh(trackerMesh, trackerMat))

	//scene.add(new THREE.Mesh(blockMeshes["Block"], new THREE.MeshBasicMaterial()));

}, 500);

//cursorTracker.geometry = blocks["Block"];

globalThis.addEventListener('resize', onWindowResize);

globalThis.addEventListener('pointermove', onPointerMove);

globalThis.addEventListener('wheel', onMouseScroll);

globalThis.addEventListener('mousedown', onMouseDown);

globalThis.addEventListener('mouseup', onMouseUp);

setTimeout(render, 500);

function render(_t = 0) {
	
	//mesh.rotation.y = _t * 0.0001;
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	renderer.render(gui, guiCamera);
	controls.update();
	
	requestAnimationFrame(render);

}

function mouseButtonPressed(event, buttonName) {
	// Use binary `&` with the relevant power of 2 to check if a given button is pressed
	return Boolean(event.buttons & (1 << buttonNames.indexOf(buttonName)));
}

function blockSelector(event) {
	
	// const v1 = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
	// selectorWheel.quaternion.copy(camera.quaternion);
	// selectorWheel.position.copy(camera.position).add(v1.multiplyScalar(-10));

	const raycaster = pointerRaycast(event, guiCamera);

	const mouseGui = new THREE.Vector2(raycaster.ray.origin.x, raycaster.ray.origin.y);

	if (selectorWheel.visible == false) {

		const min = new THREE.Vector2(
			guiCamera.left + (ringSize),
			guiCamera.bottom + (ringSize)
		);
		const max = new THREE.Vector2(
			guiCamera.right - (ringSize),
			guiCamera.top - (ringSize)
		);

		const mouseClamped = mouseGui.clamp(min, max);

		selectorWheel.position.x = mouseClamped.x
		selectorWheel.position.y = mouseClamped.y

		selectorWheel.visible = true;

		// const testGeo = blockMeshes["Block"];
		// const testMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		// const testMesh = new THREE.Mesh(blockMeshes["Block"], testMat);
		// testMesh.position.set(0,0,-20);
		// gui.add(testMesh);

		gui.add(selectorBlocks["Block"]);
		selectorBlocks["Block"].position.set(0,0,-10);
		gui.add(testSelectorBlock);
		testSelectorBlock.position.set(0,0,-10);
		console.log(gui.children);

		setTimeout(() => {

			//scene.remove(testMesh)

		}, 5000);

	}

}

const placementModes = ["single", "line", "plane", "prism"];
let placementMode = "single";

function blockRaycaster(event) {

	const raycaster = pointerRaycast(event, camera);
	
	const intersects = raycaster.intersectObjects( objects, false );

	if ( intersects.length > 0 ) {

	 	const intersect = intersects[ 0 ];

	 	cursorTracker.position.copy( intersect.point ).add( intersect.face.normal );
	 	cursorTracker.position.divideScalar( gridScale ).floor().multiplyScalar( gridScale ).addScalar( gs(0.5) );

	}

}

function pointerRaycast(event, camera) {

	const raycaster = new THREE.Raycaster();

	pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

	raycaster.setFromCamera( pointer, camera );

	return raycaster

}

function onMouseDown (event) {

	if(mouseButtonPressed(event, "right")) {

		blockSelector(event);

	}
	
}

function onMouseUp (event) {

	if(!mouseButtonPressed(event, "right")) {
		
		selectorWheel.visible = false;

	}
	
}

function onPointerMove(event) {

	if(mouseButtonPressed(event, "right")) {
		
		blockSelector(event);

	} else {

		blockRaycaster(event);

	}

}

function onMouseScroll(event) {

	if (event.ctrlKey) {
		planeDist = Math.max(maxPlaneDist, Math.min(minPlaneDist, planeDist + (event.deltaY * planeDistFactor)));
		plane.position.set(0,0,planeDist);
	}

	if (!event.shiftKey) setTimeout(blockRaycaster, 1, event);

}

function onWindowResize() {

	const width = globalThis.innerWidth;
	const height = globalThis.innerHeight

	camera.aspect = width / height;
	guiCamera.left = (width / guiScale) / - 2
	guiCamera.right = (width / guiScale) / 2
	guiCamera.top = (height / guiScale) / 2
	guiCamera.bottom = (height / guiScale) / - 2
	camera.updateProjectionMatrix();
	guiCamera.updateProjectionMatrix();

	renderer.setSize(width, height);

	//controls.handleResize();

	render();

}

function loadBlockMeshes(location) {

	let blockMeshes = {};
	
	for (let blockNo = 0; blockNo < blockNames.length; blockNo ++) {

		loader.load( location  + blockNames[blockNo] + '.obj', function (obj) {

			const loadedGeo = obj.children[0].geometry;

			loadedGeo.scale(gs(), gs(), gs());

			blockMeshes[ blockNames[blockNo] ] = loadedGeo;
		
		}, undefined, function ( error ) {

			console.error( error );
		
		} );
	}

	return blockMeshes;

}

function gs(n = 1) {
	return n * gridScale;
}