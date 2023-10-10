import * as alt from '@altv/client';

const cmdName = 'rmluicontrols';

if (alt) {
    alt.Events.on('consoleCommand', (name: string) => {
        if (name !== cmdName) {
            return;
        }

        const state = alt.areRmlControlsActive();
        alt.setRmlControlsActive(!state);
        alt.Cursor.visible = !state;
        alt.log(`Toggled Controls to: ${!state}`);
    });
}
