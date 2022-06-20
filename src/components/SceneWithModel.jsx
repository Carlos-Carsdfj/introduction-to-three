import React from 'react'
import  { useRef, useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const Scene = () => {
  const mountRef = useRef(null)
  useEffect(() => {
    const currentMount = mountRef.current
    //Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 12
    scene.add(camera)

    //Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    //Controls 
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.y = 2  
    controls.enableDamping = true

    const gltftoader  = new GLTFLoader()
    gltftoader.load('/assets/models/amongus.gltf',
    (gltf)=>{
      scene.add(gltf.scene)
    }
    ) 

    

    //Ambient ligth    
    const ambientLight = new THREE.AmbientLight( 0xffffff, 1); 
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

      requestAnimationFrame( animate );

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render( scene, camera );
    }
    animate()
    
    //Clean Scene
    return ()=>{
      currentMount.removeChild(renderer.domElement)
    }
  }, [])
  
  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{width:'100%', height:'100vh'}}
    >
      
      <h1>Hello World</h1>
    </div>
  )
}

export default Scene