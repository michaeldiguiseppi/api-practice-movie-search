var movieTitle = '';

$(document).ready(function() {
  $('.submit').on('click', function(event) {
      event.preventDefault();
      searchMovie();
      $('#resultModal').show();
    });

  $('#resultModalOkay').on('click', function() {
    $('#resultModal').hide();
    resetForm();
  });

  $('.close').click(function() {
    $('#resultModal').hide();
    resetForm();
  });


  var searchMovie = function() {
    var baseURL = 'http://www.omdbapi.com/?';
    var title = $('.inputEmail-1').val() || $('.inputEmail-2').val();
    var year = $('#inputText').val();
    var movieSearch = ''
    var yearSearch = 'y=' + year
    var url = '';
    if ($('#select').val() === 'One Movie') {
      movieSearch = 't=' + title;
    } else {
      movieSearch = 's=' + title;
    };
    if (year.length > 0) {
      url = baseURL + movieSearch + '&' + yearSearch;
    } else {
      url = baseURL + movieSearch;
    };

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET"
    }

    $.ajax(settings).done(function (response) {
      $('#searchResults').text('');
      if ($('#select').val() === 'One Movie') {
        oneMovie(response);
      } else {
        multiMovie(response);
        console.log(response);
      };
    });
  };
});

var oneMovie = function(response) {
      $('.modal-title').text('Search Results for ' + response.Title);
      for (var key in response) {
        if (key !== 'Poster')
          $('#searchResults').append(key + ': ' + response[key] + '<br>');
      };
    };

var multiMovie = function(response) {
      $('.modal-title').text('Search Results');
      var keyword = $('.inputEmail-1').val();
      searchMovie(keyword);
      oneMovie(newTitle);
    };

var updateMovie = function(title) {
  var url = 'http://www.omdbapi.com/?t=' + title;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET"
    }

    $.ajax(settings).done(function (response) {
      $('#searchResults').text('');
      oneMovie(response);
      console.log(response);
    });
};



function searchMovie (keyword) {
        var url = 'https://www.omdbapi.com/?s=' + keyword;
        $.get(url).done(function(res) {
            res.Search.forEach(function(obj) {
                // $('#results').append('<img src="' + obj.Poster + '">');
                $('#searchResults').append('<li><a href="#" id="' + obj.Title + '">' + obj.Title + '</a>&nbsp;-&nbsp;' + obj.Year + '</li>');
            });

        });
    };

var resetForm = function() {
  $('input').val('');
};