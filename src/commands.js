import consts from "./consts"

export const MC_COMMANDS = {
    COMMAND: 0,
    MESSAGE: 1,
    SCATTER: 2,
    VELOCITY: 3,
    SHUFFLE: 4,
    AGGRO: 5,
    HEAL: 6,
    FIRE: 7,
    INPUT: 8
}

export const GTA_COMMANDS = {
    WANTED_LEVEL: 0,
    MONEY: 1,
    ENEMY_SPAWN: 2,
    AGGRO: 3,
    MESSAGE: 4,
    VEHICLE_SPAWN: 5,
    TELEPORT: 6,
    GIVE_WEAPON: 7,
    REMOVE_WEAPONS: 8,
    PLAYER_FORCE: 9,
    PLAYER_RAGDOLL: 10,
    FOLLOW_PLAYER: 11,
    PLAYER_VEHICLE_SPEED: 12,
    PLAYER_VEHICLE_FORCE: 13,
    PLAYER_VEHICLE_DELETE: 14,
    COMMAND: 15,
    EXPLOSION: 16,
    PLAYER_MAGNET: 17,
    JUG_SPAWN: 18,
    JUG_DELETE: 19
}

export const TERRARIA_COMMANDS = {
    MESSAGE: 0,
    VELOCITY: 1,
    GIVE_ITEM: 2,
    SUMMON_ENTITY: 3,
    SET_TIME: 4,
    MODIFY_INVENTORY: 5,
    KILL: 6,
    BUFF: 7
}

const sendToServer = (commandID, message, onResponse, path) => {
    fetch(`${process.env.NODE_ENV !== 'production' ? consts.DEV_URL : window.location.origin}/api/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cmdID: commandID,
                cmdMsg: message
            })
        })
        .then(res => res.text())
        .then(onResponse)
        .catch(console.error)
}

export const sendToMCServer = (commandID, message, onResponse) => {
    sendToServer(commandID, message, onResponse, "mc_cmd")
}

export const sendToGTAServer = (commandID, message, onResponse) => {
    sendToServer(commandID, message, onResponse, "gta_cmd")
}

export const sendToTerrariaServer = (commandID, message, onResponse) => {
    sendToServer(commandID, message, onResponse, "terraria_cmd")
}

export const doMCCommand = (sender, command, onResponse) => {
    const cmdStr = sender === consts.NO_USER ? command : `execute as ${sender} at ${sender} run ${command}`
    sendToMCServer(MC_COMMANDS.COMMAND, cmdStr, onResponse)
}