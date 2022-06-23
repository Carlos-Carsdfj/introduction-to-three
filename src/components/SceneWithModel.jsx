import React from 'react'
import  { useRef, useEffect } from 'react';
import { mounScene, cleanScene } from '../utils/script';
import './Scene.css'

const Scene = () => {
  const mountRef = useRef(null)
  useEffect(() => {
    //Mount Scene
    mounScene(mountRef)
    //Clean Scene
    return ()=>{
      cleanScene()
    }
  }, [])
  
  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{width:'100%', height:'100vh', position:'relative'}}
    >
      
      <h1 className='titlePage'>Hello World. My creator is Carlos_Carsdfj</h1>
    </div>
  )
}

export default Scene