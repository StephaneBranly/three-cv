/* eslint-disable no-sequences */
import { Suspense, useRef, Ref, useState } from "react"
import { Canvas } from "react-three-fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import "./App.scss"

import { Menu } from 'assets'
import { Html, useProgress } from '@react-three/drei'
import { planets } from "consts"

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('Menu')
  const [item, setCurrentItem] = useState(0)

  // const handlerWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  //   if (Math.abs(e.deltaY) > 100) {
  //     setWheel(wheel + 0.1)
  //   }
  // }
  const renderCurrentPage3D = () => {
    switch (currentPage) {
      case 'Menu':
        return <Menu currentItem={item}/>
      default:
        return <Menu currentItem={item}/>
    }
  }
  return (
    <div
      className="App"
    >
        <Canvas
          // shadows
        >
          <color attach="background" args={['#202030']} />
          {/* <fog attach="fog" args={['#202030', 10, 25]} /> */}
          <Stats />
          <OrbitControls />
          <Suspense fallback={<Loader />}>
            {/* <gridHelper /> */}
            {/* <axesHelper /> */}
            {renderCurrentPage3D()}
            <ambientLight intensity={0.7} />
          </Suspense>
        </Canvas>
        <div id="overlay-content">
          <nav className="menu">
            <ul>
             {planets.map((planet, i) => {
                return <li key={i} className={i===item?'selected':''} onMouseEnter={() => setCurrentItem(i)}>{planet.name}</li>
               })}
            </ul>
          </nav>
        </div>
    </div>
  )
}

export default App