$(document).ready(function () {

    //News scroll
    $(".newsButton").click(function() {
        $('html,body').animate({
            scrollTop: $("#news").offset().top-50},
            'slow');
    });

    //======= Strains API =======
    $("#strainDiv").hide();

    var key = "PBbUlIS";

    
    
    $(".search").click(function () {
       
        
        var userSearch = (mySearch).value;

        var queryURL = "http://strainapi.evanbusse.com/" + key + "/strains/search/name/" + userSearch;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#strainDiv").show();
            console.log(response);
            $("#strainTitle").html("<h1 class='white'>" + response[0].name + " <span class='green' style='font-size:18px'>" + response[0].race + "</span></h1> <hr class='hr-green'>");
            // $("#strainRace").html("<h4 class='white'>" + response[0].race + "</h4> <br>");
            $("#strainDesc").html("<p class='white'>" + response[0].desc + "</p>");

            
            var strainID = response[0].id;
            console.log(response[0].race);
            if (response[0].race === "sativa") {
                var max_danceability = 1;
                var genre = "electronic%2C%20hip-hop";
                var foodPair= "mango";
                console.log("sativa");
            } else if (response[0].race === "hybrid") {
                var max_danceability = .5;
                var genre = "alternative%2C%20hip-hop";
                var foodPair= "salami";
                console.log("hybrid");
            } else if (response[0].race === "indica") {
                var max_danceability = .2;
                var genre = "chill%2C%20classical";
                var foodPair = "mushroom";
                console.log("indica");
            }


            //search effects
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/effects/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strainMedical").html("<p class='green'> <strong> Medical Effects:</strong> <span class='white'>" + response.medical + "</span></p>");
                $("#strainPositive").html("<p class='green'> <strong> Positive Effects:</strong> <span class='white'>" + response.positive + "</span></p>");
                $("#strainNegative").html("<p class='green'> <strong> Negative Effects:</strong> <span class='white'>" + response.negative + "</span></p>");
            });

            //search flavors
            var effectURL = "http://strainapi.evanbusse.com/" + key + "/strains/data/flavors/" + strainID;

            $.ajax({
                url: effectURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#strainFlavors").html("<p class='green'> <strong> Flavors: </strong><span class='white'>" + response + "</span></p>");


            });
            userSearch = (mySearch).value;
            var token = 'BQCMOUONps9Nm4L-3WFc29bfdnPgmUhfocTwTBpsNseu8CFVoXWULpzPwJSdm3ry-ZL7OlpQrcwoiJz76133tMeg6MgDFAifkLM5OQFQ_yUJeo9aZVRjyBBdSP4SVBJICJN11i_5a8fYB9rEkv1IUzQ5ewjI1WuvyoJeKaOLMW6LfrD820ISZg6G';
            var queryURL = "https://api.spotify.com/v1/recommendations?limit=3&market=ES&seed_genres=" + genre + "&max_danceability=" + max_danceability;
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                console.log(response)
                //Uri (song specific) needeed
                for (var i = 0; i < response.tracks.length; i++) {
                    var songId = response.tracks[i].id;
                    var hrefStatic = "https://open.spotify.com/embed/track/" + songId;
                    var duration = response.tracks[i].duration_ms;
                    console.log(response);
                    console.log(songId);
                    console.log(duration);
                    $("iframe").attr("src", hrefStatic);
                    //console.log(response.tracks[i].duration_ms);
                }
                // var i = 0;
                // var intervalid = setInterval( function() {
                //     if (i < response.tracks.length) {
                //         console.log(response.tracks[i].id);
                //         i++;
                //     } else {
                //         clearInterval(intervalid)
                //         console.log("clearing interval")
                //     }
                // },10000)
                

            });
              
           
            $.ajax({
                url:  "https://api.punkapi.com/v2/beers?food=" + foodPair,
            }) .then(function(response){
                console.log(response);
                for (var j = 0; j < response.length; j++){
                var beerName= response[j].name;
                var beerTag= response[j].tagline;
                $("#beerIcon").html("<i id= 'mug' class='beerIcon fas fa-beer fa-3x green'> </i> <strong><span class='green'> :  </span></strong> " + "<span class='white'>"+ beerName + beerTag + "</span>" );
               // $("#beer").text("<p class='white'>" + beerName +"</p><br>");
                

                console.log(beerName);
                console.log(beerTag);
                console.log(beerImg);
            }
            })

        });


        userSearch = (mySearch).value;
        return false;

    });


    $("#strainDiv").hide();




    //======= newsAPI =======


    var url = 'https://newsapi.org/v2/everything?' +
        'q=Cannabis&' +
        'from=2019-03-12&' +
        'sortBy=popularity&' +
        'language=en&'+
        'apiKey=eb685845ec724a788b048c258c786cd7';

    var req = new Request(url);

    fetch(req)
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log(data);

            let articleDiv = ""; 
            let articleCard = "";

            for (i = 0; i < 9; i++) {

                articleDiv = $("<div class='col-md-4 '>");
                articleCard = $("<div class='card mb-5'>");
                articleImg = $("<img>");
                articleDesc = $("<p>");
                articleTitle = $("<a>");
                articleSource = $("<p>");
                articleDate = $("<p>");

                articleDiv.append(articleCard);
                $("#news-blog").append(articleDiv);
                articleCard.append(articleImg, articleTitle, articleDesc, articleDate, articleSource);
               
                //img
                articleImg.attr("class", "card-img-top img-fluid");
                articleImg.attr("id", "articleImg");
                articleImg.attr('src', data.articles[i].urlToImage);

                //title
                articleTitle.attr('href', data.articles[i].url);
                articleTitle.attr('class', "pl-2 pr-2");
                articleTitle.attr('id', "articleTitle");
                articleTitle.html(data.articles[i].title);

                //description
                articleDesc.html(data.articles[i].description);
                articleDesc.attr("id", "articleDesc");
                articleDesc.attr("class", "pl-2 pr-2");

                //source
                articleSource.attr("class", "card-footer mb-0");
                articleSource.html(data.articles[i].source.name);

                // $(".newsMoreButton").click(function() {
                
                   
                // });

            }
        });
});


