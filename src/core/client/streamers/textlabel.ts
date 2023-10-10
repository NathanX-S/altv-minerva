import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { TextLabel } from '@AthenaShared/interfaces/textLabel';

let labels: Array<TextLabel> = [];
let interval: alt.Timers.EveryTick;
let isRemoving = false;

/**
 * Do Not Export Internal Only
 */
const ClientTextLabelController = {
    init() {
        labels = [];
    },

    stop() {
        if (!interval) {
            return;
        }

        interval.destroy();
    },

    /**
     * Updates the text label for a client.
     *
     * @param {Partial<TextLabel>} label
     */
    update(label: Partial<TextLabel>) {
        const index = labels.findIndex((x) => x.uid === label.uid);
        if (index === -1) {
            return;
        }

        for (let i = labels.length - 1; i >= 0; i--) {
            if (labels[i].uid !== label.uid) {
                continue;
            }

            labels[i] = { ...labels[i], ...label };
        }
    },

    /**
     * Add a single text label.
     * @static
     * @param {TextLabel} label
     *
     */
    append(label: TextLabel) {
        if (!label.uid) {
            alt.logError(`(${JSON.stringify(label.text)}) Label is missing uid.`);
            return;
        }

        const index = labels.findIndex((x) => x.uid === label.uid);
        if (index === -1) {
            labels.push(label);
        } else {
            labels[index] = label;
        }

        if (!interval) {
            interval = alt.Timers.everyTick(handleDrawTextlabels);
        }
    },

    /**
     * Used to populate server-side markers.
     * The function looks at current markers and removes them if they are server-wide.
     *
     * @static
     * @param {Array<Marker>} labels
     *
     */
    populate(serverLabels: Array<TextLabel>) {
        labels = labels.filter((x) => !x.isServerWide).concat(serverLabels);

        if (!interval) {
            interval = alt.Timers.everyTick(handleDrawTextlabels);
        }
    },

    /**
     * Remove a marker from being drawn.
     * @static
     * @param {string} uid A unique string
     * @return {void}
     *
     */
    remove(uid: string) {
        isRemoving = true;

        for (let i = labels.length - 1; i >= 0; i--) {
            if (labels[i].uid !== uid) {
                continue;
            }

            labels.splice(i, 1);
        }

        isRemoving = false;
    },
};

function handleDrawTextlabels() {
    if (isRemoving) {
        return;
    }

    if (labels.length <= 0) {
        return;
    }

    if (alt.Player.local.isWheelMenuOpen) {
        return;
    }

    if (alt.Player.local.isMenuOpen) {
        return;
    }

    if (alt.Player.local.meta.isDead) {
        return;
    }

    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        if (!label.maxDistance) {
            label.maxDistance = 15;
        }

        if (AthenaClient.utility.vector.distance2d(alt.Player.local.pos, label.pos) > label.maxDistance) {
            continue;
        }

        AthenaClient.screen.text.drawText3D(label.text, label.pos, 0.4, new alt.RGBA(255, 255, 255, 255));
    }
}

alt.Events.on('connectionComplete', ClientTextLabelController.init);
alt.Events.on('disconnect', ClientTextLabelController.stop);
alt.Events.onServer(SYSTEM_EVENTS.APPEND_TEXTLABELS, ClientTextLabelController.append);
alt.Events.onServer(SYSTEM_EVENTS.POPULATE_TEXTLABELS, ClientTextLabelController.populate);
alt.Events.onServer(SYSTEM_EVENTS.REMOVE_TEXTLABEL, ClientTextLabelController.remove);
alt.Events.onServer(SYSTEM_EVENTS.UPDATE_TEXT_LABEL, ClientTextLabelController.update);
