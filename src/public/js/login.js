function ajaxCall(url, action, callback, post = null) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(action, url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(post);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                callback(xmlhttp.responseText);
            }
            else
                callback("Error \n" + xmlhttp.responseText);
        }
    }
}

//create user prefernces 
function onCreateUser() {
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let themTypes = document.getElementsByName("themType");
    let images = document.getElementsByName("imgbackground");


    //Extracting theme type from radiobox
    let darkMode = false;
    for (let i = 0; i < themTypes.length; i++) {
        const themType = themTypes[i];
        if (themType.checked)
            darkMode = themType.value;

    }

    //Extracting avatar from images
    let avatar = "user_icon_boy.png";
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.checked)
            avatar = image.value;

    }

    let url = "http://localhost:4000/api/users/create";
    let post = JSON.stringify({
        username: username, password: password, dark_mode: darkMode,
        avatar: avatar,
    });

    ajaxCall(url, "POST", alert, post);
}

function onLogin() {

    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;

    let url = "http://localhost:4000/api/users/login";
    let post = JSON.stringify({
        username: username, password: password
    });

    ajaxCall(url, "POST", redirectToMainPage, post);
}

function redirectToMainPage(response) {
    let user = JSON.parse(response);

    // save user information on the browser
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.username);
    localStorage.setItem('darkMode', user.dark_mode);
    localStorage.setItem('avatar', user.avatar);

    window.location.replace("/index");
}