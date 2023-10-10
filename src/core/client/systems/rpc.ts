import * as alt from '@altv/client';

/**
 * Handle an RPC event from server-side, and return a result back to the server.
 *
 * The RPC event must be invoked from server-side through the `Athena.systems.rpc.invoke` function.
 *
 * #### Example
 * ```ts
 * AthenaClient.systems.rpc.on('returnPlayerLocalPosition', () => {
 *      return alt.Player.local.pos;
 * })
 * ```
 *
 * @export
 * @template T
 * @param {string} eventName
 * @param {(...args: any[]) => T} callback
 */
export function on<T = any>(eventName: string, callback: (...args: any[]) => T) {
    alt.Events.onServer(eventName, async (instancedName: string, ...args: any[]) => {
        const result = await callback(...args);
        alt.Events.emitServer(instancedName, result);
    });
}
