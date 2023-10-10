import * as alt from '@altv/client';
import * as native from '@altv/natives';
import { Events } from '@altv/shared';
import * as AthenaClient from '@AthenaClient/api';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export interface QuestionInfo {
    buttons?: {
        accept: string;
        decline: string;
    };

    /**
     * What is the question, or info you need a response for?
     * ie. 'What is your first name?'
     *
     * @type {string}
     *
     */
    placeholder: string;

    /**
     * If set to true, it will blur the background while responding.
     *
     * @type {boolean}
     *
     */
    blur?: boolean;

    /**
     * If set to true, it will darken the background while responding.
     *
     * @type {boolean}
     *
     */
    darken?: boolean;

    /**
     * Hide Radar?
     *
     * @type {boolean}
     *
     */
    hideHud?: boolean;
}

type MessageCallback = (accepted: boolean) => void;
let document: alt.RmlDocument;
let internalCallback: MessageCallback;
let event: Events.EventHandler;

const InternalFunctions = {
    focus(info: QuestionInfo) {
        const placeholderElement = document.getElementByID('placeholder');
        placeholderElement.innerRML = info.placeholder;

        const declineElement = document.getElementByID('decline');
        const acceptElement = document.getElementByID('accept');

        acceptElement.on('click', InternalFunctions.submit);
        declineElement.on('click', () => {
            AthenaClient.systems.sound.frontend('CANCEL', 'HUD_FREEMODE_SOUNDSET');
            internalCallback(false);
            cancel();
        });

        if (info.buttons) {
            acceptElement.innerRML = info.buttons.accept;
            declineElement.innerRML = info.buttons.decline;
        }

        if (info.blur) {
            native.triggerScreenblurFadeIn(250);
        }

        if (info.darken) {
            const bodyElement = document.getElementByID('body');
            bodyElement.style['background'] = `#000000c2`;
        }

        if (info.hideHud) {
            native.displayHud(false);
            native.displayRadar(false);
        }
    },
    handleKeyUp(keycode: number) {
        if (keycode === ESCAPE_KEY) {
            AthenaClient.systems.sound.frontend('CANCEL', 'HUD_FREEMODE_SOUNDSET');
            internalCallback(false);
            cancel();
            return;
        }

        if (keycode === ENTER_KEY) {
            InternalFunctions.submit();
            return;
        }
    },
    async submit() {
        const callbackRef = internalCallback;
        AthenaClient.systems.sound.frontend('SELECT', 'HUD_FREEMODE_SOUNDSET');
        await cancel();

        if (typeof callbackRef === 'function') {
            callbackRef(true);
        }
    },
};

/**
 * Create a box that asks for a simple yes or no answer.
 *
 *
 * @param {QuestionInfo} info
 * @return {Promise<boolean>}
 */
export function create(info: QuestionInfo): Promise<boolean> {
    if (AthenaClient.webview.isAnyMenuOpen(false)) {
        console.warn(`Input box could not be created because a menu is already open.`);
        return undefined;
    }

    if (typeof document === 'undefined') {
        document = alt.RmlDocument.create({ url: '/client/rmlui/question/index.rml' });
        document.show();
    }

    alt.Player.local.isMenuOpen = true;
    alt.Events.on('keyup', InternalFunctions.handleKeyUp);
    alt.Cursor.visible = true;
    alt.setRmlControlsActive(true);
    alt.setGameControlsActive(false);
    InternalFunctions.focus(info);

    return new Promise((resolve: MessageCallback) => {
        internalCallback = resolve;
    });
}

export async function cancel() {
    if (typeof document !== 'undefined') {
        document.destroy();
        document = undefined;
    }

    internalCallback = undefined;
    alt.Player.local.isMenuOpen = false;
    if (event) {
        event.destroy();
    }
    alt.Cursor.visible = false;
    alt.setRmlControlsActive(false);
    alt.setGameControlsActive(true);
    native.triggerScreenblurFadeOut(250);
    native.displayHud(true);
    native.displayRadar(true);

    await alt.Utils.waitFor(() => {
        return native.isScreenblurFadeRunning() === false;
    });
}

alt.Events.on('disconnect', () => {
    if (typeof document === 'undefined') {
        return;
    }

    document.destroy();
    alt.log('question | Destroyed RMLUI Document on Disconnect');
});
