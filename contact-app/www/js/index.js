var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

function wlCommonInit() {
  console.log(">> wlCommonInit() ..." );  

  WL.App.getServerUrl(function (url) {
      console.log("url : " + url);
  });
  
  //Calling to the MobileFirst Server    
  WLAuthorizationManager.obtainAccessToken().then(
        function (accessToken) {
          console.log(">> Success - Connected to MobileFirst Server");          
        },
        function (error) {
          console.log(">> Failed to connect to MobileFirst Server");          
        });
       
};
