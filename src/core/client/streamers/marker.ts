import * as alt from '@altv/client';
import * as AthenaClient from '@AthenaClient/api';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { Marker } from '@AthenaShared/interfaces/marker';

let addedMarkers: Array<Marker> = [];
let localMarkers: Array<Marker> = [];
let isRemoving = false;
let interval: alt.Timers.Interval;

/**
 * Do Not Export Internal Only
 */
const ClientMarkerController = {
    init() {
        addedMarkers = [];
        localMarkers = [];
    },

    stop() {
        if (!interval) {
            return;
        }

        interval.destroy();
    },

    /**
     * Add a single local marker.
     * @static
     * @param {Marker} marker
     *
     */
    append(marker: Marker) {
        if (!marker.uid) {
            alt.logError(`(${JSON.stringify(marker.pos)}) Marker is missing uid.`);
            return;
        }

        const index = localMarkers.findIndex((obj) => obj.uid === marker.uid);
        if (index <= -1) {
            localMarkers.push(marker);
        } else {
            alt.logWarning(`${marker.uid} was not a unique identifier. Replaced Marker in ClientMarkerController.`);
            localMarkers[index] = marker;
        }

        if (!interval) {
            interval = alt.Timers.setInterval(handleDrawMarkers, 0);
        }
    },

    /**
     * Used to populate server-side markers and keeps them
     * separate from local markers.
     * @static
     * @param {Array<Marker>} markers
     *
     */
    populate(markers: Array<Marker>) {
        addedMarkers = markers;

        if (!interval) {
            interval = alt.Timers.setInterval(handleDrawMarkers, 0);
        }
    },

    /**
     * Remove a local marker from being drawn.
     * @static
     * @param {string} uid A unique string
     * @return {void}
     *
     */
    remove(uid: string) {
        isRemoving = true;

        const index = localMarkers.findIndex((marker) => marker.uid === uid);
        if (index <= -1) {
            isRemoving = false;
            return;
        }

        const marker = localMarkers[index];
        if (!marker) {
            isRemoving = false;
            return;
        }

        localMarkers.splice(index, 1);
        isRemoving = false;
    },
};

function handleDrawMarkers() {
    if (isRemoving) {
        return;
    }

    const markers = addedMarkers.concat(localMarkers);

    if (markers.length <= 0) {
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

    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (!marker.maxDistance) {
            marker.maxDistance = 25;
        }

        if (AthenaClient.utility.vector.distance2d(alt.Player.local.pos, marker.pos) > marker.maxDistance) {
            continue;
        }

        if (!marker.scale) {
            marker.scale = new alt.Vector3(1, 1, 1);
        }

        AthenaClient.screen.marker.draw(
            marker.type,
            marker.pos,
            marker.scale,
            marker.color,
            marker.bobUpAndDown,
            marker.faceCamera,
            marker.rotate,
        );
    }
}

alt.Events.on('connectionComplete', ClientMarkerController.init);
alt.Events.on('disconnect', ClientMarkerController.stop);
alt.Events.onServer(SYSTEM_EVENTS.POPULATE_MARKERS, ClientMarkerController.populate);
alt.Events.onServer(SYSTEM_EVENTS.APPEND_MARKER, ClientMarkerController.append);
alt.Events.onServer(SYSTEM_EVENTS.REMOVE_MARKER, ClientMarkerController.remove);
