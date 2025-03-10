import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { AcceptDeclineEvent } from '@AthenaShared/interfaces/acceptDeclineEvent';

let lastEvent: AcceptDeclineEvent;

async function handleOpen() {
    if (typeof lastEvent === 'undefined') {
        return;
    }

    if (AthenaClient.webview.isAnyMenuOpen()) {
        return;
    }

    const result = await AthenaClient.rmlui.question.create({ placeholder: lastEvent.question, blur: true });
    const eventToCall = result ? lastEvent.onClientEvents.accept : lastEvent.onClientEvents.decline;
    alt.Events.emitServer(eventToCall, lastEvent.data);
    lastEvent = undefined;
}

function setAcceptDeclineEvent(event: AcceptDeclineEvent) {
    lastEvent = event;
}

function init() {
    AthenaClient.systems.hotkeys.add({
        key: 38,
        description: 'Accept / Decline Event Prompt',
        identifier: 'accept-decline-event-prompt',
        keyDown: handleOpen,
    });

    alt.Events.onServer(SYSTEM_EVENTS.ACCEPT_DECLINE_EVENT_SET, setAcceptDeclineEvent);
}

onTicksStart.add(init);
