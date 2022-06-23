import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let currentMount = null
//Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	25,
	100/100,
	0.1,
	1000
)
camera.position.z = 12
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer()
    

//Controls 
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.y = 2  
controls.enableDamping = true
    
//Resize
const resize = ()=>{
	renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
	camera.aspect = currentMount.clientWidth  / currentMount.clientHeight
	camera.updateProjectionMatrix()
}

window.addEventListener('resize', resize)

// Loader model     
const gltftoader  = new GLTFLoader()
gltftoader.load('/assets/models/amongus.gltf',
	(gltf)=>{
		scene.add(gltf.scene)
	}
) 

    

//Ambient ligth    
const ambientLight = new THREE.AmbientLight( 0xffffff, 1) 
scene.add( ambientLight )
  

const enviromentMap = new THREE.CubeTextureLoader()
const envMap = enviromentMap.load([
	'/assets/light/envmap/px.png',
	'/assets/light/envmap/nx.png',
	'/assets/light/envmap/py.png',
	'/assets/light/envmap/ny.png',
	'/assets/light/envmap/pz.png',
	'/assets/light/envmap/nz.png',
])
scene.environment = envMap

//Render the scene

function animate() {

	requestAnimationFrame( animate )

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update()

	renderer.render( scene, camera )
}
animate()
    
export  function mounScene(mountRef){
	currentMount = mountRef.current
	resize()
	currentMount.appendChild(renderer.domElement)
}
export function cleanScene(){
	//scene.dispose()
	currentMount.removeChild(renderer.domElement)

}
