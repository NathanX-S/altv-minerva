import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import * as alt from '@altv/client';
import * as native from '@altv/natives';

/**
 * Removes the black filter on a screen over time.
 *
 *
 * @param {number} timeInMs
 */
export async function fromBlack(timeInMs: number) {
    await alt.Utils.waitFor(() => native.isScreenFadedIn() === true || native.isScreenFadingIn() === false);
    native.doScreenFadeIn(timeInMs);
}

/**
 * Turns a screen black over time.
 *
 *
 * @param {number} timeInMs
 */
export async function toBlack(timeInMs: number) {
    await alt.Utils.waitFor(() => native.isScreenFadedOut() === true || native.isScreenFadingOut() === false);
    native.doScreenFadeOut(timeInMs);
}

alt.Events.onServer(SYSTEM_EVENTS.SCREEN_FADE_FROM_BLACK, fromBlack);
alt.Events.onServer(SYSTEM_EVENTS.SCREEN_FADE_TO_BLACK, toBlack);
