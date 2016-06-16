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

  namespace app {
    interface App {
      /**
       * The (read-only) name (identifier) for this App. '[DEFAULT]' is the name of the default App.
       */
      name: string;

      /**
       * The (read-only) configuration options (the original parameters given in firebase.initializeApp()).
       */
      options: Object;

      /**
       * Gets the Firebase Auth Service object for an App.
       */
      auth(): auth.Auth;

      /**
       * Access the Database service from an App instance.
       */
      database(): database.Database;

      /**
       * Make the given App unusable and free the resources of all associated services.
       */
      delete(): Promise<void>;
    }
  }

  namespace auth {
    interface Auth {
      /**
       * The App associated with the Auth service instance.
       */
      app: app.App;

      /**
       * Creates a new custom token (JWT) that can be sent back to a client to use with signInWithCustomToken.
       */
      createCustomToken(uid: string, developerClaims?: Object): string;

      /**
       * Verifies a ID token (JWT). Returns a Promise with the tokens claims.
       * Rejects the promise if the token could not be verified.
       */
      verifyIdToken(idToken: string): Promise<Object>;
    }


    interface Error extends FirebaseError { }
  }

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
      once(eventType?: string, callback?: DataSnapshotCallback): Promise<any>;

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
       * Writes multiple values to the database at once.
       */
      update(values: Object, onComplete?: ErrorCallback): Promise<void>;

      /**
       * Remove the data at this database location.
       */
      remove(onComplete?: ErrorCallback): Promise<void>;

      /**
       * Write data to this database location.
       */
      set(value: any, onComplete?: ErrorCallback): Promise<void>;

      setPriority(priority: number | string, onComplete?: ErrorCallback): Promise<void>;

      setWithPriority(value: any, priority: number | string, onComplete?: ErrorCallback): Promise<void>;

      /**
       * Atomically modifies the data at this location.
       */
      transaction(transactionUpdate: (data: any) => any): Promise<{comitted: boolean, snapshot: DataSnapshot}>;
      transaction(transactionUpdate: (data: any) => any, onComplete: (error: any, comitted: boolean, snapshot: DataSnapshot) => void): Promise<{comitted: boolean, snapshot: DataSnapshot}>;
      transaction(transactionUpdate: (data: any) => any, onComplete: (error: any, comitted: boolean, snapshot: DataSnapshot) => void, applyLocally: boolean): Promise<{comitted: boolean, snapshot: DataSnapshot}>;
      transaction(transactionUpdate: (data: any) => any, applyLocally: boolean): Promise<{comitted: boolean, snapshot: DataSnapshot}>;

      /**
       * Returns an OnDisconnect
       */
      onDisconnect(): OnDisconnect;
    }

    export interface ThenableReference extends Reference { }

    interface OnDisconnect {
      set(value: any, onComplete?: ErrorCallback): Promise<void>;

      setWithPriority(value: any, priority: number | string, onComplete?: ErrorCallback): Promise<void>;

      update(value: Object, onComplete?: ErrorCallback): Promise<void>;

      remove(onComplete?: ErrorCallback): Promise<void>;

      cancel(onComplete?: ErrorCallback): Promise<void>;
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

  export function app(app?: string): app.App;

  export function auth(app?: app.App): auth.Auth;

  export function database(app?: app.App): database.Database;
}

declare module "firebase" {
    export = firebase;
}