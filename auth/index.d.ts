declare namespace firebase {
    export function auth(app?: app.App): auth.Auth;

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
}