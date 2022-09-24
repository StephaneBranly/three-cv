import { variant } from './variant'
import * as THREE from 'three'

export type planet = {
    position: [number, number, number],
    radius: number,
    variants: variant[],
    material?: THREE.Material,
}