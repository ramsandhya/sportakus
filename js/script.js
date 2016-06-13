
function loadData() {

    var $body = $('body');
    var $mapElem = $('#map-links');
    var $nytHeaderElem = $('#tickets-header');
    var $nytElem = $('#tickets-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $mapElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');




    // load tickets
    // obviously, replace all the "X"s with your own API key
    var ticketsUrl = 'http://api.tickets.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=AIzaSyBIj3uuUfxis9aBu1IF4LvbAm03qd6pCVo';
    $.getJSON(ticketsUrl, function(data){

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });



    // load map data
    var mapUrl = 'http://en.map.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=mapCallback';
    var mapRequestTimeout = setTimeout(function(){
        $mapElem.text("failed to get map resources");
    }, 8000);

    $.ajax({
        url: mapUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.map.org/map/' + articleStr;
                $mapElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(mapRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
