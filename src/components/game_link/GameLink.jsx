import { NavLink } from "react-router-dom"
import "./GameLink.css"

function GameLink({imgSrc, gameTitle, path, children}) {
    return (
        <NavLink to={path}>
            <div className="GameLink">
                <img src={imgSrc} alt={gameTitle} width="75%" height="50%" />
                <br/>
                <h2>{gameTitle}</h2>
                <p>{children}</p>
            </div>
        </NavLink>
    )
}

export default GameLink