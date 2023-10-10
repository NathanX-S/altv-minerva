import * as alt from '@altv/client';
import * as native from '@altv/natives';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { playAnimation } from './animations';
import { ANIMATION_FLAGS } from '@AthenaShared/flags/animationFlags';

let interval: alt.Timers.Interval;
let cuffer: alt.Player;

const ArrestController = {
    cuff(_cuffer: alt.Player) {
        if (interval) {
            interval.destroy();
            interval = null;
        }

        cuffer = _cuffer;
        interval = alt.Timers.setInterval(ArrestController.handleCuff, 500);
    },

    uncuff(target: alt.Player) {},

    async handleCuff() {
        if (!cuffer || !cuffer.valid) {
            interval.destroy();
            interval = null;
            return;
        }

        if (!native.isEntityPlayingAnim(alt.Player.local.scriptID, 'mp_arresting', 'idle', 3)) {
            await playAnimation(
                'mp_arresting',
                'idle',
                ANIMATION_FLAGS.REPEAT | ANIMATION_FLAGS.UPPERBODY_ONLY | ANIMATION_FLAGS.ENABLE_PLAYER_CONTROL,
            );
        }

        const fwd = native.getEntityForwardVector(cuffer);
        const pos = {
            x: cuffer.pos.x - fwd.x * 1,
            y: cuffer.pos.y - fwd.y * 1,
            z: cuffer.pos.z,
        };

        native.taskGoToCoordAnyMeans(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 2, 0, false, 786603, 0);
    },
};

alt.Events.onServer(SYSTEM_EVENTS.PLAYER_CUFF, ArrestController.cuff);
alt.Events.onServer(SYSTEM_EVENTS.PLAYER_UNCUFF, ArrestController.uncuff);
