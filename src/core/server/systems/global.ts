import * as alt from '@altv/server';
import Database from '@stuyk/ezmongodb';

const CollectionName = 'global';
let uid: string;

export interface IGlobal {
    _id?: unknown;
}

/**
 * It creates a collection in the database if it doesn't exist, and then it fetches all the
 * documents in the collection. If the collection is empty, it inserts a document into the
 * collection.
 *
 * The uid is then initialized and used for a single database document update.
 *
 * It's like a singleton, but for the Database.
 */
async function init() {
    await Database.createCollection(CollectionName);

    const collection = await Database.fetchAllData<IGlobal>(CollectionName);
    if (collection.length <= 0) {
        const document = await Database.insertData<IGlobal>({}, CollectionName, true);
        uid = document._id.toString();
        alt.logWarning(`Created Singleton Document for '${CollectionName}' for first time.`);
    } else {
        uid = collection[0]._id.toString();
    }
}
/**
 * Checks if the Global document is ready for handling requests.
 * @returns The `isReady` function returns a `Promise` that resolves to `true` when the `uid` is
 * defined.
 */
export async function isReady(): Promise<boolean> {
    if (uid) {
        return true;
    }

    return new Promise((resolve) => {
        const interval = alt.Timers.setInterval(() => {
            if (!uid) {
                return;
            }

            interval.destroy();
            return resolve(true);
        }, 100);
    });
}

/**
 * It sets and overrides the value of the key in the database.
 *
 * @param {string} key - The key to set.
 * @param {T} value - The value to be set.
 */
export async function setKey<T>(key: string, value: T): Promise<void> {
    await isReady();
    await Database.updatePartialData(uid, { [key]: value }, CollectionName);
}

/**
 * `get` returns the value of the specified key from the specified document
 * @param {string} key - The key to fetch from the database.
 * @returns The value of the key.
 */
export async function getKey<T>(key: string): Promise<T> {
    await isReady();
    const document = await Database.fetchData<IGlobal>('_id', uid, CollectionName);
    return document[key] as T;
}

/**
 * It fetches the singleton document from the database.
 * @returns A promise of an IGlobal object.
 */
export async function get<IGlobal>(): Promise<IGlobal> {
    await isReady();
    return await Database.fetchData<IGlobal>('_id', uid, CollectionName);
}
/**
 * Increase the value of a key in a document by a given value
 * @param {string} key - The key to increase.
 * @param [increaseByValue=1] - The amount to increase the value by.
 * @param [startValue=0] - The value to start the counter at.
 */
export async function increase(key: string, increaseByValue = 1, startValue = 0) {
    await isReady();

    const document = await Database.fetchData<IGlobal>('_id', uid, CollectionName);
    if (typeof document[key] === 'undefined') {
        document[key] = startValue;
    } else {
        if (typeof document[key] !== 'number') {
            alt.logWarning(`Global Database | Key: ${key} | Is not a number. Change value in database to a number.`);
            return false;
        }

        document[key] += Math.abs(increaseByValue);
    }

    return await Database.updatePartialData(uid, { [key]: document[key] }, CollectionName);
}
/**
 * Decrease the value of a key in the document by a given value
 * @param {string} key - The key of the field you want to update.
 * @param [decreaseByValue=1] - The amount to decrease the value by.
 * @param startValue - The value to start the counter at.
 */
export async function decrease(key: string, decreaseByValue = 1, startValue = Number.MAX_SAFE_INTEGER - 1) {
    await isReady();

    const document = await Database.fetchData<IGlobal>('_id', uid, CollectionName);
    if (!document[key]) {
        document[key] = startValue;
    } else {
        if (typeof document[key] !== 'number') {
            alt.logWarning(`Global Database | Key: ${key} | Is not a number. Change value in database to a number.`);
            return false;
        }

        document[key] -= Math.abs(decreaseByValue);
    }

    return await Database.updatePartialData(uid, { [key]: document[key] }, CollectionName);
}

init();
