var bg = {
    setFs: function(fsObj){
      bg.fs = fsObj;
    },

    
    saveTags: function(post) {
      //We get then we set
      chrome.storage.sync.get("posts", function(data) {
        console.log(data);
        array = [];
        
        //if it exists we add to array else make new one
        if(data){
          //TODO
        } else {
          array.push(post);
        }
        
        //Save changes
        chrome.storage.sync.set({"posts": array}, function() {
        
        });
      });
    },

    
    retrievePosts: function() {
      chrome.storage.sync.get("posts", function(data) {
        res = data
        if(!data){
          res = ["blah", "bluh", "blih"];
        }
        bg.fs.setTags(["blah", "bluh", "blih"]);
      });
    },
    

    saveInterval: function(intervalValue) {

    },
    

    retrieveInterval: function(intervalValue) {
    
    }
};


/*
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
*/