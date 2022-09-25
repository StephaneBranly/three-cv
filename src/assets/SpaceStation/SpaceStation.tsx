import { useLoader } from "react-three-fiber"
import * as THREE from "three"
import { OBJLoader } from "three-stdlib"

export interface SpaceStationProps {
}

const SpaceStation = (props: SpaceStationProps) => {
    const obj = useLoader(OBJLoader, "/three-cv/models/space_station.obj")
       
    return <mesh geometry={(obj.children[0] as any).geometry as any} scale={0.2} position={[-0.45, -0.01, 0.3]}>
        <meshLambertMaterial attach='material' color={0xf0c0c0} side={THREE.DoubleSide} />
    </mesh>
  }

  export default SpaceStation