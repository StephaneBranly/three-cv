import { CameraControls, Planet, Stars } from "assets"
import { useMemo, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { start } from "repl";
import * as THREE from 'three'
import { changeScene } from "utils";

export interface MenuProps {
}

const Menu = (props: MenuProps) => {
    const cameraControls = useRef<CameraControls | null>(null);

    const [changeSceneAnimation, setChangeSceneAnimation] = useState(false)
    const [startState, setStartState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [endState, setEndState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const [clock] = useMemo(() => [new THREE.Clock()], [])
    useFrame(() => {
        const elapsedTime = clock.getElapsedTime()
        if (elapsedTime < 1)
            cameraControls.current?.setPosition(0, 3, 1000)
        if (elapsedTime > 1 && elapsedTime < 4)
            cameraControls.current?.setPosition(0, 3, 1000 - 1 / (1 + Math.exp(-(elapsedTime-1)*2)) * 1000 + 10)
       
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
        const elapsedTime = clock.getElapsedTime()
        setStartTime(elapsedTime)
        setEndTime(elapsedTime + 1)
        setStartState({ pos: cameraControls.current?.getPosition(new THREE.Vector3()) as THREE.Vector3, lookAt: cameraControls.current?.getTarget(new THREE.Vector3()) as THREE.Vector3 })
        const endPosition = changeScene(0, .80, 1, startState.pos as unknown as [number,number,number], position)
        setEndState({ pos: new THREE.Vector3(endPosition[0], endPosition[1], endPosition[2]), lookAt: new THREE.Vector3(position[0], position[1], position[2]) })
        setChangeSceneAnimation(true)
    }
    const lookAt = (position: [number, number, number]) => {
        cameraControls.current?.setTarget(position[0], position[1], position[2])
    }

    return (
        <group>
            <CameraControls ref={cameraControls} />
            <Stars />
            <Planet position={[0, 0, 0]} sphereArgs={[0.5, 32, 32]} name={"Me"} lookAt={handlerChangeScene} />
            <Planet position={[2, -1, 4]} sphereArgs={[1.2, 32, 32]} name={"Experience"} lookAt={handlerChangeScene}/>
            <Planet position={[-3, 1.4, -1]} sphereArgs={[1, 32, 32]} name={"Education"} lookAt={handlerChangeScene}/>
            <Planet position={[2, 5, -1]} sphereArgs={[1.2, 32, 32]} name={"Skills"} lookAt={handlerChangeScene}/>
            <Planet position={[-5, 5, -10]} sphereArgs={[1, 32, 32]} name={"Projects"} lookAt={handlerChangeScene} />
        </group>
    )
  }

  export default Menu