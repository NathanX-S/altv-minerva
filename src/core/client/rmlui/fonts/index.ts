import * as alt from '@altv/client';

alt.loadRmlFontFace('/client/rmlui/fonts/arial.ttf', 'arial', false, false);
alt.loadRmlFontFace('/client/rmlui/fonts/inter-regular.ttf', 'inter', false, false);
alt.loadRmlFontFace('/client/rmlui/fonts/inter-bold.ttf', 'inter-bold', false, true);
alt.loadRmlFontFace('/client/rmlui/fonts/inter-black.ttf', 'inter-black', false, true);

if (alt.isDebug) {
    alt.logWarning(`Registering a font twice is normal with reconnect.`);
}
