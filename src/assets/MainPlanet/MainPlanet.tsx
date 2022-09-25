import { SpaceStation, Spot, SupplyBox, Text } from "assets"
import { menu } from "consts"
import { useLoader } from "react-three-fiber"
import * as THREE from "three"
import { OBJLoader } from "three-stdlib"
import { alphaThetaToXYZ } from "utils"

export interface MainPlanetProps {
}


const MainPlanet = (props: MainPlanetProps) => {
    const obj = useLoader(OBJLoader, "/three-cv/models/planet.obj")

    const renderItem = (alpha: number, theta: number, index: number) => {
        const { x, y, z } = alphaThetaToXYZ(alpha, theta, 5)
        return <group key={index} rotation={[Math.PI/2, theta, -alpha]} position={[x,y,z]}>
            <mesh>
                <sphereBufferGeometry args={[0.1, 64, 64]} />
                <meshLambertMaterial attach='material' color={0xf02020} />
            </mesh>
            {/* <Text meshProps={{rotation: [-Math.PI/2,0,0]}} centerOrigin={true} text={"Me"} /> */}
            <group position={[0,-1.01,0]}>
                <SpaceStation />
                <Spot position={[-0.45, 0, -.1]} />
                <SupplyBox position={[-1.2, -.01, 0]} rotation={[0,.5, 0]} />
                <SupplyBox position={[-.35, -.01, -.07]} rotation={[0,1, 0]} />
                <SupplyBox position={[-.29, -.01, -.07]} rotation={[0,.2, 0]} />
            </group>

        </group>
    }
    
    return  <group 
        position={[0,0,0]}
        >
        <mesh geometry={(obj.children[0] as any).geometry as any} scale={1} position={[-0.45, -0.01, 0.3]}>
            <meshLambertMaterial attach='material' color={0x17f793} side={THREE.DoubleSide} />
        </mesh>
            {menu.map((item, i) => renderItem(item.alpha, item.theta, i))}
    </group>
  }

  export default MainPlanet