/* eslint-disable react/jsx-no-undef */
import { useCursor } from '@react-three/drei'
import { Text } from 'assets'
import { useGlobalContext } from 'context'
import LinuxBiolinum from 'fonts/LinuxBiolinum.json'
import { useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'


export interface PlanetProps {
    position: [number, number, number]
    sphereArgs: [radius: number, widthSegments: number, heightSegments: number] 
    name: string
    textOrientation: [number, number, number]
    lookAt: (position: [number, number, number]) => void
}

const Planet = (props: PlanetProps) => {
    const { position, sphereArgs, name, lookAt, textOrientation } = props

    const { state, dispatch } = useGlobalContext()

    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [textPosition, setTextPosition] = useState(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5, position[2]))
    const [scale, setScale] = useState(1)
    const [lastHoverTime, setLastHoverTime] = useState(state.clock.getElapsedTime())
    useCursor(hovered)



    const handlerSetHovered = (value: boolean) => {
        if (!value) setTextPosition(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5, position[2]))
        else setLastHoverTime(state.clock.getElapsedTime())
        setHovered(value)
    }
    useFrame(() => {
        const elapsedTime = lastHoverTime - state.clock.getElapsedTime()

        if (hovered || Math.abs(scale - 1) > 0.01) {
            setTextPosition(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5 + Math.sin(elapsedTime * 5) * 0.1, position[2]))
            setScale(1 - Math.sin(elapsedTime * 5) * 0.05)
        }
    })

    return (
        <group onClick={() => lookAt(position)} onPointerOver={() => handlerSetHovered(true)} onPointerOut={() => handlerSetHovered(false)} >
            <mesh position={position} scale={scale} receiveShadow>
                <sphereBufferGeometry args={sphereArgs} />
                <meshPhysicalMaterial attach='material' color={hovered?'#FD0':'#f7f7f6'} />
            </mesh>
            <Text text={name} centerOrigin={true} color={hovered?'#FD0':'#f7f7f6'} fontfile={LinuxBiolinum} meshProps={{position: textPosition, castShadow: true, rotation: textOrientation}} textGeometry={{size: 0.3, height: 0.03 }}/>
      </group>
    )
  }

export default Planet