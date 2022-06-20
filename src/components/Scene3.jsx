import React from 'react'
import  { useRef, useEffect } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

    controls.enableDamping = true

    //cube
    const textureLoader = new THREE.TextureLoader()
    const map = textureLoader.load('/assets/textures/brick/Brick_Wall_017_basecolor.jpg')
    const aoMap = textureLoader.load('/assets/textures/brick/Brick_Wall_017_ambientOcclusion.jpg')
    const roughnessMap = textureLoader.load('/assets/textures/brick/Brick_Wall_017_roughness.jpg')
    const normalMap = textureLoader.load('/assets/textures/brick/Brick_Wall_017_normal.jpg')
    const heightMap = textureLoader.load('/assets/textures/brick/Brick_Wall_017_height.png')
    

    const geometryCube = new THREE.BoxBufferGeometry( 1, 1, 1,250,250,250 );
    const materialCube = new THREE.MeshStandardMaterial({
      map:map,
      aoMap:aoMap,
      roughnessMap:roughnessMap,
      normalMap:normalMap,
      displacementMap:heightMap,
      displacementScale:0.02
      //wireframe:true
    })
    const  cube = new THREE.Mesh(geometryCube, materialCube)
    cube.scale.set(3,3,3)
    scene.add(cube)
   
    //Ambient ligth    
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5); 
    scene.add( ambientLight )
  
    const pointLight = new THREE.PointLight(
      0xffffff,
      1.5
    )

    pointLight.position.y = 2
    scene.add(pointLight)
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