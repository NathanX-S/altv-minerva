import * as alt from '@altv/client';
import * as native from '@altv/natives';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_SCENARIO, playScenario);

/**
 * Play an animation for the local player.
 *
 * @param {string} name The name of the scenario.
 * @param {number} duration The duration of the scenario.
 * @return {Promise<void>}
 */
export async function playScenario(name: string, duration: number): Promise<void> {
    if (alt.Player.local.meta.isDead) {
        return;
    }

    if (native.isPedUsingScenario(alt.Player.local.scriptID, name)) {
        return;
    }

    native.taskStartScenarioInPlace(alt.Player.local.scriptID, name, -1, false);

    alt.Timers.setTimeout(() => {
        if (native.isPedUsingScenario(alt.Player.local.scriptID, name)) {
            native.clearPedTasksImmediately(alt.Player.local.scriptID);
        }
    }, duration);
}
