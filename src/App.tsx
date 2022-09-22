/* eslint-disable no-sequences */
import { Suspense, useRef, Ref, useState } from "react"
import { Canvas } from "react-three-fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import "./App.scss"

import { Menu } from 'assets'
import { Menu as MenuHTML } from 'components'
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html><div id='loading'>{progress} % loaded</div></Html>
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

  const renderCurrentPageHTML = () => {
    switch (currentPage) {
      case 'Menu':
        return <MenuHTML currentItem={item} setCurrentItem={setCurrentItem}/>
      default:
        return <MenuHTML currentItem={item} setCurrentItem={setCurrentItem}/>
    }
  }
  return (
    <div
      className="App"
    >
        <Canvas
          // shadows
        >
          {/* <color attach="background" args={['#1A0570']} /> */}
          {/* <fog attach="fog" args={['#202030', 10, 25]} /> */}
          <Stats />
          <OrbitControls />
          <Suspense fallback={<Loader />}>
            {/* <gridHelper /> */}
            {/* <axesHelper /> */}
            {renderCurrentPage3D()}
            <ambientLight intensity={0.1} />
          </Suspense>
        </Canvas>
        <div id="overlay-content">
          {renderCurrentPageHTML()}
        </div>
    </div>
  )
}

export default App