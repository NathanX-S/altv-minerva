import * as alt from '@altv/server';

import * as Athena from '@AthenaServer/api';
import { CHAT_CONFIG } from '../../shared/config';

function handleMessage(player: alt.Player, msg: string) {
    const data = Athena.document.character.get(player);
    if (typeof data === 'undefined') {
        return;
    }

    const closestPlayers = Athena.getters.players.inRange(player.pos, CHAT_CONFIG.settings.range);
    Athena.systems.messenger.messaging.sendToPlayers(closestPlayers, `${data.name}: ${msg}`);
}

export function init() {
    Athena.systems.messenger.messaging.addCallback(handleMessage);
}
