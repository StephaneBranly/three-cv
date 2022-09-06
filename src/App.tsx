/* eslint-disable no-sequences */
import { Suspense, useRef, Ref, useState } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import "./App.scss"

import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Text } from 'assets'
import { LineSegments, MeshBasicMaterial } from "three"
import { Html, useProgress } from '@react-three/drei'
import G7font from 'fonts/g7.json'
import Color from "colorjs.io"
import { range } from "lodash"
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}


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

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI/2, 0,0]} receiveShadow>
      <planeBufferGeometry args={[20, 10]} />
      <meshStandardMaterial color="#0F8A71" />
    </mesh>
  )
}

const Walls = () => {
  return (
    <group>
      <mesh rotation={[0,Math.PI/2,0]} position={[-6, 2.5, 0]} receiveShadow>
        <planeBufferGeometry args={[10, 5]} />
        <meshStandardMaterial color="#FF8A71" />
      </mesh>
      <mesh receiveShadow position={[0, 2.5, -1]}>
        <planeBufferGeometry args={[20, 5]} />
        <meshStandardMaterial color="#FF8A71" />
      </mesh>
    </group>
  )
}

const CovBox = (props: { x : number, y : number, value : number}) => {
  const { x, y, value } = props
  const box = useRef<THREE.Mesh>()
  const clock = new THREE.Clock();
  // useFrame(() => {
  //   const z = Math.sin(clock.getElapsedTime()+x*Math.PI/5+y*Math.PI/5) * 0.5
  //   box.current!.position.y = z + 0.01;

  //   const c1 = new Color("rebeccapurple")
  //   const c2 = new Color("lch", [85, 100, 85])
  //   const linspace = c1.range(c2, {space: "srgb"})
  //   const rgb = linspace(1-z-0.5).srgb // midpoint
  //   // console.log(rgb)

  //   box.current!.material = new THREE.MeshBasicMaterial({color: new THREE.Color(...rgb)})
  // })
  const interpolateColor = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, ratio: number) => {
    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g =  Math.round(g1 + (g2 - g1) * ratio)
    const b =  Math.round(b1 + (b2 - b1) * ratio)
    return [r, g, b]
  }
  const computeColor = (value: number) => {
    const color = interpolateColor(76, 36, 98, 247, 193, 137, value)
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  }

  if (x === y) 
    return (
      <mesh position={[-5 + x / 2, value-1/2+0.01, y / 2]} castShadow>
        <boxBufferGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color={computeColor(value)} />
      </mesh>
    ) 
  return (
    <group>
      <mesh position={[-5 + x / 2, value-1/2+0.01, y / 2]} castShadow>
        <boxBufferGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color={computeColor(value)} />
      </mesh>
      <mesh position={[-5 + y / 2, value-1/2+0.01, x / 2]} castShadow>
        <boxBufferGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color={computeColor(value)} />
      </mesh>
    </group>
  )
}

const CovMatrix = (props: {size: number}) => {
  const { size } = props
  const generateNewCovMatrix = () => {
    return range(size).map(x => range(x+1).map((y) => x===y?1:Math.random()))
  }
  const interpolate = (x1: number, y1: number, x2: number, y2: number, x: number) => {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1)
  }
  const [matrixFrom, setMatrixFrom] = useState(generateNewCovMatrix())
  const [matrixTo, setMatrixTo] = useState(generateNewCovMatrix())
  const [matrix, setMatrix] = useState(matrixFrom)
  const [clock, setClock] = useState(new THREE.Clock())

  useFrame(() => {
    const time = clock.getElapsedTime()
    if (time > 2) {
      setMatrixFrom(matrixTo)
      setMatrixTo(generateNewCovMatrix())
      clock.start()
    } else if (time <= 1) {
      setMatrix(range(size).map(x => range(x+1).map((y) => interpolate(0, matrixFrom[x][y], 1, matrixTo[x][y], time))))
    } 
  })
  return (
    <group>
      {range(size).map((x) => range(x+1).map((y) => <CovBox key={`cov(x${x},x${y})`} x={x} y={y} value={matrix[x][y]} />))}
    </group>
  )
}

const Computer = () => {
  const materials = useLoader(MTLLoader, "/three-cv/models/macbook.mtl");
  const obj = useLoader(OBJLoader, "/three-cv/models/macbook.obj", (loader: any) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const objRef = useRef<THREE.Mesh>()
  const clock = new THREE.Clock();

  useFrame(() => {
    objRef.current!.rotation.x =  Math.sin(clock.getElapsedTime()) * 0.01;
    objRef.current!.rotation.z =  Math.sin(clock.getElapsedTime()) * 0.054;
    objRef.current!.rotation.y =   Math.sin(clock.getElapsedTime()) * 0.031;
    objRef.current!.position.y =   Math.sin(clock.getElapsedTime()) * 0.016;
  })

  console.log(obj)
  
  return <primitive object={obj} scale={0.01} ref={objRef}/>;
}
const UTC = () => {
  const gltf = useLoader(GLTFLoader, '/three-cv/models/compi.gltf')
  console.log(gltf.scene)
  const buildings = (gltf.scene.children as THREE.Mesh[]).map((building: THREE.Mesh, key) => {
    // const extrudedBuilding = new THREE.ExtrudeGeometry(building.geometry, extrudeSettings);
    // building.material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    console.log(building.name)
    return (
      <mesh  castShadow receiveShadow key={key} geometry={building.geometry} scale={0.1}>
        {/* <meshBasicMaterial attach="material" color={'#262626'} wireframe={false}/> */}
      </mesh>)
  })
  return <group>{buildings}</group>
  return (
    <primitive castShadow receiveShadow object={gltf.scene} scale={0.01}>
    </primitive>
  )
}

const Poly = () => {
  // const materials = useLoader(MTLLoader, "/three-cv/models/compiegne.mtl")
  const obj = useLoader(OBJLoader, "/three-cv/models/utc.obj", (loader: any) => {
    // materials.preload()
    // loader.setMaterials(materials)
  });

  const objRef = useRef<THREE.Mesh>()

  // obj.children.forEach((child: any, i) => { 
  //   console.log(child)
  //   switch (child.name) {
  //     case "Areas:building":
  //       child.material = new MeshBasicMaterial({ color: "#DDF" })
  //       break
  //     case "Areas:landuse":
  //       child.material = new MeshBasicMaterial({ color: "#2F5" })
  //       break
  //     default:
  //       child.material = new MeshBasicMaterial({ visible: false, color: "#DD0", opacity: 0 })
  //   }
   
  // })

  console.log(obj.children)
  const extrudeSettings = {
    steps: 2,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 10,
    bevelOffset: 0,
    bevelSegments: 1
  };
  const buildings = (obj.children as THREE.Mesh[]).map((building: THREE.Mesh, key) => {
    // const extrudedBuilding = new THREE.ExtrudeGeometry(building.geometry, extrudeSettings);
    // building.material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    return (
      <mesh key={key} geometry={building.geometry} scale={0.1}>
        <meshBasicMaterial attach="material" color={'#262626'} />
      </mesh>)
  })
  // return <group>{buildings as any}</group>
  return <primitive object={obj} scale={0.1} ref={objRef}/>

  // const buildings =  obj.children.filter((child: any) => child.name === "Areas:building")[0] as any
  // const  buildingEdges = new THREE.EdgesGeometry(buildings.geometry)
  // const srtm =  obj.children.filter((child: any) => child.name === "EXPORT_GOOGLE_SAT_WM")[0] as any

  // return  (
  // <group scale={0.005}>
  //   <mesh ref={objRef as unknown as Ref<THREE.Mesh>} >
  //     <lineSegments geometry={buildingEdges} material={new THREE.LineBasicMaterial({color: '#e7487a' , linewidth:100, linecap:'round', linejoin:'round' })}/>
  //   </mesh>

  //   <primitive castShadow object={buildings}>
  //     <meshBasicMaterial attach="material" color={'#262626'} />
  //   </primitive>

  //   <primitive receiveShadow object={srtm}  >
  //     <meshBasicMaterial attach="material" color={'#3c4156'} />
  //   </primitive>
  // </group>)
}

const Scene = () => {
  return (
    <>
      <gridHelper />
      <axesHelper />
      {/* <Computer /> */}
      {/* <UTC /> */}
      {/* <Poly /> */}
      <CovMatrix size={5}/>
      <pointLight intensity={1.0} position={[0, 3, 5]} castShadow />
      {/* <ambientLight intensity={0.5} /> */}

     
      <Text text="Stephane BRANLY" color="#e7f8fa" fontfile={G7font} meshProps={{position: [-2,0,0], castShadow: true}} textGeometry={{size: 0.3}}/>
      <Floor />
      <Walls />
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
        // colorManagement
        // shadowMap
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [2, 2, 4],
          // rotation: [0, Math.PI/5, 0]
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#FFFFFF")
        }}
        
      >
        <Stats />
        <OrbitControls />
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App