import * as alt from '@altv/client';
import * as native from '@altv/natives';

import * as AthenaClient from '@AthenaClient/api';

import { CharacterSystem } from '@AthenaClient/systems/character';
import { PedCharacter } from '@AthenaClient/utility/characterPed';
import { disableAllControls } from '@AthenaClient/utility/disableControls';
import { Appearance } from '@AthenaShared/interfaces/appearance';
import { CHARACTER_CREATOR_EVENTS, CHARACTER_CREATOR_WEBVIEW_EVENTS } from '../../shared/events';

const PAGE_NAME = 'CharacterCreator';
const fModel = alt.hash('mp_f_freemode_01');
const mModel = alt.hash(`mp_m_freemode_01`);
let oldCharacterData: Partial<Appearance> | null = {};
let readyInterval: alt.Timers.Interval;
let noDiscard = true;
let noName = true;
let totalCharacters = 0;

native.requestModel(fModel);
native.requestModel(mModel);

/**
 * Do Not Export Internal Only
 */
class InternalFunctions {
    static async open(
        pos: alt.Vector3,
        heading: number,
        _oldCharacterData = null,
        _noDiscard = true,
        _noName = true,
        _totalCharacters = 0,
    ) {
        oldCharacterData = _oldCharacterData;
        noDiscard = _noDiscard;
        noName = _noName;
        totalCharacters = _totalCharacters;

        await PedCharacter.destroy();
        await alt.Utils.wait(100);

        const view = await AthenaClient.webview.get();
        view.on(CHARACTER_CREATOR_WEBVIEW_EVENTS.READY_SETUP_COMPLETE, InternalFunctions.handleReadyDone);
        view.on(CHARACTER_CREATOR_WEBVIEW_EVENTS.DONE, InternalFunctions.handleDone);
        view.on(CHARACTER_CREATOR_WEBVIEW_EVENTS.SYNC, InternalFunctions.handleSync);
        view.on(CHARACTER_CREATOR_WEBVIEW_EVENTS.VERIFY_NAME, InternalFunctions.handleCheckName);
        view.on(CHARACTER_CREATOR_WEBVIEW_EVENTS.DISABLE_CONTROLS, InternalFunctions.handleDisableControls);
        AthenaClient.webview.openPages([PAGE_NAME]);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);

        await PedCharacter.create(true, pos, heading);
        await alt.Utils.wait(100);
        await PedCharacter.setHidden(true);
        await AthenaClient.camera.pedEdit.create(PedCharacter.get(), { x: -0.25, y: 0, z: 0 });
        await AthenaClient.camera.pedEdit.setCamParams(0.6, 50);
        await CharacterSystem.applyEquipment(PedCharacter.get(), null, true);
        readyInterval = alt.Timers.setInterval(InternalFunctions.waitForReady, 100);
    }

    static close() {
        AthenaClient.webview.closePages([PAGE_NAME]);
        AthenaClient.webview.unfocus();
        AthenaClient.webview.showCursor(false);
        AthenaClient.camera.pedEdit.destroy();
        PedCharacter.destroy();
        native.doScreenFadeOut(100);
        oldCharacterData = null;

        alt.setGameControlsActive(true);
        disableAllControls(false);
    }

    static handleDone(newData, infoData, name: string) {
        InternalFunctions.close();
        alt.Events.emitServer(CHARACTER_CREATOR_EVENTS.DONE, newData, infoData, name);
    }

    static async waitForReady() {
        const view = await AthenaClient.webview.get();
        view.emit(CHARACTER_CREATOR_WEBVIEW_EVENTS.READY, noDiscard, noName);
    }

    static async handleReadyDone() {
        if (readyInterval !== undefined || readyInterval !== null) {
            readyInterval.destroy();
            readyInterval = null;
        }

        if (native.isScreenFadedOut() || native.isScreenFadingOut()) {
            native.doScreenFadeIn(1000);
        }

        await PedCharacter.setHidden(false);

        const view = await AthenaClient.webview.get();
        view.emit(CHARACTER_CREATOR_WEBVIEW_EVENTS.SET_DATA, oldCharacterData, totalCharacters);
    }

    static handleCheckName(name: string): void {
        alt.Events.emitServer(CHARACTER_CREATOR_EVENTS.VERIFY_NAME, name);
    }

    static async handleNameFinish(result: boolean) {
        const view = await AthenaClient.webview.get();
        view.emit(CHARACTER_CREATOR_WEBVIEW_EVENTS.VERIFY_NAME, result);
    }

    static handleDisableControls(shouldDisableControls: boolean): void {
        AthenaClient.camera.pedEdit.disableControls(shouldDisableControls);
    }

    static async handleSync(_appearance: Appearance): Promise<void> {
        await PedCharacter.apply(_appearance, true);
        AthenaClient.camera.pedEdit.update(PedCharacter.get());
    }
}

// Needs to be moved server side... yay nightmares
// alt.Events.onServer(View_Events_Creator.Sync, InternalFunctions.handleSync);
alt.Events.onServer(CHARACTER_CREATOR_EVENTS.SHOW, InternalFunctions.open);
alt.Events.onServer(CHARACTER_CREATOR_EVENTS.VERIFY_NAME, InternalFunctions.handleNameFinish);
