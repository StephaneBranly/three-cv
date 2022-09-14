import { CovBox } from "assets"
import { range } from "lodash"
import { useState } from "react"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import { interpolate } from "utils"


export interface CovMatrixProps {
    size: number,
}

const CovMatrix = (props: CovMatrixProps) => {
    const { size } = props
    const generateNewCovMatrix = () => {
        return range(size).map(x => range(x+1).map((y) => x===y?1:Math.random()))
    }
   
    const [matrixFrom, setMatrixFrom] = useState(generateNewCovMatrix())
    const [matrixTo, setMatrixTo] = useState(generateNewCovMatrix())
    const [matrix, setMatrix] = useState(matrixFrom)
    const [clock, setClock] = useState(new THREE.Clock())

    useFrame(() => {
    const time = clock.getElapsedTime()
    if (time > 2) {
        setMatrixFrom(matrixTo)
        setMatrixTo(generateNewCovMatrix())
        clock.start()
    } else if (time <= 1) {
        setMatrix(range(size).map(x => range(x+1).map((y) => interpolate(0, matrixFrom[x][y], 1, matrixTo[x][y], time))))
    } 
    })
    const matrixBoardSize = (size + 1) * 0.5
    return (
        <group>
            <mesh position={[-5+matrixBoardSize/2-0.5, -0.05, matrixBoardSize/2 - 0.5]} rotation={[-Math.PI/2, 0, 0]} castShadow>
                <extrudeBufferGeometry args={[undefined,  { depth: 0.01, bevelSize: 0.2, bevelOffset: (matrixBoardSize + 0.5)/size, bevelThickness: 0.1, bevelSegments: 12}]}>
                    <planeBufferGeometry args={[matrixBoardSize, matrixBoardSize]} />
                </extrudeBufferGeometry>
                <meshStandardMaterial color='#2F2A21' />
            </mesh>
            {range(size).map((x) => range(x+1).map((y) => <CovBox key={`cov(x${x},x${y})`} x={x} y={y} value={matrix[x][y]} />))}
        </group>
    )
  }

  export default CovMatrix