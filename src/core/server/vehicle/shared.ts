import { VehicleState } from '@AthenaShared/interfaces/vehicleState';
import * as alt from '@altv/shared';

export const SEAT = {
    DRIVER: 1,
    PASSENGER: 2,
    BACK_LEFT: 3,
    BACK_RIGHT: 4,
};

export interface VehicleSpawnInfo {
    model: string | number;
    pos: alt.IVector3;
    rot: alt.IVector3;
    data?: Partial<VehicleState>;
}
