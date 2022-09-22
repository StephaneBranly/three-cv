import { planets } from "consts"

export interface MenuProps {
    currentItem: number
    setCurrentItem: (item: number) => void
}

const Menu = (props: MenuProps) => {
    const { currentItem, setCurrentItem } = props

    return (
        <nav className="menu">
            <ul>
             {planets.map((planet, i) => {
                return <li key={i} className={`${i===currentItem?'selected':''} ${planet.name}`} onMouseEnter={() => setCurrentItem(i)}>{planet.name}</li>
               })}
            </ul>
        </nav>
    )
}

export default Menu