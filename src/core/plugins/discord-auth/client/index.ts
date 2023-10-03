import * as alt from '@altv/client';
import { DiscordAuthEvents } from '../shared/events';

async function getDiscordToken(applicationIdentifier: string) {
    let bearerToken: string;

    try {
        bearerToken = await alt.Discord.requestOAuth2Token(applicationIdentifier);
    } catch (err) {}

    alt.emitServer(DiscordAuthEvents.toServer.pushToken, bearerToken);
}

alt.onServer(DiscordAuthEvents.toClient.requestToken, getDiscordToken);
