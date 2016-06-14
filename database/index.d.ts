declare namespace firebase {
    export function database(app?: app.App): firebase.database.Database;

    namespace database {
        interface ServerValue {
            TIMESTAMP: Object;
        }

        export var ServerValue: ServerValue;

        export function enableLogging(logger: boolean, persistent?: boolean): void;

        interface DataSnapshotCallback {
            (dataSnapshot: DataSnapshot, prevChildName?: string): void;
        }

        interface ErrorCallback {
            (error: any): void;
        }

        export interface Database {
            /**
             * The App associated with the Database service instance.
             */
            app: app.App;

            /**
             * (Re)connect to the server and synchronize the offline database state with the server state.
             */
            goOnline(): void;

            /**
             * Disconnect from the server (all database operations will be completed offline).
             */
            goOffline(): void;

            /**
             * Returns a Reference to the root or the specified path.
             */
            ref(path?: string): Reference;

            /**
             * Returns a reference to the root or the path specified in url.
             * An exception is thrown if the url is not in the same domain as the current database.
             */
            refFromURL(url: string): Reference;
        }

        export interface Query {
            /**
             * Returns a Reference to the Query's location.
             */
            ref: Reference;

            /**
             * Creates a Query with the specified starting point.
             */
            startAt(value: string, key?: string): Query;
            startAt(value: number, key?: string): Query;
            startAt(value: boolean, key?: string): Query;

            /**
             * Creates a Query with the specified ending point.
             */
            endAt(value: string, key?: string): Query;
            endAt(value: number, key?: string): Query;
            endAt(value: boolean, key?: string): Query;

            /**
             * Creates a Query which includes children which match the specified value.
             */
            equalTo(value: string, key?: string): Query;
            equalTo(value: number, key?: string): Query;
            equalTo(value: boolean, key?: string): Query;

            /**
             * Generates a new Query limited to the first specific number of children.
             */
            limitToFirst(limit: number): Query;

            /**
             * Generates a new Query object limited to the last specific number of children.
             */
            limitToLast(limit: number): Query;

            /**
             * Listens for data changes at a particular location.
             */
            on(eventType: string, callback: DataSnapshotCallback): DataSnapshotCallback;
            on(eventType: string, callback: DataSnapshotCallback, cancelCallback: (error: Error) => void): DataSnapshotCallback;
            on(eventType: string, callback: DataSnapshotCallback, cancelCallback: (error: Error) => void, context: Object): DataSnapshotCallback;
            on(eventType: string, callback: DataSnapshotCallback, context: Object): DataSnapshotCallback;

            /**
             * Detaches a callback previously attached with on().
             */
            off(eventType?: string, callback?: DataSnapshotCallback, context?: Object): void;

            /**
             * Listens for exactly one event of the specified event type, and then stops listening.
             */
            once(eventType?: string, callback?: DataSnapshotCallback): void;

            /**
             * Generates a new Query object ordered by the specified child key.
             */
            orderByChild(path: string): Query;

            /**
             * Generates a new Query object ordered by key.
             */
            orderByKey(): Query;

            /**
             * Generates a new Query object ordered by child values.
             */
            orderByValue(): Query;

            /**
             * Generates a new Query object order by priority.
             */
            orderByPriority(): Query;

            toString(): string;
        }

        export interface Reference extends Query {
            /**
             * The last part of the current path.
             * The key of the root Reference is null. 
             */
            key: string;

            /**
             * The parent location of a Reference.
             */
            parent: Reference;

            /**
             * The root location of a Reference.
             */
            root: Reference;

            /**
             * Gets a Reference for the location at the specified relative path.
             * The relative path can either be a simple child name (for example, "ada")
             * or a deeper slash-separated path (for example, "ada/name/first").
             */
            child(path: string): Reference;

            /**
             * Generates a new child location using a unique key and returns its reference.
             */
            push(value: any, onComplete?: ErrorCallback): ThenableReference;

            /**
             * Remove the data at this database location.
             */
            remove(onComplete?: ErrorCallback): firebase.Promise<void>;

            /**
             * Write data to this database location.
             */
            set(value: any, onComplete?: ErrorCallback): firebase.Promise<void>;

            setPriority(priority: number | string, onComplete?: ErrorCallback): firebase.Promise<void>;

            setWithPriority(value: any, priority: number | string, onComplete?: ErrorCallback): firebase.Promise<void>;

            /**
             * Atomically modifies the data at this location.
             */
            transaction(transactionUpdate: (data: any) => any): firebase.Promise<{comitted: boolean, snapshot: DataSnapshot}>;
            transaction(transactionUpdate: (data: any) => any, onComplete: (error: any, comitted: boolean, snapshot: DataSnapshot) => void): firebase.Promise<{comitted: boolean, snapshot: DataSnapshot}>;
            transaction(transactionUpdate: (data: any) => any, onComplete: (error: any, comitted: boolean, snapshot: DataSnapshot) => void, applyLocally: boolean): firebase.Promise<{comitted: boolean, snapshot: DataSnapshot}>;
            transaction(transactionUpdate: (data: any) => any, applyLocally: boolean): firebase.Promise<{comitted: boolean, snapshot: DataSnapshot}>;

            /**
             * Returns an OnDisconnect
             */
            onDisconnect(): OnDisconnect;
        }

        export interface ThenableReference extends Reference { }

        interface OnDisconnect {
            set(value: any, onComplete?: ErrorCallback): firebase.Promise<void>;

            setWithPriority(value: any, priority: number | string, onComplete?: ErrorCallback): firebase.Promise<void>;

            update(value: Object, onComplete?: ErrorCallback): firebase.Promise<void>;

            remove(onComplete?: ErrorCallback): firebase.Promise<void>;

            cancel(onComplete?: ErrorCallback): firebase.Promise<void>;
        }

        export interface DataSnapshot {
            /**
             * The key (last part of the path) of the location of this DataSnapshot.
             */
            key: string;

            /**
             * The Reference for the location that generated this DataSnapshot.
             */
            ref: Reference;

            /**
             * Gets another DataSnapshot for the location at the specified relative path.
             */
            child(path: string): DataSnapshot;

            /**
             * Returns true if this DataSnapshot contains any data. It is slightly more efficient than using snapshot.val() !== null.
             */
            exists(): boolean;

            /**
             * Enumerates the top-level children in the DataSnapshot.
             */
            forEach(childAction: (childSnapshot: DataSnapshot) => void | boolean): boolean;

            /**
             * Gets the priority value of the data in this DataSnapshot.
             */
            getPriority(): string | number;

            /**
             * Returns true if the specified child path has (non-null) data.
             */
            hasChild(path: string): boolean;

            /**
             * Returns true if the DataSnapshot has child properties.
             */
            hasChildren(): boolean;

            /**
             * Return the number of child properties of this DataSnapshot.
             */
            numChildren(): number;

            /**
             * Extract a Javascript value from a DataSnapshot.
             */
            val(): any;
        }
    }
}