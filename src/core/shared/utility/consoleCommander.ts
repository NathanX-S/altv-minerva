import * as alt from '@altv/client';

type ConsoleCommand = {
    [cmd: string]: (...args: string[]) => void;
};

const Commands: ConsoleCommand = {};

/**
 * Invokes a callback for the specific console command.
 *
 * @param {string} cmdName
 * @param {...string[]} args
 * @return {void}
 */
function handleConsoleMessage(cmdName: string, ...args: string[]): void {
    const cmdNameclean = cmdName.replace(/^\s+|\s+$/g, '');

    if (Commands[cmdNameclean]) {
        Commands[cmdNameclean](...args);
    } else {
        console.log(`Command "${cmdNameclean}" not found.`);
    }
}

export class ConsoleCommander {
    static init() {
        alt.Events.on('consoleCommand', handleConsoleMessage);
    }

    /**
     * Allows a console command to be invoked through other means.
     *
     * @static
     * @param {string} cmdName
     * @param {...string[]} args
     *
     */
    static invokeCommand(cmdName: string, ...args: string[]): void {
        handleConsoleMessage(cmdName, ...args);
    }

    /**
     * Register a Server-Side or Client-Side Console Command
     * Depends on the folder you are writing inside of.
     *
     * @static
     * @param {string} cmdName
     * @param {(...args: string[]) => void} callback
     *
     */
    static registerConsoleCommand(cmdName: string, callback: (...args: string[]) => void) {
        Commands[cmdName] = callback;
    }

    /**
     * Return a list of commands...
     *
     * @static
     * @return {void}
     *
     */
    static getCommands() {
        return Object.keys(Commands);
    }
}
