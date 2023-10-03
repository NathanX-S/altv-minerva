import * as alt from '@altv/client';
import * as native from '@altv/natives';

alt.Events.on('disconnect', handleDisconnect);

function handleDisconnect() {
    native.stopAudioScenes();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
}
