const interpolate = (x1: number, y1: number, x2: number, y2: number, x: number) => {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1)
}

export default interpolate