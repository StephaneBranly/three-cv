import { useRef, Ref } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import THREE from "three"
import { MTLLoader, OBJLoader, GLTFLoader } from "three-stdlib"

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
        <mesh castShadow receiveShadow key={key} geometry={building.geometry} scale={0.1}>
          {/* <meshBasicMaterial attach="material" color={'#262626'} wireframe={false}/> */}
        </mesh>)
    })
    return <group scale={0.01}>{buildings}</group>
    return (
      <primitive castShadow receiveShadow object={gltf.scene} scale={0.01}>
      </primitive>
    )
  }
  
  
  const Poly = () => {
    // const materials = useLoader(MTLLoader, "/three-cv/models/compiegne.mtl")
    const obj = useLoader(OBJLoader, "/three-cv/models/compiegne.obj", (loader: any) => {
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
  
    const buildings =  obj.children.filter((child: any) => child.name === "Areas:building")[0] as any
    const  buildingEdges = new THREE.EdgesGeometry(buildings.geometry)
    const srtm =  obj.children.filter((child: any) => child.name === "EXPORT_GOOGLE_SAT_WM")[0] as any
  
    return  (
    <group scale={0.005} receiveShadow castShadow>
      <mesh ref={objRef as unknown as Ref<THREE.Mesh>} >
        <lineSegments geometry={buildingEdges} material={new THREE.LineBasicMaterial({color: '#e7487a' , linewidth:100, linecap:'round', linejoin:'round' })}/>
      </mesh>
  
      <primitive castShadow object={buildings}>
        <meshBasicMaterial attach="material" color={'#262626'} />
      </primitive>
  
      <primitive receiveShadow object={srtm}  >
        <meshBasicMaterial attach="material" color={'#3c4156'} />
      </primitive>
    </group>)
  }