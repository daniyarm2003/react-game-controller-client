import { MC_COMMANDS, sendToMCServer } from "../../commands"
import "./InputSender.css"

function MCInputSender() {
    return (
        <>
            <h3>Input Sender (click to focus)</h3>
            <div className="Input-sender" tabIndex={0} onKeyDown={e => sendToMCServer(MC_COMMANDS.INPUT, `KEYSYM true ${e.keyCode}`, console.log)}
                onKeyUp={e => sendToMCServer(MC_COMMANDS.INPUT, `KEYSYM false ${e.keyCode}`, console.log)}/>
        </>
    )
}

export default MCInputSender