import GameLink from "../components/game_link/GameLink"
import mclogo from "../mclogo.png"
import gtavlogo from "../gtavlogo.png"
import terrarialogo from "../terrarialogo.png"
import "./App.css"

function MainPage() {
    return (
        <div className="App">
            <h1>Select a Game Controller</h1>
            <div className="Container">
                <GameLink imgSrc={mclogo} gameTitle="Minecraft" path="/minecraft">
                    Click here to access the Minecraft World Controller
                </GameLink>
                <GameLink imgSrc={gtavlogo} gameTitle="GTA V" path="/gta">
                    Click here to access the GTA Controller
                </GameLink>
                <GameLink imgSrc={terrarialogo} gameTitle="Terraria" path="/terraria">
                    Click here to access the Terraria World Controller
                </GameLink>
            </div>
        </div>
    )
}

export default MainPage