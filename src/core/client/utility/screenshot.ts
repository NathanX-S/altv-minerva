import * as alt from '@altv/client';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { AthenaBuffer } from '@AthenaShared/utility/buffer';

alt.Events.onServer(SYSTEM_EVENTS.SCREENSHOT_CREATE, async () => {
    const result = await alt.takeScreenshot();
    const data = AthenaBuffer.toBuffer(result);
    const totalLength = data.length;

    for (let i = 0; i < totalLength; i++) {
        alt.Events.emitServer(SYSTEM_EVENTS.SCREENSHOT_POPULATE_DATA, data[i], i, totalLength);
    }
});
