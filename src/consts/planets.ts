import { planet } from "types"

const planets: planet[] = [
    {
        name: 'Me',
        z: 1,
        radius: 0.8,
        variants: [
            {type: 'ring', radius: 0.1, width: 0.5, rotationX: Math.PI/5, rotationY: Math.PI/7}
        ]
    },
    {
        name: 'Experience',
        z: 0.5,
        radius: 1,
        variants: []
    },
    {
        name: 'Skills',
        z: 1.2,
        radius: 1.1,
        variants: [
            {type: 'satellite', radius: 0.2, distance: 1, alpha: 0.5, theta: 0.5},
            {type: 'satellite', radius: 0.21, distance: 1, alpha: 2.5, theta: -3},
            {type: 'satellite', radius: 0.27, distance: 1, alpha: -0.5, theta: 0.5},
            {type: 'satellite', radius: 0.15, distance: 1.1, alpha: 0.5, theta: 0},
            {type: 'satellite', radius: 0.14, distance: 1, alpha: 0.5, theta: -0.3},
            {type: 'satellite', radius: 0.10, distance: 0.9, alpha: -5.2, theta: 4.3},
            {type: 'satellite', radius: 0.17, distance: 0.8, alpha: -3.5, theta: -0.3},
            {type: 'satellite', radius: 0.17, distance: 0.8, alpha: 1, theta: -3},
        ]
    },
    {
        name: 'Education',
        z: 2,
        radius: 1.3,
        variants: []
    },
    {
        name: 'Projects',
        z: 1.2,
        radius: 1,
        variants: [
            {type: 'ring', radius: 0.2, width: 0.9, rotationX: Math.PI/6, rotationY: Math.PI/7},
        ]
    },
    {
        name: 'Contact',
        z: 0.5,
        radius: 0.7,
        variants: [
            {type: 'satellite', radius: 0.2, distance: 1.5, alpha: 0.5, theta: 0.5},
            {type: 'satellite', radius: 0.3, distance: 1.5, alpha: Math.PI/3, theta: Math.PI/6 },
            {type: 'satellite', radius: 0.3, distance: 1.5, alpha: Math.PI/4*3, theta: Math.PI },
            {type: 'satellite', radius: 0.15, distance: 1.2, alpha: Math.PI, theta: -Math.PI/2 },

        ]
    }
]

export default planets