import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import * as alt from '@altv/client';
import * as native from '@altv/natives';

function setTime(hour: number, minute: number) {
    native.pauseClock(false);
    if (hour >= 24) {
        hour = 23;
    }

    native.setClockTime(hour, minute, 0);
    native.pauseClock(true);
}

alt.Events.onServer(SYSTEM_EVENTS.SET_GAME_TIME, setTime);
