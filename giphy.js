$(function () { // body of the function "block" between two curly braces. All jquery inside body of function so it runs when document is ready.

  $("button").on("click", function () {
    var theme = $(this).attr("theme");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      theme + "&api_key=dc6zaTOxFJmzC&limit=10";
    var topics = ["corgis", "duck", "drums", "sean connery", "jack nicholson", "hank hill", "texas", "trailer park boys", "street fighter"];


    // --------------------------
    // MAIN PROCESS
    // --------------------------
    // DONE: Add search term to #buttons div--with guard statement
    $("#form").click(function (event) {
      event.preventDefault();
      // stores the string value in a variable userSearch
      var userSearch = $("#gif-search").val().trim();
      var gifSearch = $("#gif-search").val();
      if (gifSearch === "") {
        return;
      } else {
        // pushes the string to the topics array
        topics.push(userSearch);
        // renders the new search button in the div
        renderButtons();
        console.log(userSearch);
        console.log(topics);

      }
    });
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;
        console.log(results)
        for (let gif of results) {
          let gifDiv = `
            <div class='item'>
              <img 
                src=${gif.images.fixed_height_still.url}
                data-still=${gif.images.fixed_height_still.url}
               data-animate=${gif.images.fixed_height.url}
               data-state='still'
              >
              <p>Rating ${gif.rating}</p>
            </div>
          `


          $("#gifs-appear-here").prepend(gifDiv)
        }
      });
  });

  $("#gifs-appear-here").on("click", "img", function (event) {
    var state = $(this).attr('data-state');
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  })

})
// if you try to dynamically create an element on the page through j query you wont be able to tie an event handler to that element you have to use event delegation/event bubbling/event propegation
/*


     for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var themeImage = $("<img>");
          themeImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(themeImage);

          $("#gifs-appear-here").prepend(gifDiv);


          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
     }     
*/