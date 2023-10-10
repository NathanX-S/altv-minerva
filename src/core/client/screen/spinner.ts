import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import ISpinner from '@AthenaShared/interfaces/iSpinner';

let timeout: alt.Timers.Timeout;

/**
 * Used to clear the last set spinner.
 *
 */
export function clear() {
    if (timeout) {
        timeout.destroy();
        timeout = null;
    }

    native.busyspinnerOff();
}

/**
 * Create a spinner to show in the bottom-right corner.
 *
 * @param {ISpinner} spinner
 */
export function create(data: ISpinner) {
    clear();

    if (!data.type) {
        data.type = 0;
    }

    native.beginTextCommandBusyspinnerOn('STRING');
    native.addTextComponentSubstringPlayerName(data.text);
    native.endTextCommandBusyspinnerOn(data.type);

    if (data.duration >= 0) {
        timeout = alt.Timers.setTimeout(clear, data.duration);
    }
}

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_SPINNER, create);
alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_SPINNER_CLEAR, clear);
