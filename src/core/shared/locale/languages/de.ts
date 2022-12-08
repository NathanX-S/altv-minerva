import { LOCALE_KEYS } from './keys';

/**
 * Locales are written with a key and value type.
 * When you get the key of 'greet-user' from the LocaleController
 * It will return a string of 'Hello someVariableYouPass, welcome to the server.'
 * It's a simple way to create locales without hurting performance too much.
 */
export default {
    // Commands
    [LOCALE_KEYS.COMMAND_ADMIN_CHAT]: `_%_ [nachricht] - Sprich mit anderen Admins`,
    [LOCALE_KEYS.COMMAND_ACCEPT_DEATH]: `_%_ - Respawne am nächsten Krankenhaus`,
    [LOCALE_KEYS.COMMAND_ACTION_MENU]: `_%_ - Erstelle ein Menü mit Aktionen`,
    [LOCALE_KEYS.COMMAND_ADD_VEHICLE]: `_%_ [model] - Füge ein Fahrzeug zu deinem Charakter hinzu`,
    [LOCALE_KEYS.COMMAND_ADD_WHITELIST]: `_%_ [discord] - Füge einen Spieler, anhand seiner Discord ID, der Whitelist hinzu`,
    [LOCALE_KEYS.COMMAND_OOC]: `_%_ [nachricht] - Sprich out of character`,
    [LOCALE_KEYS.COMMAND_BROADCAST]: `_%_ [nachricht] - Sende eine serverweite Nachricht an alle Spieler`,
    [LOCALE_KEYS.COMMAND_COORDS]: `_%_ [x] [y] [z] - Teleportiere dich zu den angegebenen Koordinaten`,
    [LOCALE_KEYS.COMMAND_DO]: `_%_ [nachricht] - Beschreiben ein Objekt, Geräusch usw.`,
    [LOCALE_KEYS.COMMAND_DUMMY_ITEM]: `_%_ - Erhaltet ein Dummy Item`,
    [LOCALE_KEYS.COMMAND_GET_ITEM]: `_%_ [item-name] - Erhaltet ein Item anhand dessen Namens`,
    [LOCALE_KEYS.COMMAND_LOW]: `_%_ [nachricht] - Sprich leiser`,
    [LOCALE_KEYS.COMMAND_MOD_CHAT]: `_%_ [nachricht] - Sprich zu einem Admin oder Mod`,
    [LOCALE_KEYS.COMMAND_ME]: `_%_ [nachricht] - Beschreibe eine Aktion`,
    [LOCALE_KEYS.COMMAND_NO_CLIP]: `_%_ - Wechsel zum No Clip Modus`,
    [LOCALE_KEYS.COMMAND_QUIT_JOB]: `_%_ - Brich deinen aktuellen Job ab`,
    [LOCALE_KEYS.COMMAND_REMOVE_ALL_WEAPONS]: `_%_ - Entferne alle Waffen von deinem Charakter`,
    [LOCALE_KEYS.COMMAND_REMOVE_WHITELIST]: `_%_ [discord] - Entferne einen Spieler, anhand seiner Discord ID, von der Whitelist`,
    [LOCALE_KEYS.COMMAND_REVIVE]: `_%_ [player_id]* - Belebe einen Spieler oder dich selbst wieder`,
    [LOCALE_KEYS.COMMAND_SEATBELT]: `_%_ - Legen oder entferne den Sicherheitsgurt bzw den Helm`,
    [LOCALE_KEYS.COMMAND_SET_ARMOUR]: `_%_ [0-100][player_id]* - Setze den Wert der Rüstung eines Spielers oder deiner eigenen`,
    [LOCALE_KEYS.COMMAND_SET_CASH]: `_%_ [value] - Setze fest, wie viel Bargeld du bei dir trägst`,
    [LOCALE_KEYS.COMMAND_SET_FOOD]: `_%_ [0-100] - Setze fest, wie viel Hunger du hast`,
    [LOCALE_KEYS.COMMAND_SET_HEALTH]: `_%_ [99-199][player_id]* - Setze den Wert der Gesundheit eines Spielers oder deiner eigenen`,
    [LOCALE_KEYS.COMMAND_SET_WATER]: `_%_ [0-100] - Setze fest, wie viel Durst du hast`,
    [LOCALE_KEYS.COMMAND_SPAWN_VEHICLE]: `_%_ [index] - Spawne ein Fahrzeug anhand der Liste`,
    [LOCALE_KEYS.COMMAND_TELEPORTER]: `_%_ - Teleportiert dich mit einem Item zurück zur letzten Location`,
    [LOCALE_KEYS.COMMAND_TELEPORT_WAYPOINT]: `_%_ - Teleportiere dich zum Wegpunkt. Du musst erst einen Wegpunkt setzen`,
    [LOCALE_KEYS.COMMAND_TOGGLE_VEH_LOCK]: `_%_ - Schließe oder öffne die Tür für das Fahrzeug`,
    [LOCALE_KEYS.COMMAND_TOGGLE_VEH_DOOR]: `_%_ - [0-5] - Schließe oder öffne eine bestimmte Fahrzeugtür`,
    [LOCALE_KEYS.COMMAND_GIVE_VEH_KEY]: `_%_ [id] - Übergebe den Fahrzeugschlüssel an einen Spieler`,
    [LOCALE_KEYS.COMMAND_TOGGLE_ENGINE]: `_%_ - Starte oder stoppe den Motor des Fahrzeugs`,
    [LOCALE_KEYS.COMMAND_VEHICLE]: `_%_ [model] - Spawne ein Admin Fahrzeug`,
    [LOCALE_KEYS.COMMAND_WANTED]: `_%_ [player_id] [stars] - Setze die Anzahl der Fahndungssterne für einen Spieler`,
    [LOCALE_KEYS.COMMAND_WHISPER]: `_%_ [player_id][message] - Flüstere etwas zu einem Spieler in der Nähe`,
    [LOCALE_KEYS.COMMAND_WEAPON]: `_%_ [name] - Erhalte eine Waffe anhand dessen Namens`,
    [LOCALE_KEYS.COMMAND_CLEAR_INVENTORY]: `_%_ - Leere dein Inventar`,
    [LOCALE_KEYS.COMMAND_CLEAR_TOOLBAR]: `_%_ -Leere deine Toolbar`,
    [LOCALE_KEYS.COMMAND_CLEAR_EQUIPMENT]: `_%_ - Leere deine Ausrüstung`,
    [LOCALE_KEYS.COMMAND_NOT_PERMITTED_CHARACTER]: `Dieser Befehl ist nicht für deinen Charakterlevel zugelassen`,
    [LOCALE_KEYS.COMMAND_NOT_PERMITTED_ADMIN]: `Dieser Befehl ist nicht für deinen Adminlevel zugelassen`,
    [LOCALE_KEYS.COMMAND_NOT_VALID]: `_%_ ist kein gültiger Befehl`,
    [LOCALE_KEYS.COMMAND_SET_WEATHER]: `_%_ [wetter name] - Überschreiben des aktuellen Wetters in allen Regionen`,
    [LOCALE_KEYS.COMMAND_CLEAR_WEATHER]: `_%_ - Stoppe das Überschreiben des Wetters`,
    [LOCALE_KEYS.COMMAND_SET_TIME]: `_%_ [hour] - Überschreiben der aktuellen Zeit in allen Regionen`,
    [LOCALE_KEYS.COMMAND_CLEAR_TIME]: `_%_ - Stoppe das Überschreiben der Zeit`,
    [LOCALE_KEYS.COMMAND_REFILL_VEHICLE]: `_%_ -Betanken des Fahrzeugs`,
    [LOCALE_KEYS.COMMAND_REPAIR_VEHICLE]: `_%_ - Repariere das Fahrzeug`,
    [LOCALE_KEYS.COMMAND_TEMP_VEHICLE]: `_%_ [model] - Spawne ein temporäres Fahrzeug`,
    [LOCALE_KEYS.COMMAND_SET_VEHICLE_HANDLING]: `_%_ [wert] - Setze das Fahrzeughandling anhand eines Wertes`,
    [LOCALE_KEYS.COMMAND_SET_VEHICLE_LIVERY]: `_%_ [nummer] - Legt die Fahrzeuglackierung fest`,
    [LOCALE_KEYS.COMMAND_SESSION_VEHICLE]: `_%_ [model] - Spawne ein temporäres Fahrzeug für die aktuelle Session`,
    [LOCALE_KEYS.COMMAND_TOGGLE_VEH_NEON_LIGHTS]: `_%_ - Schalte die Neonlichter des Fahrzeugs ein oder aus`,
    [LOCALE_KEYS.COMMAND_SET_VEH_NEON_LIGHTS]: `_%_ [<] [>] [ᐱ] [V] - Setze die Neonlichter des Fahrzeugs`,
    [LOCALE_KEYS.COMMAND_FULL_TUNE_VEHICLE]: `_%_ - Fulltune eine Fahrzeug`,
    [LOCALE_KEYS.COMMAND_ADD_VEHICLE_KEY]: `_%_ - Füge einen Fahrzeugschlüssel hinzu`,
    [LOCALE_KEYS.COMMAND_SET_VEH_DIRT_LEVEL]: `_%_ [level] - Setze das Schmutzlevel des Fahrzeugs`,
    // Cannot
    [LOCALE_KEYS.CANNOT_CHAT_WHILE_DEAD]: `Du bist tot. Wie soll das gehen?`,
    [LOCALE_KEYS.CANNOT_FIND_PLAYER]: `Spieler nicht gefunden`,
    [LOCALE_KEYS.CANNOT_PERFORM_WHILE_DEAD]: `Du bist tot. Wie soll das gehen?`,
    [LOCALE_KEYS.CANNOT_FIND_PERSONAL_VEHICLES]: `Kein Persönliches Fahrzeug gefunden`,
    [LOCALE_KEYS.CANNOT_FIND_THAT_PERSONAL_VEHICLE]: 'Das persönliche Fahrzeug wurde nicht gefunden',
    // Clothing
    [LOCALE_KEYS.CLOTHING_ITEM_IN_INVENTORY]: `Das Kleidungsstück wurde in dein Inventar gelegt`,
    // Discord
    [LOCALE_KEYS.DISCORD_ID_NOT_LONG_ENOUGH]: `Discord ID muss 18 Zeichen lang sein`,
    [LOCALE_KEYS.DISCORD_ALREADY_WHITELISTED]: `_%_ steht bereits auf der Whitelist.`,
    [LOCALE_KEYS.DISCORD_NOT_WHITELISTED]: `_%_ steht nicht auf der Whitelist.`,
    [LOCALE_KEYS.DISCORD_ADDED_WHITELIST]: `_%_ wurde zur Whitelist hinzugefügt.`,
    [LOCALE_KEYS.DISCORD_REMOVED_WHITELIST]: `_%_ wurde von der Whitelist entfernt.`,
    // FUEL
    [LOCALE_KEYS.FUEL_EXIT_VEHICLE_FIRST]: `Du musst dein Fahrzeug verlassen, um es zu betanken`,
    [LOCALE_KEYS.FUEL_UPDATE_VEHICLE_FIRST]: `Du musst dein Fahrzeug verlassen, um es zu betanken`,
    [LOCALE_KEYS.FUEL_VEHICLE_NOT_CLOSE]: `Du bist nicht in der Nähe eines Fahrzeugs`,
    [LOCALE_KEYS.FUEL_ALREADY_FULL]: `Das Fahrzeug ist bereits vollgetankt`,
    [LOCALE_KEYS.FUEL_TOO_FAR_FROM_PUMP]: `Die Zapfsäule ist zu weit von deinem Fahrzeug entfernt`,
    [LOCALE_KEYS.FUEL_HAS_UNLIMITED]: `Das Fahrzeug hat unbegrenzten Kraftstoff`,
    [LOCALE_KEYS.FUEL_CANNOT_AFFORD]: `Du kannst dir keinen Kraftstoff leisten`,
    [LOCALE_KEYS.FUEL_PAYMENT]: `Du musst $_%_ für _%_ L bezahlen. Öffne das Menü erneut um abzubrechen`,
    [LOCALE_KEYS.FUEL_PAID]: `Du hast $_%_ für _%_ L Kraftstoff bezahlt`,
    // House
    [LOCALE_KEYS.INTERIOR_INTERACT]: `Interact with House`,
    //Translations related to interiors
    [LOCALE_KEYS.INTERIOR_TOO_FAR_FROM_ENTRANCE]: `Die Eingangstür ist zu weit entfernt`,
    [LOCALE_KEYS.INTERIOR_TOO_FAR_FROM_EXIT]: `Der Ausgang ist zu weit entfernt`,
    [LOCALE_KEYS.INTERIOR_NOT_ENOUGH_CURRENCY]: `Du hast nicht genug Geld`,
    [LOCALE_KEYS.INTERIOR_DOOR_LOCKED]: `Die Tür ist verschlossen`,
    [LOCALE_KEYS.INTERIOR_PURCHASED]: `Du hast das Haus _%_ für $_%_ gekauft`,
    [LOCALE_KEYS.INTERIOR_SOLD]: `Du hast das Haus _%_ für $_%_ verkauft`,
    [LOCALE_KEYS.INTERIOR_NO_STORAGE]: `Das Haus hat keinen Lagerplatz`,
    // Invalid
    [LOCALE_KEYS.INVALID_VEHICLE_MODEL]: `Das ist kein gültiges Fahrzeugmodell`,
    // Interaction
    [LOCALE_KEYS.INTERACTION_TOO_FAR_AWAY]: `Du bist zu weit entfernt`,
    [LOCALE_KEYS.INTERACTION_INVALID_OBJECT]: `Das Objekt hat keine Funktion`,
    [LOCALE_KEYS.INTERACTION_INTERACT_WITH_OBJECT]: `Interagiere mit einem Objekt`,
    [LOCALE_KEYS.INTERACTION_INTERACT_VEHICLE]: `Interagiere mit dem Fahrzeug`,
    [LOCALE_KEYS.INTERACTION_VIEW_OPTIONS]: `Optionen anzeigen`,
    // Item
    [LOCALE_KEYS.ITEM_NOT_EQUIPPED]: `in diesem Slot ist kein Gegenstand`,
    [LOCALE_KEYS.ITEM_DOES_NOT_EXIST]: `_%_ existiert nicht`,
    [LOCALE_KEYS.ITEM_WAS_ADDED_INVENTORY]: `_%_ wurde in dein Inventar gelegt`,
    [LOCALE_KEYS.ITEM_WAS_ADDED_EQUIPMENT]: `_%_ wurde in dein Equiptment gelegt`,
    [LOCALE_KEYS.ITEM_WAS_ADDED_TOOLBAR]: `_%_ wurde in deine Toolbar gelegt`,
    [LOCALE_KEYS.ITEM_WAS_DESTROYED_ON_DROP]: `_%_ wurde beim Fallenlassen zerstört`,
    // Job
    [LOCALE_KEYS.JOB_ALREADY_WORKING]: `Du hast bereits einen Job`,
    [LOCALE_KEYS.JOB_NOT_WORKING]: `Du hast aktuell keinen Job`,
    [LOCALE_KEYS.JOB_QUIT]: `Du hast deinen Job abgebrochen`,
    // Labels
    [LOCALE_KEYS.LABEL_ON]: `An`,
    [LOCALE_KEYS.LABEL_OFF]: `Aus`,
    [LOCALE_KEYS.LABEL_BROADCAST]: `Broadcast`,
    [LOCALE_KEYS.LABEL_ENGINE]: `Motor`,
    [LOCALE_KEYS.LABEL_HOSPITAL]: `Krankenhaus`,
    [LOCALE_KEYS.LABEL_BANNED]: `[Gebannt]`,
    // Player
    [LOCALE_KEYS.PLAYER_IS_TOO_FAR]: `Der Spieler ist zu weit entfernt`,
    [LOCALE_KEYS.PLAYER_IS_TOO_CLOSE]: `Der Spieler ist zu nah`,
    [LOCALE_KEYS.PLAYER_IS_NOT_DEAD]: `Der Spieler ist nicht tot`,
    [LOCALE_KEYS.PLAYER_ARMOUR_SET_TO]: `Deine Rüstung wurde auf _%_ gesetzt`,
    [LOCALE_KEYS.PLAYER_HEALTH_SET_TO]: `Dein Leben wurde auf _%_ gesetzt`,
    [LOCALE_KEYS.PLAYER_SEATBELT_ON]: `Du hast den Sicherheitsgurt angelegt`,
    [LOCALE_KEYS.PLAYER_SEATBELT_OFF]: `Du hast den Sicherheitsgurt abgelegt`,
    [LOCALE_KEYS.PLAYER_RECEIVED_BLANK]: `Du hast _%_ von _%_ erhalten`,
    // Use
    [LOCALE_KEYS.USE_FUEL_PUMP]: 'Zapfsäule benutzen',
    [LOCALE_KEYS.USE_ATM]: 'Bankautomat benutzen',
    [LOCALE_KEYS.USE_VENDING_MACHINE]: 'Automat benutzen',
    [LOCALE_KEYS.USE_CLOTHING_STORE]: 'Laden benutzen',
    // Weapon
    [LOCALE_KEYS.WEAPON_NO_HASH]: `Das ist kein gültiges Waffenmodell`,
    // Vehicle
    [LOCALE_KEYS.VEHICLE_NO_FUEL]: `Das Fahrzeug hat keinen Kraftstoff`,
    [LOCALE_KEYS.VEHICLE_LOCK_SET_TO]: `Zentralverriegelung wurde auf _%_ gesetzt`,
    [LOCALE_KEYS.VEHICLE_TOGGLE_LOCK]: `Zentralverriegelung umschalten`,
    [LOCALE_KEYS.VEHICLE_TOGGLE_ENGINE]: `Motor umschalten`,
    [LOCALE_KEYS.VEHICLE_IS_LOCKED]: `Das nähste Fahrzeug ist verschlossen`,
    [LOCALE_KEYS.VEHICLE_ENTER_VEHICLE]: `Steige in das Fahrzeug ein oder aus`,
    [LOCALE_KEYS.VEHICLE_TOO_FAR]: `Das Fahrzeug ist zu weit entfernt`,
    [LOCALE_KEYS.VEHICLE_NO_VEHICLES_IN_GARAGE]: `In der Garage befinden sich keine Fahrzeuge`,
    [LOCALE_KEYS.VEHICLE_NO_PARKING_SPOTS]: `Es gibt keine freien Parkplätze`,
    [LOCALE_KEYS.VEHICLE_ALREADY_SPAWNED]: `Das Fahrzeug ist bereits ausgeparkt`,
    [LOCALE_KEYS.VEHICLE_COUNT_EXCEEDED]: `Du hast bereits zu viele Fahrzeuge ausgepakrt und hast dein Limit erreicht`,
    [LOCALE_KEYS.VEHICLE_LOCKED]: `Verriegelt`,
    [LOCALE_KEYS.VEHICLE_UNLOCKED]: `Offen`,
    [LOCALE_KEYS.VEHICLE_FUEL]: `Benzin`,
    // [LOCALE_KEYS.VEHICLE_PETROL]: `Benzin`,
    // [LOCALE_KEYS.VEHICLE_DIESEL]: `Diesel`,
    // [LOCALE_KEYS.VEHICLE_ELECTRIC]: `Strom`,
    // [LOCALE_KEYS.VEHICLE_Kerosene]: `Kerosin`,
    [LOCALE_KEYS.VEHICLE_NO_KEYS]: `Für dieses Fahrzeug hast du keine Schlüssel`,
    [LOCALE_KEYS.VEHICLE_NO_STORAGE]: `Das Fahrzeug hat keinen Kofferraum`,
    [LOCALE_KEYS.VEHICLE_NO_TRUNK_ACCESS]: `Du hast keinen Zugriff auf diesen Kofferraum`,
    [LOCALE_KEYS.VEHICLE_NOT_UNLOCKED]: `Das Fahrzeug ist nicht offen`,
    [LOCALE_KEYS.VEHICLE_NO_OPEN_SEAT]: `Kann nicht einsteigen, da kein freier Sitzplatz vorhanden ist`,
    [LOCALE_KEYS.VEHICLE_REFUEL_INCOMPLETE]: `Betanken des Fahrzeugs ist noch nicht abgeschlossen`,
    [LOCALE_KEYS.VEHICLE_NO_LONGER_NEAR_VEHICLE]: `Du hast dich zu weit vom Fahrzeug entfernt`,
    [LOCALE_KEYS.VEHICLE_NOT_RIGHT_SIDE_UP]: `Das Fahrzeug ist umgekippt`,
    [LOCALE_KEYS.VEHICLE_IS_ALREADY_BEING_PUSHED]: `Das Fahrzeug wird bereits geschoben`,
    [LOCALE_KEYS.VEHICLE_STORAGE_VIEW_NAME]: `Fahrzeug - _%_ - Kofferraum`,
    [LOCALE_KEYS.VEHICLE_KEY_NAME]: `Schlüssel für _%_`,
    [LOCALE_KEYS.VEHICLE_KEY_DESCRIPTION]: `Ein Schlüssel für das Fahrzeug _%_`,
    [LOCALE_KEYS.VEHICLE_MODEL_INVALID]: `Fahrzeugmodell ist ungültig`,
    [LOCALE_KEYS.VEHICLE_CREATED]: `Fahrzeug wurde erstellt`,
    [LOCALE_KEYS.VEHICLE_REFILLED]: `Fahrzeug wurde aufgetankt`,
    [LOCALE_KEYS.VEHICLE_REPAIRED]: `Fahrzeug wurde repariert`,
    [LOCALE_KEYS.VEHICLE_HAS_NO_MOD_KIT]: `Das Fahrzeug hat kein Modifikationskit`,
    [LOCALE_KEYS.VEHICLE_NOT_OWN_BY_YOU]: `Das Fahrzeug gehört dir nicht`,
    [LOCALE_KEYS.VEHICLE_KEY_GIVEN_TO]: `Schlüsselkopie wurde an _%_ gegeben`,
    // Faction
    [LOCALE_KEYS.FACTION_PLAYER_IS_ALREADY_IN_FACTION]: `_%_ ist bereits in einer Fraktion oder die Fraktion existiert nicht`,
    [LOCALE_KEYS.FACTION_CANNOT_CHANGE_OWNERSHIP]: `Du kannst die Fraktion nicht übernehmen`,
    [LOCALE_KEYS.FACTION_STORAGE_NOT_ACCESSIBLE]: `Du hast keinen Zugriff darauf`,
    [LOCALE_KEYS.FACTION_STORAGE_NO_ACCESS]: `Du hast keinen Zugriff auf das Lager`,
    [LOCALE_KEYS.FACTION_ONLY_OWNER_IS_ALLOWED]: `Nur der Besitzer der Fraktion kann dies tun`,
    [LOCALE_KEYS.FACTION_UNABLE_TO_DISBAND]: `Du kannst die Fraktion nicht auflösen`,
    [LOCALE_KEYS.FACTION_NAME_DOESNT_MATCH]: `Der angegebene Fraktionsname stimmt nicht mit dem Fraktionsnamen überein.`,
    [LOCALE_KEYS.FACTION_NOT_THE_OWNER]: `Du bist nicht der Besitzer der Fraktion`,
    [LOCALE_KEYS.FACTION_COULD_NOT_FIND]: `Konnte die Fraktion nicht finden`,
    [LOCALE_KEYS.FACTION_DISABNDED]: `Fraktion wurde aufgelöst`,
    [LOCALE_KEYS.FACTION_BANK_COULD_NOT_WITHDRAW]: `Konnte keine $_%_ abheben.`,
    [LOCALE_KEYS.FACTION_BANK_COULD_NOT_DEPOSIT]: `Konnte keine $_%_ einzahlen`,
    [LOCALE_KEYS.FACTION_BANK_WITHDREW]: `Abgehoben: $_%_`,
    [LOCALE_KEYS.FACTION_PLAYER_QUITTED]: `_%_ hat die Fraktion verlassen`,
    [LOCALE_KEYS.FACTION_COULDNT_QUIT]: `Da du der Besitzer der Fraktion bist, kannst du sie nicht verlassen`,
    // World
    [LOCALE_KEYS.WORLD_TIME_IS]: `Aktuelle Zeit _%_:_%_`,
    // Storage
    [LOCALE_KEYS.STORAGE_NOT_AVAILABLE]: `Kein Lager verfügbar`,
    [LOCALE_KEYS.STORAGE_IN_USE]: `Lager wird bereits verwendet`,
    [LOCALE_KEYS.INVENTORY_IS_FULL]: `Dein Inventar ist voll`,
    // No Clip
    [LOCALE_KEYS.NOCLIP_SPEED_INFO]: `Links Shift (Sprint-Geschwindigkeit) | Scrollen (Sprint-Geschwindigkeit ändern)`,
    [LOCALE_KEYS.NOCLIP_SPEED]: `Geschwindigkeit`,
    // ============================
    // WebView Locales Start Here
    // ============================
    [LOCALE_KEYS.WEBVIEW_JOB]: {
        LABEL_DECLINE: 'Ablehnen',
        LABEL_ACCEPT: 'Annehmen',
    },
    [LOCALE_KEYS.WEBVIEW_STORAGE]: {
        LABEL_SPLIT_TEXT: 'Einen Stapel mit der Menge bewegen?',
    },
    [LOCALE_KEYS.WEBVIEW_INVENTORY]: {
        ITEM_SLOTS: [
            'Kopf',
            'Maske',
            'Hemd',
            'Hose',
            'Schuhe',
            'Brille',
            'Ohren',
            'Rucksack',
            'Panzerung',
            'Uhr',
            'Armband',
            'Accessoir',
        ],
        LABEL_SPLIT: 'teilen',
        LABEL_CANCEL: 'abbrechen',
        LABEL_DROP_ITEM: 'fallen lassen',
        LABEL_WEIGHT: 'Gewicht',
        LABEL_SPLIT_TEXT: 'Einen Stapel mit der Menge erstellen?',
    },
};
