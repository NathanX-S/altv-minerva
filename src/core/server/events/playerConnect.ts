import { DEFAULT_CONFIG } from '@AthenaServer/athena/main';
import * as alt from '@altv/server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import * as Athena from '../api';
import ConfigUtil from '../utility/config';

/**
 * Called when a player connects to the server.
 * This is a client-side invoke to ensure they're fully loaded before starting.
 * @param  {alt.Player} player An alt:V Player Entity
 */
async function handlePlayerConnect(player: alt.Player): Promise<void> {
    const config = await ConfigUtil.get();

    if (!player || !player.valid) {
        return;
    }

    if (process.env.ATHENA_READY === 'false') {
        player.kick('Still warming up...');
        return;
    }

    const vueDefaultPath = ConfigUtil.getVueDebugMode()
        ? ConfigUtil.getViteServer()
        : `http://assets/webviews/index.html`;
    player.emit(SYSTEM_EVENTS.WEBVIEW_INFO, vueDefaultPath);

    const pos = { ...DEFAULT_CONFIG.CHARACTER_SELECT_POS };

    // First ID is 0. We add 1 so everyone gets a unique dimension.
    player.dimension = player.id + 1;
    player.pendingLogin = true;
    player.visible = false;

    Athena.player.safe.setPosition(player, pos.x, pos.y, pos.z);
    Athena.systems.loginFlow.next(player);
}

alt.Events.onPlayer(SYSTEM_EVENTS.BEGIN_CONNECTION, handlePlayerConnect);
