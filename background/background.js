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
        bg.fs.setTags(data);
      });
    },

    saveInterval: function(intervalValue) {

    },

    retrieveInterval: function(intervalValue) {
    
    },
    
    /*
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
    */
}
