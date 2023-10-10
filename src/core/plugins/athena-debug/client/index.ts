import * as alt from '@altv/client';
import * as native from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';

import { ATHENA_DEBUG_EVENTS } from '../shared/events';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

const F1_KEY = 112;
let page: AthenaClient.webview.Page;

function init() {
    if (!alt.isDebug) {
        return;
    }

    page = new AthenaClient.webview.Page({
        name: 'Editor',
        callbacks: { onReady() {}, onClose() {} },
        options: {
            disableEscapeKey: true,
            onOpen: {
                blurBackground: true,
                disableControls: 'all',
                disablePauseMenu: true,
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
            },
            onClose: {
                enableControls: true,
                enablePauseMenu: true,
                hideCursor: true,
                setIsMenuOpenToFalse: true,
                showHud: true,
                showOverlays: true,
                unblurBackground: true,
                unfocus: true,
            },
        },
    });

    alt.Events.on('keyup', (key: number) => {
        if (key !== F1_KEY) {
            return;
        }

        alt.Events.emitServer(ATHENA_DEBUG_EVENTS.ClientToServer.FORWARD);
    });

    alt.Events.onServer(ATHENA_DEBUG_EVENTS.toClient.exec, (code: string) => {
        eval(code);
    });

    AthenaClient.webview.on(ATHENA_DEBUG_EVENTS.toClient.closePage, () => {
        page.close(true);
    });

    alt.Events.onServer(ATHENA_DEBUG_EVENTS.toClient.openExec, () => {
        page.open();
    });
}

onTicksStart.add(init);
