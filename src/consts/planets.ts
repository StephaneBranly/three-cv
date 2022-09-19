import { planet } from "types"
import * as THREE from "three"
import tex from "textures/tex.jpg"
import normalMap from "textures/normalMap.jpg"
import noiseTexture from "textures/noiseTexture.jpg"
import skills from "textures/skills.jpg"
import education from "textures/education.jpg"
import experience from "textures/experience.jpg"
const texBg = new THREE.TextureLoader().load(tex)
const normalMapTex= new THREE.TextureLoader().load(normalMap)
const noiseTextureTex= new THREE.TextureLoader().load(noiseTexture)
const skillsTex= new THREE.TextureLoader().load(skills)
const educationTex= new THREE.TextureLoader().load(education)
const experienceTex= new THREE.TextureLoader().load(experience)

const planets: planet[] = [
    {
        name: 'Me',
        z: 1,
        radius: 0.8,
        variants: [
            {
                type: 'ring',
                radius: 0.1,
                width: 0.5,
                rotationX: Math.PI/5,
                rotationY: Math.PI/7,
                material: new THREE.MeshStandardMaterial({ color: '#fd2', side: THREE.DoubleSide, map: texBg, emissive: '#bfb', emissiveIntensity: 0.2 })
            },
        ],
        material: new THREE.MeshStandardMaterial({ map: texBg, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
    },
    {
        name: 'Experience',
        z: 0.5,
        radius: 1,
        variants: [],
        material: new THREE.MeshStandardMaterial({ map: experienceTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
    },
    {
        name: 'Skills',
        z: 1.2,
        radius: 1.1,
        variants: [
            {
                type: 'satellite',
                radius: 0.2,
                distance: 1,
                alpha: 0.5,
                theta: 0.5,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.21,
                distance: 1,
                alpha: 2.5,
                theta: -3,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.27,
                distance: 1,
                alpha: -0.5,
                theta: 0.5,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.15,
                distance: 1.1,
                alpha: 0.5,
                theta: 0,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.14,
                distance: 1,
                alpha: 0.5,
                theta: -0.3,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.10,
                distance: 0.9,
                alpha: -5.2,
                theta: 4.3,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.17,
                distance: 0.8,
                alpha: -3.5,
                theta: -0.3,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
            {
                type: 'satellite',
                radius: 0.17,
                distance: 0.8,
                alpha: 1,
                theta: -3,
                material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
            },
        ],
        material: new THREE.MeshStandardMaterial({ map: skillsTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
    },
    {
        name: 'Education',
        z: 2,
        radius: 1.3,
        variants: [],
        material: new THREE.MeshStandardMaterial({ map: educationTex, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
    },
    {
        name: 'Projects',
        z: 1.2,
        radius: 1,
        variants: [
            {
                type: 'ring', 
                radius: 0.2, 
                width: 0.9, 
                rotationX: Math.PI/6, 
                rotationY: Math.PI/7,
                material: new THREE.MeshStandardMaterial({ color: '#3cf', side: THREE.DoubleSide, map: texBg})
            },
        ],
        material: new THREE.MeshStandardMaterial({ map: noiseTextureTex, color: '#ecf', roughness: 0.8, metalness: 0.5 }),
    },
    {
        name: 'Contact',
        z: 0.5,
        radius: 0.7,
        variants: [
            {
                type: 'satellite',
                radius: 0.2,
                distance: 1.5,
                alpha: 0.5,
                theta: 0.5,
                material: new THREE.MeshStandardMaterial({ color: '#bb03b3' }),
            },
            {
                type: 'satellite',
                radius: 0.3,
                distance: 1.5,
                alpha: Math.PI/3,
                theta: Math.PI/6,
                material: new THREE.MeshStandardMaterial({ color: '#bbf033' }),
            },
            {
                type: 'satellite',
                radius: 0.3,
                distance: 1.5,
                alpha: Math.PI/4*3,
                theta: Math.PI,
                material: new THREE.MeshStandardMaterial({ color: '#1DA1F2' }),
            },
            {
                type: 'satellite',
                radius: 0.15,
                distance: 1.2,
                alpha: Math.PI,
                theta: -Math.PI/2,
                material: new THREE.MeshStandardMaterial({ color: '#0075bf' }),
            }
        ],
        material: new THREE.MeshStandardMaterial({ color: '#d075bf' }),
    }
]

export default planets