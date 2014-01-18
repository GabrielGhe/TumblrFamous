var tumblr = require('tumblr.js');

var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "http://www.tumblr.com/oauth/request_token",
  'authorize_url': "http://www.tumblr.com/oauth/authorize",
  'access_url': "http://www.tumblr.com/oauth/access_token",
  'consumer_key': "NugbEX3qh96IleVqn2eGLTphq8WWFb1NDhC15XfcdHm5xtjdVb",
  'consumer_secret': "8j0CkWdhKKrxuokj2OZEPH43uvgFf9eReKzFYI57ubXkapBnEe"
});

function callback(resp, xhr) {
  // ... Process text response ...
};

function onAuthorized() {
  var url = 'https://docs.google.com/feeds/default/private/full';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };

  // Send: GET https://docs.google.com/feeds/default/private/full?alt=json
  oauth.sendSignedRequest(url, callback, request);
};

oauth.authorize(onAuthorized);

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
      chrome.storage.local.get('posts', function (result) {
        
        if(!result.posts){
          result.posts = [];
        }
        return result.posts;
      });
    },

    saveInterval: function(intervalValue) {
      chrome.storage.local.set((interval: intervalValue), function (result) {
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
