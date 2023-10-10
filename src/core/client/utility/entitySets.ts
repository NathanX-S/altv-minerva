import * as alt from '@altv/client';
import * as native from '@altv/natives';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

alt.Events.onServer(SYSTEM_EVENTS.ENTITYSET_ACTIVATE, (interior: number, entitySetName: string) => {
    native.activateInteriorEntitySet(interior, entitySetName);
    native.refreshInterior(interior);
});

alt.Events.onServer(SYSTEM_EVENTS.ENTITYSET_DEACTIVATE, (interior: number, entitySetName: string) => {
    native.deactivateInteriorEntitySet(interior, entitySetName);
    native.refreshInterior(interior);
});

alt.Events.onServer(SYSTEM_EVENTS.ENTITYSET_IS_ACTIVE, (interior: number, entitySetName: string) => {
    let result;
    result = native.isInteriorEntitySetActive(interior, entitySetName);
    alt.Events.emitServer(SYSTEM_EVENTS.ENTITYSET_IS_ACTIVE, result);
});
