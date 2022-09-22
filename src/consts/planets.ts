import { planet } from "types"
import * as THREE from "three"
import tex from "textures/tex.jpg"
import normalMap from "textures/normalMap.jpg"
import noiseTexture from "textures/noiseTexture.jpg"
import skills from "textures/skills.jpg"
import education from "textures/education.jpg"
import experience from "textures/experience.jpg"


import educationColorMap from "textures/education_colormap.jpg"
import educationEmissiveMap from "textures/education_emissivemap.jpg"
import educationRoughnessMap from "textures/education_roughnessmap.jpg"
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
const educationRoughnessMapTexture = new THREE.TextureLoader().load(educationRoughnessMap)
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

const texBg = new THREE.TextureLoader().load(tex)
const normalMapTex = new THREE.TextureLoader().load(normalMap)
const noiseTextureTex = new THREE.TextureLoader().load(noiseTexture)
const skillsTex = new THREE.TextureLoader().load(skills)
const educationTex = new THREE.TextureLoader().load(education)
const experienceTex = new THREE.TextureLoader().load(experience)

const planets: planet[] = [
    {
        name: 'Me',
        z: 1,
        radius: 0.8,
        variants: [
            {
                type: 'ring',
                radius: .2,
                width: .4,
                rotationX: Math.PI/5,
                rotationY: Math.PI/7,
                material: new THREE.MeshStandardMaterial({ 
                    map: meRingColorMapTexture,
                    transparent: true,
                    opacity: .9,
                    alphaMap: meRingTransparencylMapTexture, 
                    side: THREE.DoubleSide, 
                })
            },
        ],
        material: new THREE.MeshStandardMaterial({ 
            map: meColorMapTexture,
            normalMap: meNormalMapTexture, 
            roughness: .4, 
            metalness: .5, 
            normalScale: new THREE.Vector2(.5, .5) 
        }),
    },
    {
        name: 'Experience',
        z: 0.5,
        radius: 1,
        material: new THREE.MeshStandardMaterial({
            map: experienceColorMapTexture,
            roughness: .2,
            metalness: .5,
            normalMap: experienceNormalMapTexture,
            normalScale: new THREE.Vector2(.5, .5)
        }),
        variants: [
            {
                type: 'ring',
                radius: .5,
                width: .05,
                rotationX: Math.PI/4,
                rotationY: Math.PI/6,
                material: new THREE.MeshStandardMaterial({ color: '#3fd', side: THREE.DoubleSide, emissive: '#3fd', emissiveIntensity: 0.2 })
            },
            {
                type: 'ring',
                radius: .6,
                width: .05,
                rotationX: -Math.PI/2,
                rotationY: Math.PI/6,
                material: new THREE.MeshStandardMaterial({ color: '#ff2', side: THREE.DoubleSide, emissive: '#ff2', emissiveIntensity: 0.2 })
            },
        ],
    },
    {
        name: 'Skills',
        z: 1.2,
        radius: 1.1,
        variants: [],
        // variants: [
        //     {
        //         type: 'satellite',
        //         radius: 0.2,
        //         distance: 1,
        //         alpha: 0.5,
        //         theta: 0.5,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.21,
        //         distance: 1,
        //         alpha: 2.5,
        //         theta: -3,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.27,
        //         distance: 1,
        //         alpha: -0.5,
        //         theta: 0.5,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.15,
        //         distance: 1.1,
        //         alpha: 0.5,
        //         theta: 0,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.14,
        //         distance: 1,
        //         alpha: 0.5,
        //         theta: -0.3,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.10,
        //         distance: 0.9,
        //         alpha: -5.2,
        //         theta: 4.3,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.17,
        //         distance: 0.8,
        //         alpha: -3.5,
        //         theta: -0.3,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        //     {
        //         type: 'satellite',
        //         radius: 0.17,
        //         distance: 0.8,
        //         alpha: 1,
        //         theta: -3,
        //         material: new THREE.MeshStandardMaterial({ normalMap: noiseNormalMapTexture, roughness: 0.8, metalness: 0.5, normalScale: new THREE.Vector2(0.5, 0.5) }),
        //     },
        // ],
        material: new THREE.MeshStandardMaterial({ 
            map: skillsColorMapTexture,
            normalMap: skillsNormalMapTexture, 
            roughness: .4, 
            metalness: .5, 
            normalScale: new THREE.Vector2(.5, .5) 
        }),
    },
    {
        name: 'Education',
        z: 2,
        radius: 1.3,
        variants: [],
        material: new THREE.MeshStandardMaterial({ 
            map: educationColorMapTexture, 
            roughnessMap: educationRoughnessMapTexture,
            emissiveMap: educationEmissiveMapTexture,
            normalMap: educationNormalMapTexture,
            roughness: .1, 
            metalness: .1, 
            normalScale: new THREE.Vector2(.4, .4)
        }),
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
                material: new THREE.MeshStandardMaterial({ 
                    map: projectsRingColorMapTexture,
                    transparent: true,
                    opacity: 0.8,
                    alphaMap: projectsRingTransparencyMapTexture,
                    side: THREE.DoubleSide, 
                })
            },
        ],
        material: new THREE.MeshStandardMaterial(
            { 
                color: '#20d0C4',
                map: projectsColorMapTexture,
                normalMap: projectsNormalMapTexture, 
                emissive: '#1010D4',
                emissiveIntensity: 0.2,
                roughness: .2,
                metalness: .5,
                normalScale: new THREE.Vector2(.5, .5)
            }),
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
                material: new THREE.MeshStandardMaterial({ color: '#bb03b3', emissive: '#bb03b3', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 0.3,
                distance: 1.5,
                alpha: Math.PI/3,
                theta: Math.PI/6,
                material: new THREE.MeshStandardMaterial({ color: '#bbf033', emissive: '#bbf033', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 0.3,
                distance: 1.5,
                alpha: Math.PI/4*3,
                theta: Math.PI,
                material: new THREE.MeshStandardMaterial({ color: '#1DA1F2', emissive: '#1DA1F2', emissiveIntensity: 0.7 }),
            },
            {
                type: 'satellite',
                radius: 0.15,
                distance: 1.2,
                alpha: Math.PI,
                theta: -Math.PI/2,
                material: new THREE.MeshStandardMaterial({ color: '#0075bf', emissive: '#0075bf', emissiveIntensity: 0.7 }),
            }
        ],
        material: new THREE.MeshStandardMaterial({ 
            color: '#f025ff',
            normalMap: noiseNormalMapTexture, 
            roughness: .8,
            metalness: .5,
            normalScale: new THREE.Vector2(.5, .5)
        }),
    }
]

export default planets