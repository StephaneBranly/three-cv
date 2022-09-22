const alphaThetaToXYZ = (alpha: number, theta: number, radius: number) => {
    return {
        x: radius * Math.sin(alpha) * Math.cos(theta),
        y: radius * Math.sin(alpha) * Math.sin(theta),
        z: radius * Math.cos(alpha)
    }
}

export default alphaThetaToXYZ
