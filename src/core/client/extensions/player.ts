import { Meta } from './meta';

declare module '@altv/client' {
    export interface Player {
        // Used to store data sent down from the server-side.
        meta: Partial<Meta>;

        // Check if a re-usable WebView is open.
        isMenuOpen: boolean;
        isWheelMenuOpen: boolean;
        isActionMenuOpen: boolean;
        isLeaderboardOpen: boolean;
        isNoClipOn: boolean;
    }
}
