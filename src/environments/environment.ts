// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl :    "http://132.147.160.71/AddCoreAPI/API/Core/",
  apiUrl:   "http://132.147.160.71/AddCoreAPI/API/Core/GetUserLogin",
  logoutUrl : "http://132.147.160.71/AddCoreAPI/API/Core/SetUserStatus",
  setupUrl: "http://132.147.160.71/AddCoreAPI/API/Core/GetSetupListView",
  createTrans:"http://132.147.160.71/AddCoreAPI/API/Core/SetNewTxnView",    // "http://localhost:44391/sampleApi/"
  fakeJson : "http://localhost:3000/data", //"http://132.147.160.40:3000/data"
  productsJson : "http://localhost:3000/Products",
  accountsJson : "http://localhost:3000/Account",
  txnFields : "http://132.147.160.71/AddCoreAPI/API/Core/SetTxnFieldView",
  test :    "http://132.147.160.71/AddCoreAPI/API/Core/SubmitNewTxn",
  ImageURL: "http://localhost:42000/",
  transStageGet: "http://132.147.160.71/AddCoreAPI/API/Core/GetFileForStage",
  transFileStageGet:"http://132.147.160.71/AddCoreAPI/API/Core/GetTxnForStage",
  submitTranStage:"http://132.147.160.71/AddCoreAPI/API/Core/PostTxnForStage",
  blkUpload :    "http://132.147.160.71/AddCoreAPI/API/Core/UploadTxn",
  blkSubRoll: "http://132.147.160.71/AddCoreAPI/API/Core/UploadTxnPost",
  sideMenu:true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
