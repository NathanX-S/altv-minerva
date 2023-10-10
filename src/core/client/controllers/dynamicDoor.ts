import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';
import * as native from '@altv/natives';

AthenaClient.systems.rpc.on('load-ipl', (iplName: string) => {
    alt.Streaming.requestIpl(iplName);
    alt.Utils.waitFor(() => native.isIplActive(iplName));
    return native.isIplActive(iplName);
});

AthenaClient.systems.rpc.on('unload-ipl', (iplName: string) => {
    alt.Streaming.removeIpl(iplName);
    alt.Utils.waitFor(() => native.isIplActive(iplName) === false);
});

AthenaClient.systems.rpc.on('load-ytyp', (ytypPath: string) => {
    alt.Streaming.loadYtyp(ytypPath);
});

AthenaClient.systems.rpc.on('unload-ytyp', (ytypPath: string) => {
    alt.Streaming.unloadYtyp(ytypPath);
});
