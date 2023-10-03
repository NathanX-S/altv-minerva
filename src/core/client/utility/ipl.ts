import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

alt.onServer(SYSTEM_EVENTS.IPL_LOAD, (name: string) => {
    native.requestIpl(name);
});

alt.onServer(SYSTEM_EVENTS.IPL_UNLOAD, (name: string) => {
    native.removeIpl(name);
});
