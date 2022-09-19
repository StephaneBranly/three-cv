import { CameraControls, Planet, Stars } from "assets"
import { useGlobalContext } from "context"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from 'three'
import { interpolate } from "utils"
import { planets } from "consts"

export interface MenuProps {
    currentItem: number
}

const Menu = (props: MenuProps) => {
    const cameraControls = useRef<CameraControls | null>(null)
    const pointLight = useRef<THREE.PointLight | null>(null)
    const { currentItem } = props
    const { state, dispatch } = useGlobalContext()

    const angleRadiusToXY = (angle: number, radius: number) => {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
    }

    const XYToAngleRadius  = (x: number, y: number) => {
        return {
            angle: Math.atan2(y, x),
            radius: Math.sqrt(x*x + y*y)
        }
    }

    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.enabled = false
        }
    }, [])
    const [lastMoveTime, setLastMoveTime] = useState(state.clock.getElapsedTime())
    const [lastItem, setLastItem] = useState(currentItem)

    useFrame(() => {
        const elapsedTime = state.clock.getElapsedTime()
       
        if (elapsedTime < 1)
            cameraControls.current?.setPosition(0, 3, 1000)
        else if (elapsedTime > 1 && elapsedTime < 6)
            cameraControls.current?.setPosition(0, 3, interpolate(1, 1000, 6, 15, elapsedTime))
        else if (cameraControls.current) {
            const { x: x_current, y: y_current } = angleRadiusToXY((planets.length - currentItem) * (Math.PI * 2 / planets.length), 15)
            
            const currentCameraPosition = cameraControls.current?.getPosition(new THREE.Vector3())
            if (Math.sqrt(Math.pow(currentCameraPosition.x - x_current, 2) + Math.pow(currentCameraPosition.z - y_current, 2)) > 0.15) {
                // if 
                const targetAngle = Math.atan2(y_current, x_current)

                const currentAngle = Math.atan2(currentCameraPosition.z, currentCameraPosition.x)
                const delta = targetAngle - currentAngle < 0 ? targetAngle - currentAngle + Math.PI * 2 : targetAngle - currentAngle
            
                const rotationDelta = delta > Math.PI ? -Math.PI/128 : Math.PI/128
                const {x, y} = angleRadiusToXY(currentAngle+rotationDelta, 15)
                cameraControls.current?.setPosition(x,3,y)
                pointLight.current?.position.set(x, 3, y)
            } else
                setLastItem(currentItem)
        }
    })

    const handlerChangeScene = (position: [number, number, number]) => {
        const currentCameraPosition = cameraControls.current?.getPosition(new THREE.Vector3()) as THREE.Vector3
        cameraControls.current?.setLookAt(currentCameraPosition.x, currentCameraPosition.y, currentCameraPosition.z, position[0], position[1], position[2], true)
        cameraControls.current?.zoomTo(6, true)
    }

    const renderPlanets = () => {
        return planets.map((planet, index) => {
            const angle = (planets.length - index) * (Math.PI * 2 / planets.length)
            const {x,y} = angleRadiusToXY(angle, 5+planet.radius+planet.z)
            return <Planet planet={planet} selected={currentItem===index} position={[x, planet.z, y]} key={index} lookAt={handlerChangeScene} sphereArgs={[planet.radius, 32, 32]} orientation={angle}/>
        })
    }

    return (
        <group>
            <CameraControls ref={cameraControls} enabled={false} />
            <pointLight intensity={1} ref={pointLight} distance={20} />
            <Stars />
            {renderPlanets()}
        </group>
    )
  }

  export default Menu