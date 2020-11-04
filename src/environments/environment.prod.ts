export const environment = {
  production: true,
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
