var menuStatus;
var menu2Status;
	
$(function(){
	
	// Show menu
	$("a.showMenu").click(function(){
		if(menuStatus != true){				
		$(".ui-page-active").animate({
			marginLeft: "165px",
		  }, 300, function(){menuStatus = true});
		  return false;
		  } else {
			$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
			return false;
		  }
	});
	
	// Show menu
	$("#showMenu2").click(function(){
		console.log('abc');
		if(menu2Status != true){				
		$(".ui-page-active").animate({
			marginLeft: "330px",
		  }, 300, function(){menu2Status = true});
		  return false;
		  } else {
			$(".ui-page-active").animate({
			marginLeft: "165px",
		  }, 300, function(){menu2Status = false});
			return false;
		  }
	});

});	