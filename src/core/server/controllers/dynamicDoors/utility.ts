import * as alt from '@altv/server';
import * as Athena from '@AthenaServer/api';

/**
 * Handles IPL loading / unloading.
 *
 * @param {alt.Player} player
 * @param {string} ipl
 * @param {boolean} [isUnload=false]
 * @return {Promise<boolean>}
 */
export async function handleIpl(player: alt.Player, ipl: string, isUnload = false): Promise<boolean> {
    return new Promise((resolve: (didLoad: boolean) => void) => {
        const timeout = alt.Timers.setTimeout(() => resolve(false), 5000);

        Athena.systems.rpc.invoke(
            player,
            { eventName: isUnload ? 'unload-ipl' : 'load-ipl', msTimeout: 5000, args: [ipl] },
            (player: alt.Player, result: boolean) => {
                timeout.destroy();
                resolve(result);
            },
        );
    });
}

/**
 * Handles IPL loading / unloading.
 *
 * @param {alt.Player} player
 * @param {string} ipl
 * @param {boolean} [isUnload=false]
 * @return {Promise<boolean>}
 */
export async function handleYtyp(player: alt.Player, ytyp: string, isUnload = false): Promise<boolean> {
    return new Promise((resolve: (didLoad: boolean) => void) => {
        const timeout = alt.Timers.setTimeout(() => resolve(false), 5000);

        Athena.systems.rpc.invoke(
            player,
            { eventName: isUnload ? 'unload-ytyp' : 'load-ytyp', msTimeout: 5000, args: [ytyp] },
            (player: alt.Player, result: boolean) => {
                timeout.destroy();
                resolve(result);
            },
        );
    });
}
