var topics = ["Maui", "O'ahu", "Kaua'i", "Hawai'i", "Moloka'i", "Lana'i", "Ni'ijau", "Kaho'olawe"];

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
$("#buttons-div").on("click", ".hiButt", function (event) {
    event.preventDefault();
    $("#gifs").empty();

    var button = $(this).attr("data-button");
    console.log("button", button);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=5atI5zU97rTiZfAstZZ3gXsck2pAvnQr&limit=10"
    console.log(this);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var imageURL = results[i].images.fixed_height_still.url;
            var gifDiv = $("<div>")
            // gifDiv.addClass("gifDiv")
            var ratingDisplay = $("<p>").text("Rating: " + results[i].rating);
            var islandImage = $("<img>");

            islandImage.attr("src", imageURL);
            islandImage.attr("data-still", results[i].images.fixed_height_still.url);
            islandImage.attr("data-animate", results[i].images.fixed_height.url);
            islandImage.attr("data-state", "still");



            islandImage.addClass("classGif");
            gifDiv.append(ratingDisplay);
            gifDiv.append(islandImage);
            $("#gifs").prepend(islandImage);
        }
    })
})

//function for when submit button is clicked to add a new button to the page
$("#add-image").on("click", function (event) {
    event.preventDefault();

    var newButton = $("#image-input").val().trim();
    topics.push(newButton);
    $("#image-input").val("");
    renderButtons();
});

//new onclick event to animate/pause gif
$("#gifs").on("click", ".classGif", function (event) {
    event.preventDefault();

    var state = $(this).attr("data-state");
    var stillURL = $(this).attr("data-still");
    var imageURL = $(this).attr("data-animate");

    console.log(this)
    if (state === "still") {
        $(this).attr({
            "src": imageURL,
            "data-state": "animate"
        })
    } else {
        $(this).attr({
            "src": stillURL,
            "data-state": "still"
        })
    }
})


//call render function button at the bottom

renderButtons();