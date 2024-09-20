import useToast from '../components/toast/useToast'
import consts from "../consts"
import { MC_COMMANDS, sendToMCServer, doMCCommand } from "../commands"
import { MC_ENTITIES, MC_ITEMS, MC_BLOCKS, MC_EFFECTS, MC_STRUCTURES } from '../mclists'
import ControlPanel from '../components/control_panel/ControlPanel'
import CustomDropdown from '../components/custom_dropdown/CustomDropdown'
import PositionInput from '../components/position_input/PositionInput'
import './App.css'

const usernameSelect = (name, usersOnly) => (
  <select name={name}>
    <option>(select one)</option>
    {(usersOnly ? consts.USERNAMES.filter(user => user !== consts.NO_USER) : consts.USERNAMES).map(username => <option>{username}</option>)}
  </select>
)

function App() {
  const [toast, doToast] = useToast("response-toast")

  return (
    <div className="App">
      <h1>MINECRAFT WORLD CONTROLLER</h1>
      <ControlPanel onEnter={input => doMCCommand(input.username, input.command, doToast)}>
        <b>Run command </b> 
        <input type="text" name="command" />
        <b> as </b> 
        {usernameSelect("username", false)}
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.MESSAGE, `[World Controller] ${input.message}`, doToast)}>
        <b>Send message: </b>
        <input type="text" name="message" />
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.SCATTER, input.username, doToast)}>
        <b>Scatter </b>
        {usernameSelect("username", true)}
        <b>'s items</b>
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.VELOCITY, `${input.username} ${input.x} ${input.y} ${input.z}`, doToast)}>
        <b>Set </b>
        {usernameSelect("username", true)}
        <b>'s velocity to </b>
        <PositionInput min={-100} max={100} />
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.SHUFFLE, input.username, doToast)}>
        <b>Shuffle </b>
        {usernameSelect("username", true)}
        <b>'s items</b>
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.AGGRO, input.username, doToast)}>
        <b>Make nearby mobs target </b>
        {usernameSelect("username", true)}
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.HEAL, input.username, doToast)}>
        <b>Heal </b>
        {usernameSelect("username", true)}
      </ControlPanel>
      <ControlPanel onEnter={input => sendToMCServer(MC_COMMANDS.FIRE, input.username, doToast)}>
        <b>Set </b>
        {usernameSelect("username", true)}
        <b> on fire</b>
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, `effect give @s ${input.effect} ${input.duration} ${input.amplifier - 1}`, doToast)}>
        <b>Effect </b>
        {usernameSelect("username", true)}
        <b> with </b>
        <CustomDropdown name="effect" optionArray={MC_EFFECTS} />
        <b>&nbsp;</b>
        <input type="number" name="amplifier" min="1" max="256" />
        <b> for </b>
        <input type="number" name="duration" min="1" max="1000000" />
        <b> seconds</b>
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, `summon ${input.entity}`, doToast)}>
        <b>Summon </b>
        <CustomDropdown name="entity" optionArray={MC_ENTITIES} />
        <b> near </b>
        {usernameSelect("username", true)}
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, `give @s ${input.item} ${input.amount}`, doToast)}>
        <b>Give </b>
        {usernameSelect("username", true)}
        <b>&nbsp;</b>
        <input type="number" name="amount" min="1" max="6400" />
        <b> of </b>
        <CustomDropdown name="item" optionArray={MC_ITEMS} />
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, 
      `fill ~-${consts.WALL_SIZE} ~-${consts.WALL_SIZE} ~-${consts.WALL_SIZE} ~${consts.WALL_SIZE} ~${consts.WALL_SIZE} ~${consts.WALL_SIZE} ${input.block} outline`, doToast)}>
        <b>Surround </b>
        {usernameSelect("username", true)}
        <b> with walls made of </b>
        <CustomDropdown name="block" optionArray={MC_BLOCKS} />
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, `tp @s ${input.prefix}${input.x} ${input.prefix}${input.y} ${input.prefix}${input.z}`, doToast)}>
        <b>Teleport </b>
        {usernameSelect("username", true)}
        <b> to </b>
        <select name="prefix">
          <option>(select one)</option>
          <option></option>
          <option>~</option>
          <option>^</option>
        </select>
        <PositionInput min={-100000} max={100000} />
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, "spawnpoint", doToast)}>
        <b>Set spawnpoint of </b>
        {usernameSelect("username", true)}
        <b> to current location</b>
      </ControlPanel>
      <ControlPanel onEnter={input => doMCCommand(input.username, `place structure ${input.structure}`, doToast)}>
        <b>Add structure of type </b>
        <CustomDropdown name="structure" optionArray={MC_STRUCTURES} />
        <b> near </b>
        {usernameSelect("username", true)}
      </ControlPanel>
      {toast}
    </div>
  );
}

export default App;
