# Firebase Cloud Test Functions

#### Important  
Make sure to have Firebase CLI installed! Run each command at the root of this project.

### Cloud Testing
1. Run `firebase use --add` to get a list of all your Firebase projects and to chose one (Blaze plan must be enabled)  
2. Run `firebase deploy --only "functions:rest"` to deploy test functions in this project  

### Emulator Testing
1. Run `firebase emulators:start` to start Firestore and Functions emulators.

## Execute Tests  
### Using External Clients
Make HTTP REST calls to `https://<region>-<project-id>.cloudfunctions.net/rest` endpoint if you are using [Cloud Testing](#cloud-testing) else `http://localhost:5001/<project-id>/<region>/rest` if you are running [Emulators](#emulator-testing)

### Using GodotFirebase plugin  
1. Call `Firebase.set_emulated(true)` if you are running [Emulators](#emulator-testing), else call `Firebase.set_emulated(false)`  
2. Call `Firebase.functions.execute("rest/<endpoint>", method: int, queryParams: {}, body: {})` to call a function on the "rest" endpoint

## exposed APIs  
| Type | Endpoint | Param | Body |  
|:---|:---|:---|:---|  
| POST | /user | null | { "firstName": string, "lastName": string } |  
| GET | /user/:id | id: string | null |  
| GET | /users | null | null |  
