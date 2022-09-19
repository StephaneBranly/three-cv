import { variant } from './variant'
import * as THREE from 'three'

export type planet = {
    name: string,
    z: number,
    radius: number,
    variants: variant[],
    material?: THREE.Material,
}