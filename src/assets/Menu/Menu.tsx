import { Planet, Stars } from "assets"

export interface MenuProps {
}

const Menu = (props: MenuProps) => {

    return (
        <group>
            <Stars />
            <Planet position={[0, 0, 0]} sphereArgs={[0.5, 32, 32]} name={"Me"} />
            <Planet position={[2, -1, 4]} sphereArgs={[1.2, 32, 32]} name={"Experience"} />
            <Planet position={[-3, 1.4, -1]} sphereArgs={[1, 32, 32]} name={"Education"} />
            <Planet position={[2, 5, -1]} sphereArgs={[1.2, 32, 32]} name={"Skills"} />
            <Planet position={[-5, 5, -10]} sphereArgs={[1, 32, 32]} name={"Projects"} />
        </group>
    )
  }

  export default Menu