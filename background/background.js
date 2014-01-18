var bg = {  
  saveTags: function(post) {
      // by passing an object you can define default values e.g.: []
      chrome.storage.local.get({posts: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var posts = result.posts;
        posts.splice(0, 0, {post: post});
        // set the new array value to the same key
        chrome.storage.local.set({posts: posts}, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.local.get('posts', function (result) {
                // updateTagList(result.tags); <-- Doesn't exist yet
            });
        });
    });   
    // siteList.push(siteName);
    },

    retrievePosts: function() {
      var x;
      chrome.storage.local.get('posts', function (result) {
        x = [];
      });
      
      return [];
    },

    saveInterval: function(intervalValue) {
      chrome.storage.local.set({interval: intervalValue}, function (result) {
        console.log(result.interval);
      });
    },

    retrieveInterval: function retrieveInterval(intervalValue) {
      chrome.storage.local.get('interval', function (result) {
        console.log(result.interval);
      });
    },

    authenticateUser: function(username, password) {
      var consumer = {};

      consumer.example = { 
          consumerKey   : "myKey", 
          consumerSecret: "mySecret",
          serviceProvider:
          { 
            signatureMethod     : "HMAC-SHA1",
            requestTokenURL     : "http://www.tumblr.com/oauth/request_token",
            userAuthorizationURL: "http://www.tumblr.com/oauth/authorize",
            accessTokenURL      : "http://localhost/oauth-provider/access_token",
            echoURL             : "http://localhost/oauth-provider/echo"
          }
      };
    }
}
