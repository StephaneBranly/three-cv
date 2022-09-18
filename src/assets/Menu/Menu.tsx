import { CameraControls, Planet, Stars } from "assets"
import { useGlobalContext } from "context"
import { useEffect, useRef } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from 'three'
import { interpolate } from "utils"
import { planets } from "consts"

export interface MenuProps {
    currentItem: number
}

const Menu = (props: MenuProps) => {
    const cameraControls = useRef<CameraControls | null>(null)

    const { currentItem } = props
    const { state, dispatch } = useGlobalContext()

    const angleRadiusToXY = (angle: number, radius: number) => {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
    }

    useFrame(() => {
        const elapsedTime = state.clock.getElapsedTime()
       
        if (elapsedTime < 1)
            cameraControls.current?.setPosition(0, 3, 1000)
        else if (elapsedTime > 1 && elapsedTime < 6)
            cameraControls.current?.setPosition(0, 3, interpolate(1, 1000, 6, 15, elapsedTime))
        else {
            // const { x, y } = angleRadiusToXY(elapsedTime * 0.1, 15)
            const { x, y } = angleRadiusToXY(currentItem * (Math.PI * 2 / planets.length), 15)
            cameraControls.current?.setPosition(x, 3, y)
        }
    })

    const handlerChangeScene = (position: [number, number, number]) => {
        const currentCameraPosition = cameraControls.current?.getPosition(new THREE.Vector3()) as THREE.Vector3
        cameraControls.current?.setLookAt(currentCameraPosition.x, currentCameraPosition.y, currentCameraPosition.z, position[0], position[1], position[2], true)
        cameraControls.current?.zoomTo(6, true)
    }

    const renderPlanets = () => {
        return planets.map((planet, index) => {
            const angle = index * (Math.PI * 2 / planets.length)
            const {x,y} = angleRadiusToXY(angle, 5+planet.radius+planet.z)
            return <Planet position={[x, planet.z, y]} key={index} name={planet.name} lookAt={handlerChangeScene} sphereArgs={[planet.radius, 32, 32]} orientation={angle}/>
        })
    }

    return (
        <group>
            <CameraControls ref={cameraControls} enabled={false} />
            <Stars />
            {renderPlanets()}
        </group>
    )
  }

  export default Menu