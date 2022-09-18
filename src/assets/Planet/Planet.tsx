/* eslint-disable react/jsx-no-undef */
import { useCursor } from '@react-three/drei'
import { Text } from 'assets'
import { useGlobalContext } from 'context'
import LinuxBiolinum from 'fonts/LinuxBiolinum.json'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'


export interface PlanetProps {
    selected: boolean
    position: [number, number, number]
    sphereArgs: [radius: number, widthSegments: number, heightSegments: number] 
    name: string
    orientation: number
    lookAt: (position: [number, number, number]) => void
}

const Planet = (props: PlanetProps) => {
    const { position, sphereArgs, name, lookAt, orientation, selected } = props

    const { state, dispatch } = useGlobalContext()

    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [lastSelectedState, setLastSelectedState] = useState(selected)

    const [textPosition, setTextPosition] = useState(new THREE.Vector3(0,  -sphereArgs[0] - 0.5, 0))
    const [scale, setScale] = useState(1)
    const [lastHoverTime, setLastHoverTime] = useState(state.clock.getElapsedTime())
    useCursor(hovered)
    const groupRef = useRef<THREE.Group>(null)

    // const handlerSetHovered = (value: boolean) => {
    //     if (!value) setTextPosition(new THREE.Vector3(0, 0-sphereArgs[0] - 0.5, 0))
    //     else setLastHoverTime(state.clock.getElapsedTime())
    //     setHovered(value)
    // }

    useFrame(() => {
        const elapsedTime = lastHoverTime - state.clock.getElapsedTime()

        if (selected !== lastSelectedState) {
            if (!selected) setTextPosition(new THREE.Vector3(0, 0-sphereArgs[0] - 0.5, 0))
            else setLastHoverTime(state.clock.getElapsedTime())
            setLastSelectedState(selected)
        }
        if (selected || Math.abs(scale - 1) > 0.01) {
            setTextPosition(new THREE.Vector3(0, 0-sphereArgs[0] - 0.5 + Math.sin(elapsedTime * 5) * 0.1, 0))
            setScale(1 - Math.sin(elapsedTime * 5) * 0.05)
        }
    })

    return (
        <group 
            onClick={() => lookAt(position)} 
            // onPointerOver={() => handlerSetHovered(true)} 
            // onPointerOut={() => handlerSetHovered(false)} 
            ref={groupRef}
            rotation={[0, (Math.PI/2-orientation)%(Math.PI*2), 0]}
            position={position}
        >
            <mesh  scale={scale} receiveShadow>
                <sphereBufferGeometry args={sphereArgs} />
                <meshPhysicalMaterial attach='material' color={selected?'#FD0':'#f7f7f6'} />
            </mesh>
            <Text text={name} centerOrigin={true} color={selected?'#FD0':'#f7f7f6'} fontfile={LinuxBiolinum} meshProps={{position: textPosition, castShadow: true }} textGeometry={{size: 0.3, height: 0.03 }}/>
      </group>
    )
  }

export default Planet