import * as alt from '@altv/client';
import * as native from '@altv/natives';

export class Scaleform {
    private id: number;

    constructor(hash: number) {
        this.id = hash;
    }

    hasLoaded(): boolean {
        return native.hasScaleformMovieLoaded(this.id);
    }

    passFunction(functionName: string, ...args: Array<any>) {
        native.beginScaleformMovieMethod(this.id, functionName);

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            switch (typeof arg) {
                case 'number': {
                    if (Number(arg) === arg && arg % 1 !== 0) {
                        native.scaleformMovieMethodAddParamFloat(arg);
                    } else {
                        native.scaleformMovieMethodAddParamInt(arg);
                    }
                }
                case 'string': {
                    native.scaleformMovieMethodAddParamPlayerNameString(arg as string);
                    break;
                }
                case 'boolean': {
                    native.scaleformMovieMethodAddParamBool(arg);
                    break;
                }
                default: {
                    alt.logError(
                        `Bad Argument: ${typeof arg} = ${arg.toString()} passed to scaleform with handle ${this.id}`,
                    );
                }
            }
        }

        return native.endScaleformMovieMethodReturnValue();
    }

    destroy() {
        native.setScaleformMovieAsNoLongerNeeded(this.id);
        this.id = 0;
    }

    render(x: number, y: number, width: number, height: number) {
        native.drawScaleformMovie(this.id, x, y, width, height, 255, 255, 255, 255, 0);
    }
}

/**
 * Request a scaleform by name.
 *
 *
 * @param {string} scaleformName
 * @return {Promise<Scaleform>}
 */
export function requestScaleForm(scaleformName: string): Promise<Scaleform> {
    return new Promise((resolve: Function) => {
        const instance = new Scaleform(native.requestScaleformMovie(scaleformName));
        const interval = alt.Timers.setInterval(() => {
            if (!instance.hasLoaded()) {
                return;
            }

            interval.destroy();
            resolve(instance);
        }, 5);
    });
}
