import * as alt from '@altv/client';
import * as native from '@altv/natives';
import { SHARED_CONFIG } from '@AthenaShared/configurations/shared';
import { VehicleController } from './vehicle';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

let interval: alt.Timers.EveryTick | undefined;

function toggleOn() {
    interval = alt.Timers.everyTick(disableDefaultBehavior);
}

function disableDefaultBehavior(): void {
    native.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false);

    // Disable default weapon switch
    for (let i = 157; i < 164; i++) {
        native.disableControlAction(0, i, true);
    }

    if (
        alt.Player.local.meta.food <= SHARED_CONFIG.FOOD_FATIGUE ||
        alt.Player.local.meta.water <= SHARED_CONFIG.WATER_FATIGUE
    ) {
        native.disableControlAction(0, 21, true);
    }

    // Disable Weapon Wheel
    native.disableControlAction(0, 12, true);
    native.disableControlAction(0, 13, true);
    native.disableControlAction(0, 14, true);
    native.disableControlAction(0, 15, true);
    native.disableControlAction(0, 37, true);
    native.disableControlAction(0, 192, true);
    native.disableControlAction(0, 204, true);
    native.disableControlAction(0, 211, true);
    native.disableControlAction(0, 349, true);

    // Disable Default Controls
    native.disableControlAction(0, 104, true); // H
    VehicleController.handleVehicleDisables();
}

onTicksStart.add(toggleOn);
