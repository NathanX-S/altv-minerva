import * as alt from '@altv/server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { AthenaBuffer } from '../../shared/utility/buffer';

const MAX_TRIES = 1000;
const pendingScreenshots: {
    [key: string]: {
        data: Array<string>;
        didComplete: boolean;
    };
} = {};

export class AthenaScreenshot {
    /**
     * Take a screenshot of the player screen.
     * If the data becomes corrupted or does not retrieve in time it will return null.
     *
     * @static
     * @param {alt.Player} player An alt:V Player Entity
     * @return {(Promise<string | null>)}
     *
     */
    static async takeScreenshot(player: alt.Player): Promise<string | null> {
        player.emit(SYSTEM_EVENTS.SCREENSHOT_CREATE);

        return new Promise((resolve: Function) => {
            let tries = 0;

            const interval = alt.Timers.setInterval(() => {
                tries += 1;

                if (tries > MAX_TRIES) {
                    interval.destroy();
                    delete pendingScreenshots[player.id];
                    return resolve(null);
                }

                if (!pendingScreenshots[player.id] || !pendingScreenshots[player.id].didComplete) {
                    return;
                }

                interval.destroy();
                const fullData = AthenaBuffer.fromBuffer(pendingScreenshots[player.id].data);
                delete pendingScreenshots[player.id];
                return resolve(fullData);
            }, 100);
        });
    }

    /**
     * Builds data from a screenshot event.
     * @static
     * @param {alt.Player} player An alt:V Player Entity
     * @param {string} data
     * @param {number} index
     * @param {number} lengthOfData
     *
     */
    static async buildData(player: alt.Player, data: string, index: number, lengthOfData: number) {
        if (!pendingScreenshots[player.id]) {
            pendingScreenshots[player.id] = {
                data: new Array(lengthOfData),
                didComplete: false,
            };
        }

        pendingScreenshots[player.id].data[index] = data;

        if (index === lengthOfData - 1) {
            pendingScreenshots[player.id].didComplete = true;
        }
    }
}

alt.Events.onPlayer(SYSTEM_EVENTS.SCREENSHOT_POPULATE_DATA, AthenaScreenshot.buildData);
