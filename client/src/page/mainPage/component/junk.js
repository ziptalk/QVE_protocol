/*const fetchUserMe = async () => {
          try {
            console.log("ACCESS_TOKEN_A", access_token_A);
            const response = await axios.get('http://192.168.0.124:8080/user/me/', {
                headers: {Authorization: access_token_A,},
              }
            )
            .then((response) => {
                console.log("HIIIIIIIIIIIIIIIIII");
                if (response.data) {
                    console.log("USERMEUSERMEUSERMEUSERMEUSERME");
                    setUserMe(response.data);
                }
                else {
                    console.log("FetchUserMe is not working");
                }
            })
          } catch (error) {
            console.log("  ㅠㅠㅠㅠㅠ    ");
            console.log("fetchUserMe Error");
            console.error(error);
          }


        };
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].replace(' ', '');
                  //var cookie = jQuery.trim(cookies[i]); 당신이 만약 jQuery를 사용한다면, 위 코드 대신 이 코드를 사용하여도 좋다
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        var csrftoken = getCookie('csrftoken');
        
        const fetchBalanceList = async () => {
            try {
                const resp = await axios.get("http://192.168.0.124:8080/balance/get/", { headers: 
                {
                }
                  });
            } catch (error) {
                console.log("fetchBalanceList Error");
                console.error(error);
            }
        };
        */
        //console.log("Balance list is : ");
        //console.log(fetchBalanceList());
      
    //}, []);
    //console.log(localStorage.getItem());

    /*
    useEffect(() => {
        postService.getAllPrivatePosts().then(
            (response) => {
                setPrivatePosts(response.data);
            },
            (error) => {
                console.log("Private page", error.response);

                if (error.response && error.response.status === 403) {
                    authService.logout();
                    navigate("/loginPage");
                    window.location.reload;
                }
            }
        );
    })
    */

