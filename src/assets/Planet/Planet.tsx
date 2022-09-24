import { useRef } from 'react'
import * as THREE from 'three'
import { planet, variant } from 'types'
import { alphaThetaToXYZ } from 'utils'

export interface PlanetProps {
    planet: planet
}

const Planet = (props: PlanetProps) => {
    const { planet } = props



    const groupRef = useRef<THREE.Group>(null)

    const renderVariant = (variant: variant, index: number) => {
        switch (variant.type) {
            case 'ring':
                return  (
                    <mesh key={index} rotation={[variant.rotationX,  variant.rotationY, 0]} material={variant.material}>
                        <ringGeometry args={[planet.radius + variant.radius, planet.radius  + variant.radius + variant.width, 32]}/>
                    </mesh>
                )
            case 'satellite':
                const { x, y, z } = alphaThetaToXYZ(variant.alpha, variant.theta, planet.radius + variant.distance)
                return (
                    <mesh key={index} position={[x,y,z]} material={variant.material}>
                        <sphereBufferGeometry args={[variant.radius, 16, 16]} />
                    </mesh>
                )
            case 'circle':
                return (
                    <mesh key={index} rotation={[variant.rotationX,  variant.rotationY, 0]} material={variant.material}>
                        <edgesGeometry args={[new THREE.CircleBufferGeometry(planet.radius + variant.radius, 32)]}/>
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
            ref={groupRef}
            position={planet.position}
        >
            <group>
                <mesh material={planet.material}>
                    <sphereBufferGeometry args={[planet.radius, 32, 32]} />
                </mesh>
                {renderVariants()}
            </group>
      </group>
    )
  }

export default Planet