/* eslint-disable react/jsx-no-undef */
import { useCursor } from '@react-three/drei'
import { Text } from 'assets'
import LinuxBiolinum from 'fonts/LinuxBiolinum.json'
import { useMemo, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'


export interface PlanetProps {
    position: [number, number, number]
    sphereArgs: [radius: number, widthSegments: number, heightSegments: number] 
    name: string
}

const Planet = (props: PlanetProps) => {
    const { position, sphereArgs, name } = props

    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [textPosition, setTextPosition] = useState(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5, position[2]))
    const [scale, setScale] = useState(1)
    useCursor(hovered)


    const [clock] = useMemo(() => [new THREE.Clock()], [])

    const handlerSetHovered = (value: boolean) => {
        if (!value) setTextPosition(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5, position[2]))
        setHovered(value)
    }
    useFrame(() => {
        if (hovered) {
            const elapsedTime = clock.getElapsedTime()
            setTextPosition(new THREE.Vector3(position[0], position[1] - sphereArgs[0] - 0.5 + Math.sin(elapsedTime * 5) * 0.1, position[2]))
            setScale(1 - Math.sin(elapsedTime * 5) * 0.05)
        }
    })

    return (
        <group onClick={() => setClicked(true)} onPointerOver={() => handlerSetHovered(true)} onPointerOut={() => handlerSetHovered(false)} >
            <mesh position={position} scale={scale} receiveShadow>
                <sphereBufferGeometry args={sphereArgs} />
                <meshPhysicalMaterial attach='material' color={hovered?'#FD0':'#f7f7f6'} />
            </mesh>
            <Text text={name} centerOrigin={true} color={hovered?'#FD0':'#f7f7f6'} fontfile={LinuxBiolinum} meshProps={{position: textPosition, castShadow: true}} textGeometry={{size: 0.3, height: 0.03 }}/>
      </group>
    )
  }

export default Planet