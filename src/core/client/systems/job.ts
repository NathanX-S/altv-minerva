import * as alt from '@altv/client';
import * as natives from '@altv/natives';
import * as AthenaClient from '@AthenaClient/api';

import JobEnums, { Objective } from '@AthenaShared/interfaces/job';
import { isFlagEnabled } from '@AthenaShared/utility/flags';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { KEY_BINDS } from '@AthenaShared/enums/keyBinds';

let objective: Objective | null;
let interval: alt.Timers.Interval;
let cooldown: number;
let blip: alt.Blip;
let isPressed = false;

const ObjectiveController = {
    updateObjective(data: Objective | null) {
        objective = data;
    },

    /**
     * If the objective is null, clear the objective and blip. Otherwise, set the objective and blip.
     * @param {uniontype} data - Objective | null
     * @returns The Objective object.
     */
    handleSync(data: Objective | null) {
        if (interval) {
            interval.destroy();
            interval = null;
        }

        if (blip && blip.destroy) {
            try {
                blip.destroy();
            } catch (err) {}
        }

        if (!data) {
            objective = null;
            return;
        }

        if (data.blip) {
            blip = alt.PointBlip.create({ pos: data.blip.pos });
            blip.scale = data.blip.scale;

            blip.sprite = data.blip.sprite;
            blip.color = data.blip.color;
            blip.shortRange = data.blip.shortRange;
            blip.name = data.blip.text;
            blip.route = true;
        }

        objective = { ...data };
        interval = alt.Timers.setInterval(ObjectiveController.verifyObjective, 0);
    },

    getVector3Range() {
        return new alt.Vector3(objective.range, objective.range, objective.range);
    },

    verifyType(dist: number): boolean {
        if (isFlagEnabled(objective.type, JobEnums.ObjectiveType.WAYPOINT)) {
            if (dist <= objective.range) {
                return true;
            }
        }

        if (isFlagEnabled(objective.type, JobEnums.ObjectiveType.CAPTURE_POINT)) {
            if (dist <= objective.range) {
                return true;
            }
        }

        if (isFlagEnabled(objective.type, JobEnums.ObjectiveType.PRESS_INTERACT_TO_COMPLETE)) {
            if (dist <= objective.range) {
                return true;
            }

            if (isPressed) {
                return true;
            }
        }

        return false;
    },

    verifyCriteria(dist: number): boolean {
        if (isFlagEnabled(objective.criteria, JobEnums.ObjectiveCriteria.NO_VEHICLE)) {
            if (alt.Player.local.vehicle) {
                return false;
            }
        }

        if (isFlagEnabled(objective.criteria, JobEnums.ObjectiveCriteria.IN_VEHICLE)) {
            if (!alt.Player.local.vehicle) {
                return false;
            }
        }

        if (isFlagEnabled(objective.criteria, JobEnums.ObjectiveCriteria.VEHICLE_ENGINE_OFF)) {
            const engineOn = natives.getIsVehicleEngineRunning(alt.Player.local.vehicle.scriptID);
            if (engineOn) return false;
        }

        return true;
    },

    verifyObjective() {
        if (alt.Player.local.isMenuOpen) {
            return;
        }

        if (!objective) {
            return;
        }

        const dist = AthenaClient.utility.vector.distance(alt.Player.local.pos, objective.pos);

        if (objective.marker && dist <= objective.range * 25) {
            const scale = objective.marker.scale ? objective.marker.scale : ObjectiveController.getVector3Range();

            AthenaClient.screen.marker.draw(
                objective.marker.type,
                objective.marker.pos as alt.Vector3,
                scale,
                objective.marker.color,
            );
        }

        if (objective.textLabel && dist <= objective.range * 10) {
            AthenaClient.screen.text.drawText3D(
                objective.textLabel.text,
                objective.textLabel.pos as alt.Vector3,
                0.4,
                new alt.RGBA(255, 255, 255, 255),
            );
        }

        if (objective.captureProgress >= 1 && dist <= objective.range * 10) {
            const progressText = `${objective.captureProgress}/${objective.captureMaximum}`;
            AthenaClient.screen.text.drawText3D(
                progressText,
                objective.pos as alt.Vector3,
                0.4,
                new alt.RGBA(255, 255, 255, 255),
            );
        }

        if (cooldown && Date.now() < cooldown) {
            return;
        }

        cooldown = Date.now() + 250;

        if (!ObjectiveController.verifyType(dist)) {
            return;
        }

        if (!ObjectiveController.verifyCriteria(dist)) {
            return;
        }

        alt.Events.emitServer(JobEnums.ObjectiveEvents.JOB_VERIFY);
    },
};

alt.Events.onServer(JobEnums.ObjectiveEvents.JOB_SYNC, ObjectiveController.handleSync);
alt.Events.onServer(JobEnums.ObjectiveEvents.JOB_UPDATE, ObjectiveController.updateObjective);
onTicksStart.add(() => {
    AthenaClient.systems.hotkeys.add({
        key: KEY_BINDS.INTERACT,
        description: 'Interact Job',
        identifier: 'interact-hotkey-job',
        modifier: 'shift',
        keyDown: () => {
            isPressed = true;
        },
        keyUp: () => {
            isPressed = false;
        },
    });

    AthenaClient.systems.hotkeys.add({
        key: KEY_BINDS.INTERACT_ALT,
        description: 'Interact Job Alternative',
        identifier: 'interact-hotkey-job-alt',
        keyDown: () => {
            isPressed = true;
        },
        keyUp: () => {
            isPressed = false;
        },
    });
});
