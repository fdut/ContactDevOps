var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    mfpContextRoot : '/mfp', // "mfp" is the default context root in the MobileFirst Development server
    applicationId : 'com.bnpp.myunicityweb' // Replace with your own value.
};

WL.Client.init(wlInitOptions).then (
    function() {

      console.log('MobileFirstPlatform initialized');
      // Application logic.
      WL.AuthorizationManager.obtainAccessToken()
          .then(
            function (accessToken) {
              console.log("Connected to MobileFirst Server") ;
            },
            function (error) {
              console.log("Failed to retrive token from MobileFirst Server") ;
            }
            );
});
