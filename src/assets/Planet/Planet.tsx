/* eslint-disable react/jsx-no-undef */
import { useCursor } from '@react-three/drei'
import { Text } from 'assets'
import { useGlobalContext } from 'context'
import LinuxBiolinum from 'fonts/LinuxBiolinum.json'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { planet, variant } from 'types'


export interface PlanetProps {
    selected: boolean
    position: [number, number, number]
    sphereArgs: [radius: number, widthSegments: number, heightSegments: number] 
    planet: planet
    orientation: number
    lookAt: (position: [number, number, number]) => void
}

const Planet = (props: PlanetProps) => {
    const { position, sphereArgs, planet, lookAt, orientation, selected } = props

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
        // if (selected || Math.abs(scale - 1) > 0.01) {
        //     setTextPosition(new THREE.Vector3(0, 0-sphereArgs[0] - 0.5 + Math.sin(elapsedTime * 5) * 0.1, 0))
        //     setScale(1 - Math.sin(elapsedTime * 5) * 0.05)
        // }
    })

    const alphaThetaToXYZ = (alpha: number, theta: number, radius: number) => {
        return {
            x: radius * Math.sin(alpha) * Math.cos(theta),
            y: radius * Math.sin(alpha) * Math.sin(theta),
            z: radius * Math.cos(alpha)
        }
    }

    const renderVariant = (variant: variant, index: number) => {
        switch (variant.type) {
            case 'ring':
                return  (
                    <mesh rotation={[variant.rotationX,  variant.rotationY, 0]}>
                        <ringGeometry args={[sphereArgs[0] + variant.radius, sphereArgs[0]  + variant.radius + variant.width, 32]}/>
                        <meshPhysicalMaterial attach='material' color={selected?'#BA0':'#d7d7d6'} side={THREE.DoubleSide} />
                    </mesh>
                )
            case 'satellite':
                const { x, y, z }= alphaThetaToXYZ(variant.alpha, variant.theta, sphereArgs[0] + variant.distance)
                return (
                    <mesh position={[x,y,z]}>
                        <sphereBufferGeometry args={[variant.radius, 16, 16]} />
                        <meshPhysicalMaterial attach='material'  color={selected?'#BA0':'#d7d7d6'}  />
                    </mesh>
                )
            default: return null
        }
    }
    const renderVariants = () => {
        return planet.variants.map((variant, index) => renderVariant(variant, index))
    }
    return (
        <group 
            onClick={() => lookAt(position)} 
            // onPointerOver={() => handlerSetHovered(true)} 
            // onPointerOut={() => handlerSetHovered(false)} 
            ref={groupRef}
            rotation={[0, (Math.PI/2-orientation)%(Math.PI*2), 0]}
            position={position}
        >
            <group scale={scale}>
                <mesh>
                    <sphereBufferGeometry args={sphereArgs} />
                    {/* <meshPhysicalMaterial attach='material' color={selected?'#FD0':'#f7f7f6'} /> */}
                </mesh>
                {renderVariants()}
            </group>
            {selected && <Text text={planet.name} centerOrigin={true} color={selected?'#FD0':'#f7f7f6'} fontfile={LinuxBiolinum} meshProps={{position: textPosition, castShadow: true }} textGeometry={{size: 0.3, height: 0.03 }}/>}
      </group>
    )
  }

export default Planet