var bg = {
    setFs: function(fsObj){
      bg.fs = fsObj;
    },

    
    saveTags: function(post) {
      //We get then we set
      chrome.storage.sync.get("posts", function(data) {
        array = [];
        
        //if it exists we add to array else make new one
        if(data.posts){
          array = data.posts;
          array.push(post);
        } else {
          array.push(post);
        }
        
        console.log("inside saveTags");
        console.log(data);
        
        //Save changes
        chrome.storage.sync.set({"posts": array}, function() {
        
        });
      });
    },

    
    retrievePosts: function() {
      chrome.storage.sync.get("posts", function(data) {
        res = data.posts;
        if(!data.posts){
          res = [];
        }
        bg.fs.setTags(res);
      });
    },
    

    saveInterval: function(intervalValue) {

    },
    

    retrieveInterval: function(intervalValue) {
    
    },

    deletePost: function(index) {
      chrome.storage.sync.get("posts", function(data) {
        res = data.posts;
        console.log(res);
        res.splice(index, 1)
        chrome.storage.sync.set({"posts": res}, function() {
        });
      });
    }
};

// var tumblr = require('lib/js/tumblr.js');

// var oauth = ChromeExOAuth.initBackgroundPage({
//   'request_url': "http://www.tumblr.com/oauth/request_token",
//   'authorize_url': "http://www.tumblr.com/oauth/authorize",
//   'access_url': "http://www.tumblr.com/oauth/access_token",
//   'consumer_key': "NugbEX3qh96IleVqn2eGLTphq8WWFb1NDhC15XfcdHm5xtjdVb",
//   'consumer_secret': "8j0CkWdhKKrxuokj2OZEPH43uvgFf9eReKzFYI57ubXkapBnEe"
// });

// function callback(resp, xhr) {
//   // ... Process text response ...
// };

// function onAuthorized() {
//   var url = 'api.tumblr.com/v2/blog/foxpapered/posts';
//   var request = {
//     'method': 'GET',
//     'parameters': {'alt': 'json'}
//   };
//   console.log("whew");
//   // Send: GET https://docs.google.com/feeds/default/private/full?alt=json
//   oauth.sendSignedRequest(url, callback, request);
// };

// function() {
//   oauth.authorize(onAuthorized);
// }
