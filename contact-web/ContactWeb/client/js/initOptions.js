

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


/**
require.config({
  'paths': {
    'ibmmfpfanalytics': 'ibm-mfp-web-sdk/lib/analytics/ibmmfpfanalytics',
    'ibmmfpf': 'ibm-mfp-web-sdk/ibmmfpf'
  }
});

require(['ibmmfpfanalytics', 'ibmmfpf'], function(analytics, WL) {
    var wlInitOptions = {
        'mfpContextRoot' : '/mfp' ,
        'applicationId' : 'com.bnpp.myunicityweb'
    };

    WL.Client.init(wlInitOptions).always(function(){
             console.log('MobileFirstPlatform initialized');
    });


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
*/