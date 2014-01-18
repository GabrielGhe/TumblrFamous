var bg {  
  saveTags: function saveTag (tag) {
      // by passing an object you can define default values e.g.: []
      chrome.storage.local.get({tags: []}, function (result) {
        // the input argument is ALWAYS an object containing the queried keys
        // so we select the key we need
        var tags = result.tags;
        tags.push({tagName: tag});
        // set the new array value to the same key
        chrome.storage.local.set({tags: tags}, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.local.get('tags', function (result) {
                // updateTagList(result.tags); <-- Doesn't exist yet
            });
        });
    });   
    // siteList.push(siteName);
    },

    retrieveTags: function() {
      chrome.storage.local.get('tags', function (result) {
        return result.tags;
      });

    }
}