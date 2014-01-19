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
    },
    
    getTagsForLoop: function(){
      chrome.storage.sync.get("posts", function(data) {
        res = data.posts;
        if(!data.posts){
          res = [];
        }
        bg.sendRequestWith(res);
      });
    },
    
    sendRequestWith: function(data){
      console.log(JSON.stringify(data));
      /*
      $.ajax({
        type: "GET",
        //the url where you want to sent the userName and password to
        url: '',
        dataType: 'json',
        async: false,
        //json object to sent to the authentication url
        data: JSON.stringify(data) ,
        success: function () {}
      });
    */
    }
};

setInterval(call, 10000);
function call(){
  console.log("hi");
  bg.getTagsForLoop();
}
