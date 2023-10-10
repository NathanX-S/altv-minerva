import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { CREDIT_ALIGN } from '@AthenaShared/enums/creditAlign';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import ICredit from '@AthenaShared/interfaces/iCredit';
import { requestScaleForm, Scaleform } from './scaleform';

let scaleform: Scaleform;
let interval: alt.Timers.Interval;
let timeout: number;

/**
 * Used to clear the last set spinner.

 *
 */
export function clear() {
    if (scaleform) {
        scaleform.destroy();
        scaleform = null;
    }

    if (interval) {
        interval.destroy();
        interval = null;
    }
}

/**
 * Creates on-screen text that looks like the GTA:V credits.
 *
 * @param {ICredit} credit
 * @return {void}
 */
export async function create(credit: ICredit) {
    clear();

    scaleform = await requestScaleForm('OPENING_CREDITS');

    if (!scaleform) {
        scaleform = null;
        return;
    }

    if (!credit.align) {
        credit.align = CREDIT_ALIGN.LEFT;
    }

    const identifier = 1;

    if (interval) {
        scaleform.passFunction('HIDE', identifier, 1, 3, 1);
        await alt.Utils.wait(3000);
    }

    const [_, x, y] = native.getActualScreenResolution();

    scaleform.passFunction('SETUP_CREDIT_BLOCK', identifier, 0.0, y / 2, credit.align, 1, 1);
    scaleform.passFunction('ADD_ROLE_TO_CREDIT_BLOCK', identifier, credit.role, 0.0, 4, true, '');
    scaleform.passFunction('ADD_NAMES_TO_CREDIT_BLOCK', identifier, credit.name, 100.1, ';', true);
    scaleform.passFunction('SHOW_CREDIT_BLOCK', identifier, 2, 'X', 1);

    interval = alt.Timers.setInterval(() => {
        scaleform.render(0.5, 0.5, 0.71, 0.68);
    }, 0);

    if (credit.duration >= 0) {
        alt.Timers.setTimeout(async () => {
            scaleform.passFunction('HIDE', identifier, 1, 3, 1);
            await alt.Utils.wait(3000);
            scaleform.passFunction('REMOVE_ALL');
            clear();
        }, credit.duration);
    }
}

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_CREDITS, create);
alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_CREDITS_CLEAR, clear);
