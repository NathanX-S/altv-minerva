import * as alt from '@altv/client';
import * as native from '@altv/natives';

let everyTickControls: alt.Timers.EveryTick;
let everyTickAttacks: alt.Timers.EveryTick;

/**
 * Completely disabled all local player controls.
 *
 * @param {boolean} value
 * @return {void}
 */
export function disableAllControls(value: boolean) {
    if (everyTickControls) {
        everyTickControls.destroy();
        everyTickControls = null;
    }

    if (value) {
        everyTickControls = alt.Timers.everyTick(handleDisablingControls);
        return;
    }
}

export function disableAllAttacks(value: boolean) {
    if (everyTickAttacks) {
        everyTickAttacks.destroy();
        everyTickAttacks = null;
    }

    if (value) {
        everyTickAttacks = alt.Timers.everyTick(handleDisablingAttacks);
        return;
    }
}

export function handleDisablingAttacks() {
    native.disableControlAction(0, 24, true);
    native.disableControlAction(0, 25, true);
    native.disableControlAction(0, 47, true);
    native.disableControlAction(0, 53, true);
    native.disableControlAction(0, 54, true);
    native.disableControlAction(0, 58, true);
    native.disableControlAction(0, 66, true);
    native.disableControlAction(0, 67, true);
    native.disableControlAction(0, 68, true);
    native.disableControlAction(0, 69, true);
    native.disableControlAction(0, 70, true);
    native.disableControlAction(0, 92, true);
    native.disableControlAction(0, 114, true);
    native.disableControlAction(0, 140, true);
    native.disableControlAction(0, 141, true);
    native.disableControlAction(0, 142, true);
    native.disableControlAction(0, 257, true);
    native.disableControlAction(0, 263, true);
    native.disableControlAction(0, 264, true);
    native.disableControlAction(0, 331, true);
}

function handleDisablingControls() {
    native.disableAllControlActions(0);
    native.disableAllControlActions(1);
}
