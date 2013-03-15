globals: $ //

var main = function () {
	"use strict"
	var $ = window.$,
    jQuery = window.jQuery,
    todos,
    categoryList = [];
	setUpClickHandler($(".tabs .tab"));
		$.getJSON("all.json", function (fileTodos) {
			todos = fileTodos;//used so can add to this list.
			loadAllList();
			loadCatagoriesArray();
			categoryList.sort();//sorts the categories
			$("#tab-categories").click(reloadCategories);//reloads when clicked.
			$("#remove-click").click(removeItem);
			$("#add-click").click(addItem);
		});
	
	function setUpClickHandler (anchor) {
		anchor.click(function () {
			var target = $(this).attr("href");
			$(".active").removeClass("active");
			$(this).addClass("active");
			$("#"+target).addClass("active");
			return false;
		});    
	};//setUpClickHandler
  
	//load the All tab
	function loadAllList () {
		"use strict";
		var blockNum;
		$("#all").empty();
		todos.forEach(function (todo, itemIndex) {
		blockNum = itemIndex;
		console.log(blockNum);
		//	$("<input type='Submit' src='btn.png' id='remove-click' value='Click to Remove'/>").appendTo("#all");
			$("<div id=" + "itemBlock" + blockNum  + "></div>").appendTo("#all");
			$("<h3 id='item' data-index='" + itemIndex + "'>" + todo.description  + "</h3>").appendTo("#" + "itemBlock" + blockNum);
			$("<input type='Submit' src='btn.png' id='remove-click' value='Click to Remove'/>").appendTo("#" + "itemBlock" + blockNum);
			todo.categories.forEach(function (category) {
				$("<p id='category' data-index='" + itemIndex + "'>" + category + "</p>").appendTo("#" + "itemBlock" + blockNum);
			});
		});
	};//loadAllList
 

	function loadCategories (category_name) {
		"use strict";
		$("<div class='category' id='" + category_name + "'></div>").appendTo("#categories");
		$("<h3>" + category_name + "</h3>").appendTo("#" + category_name);
		todos.forEach(function (todo) {
			todo.categories.forEach(function (category) {
				if (category === category_name) {
					// adds the item to a paragraph
					$("<p>" + todo.description + "</p>").appendTo("#" + category_name);
				}
			});
		});
	};//loadCategories

	//sets up the array catagoryList
	function loadCatagoriesArray () {
		"use strict";
		categoryList.sort();
		todos.forEach(function (todo) {
			todo.categories.forEach(function (category) {
				if (categoryList.indexOf(category) === -1) {
					categoryList.push(category);
					categoryList.sort();
				}
			});
		});
		return categoryList;
	};//loadCatagoriesArray

	// reloads categories tab
	function reloadCategories () {
		$(".category").empty();
		loadCatagoriesArray(categoryList);
		// add all the items for each item in the array
		categoryList.forEach(function (category) {
			loadCategories(category);
		});
	};//reloadCategories 

	// remove the current item
	function removeItem () {
		console.log("I am firing");
		var clickItem = $(this).parent(); 
		clickItem.fadeOut(500, function() {
			$(clickItem.remove());
		});
		//delete the item from the todos array
		todos.splice((clickItem.attr("data-index")),1);
		alert('I am done removing');
	};//removeItem

	function addItem () {
		"use strict";
		var newItem,
			newCategories,
			newObject = {},
			newCategoryArray = [];
		// gets items the user submits
		newItem = $("#item_input").val();
		newCategories = $("#cat_input").val();
				// clears the inputs
		$("#item_input").val("");
		$("#cat_input").val("");
    //  separates words by commas
		newCategories.split(",").map(function (element) {
			newCategoryArray.push(element.trim());
			});
    // add the new item to the todos array
		newObject.description = newItem;
		newObject.categories = newCategoryArray;
		todos.push(newObject);

		loadAllList();
	};//addItem

};//MAIN

$(document).ready(main);