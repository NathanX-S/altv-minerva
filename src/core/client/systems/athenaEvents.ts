import * as alt from '@altv/client';
import * as native from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';

import { ATHENA_EVENTS_PLAYER_CLIENT } from '@AthenaShared/enums/athenaEvents';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

let interval: alt.Timers.Interval;
let isUpdatingWaypoint = false;
let lastWaypointData: alt.IVector3;

function tick(): void {
    if (AthenaClient.webview.isAnyMenuOpen()) {
        return;
    }

    if (!isUpdatingWaypoint) {
        updateWaypoint();
    }
}

function init(): void {
    if (interval) {
        interval.destroy();
        interval = null;
    }

    interval = alt.Timers.setInterval(tick, 250);
}

/**
 * Sends an event to the server when the local player's waypoint is updated.
 * @static
 * @return {void}
 *
 */
export async function updateWaypoint(): Promise<void> {
    if (isUpdatingWaypoint) {
        return;
    }

    isUpdatingWaypoint = true;
    const waypoint = native.getFirstBlipInfoId(8);

    // Does Not Exist
    if (!native.doesBlipExist(waypoint)) {
        // Prevent emitting the data twice.
        if (lastWaypointData !== null) {
            lastWaypointData = null;
            alt.Events.emitServer(ATHENA_EVENTS_PLAYER_CLIENT.WAYPOINT, null);
        }

        isUpdatingWaypoint = false;
        return;
    }

    const coords = native.getBlipInfoIdCoord(waypoint);

    if (!coords) {
        // Prevent emitting the data twice.
        if (lastWaypointData !== null) {
            lastWaypointData = null;
            alt.Events.emitServer(ATHENA_EVENTS_PLAYER_CLIENT.WAYPOINT, null);
        }

        isUpdatingWaypoint = false;
        return;
    }

    // Same data don't use it.
    if (lastWaypointData && lastWaypointData.x === coords.x && lastWaypointData.y === coords.y) {
        isUpdatingWaypoint = false;
        return;
    }

    const foundWaypoint: alt.IVector3 = await new Promise(async (resolve: Function) => {
        let startingZPosition = 0;

        for (let i = 0; i < 100; i++) {
            await AthenaClient.utility.scene.load(coords);
            native.requestCollisionAtCoord(coords.x, coords.y, coords.z);
            native.setFocusPosAndVel(coords.x, coords.y, startingZPosition, 0, 0, 0);

            const [isValid, zPos] = native.getGroundZFor3dCoord(coords.x, coords.y, startingZPosition, 0, false, false);

            if (!isValid) {
                startingZPosition += 25;
                continue;
            }

            if (startingZPosition >= 1500) {
                resolve(null);
                return;
            }

            native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
            native.clearFocus();

            // Found the ground position
            resolve({ x: coords.x, y: coords.y, z: zPos });
            return;
        }
    });

    // Did not find the ground position
    lastWaypointData = foundWaypoint;
    alt.Events.emitServer(ATHENA_EVENTS_PLAYER_CLIENT.WAYPOINT, foundWaypoint);
    native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
    native.clearFocus();
    isUpdatingWaypoint = false;
}

onTicksStart.add(init);
