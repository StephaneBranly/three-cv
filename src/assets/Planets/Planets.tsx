import { Planet } from "assets"
import { planets } from "consts"

export interface PlanetsProps {
}

const Planets = (props: PlanetsProps) => {
    return (
        <group>
            {planets.map((planet, i) => <Planet key={i} planet={planet} />)}
        </group>
    )
  }

export default Planets