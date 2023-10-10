import * as alt from '@altv/client';
import * as native from '@altv/natives';

/**
 * Get cursor position that is similar to GTA:V screen sizes.
 *
 *
 * @return {alt.IVector2}  x: 0-1.0, y: 0-1.0
 */
export function getScaledCursorPosition(): alt.IVector2 {
    const cursor = alt.Cursor.pos;
    const [_nothing, _x, _y] = native.getActualScreenResolution(0, 0);
    return {
        x: cursor.x / _x,
        y: cursor.y / _y,
    };
}
