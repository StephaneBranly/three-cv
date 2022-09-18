import { useMemo } from "react"
import * as THREE from "three"
import flare from 'textures/starFlare.jpg'
import { useLoader } from "react-three-fiber"

const Stars = () => {
    const XYZToThetaPhi = (x: number, y: number, z: number) => {
        const r = Math.sqrt(x * x + y * y + z * z)
        const theta = Math.acos(z / r)
        const phi = Math.atan2(y, x)
        return {
            theta, phi
        }
    }
    const colors = ['#B44336', '#5E2D92', '#4106DE', '#AEB147', '#FFCCBC']
    const texture = useLoader(THREE.TextureLoader, flare)
    const [geo, mats, coords] = useMemo(() => {
      const geo = new THREE.SphereBufferGeometry(0.3, 6, 6)
      const mats = colors.map((color) => new THREE.MeshBasicMaterial({ color }))
      const coords = new Array(800)
        .fill(0)
        .map(i => {
          const x = (Math.random() - 0.5) * 1000
          const y = (Math.random() - 0.5) * 1000
          const z = (Math.random() - 0.5) * 1000
          const flare = Math.random() * 40 + 5
          const { theta, phi } = XYZToThetaPhi(x, y, z)
          return [
          x,
          y,
          z,
          Math.floor(Math.random() * colors.length),
          flare,
          theta,
          phi
        ]})
      return [geo, mats, coords]
    }, [])
    return (
      <group > 
        {coords.map(([p1, p2, p3, colorIndex, flare, theta, phi], i) => (
          <group key={i} position={[p1, p2, p3]}>
              {flare > 30 && <mesh rotation={[theta, 0, phi]}>
                <planeBufferGeometry attach="geometry" args={[flare, flare]} />
                <meshLambertMaterial attach="material"  color={colors[colorIndex]} map={texture} alphaMap={texture} transparent={true} side={THREE.DoubleSide} />
              </mesh>}
            <mesh geometry={geo} material={mats[colorIndex]}  />
          </group>
        ))}
      </group>
    )
  }

export default Stars
  