import * as alt from '@altv/client';
import * as native from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';
import { AuthEvents } from '../shared/events';

let page: AthenaClient.webview.Page;

function requestLogin() {
    page = new AthenaClient.webview.Page({
        name: 'BasicAuth',
        callbacks: { onClose() {}, onReady() {} },
        options: {
            disableEscapeKey: true,
            onClose: {
                enableControls: true,
                hideCursor: true,
                enablePauseMenu: true,
                setIsMenuOpenToFalse: true,
                showHud: true,
                showOverlays: true,
                unblurBackground: true,
                unfocus: true,
            },
            onOpen: {
                blurBackground: true,
                disableControls: 'all',
                disablePauseMenu: true,
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
                forceOpen: true,
            },
        },
    });

    page.open();
}

function endLogin() {
    page.close(true);
}

alt.Events.onServer(AuthEvents.toClient.requestLogin, requestLogin);
alt.Events.onServer(AuthEvents.toClient.endLogin, endLogin);

AthenaClient.webview.on(AuthEvents.toClient.fromWebview.quit, () => {
    console.log(`Quitting Game!`);
    native.quitGame();
});
