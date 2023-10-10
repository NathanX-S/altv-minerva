import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import IErrorScreen from '@AthenaShared/interfaces/iErrorScreen';

let interval: alt.Timers.Interval;

/**
 * Clear the currently drawn error screen.
 *
 *
 */
export function clear() {
    if (interval) {
        interval.destroy();
        interval = null;
    }
}

/**
 * Create an error screen that takes up the whole screen.
 *
 * @param {IErrorScreen} screen
 *
 */
export function create(screen: IErrorScreen) {
    clear();

    alt.Gxt.add('warning_error', screen.title);
    alt.Gxt.add('warning_text', screen.text);

    if (screen.text2) {
        alt.Gxt.add('warning_text2', screen.text2);
    }

    interval = alt.Timers.setInterval(() => {
        if (alt.isConsoleOpen()) {
            return;
        }

        native.setWarningMessageWithHeader(
            'warning_error',
            'warning_text',
            0,
            'warning_text2',
            false,
            -1,
            null,
            null,
            true,
            Number(1),
        );
    }, 0);

    if (screen.duration >= 0) {
        alt.Timers.setTimeout(clear, screen.duration);
    }
}

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_ERROR_SCREEN, create);
alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_ERROR_SCREEN_CLEAR, clear);
