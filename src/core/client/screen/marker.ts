import * as alt from '@altv/client';
import * as native from '@altv/natives';

const zeroVector = { x: 0, y: 0, z: 0 };

/**
 * Draw a marker in an every tick.
 * @param  {number} type
 * @param  {alt.IVector3} pos A position in the world.
 * @param  {alt.IVector3} scale
 * @param  {alt.RGBA} color
 * @param  {boolean} bobUpAndDown
 * @param  {boolean} faceCamera
 * @param {boolean} rotate
 */
export function draw(
    type: number,
    pos: alt.IVector3,
    scale: alt.IVector3,
    color: alt.RGBA,
    bobUpAndDown: boolean = false,
    faceCamera: boolean = true,
    rotate: boolean = false,
) {
    native.drawMarker(
        type,
        pos.x,
        pos.y,
        pos.z,
        zeroVector.x,
        zeroVector.y,
        zeroVector.z,
        zeroVector.x,
        zeroVector.y,
        zeroVector.z,
        scale.x,
        scale.y,
        scale.z,
        color.r,
        color.g,
        color.b,
        color.a,
        bobUpAndDown,
        faceCamera,
        2,
        rotate,
        undefined,
        undefined,
        false,
    );
}

export function drawSimple(
    type: number,
    pos: alt.IVector3,
    rot: alt.IVector3,
    scale: alt.IVector3,
    color: alt.RGBA,
    faceCam: boolean,
) {
    native.drawMarker(
        type,
        pos.x,
        pos.y,
        pos.z,
        zeroVector.x,
        zeroVector.y,
        zeroVector.z,
        rot.x,
        rot.y,
        rot.z,
        scale.x,
        scale.y,
        scale.z,
        color.r,
        color.g,
        color.b,
        color.a,
        false,
        faceCam,
        2,
        false,
        undefined,
        undefined,
        false,
    );
}
