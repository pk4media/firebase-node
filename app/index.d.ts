declare namespace firebase {
    export function app(app?: string): app.App;

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
            database(): firebase.database.Database;

            /**
             * Make the given App unusable and free the resources of all associated services.
             */
            delete(): Promise<void>;
        }
    }
}