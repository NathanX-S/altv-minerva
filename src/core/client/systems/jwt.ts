import * as alt from '@altv/client';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';

const TOKEN_KEY_VALUE = 'jwt';

/**
 * Update the token in the local storage.
 * @param {string} hash - The hash of the token.
 * @returns None
 */
function updateToken(hash: string) {
    alt.LocalStorage.set(TOKEN_KEY_VALUE, hash);
    alt.LocalStorage.save();
}

/**
 * Fetch the quick token from local storage and emit it to the server.
 * @returns The token.
 */
async function fetchToken() {
    const jwt = alt.LocalStorage.get(TOKEN_KEY_VALUE);
    if (typeof jwt === 'undefined' || jwt === null) {
        alt.Events.emitServer(SYSTEM_EVENTS.QUICK_TOKEN_FETCH, null);
        return;
    }

    alt.Events.emitServer(SYSTEM_EVENTS.QUICK_TOKEN_FETCH, jwt);
}

alt.Events.onServer(SYSTEM_EVENTS.QUICK_TOKEN_UPDATE, updateToken);
alt.Events.onServer(SYSTEM_EVENTS.QUICK_TOKEN_FETCH, fetchToken);
