import * as alt from '@altv/client';

/**
 * Sets meta on our local player without sharing it with anyone.
 * Useful for state management and changes.
 * @param {*} key
 * @param {*} value
 */
function handleSetMeta(key: string, value: any) {
    if (!alt.Player.local.meta) {
        alt.Player.local.meta = {};
    }

    alt.Player.local.meta[key] = value;
}

alt.Events.on('localMetaChange', handleSetMeta);
