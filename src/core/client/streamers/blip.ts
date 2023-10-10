import * as alt from '@altv/client';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { Blip } from '@AthenaShared/interfaces/blip';

const addedBlips: Array<alt.Blip> = [];

function create(blipData: Blip): alt.Blip {
    const blip = alt.PointBlip.create({ pos: blipData.pos });
    blip.sprite = blipData.sprite;
    blip.color = blipData.color;
    blip.shortRange = blipData.shortRange;
    blip.name = blipData.text;

    if (blipData.category) {
        blip.category = blipData.category;
    }

    if (blipData.uid) {
        blip['uid'] = blipData.uid;
    }

    blip.scale = blipData.scale;

    return blip;
}

function populate(blips: Array<Blip>) {
    for (let i = 0; i < blips.length; i++) {
        const blipData = blips[i];
        const blip = create(blipData);
        addedBlips.push(blip);
    }
}

/**
 * Adds a blip manually to the blip controller.
 *
 *
 * @param {Blip} blipData
 * @return {alt.Blip}
 */
export function append(blipData: Blip): alt.Blip {
    const index = addedBlips.findIndex((x) => x['uid'] && blipData.uid === x['uid']);
    if (index >= 0) {
        const removedBlips = addedBlips.splice(index, 1);
        for (let i = 0; i < removedBlips.length; i++) {
            try {
                removedBlips[i].destroy();
            } catch (err) {}
        }
    }

    const blip = create(blipData);
    blip['uid'] = blipData.uid;
    addedBlips.push(blip);
    return blip;
}

/**
 * Remove a blip from the list of added blips.
 * @param {string} uid A unique string - The unique identifier of the blip.
 * @returns The blip object.
 */
export function remove(uid: string) {
    const index = addedBlips.findIndex((blip) => blip && blip['uid'] === uid);
    if (index <= -1) {
        return;
    }

    const blip = addedBlips[index];
    addedBlips.splice(index, 1);
    if (!blip || !blip.destroy) {
        return;
    }

    blip.destroy();
}

/**
 * It removes all blips from the map.
 * @returns None
 */
function removeAll() {
    while (addedBlips.length >= 1) {
        const removedBlip = addedBlips.pop();
        try {
            removedBlip.destroy();
        } catch (err) {}
    }
}

alt.Events.onServer(SYSTEM_EVENTS.POPULATE_BLIPS, populate);
alt.Events.onServer(SYSTEM_EVENTS.APPEND_BLIP, append);
alt.Events.onServer(SYSTEM_EVENTS.REMOVE_BLIP, remove);
alt.Events.on('disconnect', removeAll);
