window.onload = function () {
    const userId = localStorage.getItem('userId');
    document.getElementById("userName").innerHTML = localStorage.getItem('userName');
    document.getElementById("avatar").src = "img/" + localStorage.getItem('avatar');

    let url = "http://localhost:4000/api/folders/user/" + userId;
    ajaxCall(url, "GET", processFolderNotes);
}

function placeContentInMainBody(html) {
    document.getElementById("main-body").innerHTML = html;
}

function ajaxCall(url, action, callback, post = null) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(action, url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(post);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                if (callback) callback(xmlhttp.responseText);
            }
            else
                if (callback) callback("Error \n" + xmlhttp.responseText);
        }
    }
}

function onEditNotes(folderObj) {
    let html = "<div class='pt-4 pl-2 pr-2'>"
    html += "<div class='p-2 pl-2 pr-2 m-2' style='background: #C4C4C4;'>";
    html += "<div class='form-label' for='folderName'><i class='fa fa-sticky-note-o pr-2'></i>Folder Name: ";
    html += "<input type='text' id='folderName' class='form-control' value='" + folderObj.name + "'/>";
    html += "</div>";
    html += "</div>";

    // Print Notes
    html += "<div class='p-2'>";
    for (let i = 0; i < folderObj.NOTEs.length; i++) {
        html += "<div class='w-100 pt-2 pl-2 pr-2 mb-3' style='background: rgba(244,236,194,0.5);'>";
        html += "<label class='form-label pl-2' for='noteTitle'><i class='fa fa-sticky-note-o pr-2'></i>Note Title</label>";
        html += "<input type='text' id='noteTitle' class='form-control' value='" + folderObj.NOTEs[i].title + "'/>";
        html += "<label class='form-label pl-2 pt-2' for='noteTitle'>Note Content</label>";
        html += "<textarea id='noteContent' class='w-100 pl-2 pr-2'>" + folderObj.NOTEs[i].content + "</textarea>";
        html += "</div>";
    }
    html += "</div>";

    html += "</div>"; // for the main div
    placeContentInMainBody(html);
}

function processFolderNotes(response) {
    let html = "<div class='container-fluid'>";
    let folders = JSON.parse(response);

    for (let i = 0; i < folders.length; i++) {

        var folderObj = folders[i];
        var folderJson = JSON.stringify(folderObj);

        if ((i % 3) == 0)

            html += "<div class='row mt-5 mb-5'>";

        // Printing Folders
        html += "<div class='col-4'><div class='ml-1 p-2 roundeda' style='background: #808080; height: 220px; '>";
        html += "<div class='rounded-pill p-2 m-1' style='background: #C4C4C4;'>" + folderObj.name;
        html += "<div class='float-right'>";
        html += "<button type='button' class='btn p-0 pr-1'><i class='fa fa-star'></i></button>";
        html += "<button type='button' class='btn p-0 pr-1' onClick='onEditNotes(" + folderJson + ")'><i class='fa fa-pencil-square-o'></i></button>";
        html += "</div>";
        html += "</div>";

        // Printing Notes in folders
        let isRowNoteClosed;
        html += "<div class='container-fluid'>";
        for (let j = 0; j < folderObj.NOTEs.length; j++) {
            if ((j % 4) == 0) {
                html += "<div class='row mt-3 mb-3'>";
                isRowNoteClosed = false;
            }

            html += "<div class='col-3'><div style='background: #D9D9D9; height: 50px;'></div></div>";

            if (((j + 1) % 4) == 0) {
                html += "</div>"; //This is the notes row div
                isRowNoteClosed = true;
            }
            if (j == 7) break;
        }
        if (isRowNoteClosed == false) html += "</div>"; //This is the final notes row div
        html += "</div>"; //This is the note container div

        //Closes the folder div
        html += "</div></div>";
        if (((i + 1) % 3) == 0)
            html += "</div>";

    }
    html += "</div>";
    placeContentInMainBody(html);
}

function onLogout() {
    let url = "http://localhost:4000/api/folders/logout";
    ajaxCall(url, "GET", redirectToLoginPage);
}

function redirectToLoginPage() {
    window.location.replace("/");
}

function onDeleteUser() {
    const userId = localStorage.getItem('userId');
    let url = "http://localhost:4000/api/users/del/" + userId;
    ajaxCall(url, "DELETE", redirectToLoginPage);
}

function profile() {
    let html = "<div class='row justify-content-center align-items-center h-100'>";
    html += "<div class='col-12 col-lg-9 col-xl-7'>";
    html += "<div class='card bg-dark text-white' style='border-radius: 15px;'>";
    html += "<div class='card-body p-4 p-md-5'>";
    html += "<h3 class='mb-4 pb-2 pb-md-0 mb-md-5'>Profile</h3>";
    html += "<div class='row'>";
    html += "<div class='col-md-7 mb-4'>";
    html += "<h3>Change Password</h3>";
    html += "<div class='form-outline'>";
    html += "<input type='Password' id='Password' class='form-control form-control-lg' name='password'>";
    html += "<label class='form-label' for='Password'>Password</label>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-12 mb-4'>";
    html += "<div class='row'>";
    html += "<div class='col-6'>";
    html += "<h3>Change Theme</h3>";
    html += "</div>";
    html += "<div class='col-3 d-flex align-items-center justify-content-center'>";
    html += "<div class='form-check'>";
    html += "<input class='form-check-input' type='radio' name='themType' value='0'>";
    html += "<label class='form-check-label' for='flexRadioDefault1'>Lightmode</label>";
    html += "</div>";
    html += "</div>";
    html += "<div class='col-3 d-flex align-items-center justify-content-center'>";
    html += "<div class='form-check'>";
    html += "<input class='form-check-input' type='radio' name='themType' value='1' checked=''>";
    html += "<label class='form-check-label' for='flexRadioDefault2'>Darkmode</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class='mt-4 pt-2 text-center'>";
    html += "<button class='btn btn-primary btn-lg mr-3' onclick='onProfileChange()'>Update Profile</button>";
    html += "<button class='btn btn-primary btn-lg' onclick='onDeleteUser()'>Delete User</button>";
    html += "</div>";
    html += "<br>";
    html += "<br>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    placeContentInMainBody(html);

}

function onProfileChange() {

    const userId = localStorage.getItem('userId');
    let themTypes = document.getElementsByName("themType");
    let password = document.getElementById("Password").value;
    let urlEdit = "http://localhost:4000/api/users/edit/password/" + userId;
    let urlEditTheme = "http://localhost:4000/api/users/edit/dark_mode/" + userId;

    //Extracting theme type from radiobox
    let darkMode = false;
    for (let i = 0; i < themTypes.length; i++) {
        const themType = themTypes[i];
        if (themType.checked)
            darkMode = themType.value;

    }

    let post = JSON.stringify({
        dark_mode: darkMode
    });
    ajaxCall(urlEditTheme, "PUT", null, post);

    post = JSON.stringify({
        password: password
    });
    ajaxCall(urlEdit, "PUT", redirectToLoginPage, post);

}