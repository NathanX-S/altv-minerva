import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { VIEW_EVENTS_JOB_TRIGGER } from '@AthenaShared/enums/views';
import { JobTrigger } from '@AthenaShared/interfaces/jobTrigger';
import { LOCALE_KEYS } from '@AthenaShared/locale/languages/keys';
import { LocaleController } from '@AthenaShared/locale/locale';
import ViewModel from '@AthenaClient/models/viewModel';

const PAGE_NAME = 'Job';
let trigger: JobTrigger;

/**
 * Do Not Export Internal Only
 */
class InternalFunctions implements ViewModel {
    static init() {
        alt.Events.onServer(VIEW_EVENTS_JOB_TRIGGER.OPEN, InternalFunctions.open);
    }

    static async open(_trigger: JobTrigger) {
        if (AthenaClient.webview.isAnyMenuOpen()) {
            return;
        }

        // Must always be called first if you want to hide HUD.
        await AthenaClient.webview.setOverlaysVisible(false);

        trigger = _trigger;

        // This is where we bind our received events from the WebView to
        // the functions in our WebView.
        const view = await AthenaClient.webview.get();
        view.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.on(`${PAGE_NAME}:Select`, InternalFunctions.accept);

        // This is where we open the page and show the cursor.
        AthenaClient.webview.openPages(PAGE_NAME, true, InternalFunctions.close);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);

        // Turn off game controls, hide the hud.
        alt.setGameControlsActive(false);

        // Let the rest of the script know this menu is open.
        alt.Player.local.isMenuOpen = true;
    }

    static accept() {
        alt.Events.emitServer(VIEW_EVENTS_JOB_TRIGGER.ACCEPT);
        alt.setGameControlsActive(true);
        InternalFunctions.close(true, true);
    }

    static async close(doNotCancel = false, shouldClosePage = false) {
        alt.setGameControlsActive(true);

        const view = await AthenaClient.webview.get();
        view.off(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.off(`${PAGE_NAME}:Select`, InternalFunctions.accept);

        AthenaClient.webview.unfocus();
        AthenaClient.webview.showCursor(false);

        alt.Player.local.isMenuOpen = false;

        if (shouldClosePage) {
            AthenaClient.webview.closePages([PAGE_NAME], true);
        }

        if (doNotCancel) {
            return;
        }

        alt.Events.emitServer(VIEW_EVENTS_JOB_TRIGGER.CANCEL);
    }

    static async ready() {
        const view = await AthenaClient.webview.get();
        view.emit(`${PAGE_NAME}:Data`, trigger);
        view.emit(`${PAGE_NAME}:SetLocales`, LocaleController.getWebviewLocale(LOCALE_KEYS.WEBVIEW_JOB));
    }
}

InternalFunctions.init();
