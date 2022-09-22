import { isMobile } from 'react-device-detect'

const stars = isMobile ? 
{
    numberOfStars: 400,
    segments: 4,
    flareScale: 40,
    flareOffset: 5,
    flareFilter: 35,
    radius: .5,
} : 
{
    numberOfStars: 800,
    segments: 6,
    flareScale: 40,
    flareOffset: 5,
    flareFilter: 30,
    radius: .5,
}

export default stars