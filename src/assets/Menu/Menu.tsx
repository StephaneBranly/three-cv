import { CameraControls, Planet, Stars } from "assets"
import { useGlobalContext } from "context";
import { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { start } from "repl";
import * as THREE from 'three'
import { changeScene, interpolate } from "utils";

export interface MenuProps {
}

const Menu = (props: MenuProps) => {
    const cameraControls = useRef<CameraControls | null>(null)

    const [state, dispatch] = useGlobalContext()

    const [changeSceneAnimation, setChangeSceneAnimation] = useState(false)
    const [startState, setStartState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [endState, setEndState] = useState({ pos: new THREE.Vector3(0, 0, 0), lookAt: new THREE.Vector3(0, 0, 0) })
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    useFrame(() => {
        const elapsedTime = state.clock.getElapsedTime()
        if (elapsedTime < 1)
            cameraControls.current?.setPosition(0, 3, 1000)
        if (elapsedTime > 1 && elapsedTime < 6)
            cameraControls.current?.setPosition(0, 3, interpolate(1, 1000, 6, 10, elapsedTime))
       
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
    return (
        <group>
            <CameraControls ref={cameraControls} />
            <Stars />
            <Planet position={[0, 0, 0]} sphereArgs={[0.5, 32, 32]} name={state.author} lookAt={handlerChangeScene} />
            <Planet position={[2, -1, 4]} sphereArgs={[1.2, 32, 32]} name={"Experience"} lookAt={handlerChangeScene}/>
            <Planet position={[-3, 1.4, -1]} sphereArgs={[1, 32, 32]} name={"Education"} lookAt={handlerChangeScene}/>
            <Planet position={[2, 5, -1]} sphereArgs={[1.2, 32, 32]} name={"Skills"} lookAt={handlerChangeScene}/>
            <Planet position={[-5, 5, -10]} sphereArgs={[1, 32, 32]} name={"Projects"} lookAt={handlerChangeScene} />
        </group>
    )
  }

  export default Menu