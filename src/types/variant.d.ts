import * as THREE from 'three'

export type satellite ={
    type: 'satellite',
    radius: number,
    distance: number,
    alpha: number,
    theta: number
    material?: THREE.Material,
}

export type ring = {
    type: 'ring',
    radius: number,
    width: number,
    rotationX: number,
    rotationY: number,
    material?: THREE.Material,
}

export type variant = satellite | ring