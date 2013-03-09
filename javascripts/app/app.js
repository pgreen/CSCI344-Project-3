globals: $ //
var $ = window.$,
    jQuery = window.jQuery,
    todos
    categoryNames = [];

var main = function () {
	"use strict"
	setUpClickHandler($(".tabs .tab"));
	$.getJSON("all.json", function (fileTodos) {
		todos = fileTodos;
		loadAllList();
	});
};
  
var setUpClickHandler = function (anchor) {
	anchor.click(function () {
		var target = $(this).attr("href");
		$(".active").removeClass("active");
		$(this).addClass("active");
		$("#"+target).addClass("active");
		return false;
	});    
};
  
  //load the All tab
var loadAllList = function () {
	"use strict";
	var list_a;
	var list_b;
	$("#all").empty();// so don't double load
	todos.forEach(function (todo, itemIndex) {
		// adds a paragraph tag
		list_a = "<p id='item' data-attribute='" + itemIndex + "'>";
		list_a += todo.description;
		list_a += "</p>";
		$(list_a).appendTo("#all");
		// adds each category
		todo.categories.forEach(function (category) {
			list_b = "<p id='category' data-attribute='" + itemIndex + "'>";
			list_b += ("  " + category);
			list_b += "</p>";
			$(list_b).appendTo("#all");
			console.log ("listb" + list_b);
		});
	});
};   
 
setUpClickHandler($(".tabs .tab"));

$(document).ready(main);