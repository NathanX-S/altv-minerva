import * as alt from '@altv/client';
import * as native from '@altv/natives';

export function load(pos: alt.IVector3): Promise<boolean> {
    let timerHandle: alt.Timers.Interval;
    return new Promise<boolean>((resolve) => {
        // noinspection JSSuspiciousNameCombination
        native.newLoadSceneStartSphere(pos.x, pos.y, pos.z ?? native.getApproxHeightForPoint(pos.x, pos.y), 2, 1);

        timerHandle = alt.Timers.setInterval(() => {
            if (!native.isNewLoadSceneActive()) {
                return resolve(false);
            }

            if (!native.isNewLoadSceneLoaded()) {
                return;
            }

            return resolve(true);
        }, 10);
    }).finally(() => {
        native.newLoadSceneStop();
        timerHandle.destroy();
    });
}
