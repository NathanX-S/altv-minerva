import * as alt from '@altv/server';
import * as Athena from '@AthenaServer/api';
import '@AthenaServer/systems/streamer';

import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { Blip } from '../../shared/interfaces/blip';

const globalBlips: Array<Blip> = [];

/**
 * Adds a global blip the player loads when they join.
 *
 * Returns a uid or generates one if not specified.
 *
 * - See [alt:V Blip Sprites](https://docs.altv.mp/gta/articles/references/blips.html)
 * - See [alt:V Blip Colors](https://docs.altv.mp/gta/articles/references/blips.html#colors)
 *
 * #### Example
 * ```ts
 * const uid = Athena.controllers.blip.append({
 *     color: 5,
 *     pos: { x: 0, y: 0, z: 0},
 *     scale: 0.2,
 *     shortRange: true,
 *     text: 'My Blip!',
 *     sprite: 80
 * });
 * ```
 *
 * @param {Blip} blip
 * @returns {string} A uid to remove it later.
 */
export function append(blip: Blip): string {
    if (Overrides.append) {
        return Overrides.append(blip);
    }

    if (!blip.uid) {
        blip.uid = Athena.utility.hash.sha256Random(JSON.stringify(blip));
    }

    const index = globalBlips.findIndex((existing) => existing && existing.uid === blip.uid);
    if (index >= 0) {
        globalBlips[index] = blip;
    } else {
        globalBlips.push(blip);
    }

    alt.Events.emitAllPlayers(SYSTEM_EVENTS.APPEND_BLIP, blip);
    return blip.uid;
}

/**
 * Removes a blip based on uid.
 *
 * #### Example
 * ```ts
 * const uid = Athena.controllers.blip.append({
 *     color: 5,
 *     pos: { x: 0, y: 0, z: 0},
 *     scale: 0.2,
 *     shortRange: true,
 *     text: 'My Blip!',
 *     sprite: 80
 * });
 *
 * Athena.controllers.blip.remove(uid);
 * ```
 *
 * @param {string} uid A unique string
 * @return {boolean}
 */
export function remove(uid: string): boolean {
    if (Overrides.remove) {
        return Overrides.remove(uid);
    }

    const index = globalBlips.findIndex((label) => label.uid === uid);
    if (index <= -1) {
        return false;
    }

    alt.Events.emitAllPlayers(SYSTEM_EVENTS.REMOVE_BLIP, uid);
    globalBlips.splice(index, 1);
    return true;
}

/**
 * Remove a blip from the player.
 * Do not worry about removing blips on disconnect.
 *
 * #### Example
 * ```ts
 * const uid = Athena.controllers.blip.addToPlayer(somePlayer, {
 *     color: 5,
 *     pos: { x: 0, y: 0, z: 0},
 *     scale: 0.2,
 *     shortRange: true,
 *     text: 'My Blip!',
 *     sprite: 80
 * });
 *
 * Athena.controllers.blip.removeFromPlayer(somePlayer, uid);
 * ```
 *
 *
 * @param {alt.Player} player An alt:V Player Entity
 * @param {string} uid A unique string
 */
export function removeFromPlayer(player: alt.Player, uid: string) {
    if (Overrides.removeFromPlayer) {
        return Overrides.removeFromPlayer(player, uid);
    }

    if (!uid) {
        throw new Error(`Did not specify a uid for object removal. ObjectController.removeFromPlayer`);
    }

    player.emit(SYSTEM_EVENTS.REMOVE_BLIP, uid);
}

/**
 * Add a blip to the player.
 * Only the player specified can see this blip.
 *
 * Returns a uid or generates one if not specified.
 *
 * - See [alt:V Blip Sprites](https://docs.altv.mp/gta/articles/references/blips.html)
 * - See [alt:V Blip Colors](https://docs.altv.mp/gta/articles/references/blips.html#colors)
 *
 * #### Example
 * ```ts
 * const uid = Athena.controllers.blip.addToPlayer(somePlayer, {
 *     color: 5,
 *     pos: { x: 0, y: 0, z: 0},
 *     scale: 0.2,
 *     shortRange: true,
 *     text: 'My Blip!',
 *     sprite: 80
 * });
 * ```
 *
 * @param {alt.Player} player An alt:V Player Entity
 * @param {Blip} blipData
 */
export function addToPlayer(player: alt.Player, blipData: Blip) {
    if (Overrides.addToPlayer) {
        return Overrides.addToPlayer(player, blipData);
    }

    if (!blipData.uid) {
        throw new Error(`Object ${JSON.stringify(blipData)} does not have a uid. ObjectController.addToPlayer`);
    }

    player.emit(SYSTEM_EVENTS.APPEND_BLIP, blipData);
}

/**
 * Used to load all blips on client-side for a player.
 * This is already called when the gamemode starts. Not necessary to call twice.
 *
 * #### Example
 * ```ts
 * Athena.controllers.blip.populateGlobalBlips(somePlayer);
 * ```
 *
 *
 * @param {alt.Player} player An alt:V Player Entity
 */
export function populateGlobalBlips(player: alt.Player) {
    if (Overrides.populateGlobalBlips) {
        return Overrides.populateGlobalBlips(player);
    }

    player.emit(SYSTEM_EVENTS.POPULATE_BLIPS, globalBlips);
}

interface BlipControllerFuncs
    extends ControllerFuncs<typeof append, typeof remove, typeof addToPlayer, typeof removeFromPlayer> {
    populateGlobalBlips: typeof populateGlobalBlips;
}

const Overrides: Partial<BlipControllerFuncs> = {};

export function override(functionName: 'append', callback: typeof append);
export function override(functionName: 'remove', callback: typeof remove);
export function override(functionName: 'addToPlayer', callback: typeof addToPlayer);
export function override(functionName: 'removeFromPlayer', callback: typeof removeFromPlayer);
export function override(functionName: 'populateGlobalBlips', callback: typeof populateGlobalBlips);
/**
 * Used to override any blip controller function.
 *
 *
 * @param {keyof BlipControllerFuncs} functionName
 * @param {*} callback
 */
export function override(functionName: keyof BlipControllerFuncs, callback: any): void {
    Overrides[functionName] = callback;
}
