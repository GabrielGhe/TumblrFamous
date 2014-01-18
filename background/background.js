var bg {  
  saveTags: function savePost (post) {
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
        console.log(result.posts);
      });
    },

    saveInterval: function saveInterval (intervalValue) {
      chrome.storage.local.set((interval: intervalValue), function (result) {
        console.log(result.interval);
      });
    },

    retrieveInterval: function retrieveInterval (intervalValue) {
      chrome.storage.local.get('interval', function (result) {
        console.log(result.interval);
      });
    }
}
