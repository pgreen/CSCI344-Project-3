var main = function () {
 "use strict"
  var todoCount = 0;
  var catCount = 0;
  
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
  $.getJSON("all.json", function (todos) {
    todos.forEach(function (todo) {
      var list_a = $("<div>"+ todo.description +"</div>").addClass("tab1").attr("id", "todo" + todoCount);
      $("#todos").append(list_a);
      todoCount = todoCount + 1;
      todo.categories.forEach(function (category) {
        console.log(category);
        var list_b = $("<div>"+ category +"</div>").addClass("cat1").attr("id", "cat" + catCount);
        $("#todos").append(list_b);
        console.log(list_b);
        catCount = catCount + 1;
      });  
    });  
   }); 
  
 
  setUpClickHandler($(".tabs .tab"));
};

$(document).ready(main);