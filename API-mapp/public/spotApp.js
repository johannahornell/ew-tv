(function () {

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  var params = getHashParams();

  var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      // render oauth info

      function getMusic() {
        $.ajax({
          url: 'https://api.spotify.com/v1/me/player',
          headers: {
            Authorization: 'Bearer ' + access_token
          },
          success: function (response) {
            var artists = response.item.artists.map(artist => artist.name);
            var title = response.item.name;
            var songTime = response.progress_ms;

            document.getElementById("artist").innerHTML = artists;
            document.getElementById("title").innerHTML = title;
            document.getElementById("songTime").innerHTML = "(" + millisToMinAndSec(songTime) + ")";




            function millisToMinAndSec(millis) {
              var minutes = Math.floor(millis / 60000);
              var seconds = ((millis % 60000) / 1000).toFixed(0);
              return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
            $('#btn-login').hide();
            $('#btn-refToken').show();
          }
        });
      }
      setInterval(function () {
        getMusic()
      }, 1000);

    } else {
      // render initial screen
      $('#btn-login').show();
      $('#btn-refToken').hide();
    }

    /* REFRSH TOKEN*/
    function refreshLogin() {
      var spotifyLogin = window.location.origin + "/login";
      window.location.href = spotifyLogin;
    }

    setInterval(function () {
      console.log("refresh Login")
      refreshLogin();
    }, 180000);

    function refreshToken() {
      console.log("Refresh Token");
      $.ajax({
        url: '/refresh_token',
        data: {
          'refresh_token': refresh_token
        }
      }).done(function (data) {
        access_token = data.access_token;
        // document.getElementById("access_token").innerHTML = "access token: " + access_token;
        // console.log(access_token);
      });
    }
  }
})();