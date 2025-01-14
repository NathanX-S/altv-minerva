import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import IShard from '@AthenaShared/interfaces/iShard';

let scaleform: AthenaClient.screen.scaleform.Scaleform;
let interval: alt.Timers.Interval;
let timeout: alt.Timers.Timeout;

/**
 * Used to clear the last set spinner.
 *
 *
 */
export function clear() {
    if (scaleform) {
        scaleform.destroy();
        scaleform = null;
    }

    if (timeout) {
        timeout.destroy();
        timeout = null;
    }

    if (interval) {
        interval.destroy();
        interval = null;
    }
}

/**
 * Create a shard, a shard is essentially the mission passed / mission failed text.
 *
 *
 * @param {IShard} shard
 * @return {void}
 */
export async function create(shard: IShard) {
    await clear();

    scaleform = await AthenaClient.screen.scaleform.requestScaleForm('MP_BIG_MESSAGE_FREEMODE');

    if (!scaleform) {
        scaleform = null;
        return;
    }

    if (shard.text) {
        scaleform.passFunction('SHOW_SHARD_WASTED_MP_MESSAGE', shard.title, shard.text);
    } else {
        scaleform.passFunction('SHOW_SHARD_WASTED_MP_MESSAGE', shard.title);
    }

    interval = alt.Timers.setInterval(() => {
        scaleform.render(0.5, 0.5, 1, 1);
    }, 0);

    if (shard.duration >= 0) {
        timeout = alt.Timers.setTimeout(clear, shard.duration);
    }
}

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_SHARD, create);
alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_SHARD_CLEAR, clear);
