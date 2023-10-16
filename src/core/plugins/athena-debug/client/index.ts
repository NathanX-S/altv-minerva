import * as alt from '@altv/client';
import * as native from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';

import { ATHENA_DEBUG_EVENTS } from '../shared/events';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

const F1_KEY = 112;

function init() {
    if (!alt.isDebug) {
        return;
    }

    alt.Events.on('keyup', (key: number) => {
        if (key !== F1_KEY) {
            return;
        }

        alt.Events.emitServer(ATHENA_DEBUG_EVENTS.ClientToServer.FORWARD);
    });
}

onTicksStart.add(init);
