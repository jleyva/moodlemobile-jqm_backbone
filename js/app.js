$(document).bind("mobileinit", function(){
	$.mobile.pushStateEnabled = true;
});

var storage = {};

$(function(){

	// First of all, create Backbone models
	storage.Course = Backbone.Model.extend({
    });
	
	// Then the collection
	storage.CoursesList = Backbone.Collection.extend({
		model: storage.Course,
		localStorage: new Store("courses-backbone")
	 });
	
	// Here we create a instance of the collection
	storage.Courses = new storage.CoursesList();
	
	// Note that courses are stored using as key the id value of each item
	// If we modify the courses.json the courses are also modified in the db
	$.ajax({
		type: "GET",
		url: "courses.json",
		dataType: 'json',
		async: false,
		success: function(data){
		  for (var el in data) {
			// Save to the collection the objects.
			storage.Courses.create(data[el]);
		  }
		}
	  });
	
	
	// Load the courses from the Collection storage and load using a View
	
    storage.CoursesListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'activities-list',
        
        initialize: function() {            
            this.template = _.template($('#course-item-template').html());
        },
        
        render: function() {
            var container = this.options.viewContainer,
                courses = this.collection,
                template = this.template,
                listView = $(this.el);
                
            $(this.el).empty();
            courses.each(function(course){
				console.log(course);
                listView.append(template(course.toJSON()));
            });
			
			// We just create a new hhtml element that append to the container
            container.html($(this.el));
			// We are not rendering a jqm list, so we don't need to trigger the create event for jqm to style
			//container.trigger('create');
            return this;
        }
    });
	
	// We feth all the courses from the local storage
	var mycourses = new storage.CoursesList();
	mycourses.fetch();
	
	// Then, render the view. We need the collection and the container where we are going to render
	var courseListContainer = $('#mycourses');
    courseListView = new storage.CoursesListView({collection: mycourses, viewContainer: courseListContainer});
    courseListView.render();
	
	// Layout stuff
	
	$('#menu, .pages').live("swipeleft", function(){
		if (menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
		}
	});
	
	$('.pages').live("swiperight", function(){
		if (!menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "165px",
		  }, 300, function(){menuStatus = true});
		}
	});
	
	$('div[data-role="page"]').live('pagebeforeshow',function(event, ui){
		menuStatus = false;
		$(".pages").css("margin-left","0");
	});
	
	// Menu behaviour
	$("#menu li a").click(function(){
		var p = $(this).parent();
		if($(p).hasClass('active')){
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	});

	// Tabs 
	$('div[data-role="navbar"] a').live('click', function () {
		$(this).addClass('ui-btn-active');
		$('div.content_div').hide();
		$('div#' + $(this).attr('data-href')).show();
	});


});	