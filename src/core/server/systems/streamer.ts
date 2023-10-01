import * as Athena from '@AthenaServer/api';
import * as alt from '@altv/server';
import SockJS from 'sockjs-client';
import { IStream, IStreamMessage } from '../../shared/interfaces/iStream';
import { DEFAULT_CONFIG } from '../athena/main';

const Routes = {
    pong: pong,
    update: update,
};

const DEFAULT_CONNECTION = 'http://127.0.0.1:3399';
const sock = new SockJS(DEFAULT_CONNECTION);
let callbacks: { [key: string]: (player: alt.Player, streamedData: Array<any>) => void } = {};
let ready = false;
let hasInitialized = false;

/**
 * Send a ping message to the server and then send a configuration message.
 * @returns None
 */
function init() {
    const pingMessage: IStreamMessage = {
        id: -1,
        route: 'ping',
        data: 'Ready!',
    };

    sock.send(JSON.stringify(pingMessage));

    const configMessage: IStreamMessage = {
        id: -1,
        route: 'config',
        data: DEFAULT_CONFIG.STREAM_CONFIG,
    };

    sock.send(JSON.stringify(configMessage));
}

/**
 * Stream Update Response from Streamer Service
 * @static
 * @param {number} id
 * @param {IStream} data
 * @return {void}
 *
 */
function update(id: number, data: IStream) {
    const player = alt.Player.all.find((p) => p.id === id);
    if (!player || !player.valid) {
        return;
    }

    const keys = Object.keys(callbacks);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!callbacks[key]) {
            continue;
        }

        if (!data[key]) {
            continue;
        }

        callbacks[key](player, data[key]);
    }
}

/**
 * Parse Data from the WebSocket Server
 * @static
 * @param {string} message
 * @return {void}
 *
 */
function receive(message: string) {
    const msg: IStreamMessage = JSON.parse(message);
    if (!Routes[msg.route]) {
        return;
    }

    Routes[msg.route](msg.id, msg.data);
}

/**
 * Used to call streamer updates for each player.
 * @static
 *
 */
function tick() {
    alt.Player.all.forEach((player) => {
        if (!player || !player.valid) {
            return;
        }

        const data = Athena.document.character.get(player);
        if (typeof data === 'undefined') {
            return;
        }

        requestUpdate(player);
    });
}
/**
 * Used to request an update for a specific player.
 * @static
 * @param {alt.Player} player An alt:V Player Entity
 *
 */
function requestUpdate(player: alt.Player) {
    const playerInfo: IStreamMessage = {
        id: player.id,
        route: 'update',
        data: {
            pos: player.pos,
            dimension: player.dimension,
        },
    };

    sock.send(JSON.stringify(playerInfo));
}

/**
 * Message back from sending a ping request.
 * @static
 * @param {string} data
 *
 */
async function pong(id: number, data: string) {
    alt.log(data);
    ready = true;
}

/**
 * Register a custom callback function.
 * When the key is updated with data it will come back through the callback.
 * @static
 * @template T
 * @param {string} key A unique key for this stream data.
 * @param {(player: alt.Player, streamedData: Array<T>) => void} callback
 * @param {number} range How far away should we look from the player's position.
 *
 */
export async function registerCallback<T>(
    key: string,
    callback: (player: alt.Player, streamedData: Array<T>) => void,
    range: number = 100,
) {
    if (!callbacks) {
        callbacks = {};
    }

    await alt.Utils.waitFor(() => typeof callbacks !== 'undefined');

    callbacks[key] = callback;

    await new Promise((resolve: Function) => {
        const interval = alt.Timers.setInterval(() => {
            if (!ready) {
                return;
            }

            clearInterval(interval.id);
            resolve();
        }, 100);
    });

    const playerInfo: IStreamMessage = {
        id: -1,
        route: 'update-range',
        data: {
            key,
            range,
        },
    };

    alt.log(`~c~Streamer: ~lg~${key}`);
    sock.send(JSON.stringify(playerInfo));
}

/**
 * Populates Stream Data for External Process
 * @static
 * @template T
 * @param {string} key
 * @param {Array<T>} array
 *
 */
export async function updateData<T>(key: string, array: Array<T>) {
    await alt.Utils.waitFor(() => ready, 30000);

    await new Promise((resolve: Function) => {
        const interval = alt.Timers.setInterval(() => {
            if (!ready) {
                return;
            }

            clearInterval(interval.id);
            resolve();
        }, 100);
    });

    const streamInfo: IStreamMessage = {
        id: -1,
        route: 'populate',
        data: {
            array,
            key,
        },
    };

    sock.send(JSON.stringify(streamInfo));
}

if (!hasInitialized) {
    hasInitialized = true;

    let didGetFirstCallback = false;

    alt.Timers.setTimeout(() => {
        if (didGetFirstCallback) {
            return;
        }

        console.log(`\r\n`);
        alt.logWarning(`Streamer Service was not started correctly.`);
        alt.logWarning(`Do not run alt:V Server with the executable.`);
        alt.logWarning(`Start the server with any of the following:`);
        console.log(`\r\n`);
        alt.logWarning(`npm run windows or yarn windows`);
        alt.logWarning(`npm run linux or yarn linux`);
        alt.logWarning(`npm run devtest or yarn devtest`);
        alt.logWarning(`npm run dev or yarn dev`);
        console.log(`\r\n`);
        alt.logWarning(`Process will now exit`);

        alt.Timers.setTimeout(() => {
            process.exit();
        }, 5000);
    }, 5000);

    sock.onopen = init;
    sock.onmessage = (message: MessageEvent) => {
        didGetFirstCallback = true;
        receive(message.data);
    };

    alt.Timers.setInterval(tick, DEFAULT_CONFIG.STREAM_CONFIG.TimeBetweenUpdates);
}
