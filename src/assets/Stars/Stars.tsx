import { useMemo, useRef } from "react"
import * as THREE from "three"

const Stars = () => {
    let group = useRef<THREE.Group | null>()
    let theta = 0
    // useFrame(() => {
    //   if (group.current) {
    //     // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    //     const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
    //     const s = Math.cos(THREE.Math.degToRad(theta * 2))
    //     group.current!.rotation.set(r, r, r)
    //     group.current!.scale.set(s, s, s)
    //   }
    // })
    const colors = ['#F44336', '#5E3DE2', '#41C6FE', '#FED147', '#FFCCBC']
    const [geo, mats, coords] = useMemo(() => {
      const geo = new THREE.SphereBufferGeometry(0.3, 10, 10)
      const mats = colors.map((color) => new THREE.MeshBasicMaterial({ color }))
      
      const coords = new Array(1000)
        .fill(0)
        .map(i => [
          Math.random() * 800 - 400,
          Math.random() * 800 - 400,
          Math.random() * 800 - 400,
          Math.floor(Math.random() * colors.length)
        ])
      return [geo, mats, coords]
    }, [])
    return (
      <group > 
        {coords.map(([p1, p2, p3, colorIndex], i) => (
          <mesh key={i} geometry={geo} material={mats[colorIndex]} position={[p1, p2, p3]} />
        ))}
      </group>
    )
  }

export default Stars
  