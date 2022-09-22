import { useMemo } from "react"
import * as THREE from "three"
import flare from 'textures/starFlare.jpg'
import { useLoader } from "react-three-fiber"
import { stars as s } from "consts"

const Stars = () => {
    const XYZToThetaPhi = (x: number, y: number, z: number) => {
        const r = Math.sqrt(x * x + y * y + z * z)
        const theta = Math.acos(z / r)
        const phi = Math.atan2(y, x)
        return {
            theta, phi
        }
    }
    const colors = ['#E92EFB', '#FF2079', '#440BD4', '#FFD300', '#13CA91', '#FF9472', '#DBDBDB', '#DBDBDB', '#DBDBDB']
    const texture = useLoader(THREE.TextureLoader, flare)
    const [geo, mats, coords] = useMemo(() => {
      const geo = new THREE.SphereBufferGeometry(s.radius, s.segments, s.segments)
      const mats = colors.map((color) => new THREE.MeshBasicMaterial({ color }))
      const coords = new Array(s.numberOfStars)
        .fill(0)
        .map(i => {
          const x = (Math.random() - 0.5) * 1000
          const y = (Math.random() - 0.5) * 1000
          const z = (Math.random() - 0.5) * 1000
          const flare = Math.random() * s.flareScale + s.flareOffset
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
              {flare > s.flareFilter && <mesh rotation={[theta, 0, phi]}>
                <planeBufferGeometry attach="geometry" args={[flare, flare]} />
                <meshLambertMaterial attach="material" color={colors[colorIndex]} map={texture} alphaMap={texture} transparent={true} side={THREE.DoubleSide} />
              </mesh>}
            <mesh geometry={geo} material={mats[colorIndex]}  />
          </group>
        ))}
      </group>
    )
  }

export default Stars
  