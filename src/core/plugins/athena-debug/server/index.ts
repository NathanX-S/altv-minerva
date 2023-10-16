import * as alt from '@altv/server';
import * as Athena from '@AthenaServer/api';
import { DebugKeys } from './system/keys';
import { RestService } from './system/rest';
import { ATHENA_DEBUG_EVENTS } from '../shared/events';

const PLUGIN_NAME = 'athena-debug';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    if (!alt.isDebug) {
        return;
    }

    RestService.init();
    DebugKeys.init();
});
