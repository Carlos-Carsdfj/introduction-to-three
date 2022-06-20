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
    //controls.target = new THREE.Vector3(0.5,0.5,0.5)
    controls.enableDamping = true

    //cube
    const geometryCube = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5 );
    const materialCube = new THREE.MeshBasicMaterial({
      color:0xd11515,
      transparent:true,
      opacity:0.5,
      wireframe :true,
    })
    const  cube = new THREE.Mesh(geometryCube, materialCube)
    //cube.position.z = -1.5
    scene.add(cube)

    //Sphere 
    const textureLoader = new THREE.TextureLoader()
    const matcap = textureLoader.load('/assets/textures/matcap.png')
    const geometrySphere = new THREE.SphereBufferGeometry( 0.3, 32, 16 );
    const materialSphere = new THREE.MeshMatcapMaterial( { 
      matcap:matcap
    } );
    const sphere = new THREE.Mesh( geometrySphere, materialSphere );
      sphere.position.x = 1
    //sphere.position.y = 1
    scene.add( sphere );
    
    //torus
    const geometryTorus = new THREE.TorusKnotBufferGeometry( 0.2, 0.05, 300, 20);
    const materialTorus = new THREE.MeshNormalMaterial({
      flatShading:true
    });
    const torusKnot = new THREE.Mesh( geometryTorus, materialTorus );
    torusKnot.position.x = -1
    //torusKnot.position.y = -0.3
    //orusKnot.position.set(-1,-0.3,1)
    //torusKnot.scale.y = 1.5
    //torusKnot.scale.x = 1.5
    //torusKnot.scale.set(1.5, 1.5, 0)
    scene.add( torusKnot );

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