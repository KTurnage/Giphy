var topics = ["Maui", "Oahu", "Kauai", "Hawaii", "Molokai", "Lanai", "Niijau", "Kahoolawe"];

//function for rendering buttons
function renderButtons() {
    $("#buttons-div").empty();
    for (var i = 0; i < topics.length; i++) {
        var hawaiiButton = $("<button>" + topics[i] + "</button>");
        hawaiiButton.addClass("hiButt");
        hawaiiButton.attr("data-button", topics[i]);
        $("#buttons-div").append(hawaiiButton);
    }
}
//on click event
$("#buttons").on("click", ".hiButt", function (event) {
    event.preventDefault();
    $("#gifs").empty();

    var button = $(this).attr("data-buton")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=5atI5zU97rTiZfAstZZ3gXsck2pAvnQr&limit=10"
    console.log(this);
    $ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var imageURL = results[i].images.fixed_height_still.url;
            var islandImage = $("<img");
            var gifDiv = $("<div>")
            gifDiv.addClass("gifDiv")

            islandImage.attr({
                "src": imageURL,
                "alt": "island-Image",
                "data-state": "still",
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url
            });
            islandImage.addClass("classGif");
            var ratingDisplay = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(ratingDisplay);
            gifDiv.append(islandImage);
            $("#gifs").append(gifDiv)
        }
    })
})

//function for when submit button is clicked to add a new button to the page


//new onclick event to animate/pause gif

//call render function button at the bottom

renderButtons();