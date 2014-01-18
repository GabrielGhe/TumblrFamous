var bg = chrome.extension.getBackgroundPage().bg;
//LoginContainer vars
var loginContainer;
var emailInput;
var passInput;
var authButton;
//TagsContainer vars
var tagDivContainer;//main div which holds the tag divs
var infoDiv;//div for showing alerts
var newTagButton;//add new tag button
var newTagInput;//input div for tag name
var tags;

//front script object
var fs = {
  setTags: function(data){
    tags = data;
    
    //add the divs
    for(var i=0; i < data.length; i++){
      $("#tagsContent").prepend("<div class='tagcontainer'><span class='tagtext'>" + data[i] + "<img class='remove' src='ui/delete.png'></span></div>");
    }
  }
};

/*
 Script for TumblrFamous
 @author: Kelly li
 @author: Gabriel Gheorghian
 @author: Matthew Kuzyk
 */
$(document).ready(function(){
	/* * * * * * * * *
    Cache Variables 
	 * * * * * * * * */

  //LoginContainer
  loginContainer = $("#loginContainer");
  emailInput = $("#email");
  passInput = $("#password");
  authButton = $("#authButton");
  //TagsContainer
  tagsContainer = $("#tagsContainer");
	infoDiv = $("#infoDiv");
	newTagButton = $("#addbutton");
	newTagInput = $("#newTagInput");
  
  bg.setFs(fs); //Giving this script to the bg object so that it can add tags
  //tagsContainer.hide();
	bg.retrievePosts();
  newTagInput.hide();
  
  //authentication button click event
  authButton.click(function(){
    //do auth...
    //TODO
    


    //switch to tags div
    console.log("here");
    loginContainer.hide();
    tagsContainer.fadeIn(200);
  });
	
	/* * * * * * * * *
        EVENTS
	 * * * * * * * * */

	/*
	######
	## newTagButton click event ##
	######
	*/
	newTagButton.click(function(){
    $(this).animate({width:"131px"},500,function(){
      $(this).hide();
      newTagInput.show().focus();

    });
  });
  
  
  /*
	######
	## newTagInput enter key pressed ##
	######
	*/
  newTagInput.keypress(function (e) {
    if (e.keyCode == 13) {
    
      var tagInput = newTagInput.val();
      var good = 0;	//0 means good
      
      //check if the values saved are valid
      if(tagInput.trim() == ""){
        good = 1; //1 means invalid name
      } else {
        //split input tags by ","
        var tagInput = tagInput.split(",");
        tagInput.sort();
        
        //check if the tag already exists
        for(var i=0; i < tags.length; i++){
        
          //if the tags collection has the same length as the input
          if(tags[i].length == tagInput.length){
            //go through each tag collection to compare
            for(var y=0; y < tags[i].length; y++){
              if(tags[i][y] != tagInput[y]){
                break;
              }
              
              //if it's the last item and it passed the test, bad
              if(y + 1 == tags[i].length){
                good = 2;
              }
            }
          }
        }
      }
      
      /*
      0 is good
      1 means invalid tag name
      2 means already existing tag name
      */
      infoDiv.removeClass("infoGood").removeClass("infoBadName").removeClass("infoExists");
      switch(good){
        case 0:
          //set class of info to good
          infoDiv.addClass("infoGood");
          infoDiv.html("New tag added").show().delay(1000).hide();
          
          tagInput = tagInput.join(" ");
          //send new tag to bg to save
          bg.saveTags(tagInput);
          
          //create and append new div for new tag
          $("#tagsContent").prepend("<div class='tagcontainer'><span class='tagtext'>" + tagInput +"<img class='remove' src='ui/delete.png'></span></div>");
          
          
          //empty div content
          newTagInput.val("");
          newTagInput.hide();
          newTagButton.show();
          break;
        case 1:
          //set class of info to invalid name
          infoDiv.addClass("infoBadName");
          infoDiv.html("Invalid tag name").show().delay(1000).hide();
          break;
        case 2:
          //set class of info to tag already exists
          infoDiv.addClass("infoExists");
          infoDiv.html("Tag already exists").show().delay(1000).hide();
          break;
        default:break;
      }
    }
	});
  
  
  /*
	######
	## tag removal enter key pressed ##
	######
	*/
  $('.remove').click(function(){
    console.log("hello");
  });
});