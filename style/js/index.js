var bg = chrome.extension.getBackgroundPage().bg;
var newTagButton;
var newTagInput;
var newMaxInput;

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
	newTagButton = $("#newTagButton");
	newTagInput = $("#newTagInput");
	newMaxInput = $("#newMaxInput");
	
	
	/* * * * * * * * *
        Methods 
	 * * * * * * * * */
	 
	//## newTagButton click event ##
	newTagButton.click(function(){
		var tagInput = newTagInput.val();
		var maxInput = newMaxInput.val();
		var good = 0;	//0 means good
		
		//check if the values saved are valid
		if(tagInput.trim() == "" || maxInput.trim() == ""){
			good = 1; //1 means invalid name
		}
		
		//check if the tag already exists
		for(var i=0; i < tags.length; i++){
			if(tags[i].tag == tagInput){
				good = 2; //2 means already existing tag
			}
		}
		
		switch(good){
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			default:break;
		}
		
		
		
		
	});
	
	
});