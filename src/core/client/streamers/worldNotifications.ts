import * as alt from '@altv/client';
import * as native from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';

import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { IWorldNotification } from '@AthenaShared/interfaces/iWorldNotification';

let addedNotifications: Array<IWorldNotification> = [];
let localNotifications: Array<IWorldNotification> = [];
let isRemoving = false;
let interval: alt.Timers.EveryTick;

const ClientWorldNotificationController = {
    init() {
        addedNotifications = [];
        localNotifications = [];
    },

    stop() {
        if (!interval) {
            return;
        }

        interval.destroy();
    },

    append(notification: IWorldNotification) {
        if (!notification.uid) {
            alt.logError(`(${JSON.stringify(notification.pos)}) WorldNotification is missing uid.`);
            return;
        }

        const index = localNotifications.findIndex((obj) => obj.uid === notification.uid);
        if (index <= -1) {
            localNotifications.push(notification);
        } else {
            alt.logWarning(
                `${notification.uid} was not a unique identifier. Replaced WorldNotifications in ClientWorldNotificationController.`,
            );
            localNotifications[index] = notification;
        }

        if (!interval) {
            interval = alt.Timers.everyTick(handleDrawNotifications);
        }
    },

    populate(notifications: Array<IWorldNotification>) {
        addedNotifications = notifications;

        if (!interval) {
            interval = alt.Timers.everyTick(handleDrawNotifications);
        }
    },

    remove(uid: string) {
        isRemoving = true;

        const index = localNotifications.findIndex((marker) => marker.uid === uid);
        if (index <= -1) {
            isRemoving = false;
            return;
        }

        const marker = localNotifications[index];
        if (!marker) {
            isRemoving = false;
            return;
        }

        localNotifications.splice(index, 1);
        isRemoving = false;
    },
};

function handleDrawNotifications() {
    if (isRemoving) {
        return;
    }

    const notifications = addedNotifications.concat(localNotifications);

    if (notifications.length <= 0) {
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

    for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (!notification.maxDistance) {
            notification.maxDistance = 5;
        }

        if (AthenaClient.utility.vector.distance2d(alt.Player.local.pos, notification.pos) > notification.maxDistance) {
            continue;
        }

        native.beginTextCommandDisplayHelp('STRING');
        native.addTextComponentSubstringPlayerName(notification.text);
        native.endTextCommandDisplayHelp(2, false, false, -1);
        native.setFloatingHelpTextWorldPosition(1, notification.pos.x, notification.pos.y, notification.pos.z);

        if (notification.background === null || notification.background === undefined) {
            notification.background = 2;
        }

        native.setFloatingHelpTextStyle(1, 1, notification.background, -1, notification.type, 0);
    }
}

alt.Events.on('connectionComplete', ClientWorldNotificationController.init);
alt.Events.on('disconnect', ClientWorldNotificationController.stop);
alt.Events.onServer(SYSTEM_EVENTS.POPULATE_WORLD_NOTIFICATIONS, ClientWorldNotificationController.populate);
alt.Events.onServer(SYSTEM_EVENTS.APPEND_WORLD_NOTIFICATION, ClientWorldNotificationController.append);
alt.Events.onServer(SYSTEM_EVENTS.REMOVE_WORLD_NOTIFICATION, ClientWorldNotificationController.remove);
