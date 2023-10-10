import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

let timeoutId: alt.Timers.Timeout;

/**
 * Draw mission text on the bottom of screen
 * @param  {string} text
 * @param  {number} duration
 */
export function drawMissionText(text: string, duration: number | undefined = undefined) {
    if (timeoutId) {
        alt.setWatermarkPosition(0);
        timeoutId.destroy();
    }
    native.clearPrints();
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    if (typeof duration !== 'number') {
        duration = text.length * 100;
    }
    native.endTextCommandPrint(duration, true);
    timeoutId = alt.Timers.setTimeout(() => {
        alt.setWatermarkPosition(4);
        timeoutId = undefined;
    }, duration);
}

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_MISSION_TEXT, drawMissionText);
