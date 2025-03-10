import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { Action, ActionMenu } from '@AthenaShared/interfaces/actions';
import ViewModel from '@AthenaClient/models/viewModel';
import { Events } from '@altv/shared';

const PAGE_NAME = 'Actions';

let hasRegistered = false;
let isDisabled = false;
let actionMenu: ActionMenu;
let event: Events.EventHandler;

class ActionsView implements ViewModel {
    /**
     * The events are bound once to the WebView.
     * They are never bound again.
     * @static
     *
     */
    static async open() {
        const view = await AthenaClient.webview.get();

        if (!hasRegistered) {
            hasRegistered = true;
        } else {
            view.off(`${PAGE_NAME}:Ready`, ActionsView.ready);
            view.off(`${PAGE_NAME}:Close`, ActionsView.close);
            view.off(`${PAGE_NAME}:Trigger`, ActionsView.trigger);
        }

        view.on(`${PAGE_NAME}:Ready`, ActionsView.ready);
        view.on(`${PAGE_NAME}:Close`, ActionsView.close);
        view.on(`${PAGE_NAME}:Trigger`, ActionsView.trigger);
        view.focused = true;
        AthenaClient.webview.openPages(PAGE_NAME, false, () => {
            ActionsView.close(true);
        });

        event = alt.Events.on('keyup', ActionsView.keyUp);
    }

    /**
     * Set the action menu instance.
     * Set to null to force-clear the menu.
     * @static
     * @param {(ActionMenu | null)} actionMenu
     * @return {void}
     *
     */
    static set(_actionMenu: ActionMenu) {
        if (!_actionMenu || isDisabled) {
            ActionsView.close();
            return;
        }

        if (alt.Player.local.meta.isDead) {
            return;
        }

        if (alt.Player.local.isMenuOpen) {
            return;
        }

        if (alt.Player.local.isActionMenuOpen) {
            return;
        }

        actionMenu = _actionMenu;
        ActionsView.open();
    }

    static trigger(action: Action) {
        ActionsView.close();

        if (action.isServer) {
            alt.Events.emitServer(action.eventName, action.data);
            return;
        }

        alt.Events.emit(action.eventName, action.data);
    }

    static async ready() {
        const view = await AthenaClient.webview.get();
        view.emit(`${PAGE_NAME}:Set`, actionMenu);
        alt.Player.local.isActionMenuOpen = true;
    }

    static async close(skipPageClose = false) {
        actionMenu = null;
        const view = await AthenaClient.webview.get();

        if (!skipPageClose) {
            AthenaClient.webview.closePages([PAGE_NAME]);
        }

        AthenaClient.webview.unfocus();
        view.off(`${PAGE_NAME}:Ready`, ActionsView.ready);
        view.off(`${PAGE_NAME}:Close`, ActionsView.close);
        view.off(`${PAGE_NAME}:Trigger`, ActionsView.trigger);
        view.focused = false;
        if (event) {
            event.destroy();
        }
        alt.Player.local.isActionMenuOpen = false;
    }

    static async keyUp(key: number) {
        const view = await AthenaClient.webview.get();
        view.emit(`${PAGE_NAME}:KeyPress`, key);
    }
}

alt.Events.onServer(SYSTEM_EVENTS.SET_ACTION_MENU, ActionsView.set);
