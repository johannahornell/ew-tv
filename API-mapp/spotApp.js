(function () {

    window.onload = function () {

        $.ajax()
        /* Obtains parameters from the hash of the URL */
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

        console.log(params);
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
            alert('There was an error during the authentication');
        } else {
            if (access_token) {
                // render oauth info
                oauthPlaceholder.innerHTML = oauthTemplate({
                    access_token: access_token,
                    refresh_token: refresh_token
                });

                $.ajax({
                    url: 'https://api.spotify.com/v1/me/player',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                        console.log(response);

                        $('#btn-login').hide();
                        $('#btn-refToken').show();
                    }
                });
            } else {
                // render initial screen
                $('#btn-login').show();
                $('#btn-refToken').hide();
            }
            /* REFRSH TOKEN*/
            document.getElementById('btn-refToken').addEventListener('click', function () {
                console.log("Refresh Token");
                $.ajax({
                    url: '/refresh_token',
                    data: {
                        'refresh_token': refresh_token
                    }
                }).done(function (data) {
                    access_token = data.access_token;
                    oauthPlaceholder.innerHTML = oauthTemplate({
                        access_token: access_token,
                        refresh_token: refresh_token
                    });
                });
            }, false);
        }
    };
})();