import { menu } from "consts"

export interface MenuProps {
    currentItem: number
    setCurrentItem: (item: number) => void
}

const Menu = (props: MenuProps) => {
    const { currentItem, setCurrentItem } = props
    
    return (
        <nav className="menu">
            <ul>
             {menu.map((item, i) => {
                return <li key={i} className={`${i===currentItem?'selected':''}`} onMouseEnter={() => setCurrentItem(i)}>{item.name}</li>
               })}
            </ul>
        </nav>
    )
}

export default Menu