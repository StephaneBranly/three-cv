import { range } from "lodash"

export interface CovBoxProps {
    x : number,
    y : number,
    value : number
}

const CovBox = (props: CovBoxProps) => {
    const { x, y, value } = props
  
    const interpolateColor = (colors: number[][], ratio: number) => {
      const colorId = Math.floor(ratio * (colors.length-1))
      if (colorId === colors.length-1) {
        return colors[colors.length - 1]
      }
      const color1 = colors[colorId]
      const color2 = colors[colorId+1]
      return range(3).map(i => Math.round(color1[i] + (color2[i] - color1[i]) * ratio))
    }
    const computeColor = (value: number) => {
      //[[53, 25, 62], [112, 31, 87], [172, 23, 89], [225, 51, 66], [243, 118, 81], [246, 180, 143]]
      const color = interpolateColor([[53, 25, 62], [176, 48, 176]], value)
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }
  
    if (x === y) 
      return (
        <mesh position={[-5 + x / 2, 0, y / 2]} rotation={[-Math.PI/2, 0, 0]} castShadow>
          <extrudeBufferGeometry args={[undefined,  { depth: 1, bevelSize: 0.1, bevelOffset: -0.4, bevelThickness: 0.1, bevelSegments: 30}]}>
            <planeBufferGeometry args={[0.2, 0.2]} />
          </extrudeBufferGeometry>
          <meshStandardMaterial color={computeColor(value)} opacity={0.2} />
        </mesh>
      ) 
    return (
      <group>
        <mesh position={[-5 + x / 2, 0, y / 2]} rotation={[-Math.PI/2, 0, 0]} castShadow>
          <extrudeBufferGeometry args={[undefined,  { depth: value+0.01, bevelSize: 0.1, bevelOffset: -0.4, bevelThickness: 0.1, bevelSegments: 30}]}>
            <planeBufferGeometry args={[0.2, 0.2]} />
          </extrudeBufferGeometry>
          <meshStandardMaterial color={computeColor(value)} />
        </mesh>
        <mesh position={[-5 + y / 2, 0, x / 2]} rotation={[-Math.PI/2, 0, 0]} castShadow>
          <extrudeBufferGeometry args={[undefined,  { depth: value+0.01, bevelSize: 0.1, bevelOffset: -0.4, bevelThickness: 0.1, bevelSegments: 30}]}>
            <planeBufferGeometry args={[0.2, 0.2]} />
          </extrudeBufferGeometry>
          <meshStandardMaterial color={computeColor(value)} />
        </mesh>
      </group>
    )
  }

  export default CovBox