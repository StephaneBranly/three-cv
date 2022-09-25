import { CameraControls, MainPlanet, Planet, Planets, Stars } from "assets"
import { useGlobalContext } from "context"
import { useEffect, useRef, useState } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import * as THREE from 'three'
import { alphaThetaToXYZ, interpolate } from "utils"
import { menu, planets,  startAnimation as sA } from "consts"



import { MeshPhongMaterial } from "three"
import { OBJLoader } from "three-stdlib"
export interface MenuProps {
    currentItem: number
}

const Menu = (props: MenuProps) => {
    const cameraControls = useRef<CameraControls | null>(null)
    const pointLight = useRef<THREE.PointLight | null>(null)
    const { currentItem } = props
    const { state, dispatch } = useGlobalContext()
    const obj = useLoader(OBJLoader, './models/space_station.obj')

    const angleRadiusToXY = (angle: number, radius: number) => {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
    }

    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.minDistance = 5
            cameraControls.current.maxDistance = 25
            // cameraControls.current.mouseButtons.middle = THREE.MOUSE.LEFT
            // cameraControls.current.mouseButtons.right = THREE.MOUSE.LEFT
            // cameraControls.current.enabled = false
            // cameraControls.current.mouseButto
            // cameraControls.current?.setPosition(sA.startDistance, 3, 0)
            // pointLight.current?.position.set(sA.endDistance, 3, 0)
        }
    }, [])

    const [cameraRotating, setCameraRotating] = useState(false)

    useFrame(() => {
        const elapsedTime = state.clock.getElapsedTime()
       
        if (elapsedTime > sA.startTime && elapsedTime < sA.endTime) {
            cameraControls.current?.setPosition(interpolate(sA.startTime, sA.startDistance, sA.endTime, sA.endDistance, elapsedTime), 3, 0)
            if (cameraControls.current && cameraControls.current.enabled) 
                cameraControls.current.enabled = false
        }
        else if (cameraControls.current) {
            if (cameraControls.current && !cameraControls.current.enabled) 
                cameraControls.current.enabled = true
        }
        //     const { x: x_current, y: y_current } = angleRadiusToXY((planets.length - currentItem) * (Math.PI * 2 / planets.length), 15)
            
        //     const currentCameraPosition = cameraControls.current?.getPosition(new THREE.Vector3())
        //     if (Math.sqrt(Math.pow(currentCameraPosition.x - x_current, 2) + Math.pow(currentCameraPosition.z - y_current, 2)) > 0.15) {
        //         if (!cameraRotating) {
        //             setCameraRotating(true)
        //         }
        //         const targetAngle = Math.atan2(y_current, x_current)

        //         const currentAngle = Math.atan2(currentCameraPosition.z, currentCameraPosition.x)
        //         const delta = targetAngle - currentAngle < 0 ? targetAngle - currentAngle + Math.PI * 2 : targetAngle - currentAngle
            
        //         const rotationDelta = delta > Math.PI ? -Math.PI/128 : Math.PI/128
        //         const {x, y} = angleRadiusToXY(currentAngle+rotationDelta, 15)
        //         cameraControls.current?.setPosition(x,3,y)
        //         pointLight.current?.position.set(x, 3, y)
        //     } else if (cameraRotating) {
        //         setCameraRotating(false)
        //     }
        // }
    })

    return (
        <group>
            <CameraControls ref={cameraControls} enabled={false} />
            <pointLight intensity={1} ref={pointLight} distance={200} position={[90,0,90]} />
            <Stars />
            <Planets />
            <MainPlanet />
        </group>
    )
  }

  export default Menu