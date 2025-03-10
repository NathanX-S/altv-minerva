import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { Item } from '@AthenaShared/interfaces/item';
import * as alt from '@altv/client';

type InventoryUpdateCallback = (inventory: Array<Item>, toolbar: Array<Item>, totalWeight: number) => void;

const callbacks: Array<InventoryUpdateCallback> = [];

const Internal = {
    update(inventory: Array<Item>, toolbar: Array<Item>, totalWeight: number) {
        for (let cb of callbacks) {
            cb(inventory, toolbar, totalWeight);
        }
    },
};

export const onInventoryUpdate = {
    /**
     * Adds a callback to a function after a player has selected a character or reached the spawned state.
     * This enables functionality after the user is fully mobile in the world.
     *
     * @param {InventoryUpdateCallback} callback
     */
    add(callback: InventoryUpdateCallback) {
        callbacks.push(callback);
    },
};

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_EMIT_INVENTORY_SYNC, Internal.update);
