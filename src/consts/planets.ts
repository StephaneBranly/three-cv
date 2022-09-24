import { planet } from "types"
import * as THREE from "three"

import educationColorMap from "textures/education_colormap.jpg"
import educationEmissiveMap from "textures/education_emissivemap.jpg"
import educationNormalMap from "textures/education_normalmap.jpg"

import projectsColorMap from "textures/projects_colormap.jpg"
import projectsNormalMap from "textures/projects_normalmap.jpg"
import projectsRingColorMap from "textures/projectsring_colormap.jpg"
import projectsRingTransparencyMap from "textures/projectsring_transparencymap.jpg"

import experienceColorMap from "textures/experience_colormap.jpg"
import experienceNormalMap from "textures/experience_normalmap.jpg"

import meColorMap from "textures/me_colormap.jpg"
import meNormalMap from "textures/me_normalmap.jpg"
import meRingColorMap from "textures/mering_colormap.jpg"
import meRingTransparencylMap from "textures/mering_transparencymap.jpg"

import skillsColorMap from "textures/skills_colormap.jpg"
import skillsNormalMap from "textures/skills_normalmap.jpg"

import noiseNormalMap from "textures/noise_normalmap.jpg"

const educationColorMapTexture = new THREE.TextureLoader().load(educationColorMap)
const educationEmissiveMapTexture = new THREE.TextureLoader().load(educationEmissiveMap)
const educationNormalMapTexture = new THREE.TextureLoader().load(educationNormalMap)

const projectsColorMapTexture = new THREE.TextureLoader().load(projectsColorMap)
const projectsNormalMapTexture = new THREE.TextureLoader().load(projectsNormalMap)
const projectsRingColorMapTexture = new THREE.TextureLoader().load(projectsRingColorMap)
const projectsRingTransparencyMapTexture = new THREE.TextureLoader().load(projectsRingTransparencyMap)

const experienceColorMapTexture = new THREE.TextureLoader().load(experienceColorMap)
const experienceNormalMapTexture = new THREE.TextureLoader().load(experienceNormalMap)

const meColorMapTexture = new THREE.TextureLoader().load(meColorMap)
const meNormalMapTexture = new THREE.TextureLoader().load(meNormalMap)
const meRingColorMapTexture = new THREE.TextureLoader().load(meRingColorMap)
const meRingTransparencylMapTexture = new THREE.TextureLoader().load(meRingTransparencylMap)

const skillsColorMapTexture = new THREE.TextureLoader().load(skillsColorMap)
const skillsNormalMapTexture = new THREE.TextureLoader().load(skillsNormalMap)

const noiseNormalMapTexture = new THREE.TextureLoader().load(noiseNormalMap)

const planets: planet[] = [
    // {
    //     position: [0, 0, 0],
    //     radius: 4,
    //     variants: [],
    //     material: new THREE.MeshPhongMaterial({ 
    //         map: meColorMapTexture,
    //         normalMap: meNormalMapTexture, 
    //         normalScale: new THREE.Vector2(.5, .5) 
    //     }),
    // },
    {
        position: [66, -11, 54],
        radius: 5,
        material: new THREE.MeshPhongMaterial({
            map: experienceColorMapTexture,
            normalMap: experienceNormalMapTexture,
            normalScale: new THREE.Vector2(.5, .5)
        }),
        variants: [
            {
                type: 'ring',
                radius: 2.5,
                width: .25,
                rotationX: Math.PI/4,
                rotationY: Math.PI/6,
                material: new THREE.MeshPhongMaterial({ color: '#3fd', side: THREE.DoubleSide, emissive: '#3fd', emissiveIntensity: 0.2 })
            },
            {
                type: 'ring',
                radius: 3,
                width: .25,
                rotationX: -Math.PI/2,
                rotationY: Math.PI/6,
                material: new THREE.MeshPhongMaterial({ color: '#ff2', side: THREE.DoubleSide, emissive: '#ff2', emissiveIntensity: 0.2 })
            },
        ],
    },
    {
        position: [-24, -9, 43],
        radius: 4.1,
        variants: [],
        material: new THREE.MeshPhongMaterial({ 
            map: skillsColorMapTexture,
            normalMap: skillsNormalMapTexture, 
            normalScale: new THREE.Vector2(.5, .5) 
        }),
    },
    {
        position: [-45, 0, -58],
        radius: 5.2,
        variants: [],
        material: new THREE.MeshPhongMaterial({ 
            map: educationColorMapTexture, 
            emissiveMap: educationEmissiveMapTexture,
            normalMap: educationNormalMapTexture,
            normalScale: new THREE.Vector2(.4, .4)
        }),
    },
    {
        position: [-99, 0, 19],
        radius: 5,
        variants: [
            {
                type: 'ring', 
                radius: 2, 
                width: 4.5, 
                rotationX: Math.PI/6, 
                rotationY: Math.PI/7,
                material: new THREE.MeshPhongMaterial({ 
                    map: projectsRingColorMapTexture,
                    transparent: true,
                    opacity: 0.8,
                    alphaMap: projectsRingTransparencyMapTexture,
                    side: THREE.DoubleSide, 
                })
            },
        ],
        material: new THREE.MeshPhongMaterial(
            { 
                color: '#20d0C4',
                map: projectsColorMapTexture,
                normalMap: projectsNormalMapTexture, 
                emissive: '#1010D4',
                emissiveIntensity: 0.2,
                normalScale: new THREE.Vector2(.5, .5)
            }),
    },
    {
        position: [25, 8, -30],
        radius: 3.5,
        variants: [
            {
                type: 'satellite',
                radius: 1,
                distance: 7.5,
                alpha: 0.5,
                theta: 0.5,
                material: new THREE.MeshPhongMaterial({ color: '#bb03b3', emissive: '#bb03b3', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 1.5,
                distance: 7.5,
                alpha: Math.PI/3,
                theta: Math.PI/6,
                material: new THREE.MeshPhongMaterial({ color: '#bbf033', emissive: '#bbf033', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 1.5,
                distance: 7.5,
                alpha: Math.PI/4*3,
                theta: Math.PI,
                material: new THREE.MeshPhongMaterial({ color: '#1DA1F2', emissive: '#1DA1F2', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 0.75,
                distance: 6,
                alpha: Math.PI,
                theta: -Math.PI/2,
                material: new THREE.MeshPhongMaterial({ color: '#0075bf', emissive: '#0075bf', emissiveIntensity: 0.7 }),
            }
        ],
        material: new THREE.MeshPhongMaterial({ 
            color: '#f025ff',
            normalMap: noiseNormalMapTexture,
            normalScale: new THREE.Vector2(.5, .5)
        }),
    },
    {
        position: [92, 0, 92],
        radius: 2,
        variants: [],
        material: new THREE.MeshPhongMaterial({
            color: '#f0f50f',
            emissive: '#f0b500',
            emissiveIntensity: 1,
            normalMap: noiseNormalMapTexture,
        })
    }
]

export default planets