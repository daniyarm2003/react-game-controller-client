import useToast from "../components/toast/useToast"

import { GTA_COMMANDS, sendToGTAServer } from "../commands"
import { GTA_PEDS, GTA_WEAPONS, GTA_VEHICLES } from "../gtalists"

import ControlPanel from "../components/control_panel/ControlPanel"
import PositionInput from "../components/position_input/PositionInput"
import CustomDropdown from "../components/custom_dropdown/CustomDropdown"

import "./App.css"

function GTAApp() {
    const [toast, doToast] = useToast("response-toast")

    return (
        <div className="App">
            <h1>GTA CONTROLLER</h1>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.WANTED_LEVEL, `${input.wantedLevel}`, doToast)}>
                <b>Set player's wanted level to </b>
                <input type="number" name="wantedLevel" min={0} max={5} />
                <b> stars</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.MONEY, `${input.money}`, doToast)}>
                <b>Set player's total money amount to $</b>
                <input type="number" name="money" min={0} max={2e9} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.ENEMY_SPAWN, `${input.pedHash} ${input.weaponHash} ${input.x} ${input.y} ${input.z} ${input.coordType}`, doToast)}>
                <b>Summon an enemy of type </b>
                <CustomDropdown name="pedHash" optionArray={GTA_PEDS} />
                <b> armed with </b>
                <CustomDropdown name="weaponHash" optionArray={GTA_WEAPONS} />
                <b> offset from player by </b>
                <PositionInput min={-100} max={100} />
                <b>&nbsp;</b>
                <select name="coordType">
                    <option>(select one)</option>
                    <option>Exact</option>
                    <option>Safe</option>
                </select>
            </ControlPanel>
            <ControlPanel onEnter={_ => sendToGTAServer(GTA_COMMANDS.AGGRO, "", doToast)}>
                <b>Aggro nearby NPCs</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.MESSAGE, input.msg, doToast)}>
                <b>Send Message: </b>
                <input type="text" name="msg" />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.VEHICLE_SPAWN, `${input.vehicleHash} ${input.x} ${input.y} ${input.z} ${input.coordType}`, doToast)}>
                <b>Summon a vehicle of type </b>
                <CustomDropdown name="vehicleHash" optionArray={GTA_VEHICLES} />
                <b> offset from player by </b>
                <PositionInput min={-100} max={100} />
                <b>&nbsp;</b>
                <select name="coordType">
                    <option>(select one)</option>
                    <option>Exact</option>
                    <option>Safe</option>
                </select>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.TELEPORT, `${input.prefix} ${input.x}, ${input.y} ${input.z} Exact`, doToast)}>
                <b>Teleport player to </b>
                <select name="prefix">
                    <option>(select one)</option>
                    <option>&nbsp;</option>
                    <option>~</option>
                    <option>^</option>
                </select>
                <PositionInput min={-100000} max={100000} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.GIVE_WEAPON, input.weaponHash, doToast)}>
                <b>Arm player with </b>
                <CustomDropdown name="weaponHash" optionArray={GTA_WEAPONS} />
            </ControlPanel>
            <ControlPanel onEnter={_ => sendToGTAServer(GTA_COMMANDS.REMOVE_WEAPONS, "", doToast)}>
                <b>Remove player's weapons</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.PLAYER_FORCE, `${input.x} ${input.y} ${input.z}`, doToast)}>
                <b>Apply a </b>
                <PositionInput min={-2e9} max={2e9} />
                <b> force on player</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.PLAYER_RAGDOLL, `${input.duration}`, doToast)}>
                <b>Make player ragdoll for </b>
                <input type="number" name="duration" min={0} max={2e9} />
                <b> milliseconds</b>
            </ControlPanel>
            <ControlPanel onEnter={_ => sendToGTAServer(GTA_COMMANDS.FOLLOW_PLAYER, "", doToast)}>
                <b>Make NPCs follow player</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.PLAYER_VEHICLE_SPEED, `${input.speed}`, doToast)}>
                <b>Set player vehicle's forward speed to </b>
                <input type="number" name="speed" min={-2e9} max={2e9} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.PLAYER_VEHICLE_FORCE, `${input.x} ${input.y} ${input.z}`, doToast)}>
                <b>Apply a </b>
                <PositionInput min={-2e9} max={2e9} />
                <b> force on player's vehicle</b>
            </ControlPanel>
            <ControlPanel onEnter={_ => sendToGTAServer(GTA_COMMANDS.PLAYER_VEHICLE_DELETE, "", doToast)}>
                <b>Delete player's vehicle</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.COMMAND, input.command, msg => { doToast(msg); console.error(msg); })}>
                <b>Execute C# Code: </b>
                <input type="text" name="command" />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.EXPLOSION, `${input.x} ${input.y} ${input.z} ${input.radius} ${input.camShake}`, doToast)}>
                <b>Create explosion offset from player by </b>
                <PositionInput min={-2e9} max={2e9} />
                <b> with a radius of </b>
                <input type="number" name="radius" min={0} max={2e9} />
                <b> and a camera shake amplitude of </b>
                <input type="number" name="camShake" min={0} max={2e9} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.PLAYER_MAGNET, input.magnetStrength, doToast)}>
                <b>Activate player magnet with a strength of </b>
                <input type="number" name="magnetStrength" min={-2e9} max={2e9} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToGTAServer(GTA_COMMANDS.JUG_SPAWN, `${input.x} ${input.y} ${input.z} ${input.coordType}`, doToast)}>
                <b>Summon a juggernaut offset from player by </b>
                <PositionInput min={-100} max={100} />
                <b>&nbsp;</b>
                <select name="coordType">
                    <option>(select one)</option>
                    <option>Exact</option>
                    <option>Safe</option>
                </select>
            </ControlPanel>
            <ControlPanel onEnter={_ => sendToGTAServer(GTA_COMMANDS.JUG_DELETE, "", doToast)}>
                <b>Remove all juggernauts</b>
            </ControlPanel>
            {toast}
        </div>
    )
}

export default GTAApp