import * as alt from '@altv/server';
import { ATHENA_EVENTS_PLAYER_CLIENT } from '../../shared/enums/athenaEvents';
import { PLAYER_SYNCED_META } from '../../shared/enums/playerSynced';
import * as ClientEvents from './clientEvents';

alt.onClient(ATHENA_EVENTS_PLAYER_CLIENT.WAYPOINT, (player: alt.Player, pos: alt.IVector3) => {
    if (!player || !player.valid) {
        return;
    }

    player.currentWaypoint = pos;
    player.setSyncedMeta(PLAYER_SYNCED_META.WAYPOINT, pos);
    ClientEvents.trigger(ATHENA_EVENTS_PLAYER_CLIENT.WAYPOINT, player, pos);
});
