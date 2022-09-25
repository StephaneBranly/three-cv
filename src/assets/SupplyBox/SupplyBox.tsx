import { useLoader } from "react-three-fiber"
import * as THREE from "three"
import { OBJLoader } from "three-stdlib"

export interface SupplyBoxProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
}

const SupplyBox = (props: SupplyBoxProps) => {
    const { position, rotation } = props

    const obj = useLoader(OBJLoader, "/three-cv/models/supply_box.obj")
       
    return <mesh geometry={(obj.children[0] as any).geometry as any} scale={0.08} position={position} rotation={rotation}>
        <meshLambertMaterial attach='material' color={0xf0c0c0} side={THREE.DoubleSide} />
    </mesh>;
  }

  export default SupplyBox