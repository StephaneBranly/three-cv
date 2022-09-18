import { CameraControls, Planet, Stars } from "assets"
import { useGlobalContext } from "context";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from 'three'
import { changeScene, interpolate } from "utils";

export interface MenuProps {
}

const Menu = () => {
    const cameraControls = useRef<CameraControls | null>(null)

    const { state, dispatch } = useGlobalContext()
    const [changeSceneAnimation, setChangeSceneAnimation] = useState(false)
    const [startState, setStartState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [endState, setEndState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const angleRadiusToXY = (angle: number, radius: number) => {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
    }
    const planets = [
        {
            name: 'Me',
            z: 1,
            radius: 0.8
        },
        {
            name: 'Experience',
            z: 0.5,
            radius: 1
        },
        {
            name: 'Skills',
            z: 1.2,
            radius: 1.1
        },
        {
            name: 'Education',
            z: 2,
            radius: 1.3
        },
        {
            name: 'Projects',
            z: 1.2,
            radius: 1
        },
        {
            name: 'Contact',
            z: 0.5,
            radius: 0.7
        }
    ]

    
    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.enabled = false
        }
    }, [])

    useFrame(() => {
        const elapsedTime = state.clock.getElapsedTime()
       
        if (elapsedTime < 1)
            cameraControls.current?.setPosition(0, 3, 1000)
        else if (elapsedTime > 1 && elapsedTime < 6)
            cameraControls.current?.setPosition(0, 3, interpolate(1, 1000, 6, 15, elapsedTime))
        else {
            const { x, y } = angleRadiusToXY(elapsedTime * 0.1, 15)
            cameraControls.current?.setPosition(x, 3, y)
        }
        if (changeSceneAnimation)
        {
            const cameraPosition = changeScene(startTime, elapsedTime, endTime, startState.pos as unknown as [number,number,number], endState.pos as unknown as [number,number,number])
            const cameraTarget = changeScene(startTime, elapsedTime, endTime, startState.lookAt as unknown as [number,number,number], endState.lookAt as unknown as [number,number,number])
            cameraControls.current?.setPosition(cameraPosition[0], cameraPosition[1], cameraPosition[2])
            cameraControls.current?.setTarget(cameraTarget[0], cameraTarget[1], cameraTarget[2])
            if (elapsedTime > endTime)
                setChangeSceneAnimation(false)
        }
    })

    const handlerChangeScene = (position: [number, number, number]) => {
        const elapsedTime = state.clock.getElapsedTime()
        setStartTime(elapsedTime)
        setEndTime(elapsedTime + 1)
        setStartState({ pos: cameraControls.current?.getPosition(new THREE.Vector3()) as THREE.Vector3, lookAt: cameraControls.current?.getTarget(new THREE.Vector3()) as THREE.Vector3 })
        setEndState({ pos: new THREE.Vector3(position[0], position[1], position[2]), lookAt: new THREE.Vector3(position[0], position[1], position[2]) })
        setChangeSceneAnimation(true)
    }

    const renderPlanets = () => {
        return planets.map((planet, index) => {
            const angle = index * (Math.PI * 2 / planets.length)
            const {x,y} = angleRadiusToXY(angle, 5+planet.radius+planet.z)
            return <Planet position={[x, planet.z, y]} key={index} name={planet.name} lookAt={handlerChangeScene} sphereArgs={[planet.radius, 32, 32]} textOrientation={[0,0,0]}/>
        })
    }

    return (
        <group>
            <CameraControls ref={cameraControls} />
            <Stars />
            {renderPlanets()}
        </group>
    )
  }

  export default Menu