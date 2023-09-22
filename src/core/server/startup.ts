import * as alt from '@altv/server';
import connection from './database/connection';
import reconnect from './utility/reconnect';
import serverConfig from './utility/config';
import Database from '@stuyk/ezmongodb';
import { SYSTEM_EVENTS } from '../shared/enums/system';
import { IConfig } from './interface/iConfig';

const startTime = Date.now();
let config: IConfig | undefined;

class Startup {
    static async begin() {
        config = await serverConfig.get();
        Startup.database();
        await Startup.load();
    }

    /**
     * Used to start the Database.
     * @static
     *
     */
    static database() {
        if (typeof config === 'undefined') {
            alt.logWarning(
                `Failed to load Configuration File. Is 'AthenaConfig.json' file malformed? Try setting to default values again.`,
            );
            process.exit(1);
        }

        const url = connection.getURL(config);
        const collections = connection.getCollections();

        Database.init(url, connection.getName(config), collections)
            .catch(() => {
                connection.throwConnectionError();
            })
            .then((res) => {
                if (res) {
                    alt.log(`MongoDB connection was established.`);
                    return;
                }

                connection.throwConnectionError();
            });
    }

    /**
     * Sets the current ares endpoint.
     * @static
     *
     */
    static async load() {
        if (typeof config === 'undefined') {
            alt.logWarning(
                `Failed to load Configuration File. Is 'AthenaConfig.json' file malformed? Try setting to default values again.`,
            );
            process.exit(1);
        }

        // @ts-ignore
        await import(`./boot.js`);
        alt.log(`~lc~Boot Time: ~g~${Date.now() - startTime}ms`);
    }

    static async toggleEntry() {
        earlyConnHandler.destroy();
        reconnect.invoke();
    }

    static handleEarlyConnect({ player }) {
        if (!(player instanceof alt.Player) || !player || !player.valid) {
            return;
        }

        try {
            player.kick('[Athena] Connected too early. Server still warming up.');
        } catch (err) {
            alt.log(`[Athena] A reconnection event happened too early. Try again.`);
        }
    }
}

const earlyConnHandler = alt.Events.onPlayerConnect(Startup.handleEarlyConnect);
alt.Events.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, Startup.toggleEntry);

Startup.begin();
