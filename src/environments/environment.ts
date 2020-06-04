// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl :    "http://132.147.160.71/AddCoreAPI/API/Core/",
  apiUrl:   "http://132.147.160.71/AddCoreAPI/API/Core/GetUserLogin",
  logoutUrl : "http://132.147.160.71/AddCoreAPI/API/Core/SetUserStatus",
  setupUrl: "http://132.147.160.71/AddCoreAPI/API/Core/GetSetupListView",
  createTrans:"http://132.147.160.71/AddCoreAPI/API/Core/SetNewTxnView"    // "http://localhost:44391/sampleApi/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
