import * as alt from '@altv/client';
import * as native from '@altv/natives';

const temporaryText = [];
let tempInterval: alt.Timers.Interval | undefined;

/**
 * Draw text on your screen in a 2D position with an every tick.
 * @param  {string} text
 * @param  {alt.Vector2} pos
 * @param  {number} scale
 * @param  {alt.RGBA} color
 * @param  {number | null} alignment 0 Center, 1 Left, 2 Right
 */
export function drawText2D(
    text: string,
    pos: alt.IVector2,
    scale: number,
    color: alt.RGBA,
    alignment: number = 0,
    padding: number = 0,
) {
    if (scale > 2) {
        scale = 2;
    }

    native.clearDrawOrigin();
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.setTextFont(4);
    native.setTextScale(1, scale);
    native.setTextColour(color.r, color.g, color.b, color.a);
    native.setTextOutline();
    native.setTextDropShadow();
    if (alignment !== null) {
        native.setTextWrap(padding, 1 - padding);
        native.setTextJustification(alignment);
    }

    native.endTextCommandDisplayText(pos.x, pos.y, 0);
}

/**
 * Draw a box at a 3D coordinate
 *
 *
 * @param {alt.IVector3} pos A position in the world.
 * @param {alt.IVector2} size
 * @param {alt.RGBA} color
 * @return {void}
 */
export function drawRectangle(pos: alt.IVector3, size: alt.IVector2, color: alt.RGBA) {
    const [isOnScreen, x, y] = native.getScreenCoordFromWorldCoord(pos.x, pos.y, pos.z, 0, 0);
    if (!isOnScreen) {
        return;
    }

    native.setDrawOrigin(pos.x, pos.y, pos.z, false);
    native.drawRect(0, 0, size.x, size.y, color.r, color.g, color.b, color.a, false);
    native.clearDrawOrigin();
}

/**
 * Draw a box on-screen
 *
 *
 * @param {alt.IVector2} pos
 * @param {alt.IVector2} size
 * @param {alt.RGBA} color
 */
export function drawRectangle2D(pos: alt.IVector2, size: alt.IVector2, color: alt.RGBA) {
    native.clearDrawOrigin();
    native.drawRect(pos.x, pos.y, size.x, size.y, color.r, color.g, color.b, color.a, false);
}

/**
 * Draw stable text in a 3D position with an every tick.
 * @param  {string} text
 * @param  {alt.Vector3} pos
 * @param  {number} scale
 * @param  {alt.RGBA} color
 */
export function drawText3D(text: string, pos: alt.IVector3, scale: number, color: alt.RGBA) {
    if (scale > 2) {
        scale = 2;
    }

    native.setDrawOrigin(pos.x, pos.y, pos.z, false); // Used to stabalize text, sprites, etc. in a 3D Space.
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.setTextFont(4);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextColour(color.r, color.g, color.b, color.a);
    native.setTextOutline();
    native.setTextDropShadow();
    native.setTextJustification(0);
    native.endTextCommandDisplayText(0, 0, 0);
    native.clearDrawOrigin();
}

/**
 * Adds text temporarily on the screen.
 *
 * @param {*} identifier
 * @param {*} msg
 * @param {*} x
 * @param {*} y
 * @param {*} scale
 * @param {*} r
 * @param {*} g
 * @param {*} b
 * @param {*} a
 * @param {*} ms
 */
export function addTemporaryText(identifier, msg, x, y, scale, r, g, b, a, ms) {
    const index = temporaryText.findIndex((data) => data.identifier === identifier);

    if (index !== -1) {
        try {
            temporaryText[index].timeout.destory();
            temporaryText[index].timeout = null;
        } catch (err) {}
        temporaryText.splice(index, 1);
    }

    const timeout = alt.Timers.setTimeout(() => {
        removeText(identifier);
    }, ms);

    temporaryText.push({ identifier, msg, x, y, scale, r, g, b, a, timeout });

    if (tempInterval) {
        tempInterval.destroy();
        tempInterval = null;
    }

    tempInterval = alt.Timers.setInterval(handleDrawTemporaryText, 0);
}

/**
 * Stop drawing temporary text based on the name.
 * @param {*} identifier
 * @return {void}
 */
function removeText(identifier: string): void {
    const index = temporaryText.findIndex((data) => data.identifier === identifier);
    if (index <= -1) {
        return;
    }

    temporaryText.splice(index, 1);

    if (temporaryText.length <= 0) {
        tempInterval.destroy();
        tempInterval = null;
    }
}

/**
 * Used in a setInterval,0 to draw text in the temporaryText array.
 */
function handleDrawTemporaryText(): void {
    for (let i = 0; i < temporaryText.length; i++) {
        const data = temporaryText[i];
        drawText2D(data.msg, { x: data.x, y: data.y }, data.scale, new alt.RGBA(data.r, data.g, data.b, data.a));
    }
}
