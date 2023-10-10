import * as alt from '@altv/client';
import * as native from '@altv/natives';

/**
 * Load a model based on string or hash
 *
 *
 * @param {number} hash
 * @return {Promise<boolean>}
 */
export async function load(model: number | string): Promise<boolean> {
    const hash = typeof model === 'string' ? alt.hash(model) : model;

    return await new Promise((resolve: Function) => {
        native.requestModel(hash);
        let count = 0;

        if (native.hasModelLoaded(hash)) {
            resolve(true);
            return;
        }

        const interval = alt.Timers.setInterval(() => {
            if (count >= 100) {
                resolve(false);
                interval.destroy();
                return;
            }

            if (!native.hasModelLoaded(hash)) {
                count += 1;
                return;
            }

            interval.destroy();
            resolve(true);
        }, 100);
    });
}
