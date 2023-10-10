import * as alt from '@altv/client';
import * as native from '@altv/natives';

let interval: alt.Timers.EveryTick = undefined;

const PAUSE_CONTROLS = [199, 200];

const Internal = {
    tick() {
        native.disableAimCamThisUpdate();

        for (let control of PAUSE_CONTROLS) {
            native.disableControlAction(0, control, true);
            native.disableControlAction(1, control, true);
        }
    },
};

/**
 * Disable the default GTA:V pause Menu
 *
 *
 * @return {void}
 */
export function disable() {
    if (typeof interval !== 'undefined') {
        return;
    }

    interval = alt.Timers.everyTick(Internal.tick);
}

/**
 * Enable the default GTA:V pause menu
 *
 *
 * @return {void}
 */
export function enable() {
    if (typeof interval === 'undefined') {
        return;
    }

    interval.destroy();
    interval = undefined;
}
