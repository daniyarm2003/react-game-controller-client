import { TERRARIA_COMMANDS, sendToTerrariaServer } from "../commands"
import { TERRARIA_BUFF_NAMES, TERRARIA_ITEM_NAMES, TERRARIA_MODIFY_INVENTORY_TYPES, TERRARIA_NPC_NAMES, TERRARIA_POSITION_OFFSET_TYPES } from "../terrarialists"

import useToast from "../components/toast/useToast"

import ControlPanel from "../components/control_panel/ControlPanel"
import PositionInput from "../components/position_input/PositionInput"
import CustomDropdown from "../components/custom_dropdown/CustomDropdown"

import "./App.css"

function TerrariaApp() {
    const [toast, doToast] = useToast("response-toast")

    return (
        <div className="App">
            <h1>TERRARIA WORLD CONTROLLER</h1>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.MESSAGE, `[World Controller] ${input.message}`, doToast)}>
                <b>Send message: </b>
                <input type="text" name="message" />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.VELOCITY, `${input.x} ${input.y}`, doToast)}>
                <b>Set player's velocity to: </b>
                <PositionInput min={-10000} max={10000} dimensions={2} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.GIVE_ITEM, `${input.item} ${input.amount}`, doToast)}>
                <b>Give </b>
                <input type="number" name="amount" min={1} max={9999} />
                <b> of </b>
                <CustomDropdown name="item" optionArray={TERRARIA_ITEM_NAMES} />
                <b> to player</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.SUMMON_ENTITY, `${input.entity} ${input.x} ${input.y} ${input.posOffsetType}`, doToast)}>
                <b>Summon </b>
                <CustomDropdown name="entity" optionArray={TERRARIA_NPC_NAMES} />
                <b> at </b>
                <PositionInput min={-1e9} max={1e9} dimensions={2} />
                <b>&nbsp;</b>
                <select name="posOffsetType">
                    {TERRARIA_POSITION_OFFSET_TYPES.map(offsetType => <option key={offsetType}>{offsetType}</option>)}
                </select>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.SET_TIME, `${input.hours} ${input.minutes} ${input.seconds}`, doToast)}>
                <b>Set the time to </b>
                <input type="number" name="hours" min={0} max={23} />
                <b>:</b>
                <input type="number" name="minutes" min={0} max={59} />
                <b>:</b>
                <input type="number" name="seconds" min={0} max={59} />
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.MODIFY_INVENTORY, `${input.modType}`, doToast)}>
                <select name="modType">
                    {TERRARIA_MODIFY_INVENTORY_TYPES.map(modType => <option key={modType}>{modType}</option>)}
                </select>
                <b> player's inventory</b>
            </ControlPanel>
            <ControlPanel onEnter={() => sendToTerrariaServer(TERRARIA_COMMANDS.KILL, "", doToast)}>
                <b>Kill player</b>
            </ControlPanel>
            <ControlPanel onEnter={input => sendToTerrariaServer(TERRARIA_COMMANDS.BUFF, `${input.buff} ${input.seconds}`, doToast)}>
                <b>Give player the </b>
                <CustomDropdown name="buff" optionArray={TERRARIA_BUFF_NAMES} />
                <b> buff/debuff for </b>
                <input type="number" name="seconds" min={1} />
                <b> seconds</b>
            </ControlPanel>
            { toast }
        </div>
    )
}

export default TerrariaApp