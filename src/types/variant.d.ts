export type satellite ={
    type: 'satellite',
    radius: number,
    distance: number,
    alpha: number,
    theta: number
}

export type ring = {
    type: 'ring',
    radius: number,
    width: number,
    rotationX: number,
    rotationY: number
}

export type variant = satellite | ring