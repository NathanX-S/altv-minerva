import * as alt from '@altv/server';
import * as Athena from '@AthenaServer/api';
import { ConsoleCommander } from '@AthenaShared/utility/consoleCommander';

import './commands/moderator';
import './commands/player';
import './commands/admin';

const PLUGIN_NAME = 'commands';
Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    ConsoleCommander.init(alt);
});
