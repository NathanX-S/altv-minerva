import * as alt from '@altv/server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

alt.Events.emit(SYSTEM_EVENTS.COMMANDS_LOADED);
