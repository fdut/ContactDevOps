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

 MQA.startNewSession(
{
        mode: "QA",
                           // or mode: "MARKET" for production mode.
                           // Key for MQA Sydnet : 1g15b6a583f170042b717b2f0192f6b4a846a1b496g0g2g21230c56
                           // Key fo MQA US : 1g24d8f8b6e1713509e11aae1076a5bddba9575c63g0g2g34080d1c
         android: {
           appKey: "1g8126965879978a7b67f63322bade6d5eb729a024g0g2g1d7e0c7d" ,
           notificationsEnabled: true
      }
    },
    {
        success: function () {console.log("Session Started successfully");},
        error: function (string) { console.log("Session error" + string);}
    }
  );
  
  //Calling to the MobileFirst Server    
  WLAuthorizationManager.obtainAccessToken().then(
        function (accessToken) {
          console.log(">> Success - Connected to MobileFirst Server");          
        },
        function (error) {
          console.log(">> Failed to connect to MobileFirst Server");          
        });
       
};
