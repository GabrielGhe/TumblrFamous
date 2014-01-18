var bg = chrome.extension.getBackgroundPage().bg;
var tagDivContainer;//main div which holds the tag divs
var infoDiv;//div for showing alerts
var newTagButton;//add new tag button
var newTagInput;//input div for tag name
var tags;

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
	infoDiv = $("#infoDiv");
	newTagButton = $("#newTagButton");
	newTagInput = $("#newTagInput");
	tags = bg.retrieveTags();
	
	//put up divs
	for(var i=0; i < tags.length; i++){
		
	}
	
	
	/* * * * * * * * *
        EVENTS
	 * * * * * * * * */

	/*
	######
	## newTagButton click event ##
	######
	*/
	newTagButton.click(function(){
    $(this).hide();
    newTagInput.show();
  }
  
  
  /*
	######
	## newTagInput enter key pressed ##
	######
	*/
  newTagInput.keyup(function (e) {
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
            for(var y=0; y < tags[i].length; i++){
              if(tags[i][y] == tagInput[y]){
                break;
              }
              
              if(
            }
          }
          
        
        
        
          if(tags[i].tagName == tagInput){
            good = 2; //2 means already existing tag
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
          
          //send new tag to bg to save
          bg.saveTags({tagName: tagInput});
          
          //create and append new div for new tag
          //TODO
          
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
});