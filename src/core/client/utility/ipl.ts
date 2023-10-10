import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

alt.Events.onServer(SYSTEM_EVENTS.IPL_LOAD, (name: string) => {
    native.requestIpl(name);
});

alt.Events.onServer(SYSTEM_EVENTS.IPL_UNLOAD, (name: string) => {
    native.removeIpl(name);
});
