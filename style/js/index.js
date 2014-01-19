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
      //create new dice, append span, add class, then give it html
      var a = $("<div class='tagcontainer'></div>");
      var b = $("<span class='tagtext'>" + data[i] + "</span>");
      var c = $("<img class='remove' src='ui/delete.png'></img>");
      b.append(c);
      a.append(b);
      $("#tagsContent").prepend(a);
      b.click(function () {
        bg.deletePost(a.index());
        $(this).parent().remove();
      });
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


  $("#knob").click(function(){
    console.log($(this).css('margin-left'));
    if ($(this).css('margin-left')=="2px"){
      $(this).animate({"margin-left":"18px"},200);
      $(this).css("background-color","#529ecc");
    }else{
      $(this).css("background-color","#c6c6c6");
      $(this).animate({"margin-left":"2px"},200);
    }
    });

  $("#backButton").click(function(){
    $("#setContainer").hide();
    $("#tagsContainer").show();
  });
  
  $("#settingButton").click(function(){
    $("#setContainer").show();
    $("#tagsContainer").hide();
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
        var tagInput = tagInput.split(" ");
        for(var i=0; i < tagInput.length; i++){
          tagInput[i] = tagInput[i].trim();
        }
        tagInput.sort();
        
        //check if the tag already exists
        for(var i=0; i < tags.length; i++){
          var temp = tags[i].split(" ");
        
          //if the tags collection has the same length as the input
          if(temp.length == tagInput.length){
            //go through each tag collection to compare
            for(var y=0; y < temp.length; y++){
            
              if(temp[y] != tagInput[y]){
                break;
              }
              
              //if it's the last item and it passed the test, bad
              if(y + 1 == temp.length){
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
      console.log(good);
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
          var a = $("<div class='tagcontainer'></div>");
          var b = $("<span class='tagtext'>" + tagInput+ "</span>");
          var c = $("<img class='remove' src='ui/delete.png'></img>");
          b.append(c);
          a.append(b);
          $("#tagsContent").prepend(a);
          b.click(function () {
            console.log("You made it this far");
            bg.deletePost(a.index());
            $(this).parent().remove();
          });
          //empty div content
          newTagInput.val("");
          newTagInput.hide();
          newTagButton.show().animate({width:"20px"},500);
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
});
