import { Suspense, useRef, Ref } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import "./App.scss"

import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";


const Cube = () => {
  const cube = useRef<THREE.Mesh>()

  useFrame(() => {
    cube.current!.rotation.x += 0.01
    cube.current!.rotation.y += 0.01
  })

  return (
    <mesh ref={cube as unknown as Ref<THREE.Mesh>}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#F3A11A" />
    </mesh>
  )
}

const Scene = () => {
  const materials = useLoader(MTLLoader, "/three-cv/models/macbook.mtl");
  const obj = useLoader(OBJLoader, "/three-cv/models/macbook.obj", (loader: any) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <>
      <gridHelper />
      {/* <axesHelper /> */}
      <primitive object={obj} scale={0.01} />;
      <pointLight intensity={10.0} position={[5, 3, 5]} />
      {/* <Cube /> */}
    </>
  )
}

const App = () => {
  return (
    <div
      className="App"
    >
      <Canvas
        // concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 2, 5],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#8FCF84")
        }}
      >
        <Stats />
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
