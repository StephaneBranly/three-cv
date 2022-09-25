import { useEffect, useRef } from "react"
import { useLoader } from "react-three-fiber"
import * as THREE from "three"
import { OBJLoader } from "three-stdlib"

export interface SpotProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
} 

const Spot = (props: SpotProps) => {
    const { position, rotation } = props

    const spotTarget = useRef<THREE.Object3D>(null)
    const spot = useRef<THREE.SpotLight>(null)
    const obj = useLoader(OBJLoader, "/three-cv/models/spot.obj")
       
    useEffect(() => {
        if (spot.current && spotTarget.current)
            spot.current.target = spotTarget.current
    }, [])
    const targetPosition = [0.1,0,.2] as [number, number, number]
    return <group position={position} rotation={rotation}>
        <mesh geometry={(obj.children[0] as any).geometry as any} scale={0.04}>
            <meshLambertMaterial attach='material' color={0xf0c0c0} side={THREE.DoubleSide} />
        </mesh>
        {/* <spotLight ref={spot} color='#ddd' position={[0,.15,0]} intensity={.2} angle={Math.PI/6} />
        <object3D position={targetPosition} ref={spotTarget} /> */}
    </group>

  }

  export default Spot
