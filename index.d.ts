/// <reference path="./app/index.d.ts" />
/// <reference path="./auth/index.d.ts" />
/// <reference path="./database/index.d.ts" />

declare namespace firebase {
    interface Thenable<T> extends PromiseLike<T> {}

    class Promise<T> implements Thenable<T> {
        /**
         * Convert an array of Promises, to a single array of values.
         * Promise.all() resolves only after all the Promises in the array have resolved.
         */
        static all<P>(values: Promise<P>[]): Promise<P[]>;

        /**
         * Return (an immediately) resolved Promise.
         */
        static resolve<P>(value: P): Promise<P>;

        /**
         * Return (an immediately) rejected Promise.
         */
        static reject(error: Error): Promise<any>;

        /**
         * A Promise represents an eventual (asynchronous) value. A Promise should (eventually) either resolve or reject.
         * When it does, it will call all the callback functions that have been assigned via the .then() or .catch() methods.
         */
        constructor(resolver: (resolve?: (value: T) => void, reject?: (error: Error) => void) => void);

        /**
         * Assign callback functions called when the Promise either resolves, or is rejected.
         */
        then<R>(onResolve?: (value: T) => R, onReject?: (error: Error) => any): Promise<R>;

        /**
         * Assign a callback when the Promise rejects.
         */
        catch(onReject?: (error: Error) => any): void;
    }

    interface FirebaseError extends Error {
        /**
         * Error codes are strings using the following format:
         * "service/string-code"
         */
        code: string;
    }

    /**
     * The current SDK version
     */
    export var SDK_VERSION: string;

    /**
     * A (read-only) array of all the initialized Apps.
     */
    export var apps: firebase.app.App[];

    /**
     * Create (and intialize) a FirebaseApp.
     */
    export function initializeApp(options: Object, name?: string): firebase.app.App;
}

declare module "firebase" {
    export = firebase;
}