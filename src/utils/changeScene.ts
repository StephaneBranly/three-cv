import { interpolate } from "utils"

const changeScene = (startClock: number, currentClock: number, endClock: number, positionStart: [number, number, number], positionEnd: [number, number, number]) => {
    const [x1, y1, z1] = positionStart
    const [x2, y2, z2] = positionEnd
    const x = interpolate(startClock, x1, endClock, x2, currentClock)
    const y = interpolate(startClock, y1, endClock, y2, currentClock)
    const z = interpolate(startClock, z1, endClock, z2, currentClock)
    
    return [x, y, z]
}

export default changeScene