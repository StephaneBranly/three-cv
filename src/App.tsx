import { Suspense, useRef, Ref } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import * as three from "three"
import "./App.scss"

const Cube = () => {
  const cube = useRef<three.Mesh>()

  useFrame(() => {
    cube.current!.rotation.x += 0.01
    cube.current!.rotation.y += 0.01
  })

  return (
    <mesh ref={cube as unknown as Ref<three.Mesh>}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#F3A11A" />
    </mesh>
  )
}

const Scene = () => {
  return (
    <>
      {/* <gridHelper /> */}
      {/* <axesHelper /> */}
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <Cube />
    </>
  )
}

const App = () => {
  return (
    <div
      className="App"
    >
      <h1>Stéphane BRANLY</h1>
      <Canvas
        // concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934")
        }}
      >
        {/* <Stats /> */}
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
