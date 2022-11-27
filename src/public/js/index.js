window.onload = function () {
    const userId = localStorage.getItem('userId');
    document.getElementById("userName").innerHTML = localStorage.getItem('userName');
    document.getElementById("avatar").src = "img/" + localStorage.getItem('avatar');

    let url = "http://localhost:4000/api/folders/user/" + userId;
    ajaxCall(url, "GET", processFolderNotes);

    // let currentTheme = localStorage.getItem('darkMode');
    // toggleTheme(currentTheme);

}

// function toggleTheme(currentTheme) {
//     debugger;
//     var theme = document.getElementsByTagName('link')[0];
//     theme.getAttribute('href') == 'css/Template-dark.css'

//     if (currentTheme)
//         theme.setAttribute('href', 'css/Template-dark.css');
//     else
//         theme.setAttribute('href', 'css/Template-light.css');

// }

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
function alertAndReload(response) {
    alert(response);
    location.reload()
}

function reload() {
    location.reload()
}

function CreateGUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// -------------------------
// Folder Functions
// -------------------------
function onCreateFolder() {
    const userId = localStorage.getItem('userId');
    let folderName = prompt("Please enter folder name:", "");
    if (folderName) {
        let url = "http://localhost:4000/api/folders/create";
        let post = JSON.stringify({
            uid: userId,
            name: folderName
        });
        ajaxCall(url, "POST", alertAndReload, post);
    }
}

function onRenameFolder() {
    let folderName = document.getElementById("folderName").value;
    let folderId = document.getElementById("folderId").value;
    let url = "http://localhost:4000/api/folders/edit/" + folderId;
    let post = JSON.stringify({ name: folderName });
    ajaxCall(url, "PUT", alert, post);
}

function onDeleteFolder(folderId) {

    let url = "http://localhost:4000/api/folders/del/" + folderId;
    ajaxCall(url, "DELETE", reload);

}

// -------------------------
// Note Functions
// -------------------------

function onAddNote() {
    let notesContainer = document.getElementById("notesContainer");
    let notesHtml = notesContainer.innerHTML;
    notesHtml = buildNoteHtml("", "") + " " + notesHtml;
    notesContainer.innerHTML = notesHtml;
}

function onEditNotes(folderObj) {
    let html = "<div class='pt-4 pl-2 pr-2'>"
    html += "<div class='folder-name rounded-top p-2 pl-2 pr-2 m-2'>";
    html += "<div class='form-label' for='folderName'><i class='fa fa-folder-open-o pr-2' aria-hidden='true'></i>Folder Name: ";
    html += "<input type='text' id='folderName' class='form-control' value='" + folderObj.name + "'/>";
    html += "<input type='hidden' id='folderId' value='" + folderObj.id + "'/>";
    html += "</div>";

    html += "<div class='p-1'> ...";
    html += "<div class='float-right'>";
    html += "<button type='button' class='btn p-0 mr-3' onclick='onRenameFolder()'><i class='fa fa-pencil-square-o pr-1'></i>Rename Folder</button>";
    html += "<button type='button' class='btn p-0 m-1' onclick='onAddNote()'><i class='fa fa-plus-square pr-1'></i>Add Note</button>";
    html += "</div>";
    html += "</div>";

    html += "</div>";

    // Print Notes
    html += "<div id='notesContainer' class='p-2'>";
    for (let i = 0; i < folderObj.NOTEs.length; i++)
        html += buildNoteHtml(folderObj.NOTEs[i].title, folderObj.NOTEs[i].content, folderObj.NOTEs[i].id);

    html += "</div>";

    html += "</div>"; // for the main div
    placeContentInMainBody(html);
}

function onSaveNote(noteId) {
    const noteDiv = document.getElementById(noteId);
    const userId = localStorage.getItem('userId');
    const folderId = document.getElementById("folderId").value;
    const title = noteDiv.getElementsByTagName("input")[0].value;
    const content = noteDiv.getElementsByTagName("textarea")[0].value;

    if (isNaN(noteId)) {
        // Create a new note in database
        let url = "http://localhost:4000/api/notes/create";
        let post = JSON.stringify({
            content: content,
            title: title,
            author: userId,
            folder: folderId
        });
        ajaxCall(url, "POST", alert, post);
    }
    else {
        // Update the note in database
        let url = "http://localhost:4000/api/notes/edit/" + noteId;
        let post = JSON.stringify({
            newContent: content,
            newTitle: title
        });
        ajaxCall(url, "PUT", alert, post);
    }
}

function onDeleteNote(noteId) {
    let notesHtml = "";
    let notesContainer = document.getElementById("notesContainer");
    let noteDivs = document.getElementsByName("noteDiv");

    for (let i = 0; i < noteDivs.length; i++) {
        const noteDiv = noteDivs[i];
        if (isNaN(noteDiv.id) && noteDiv.id == noteId)
            continue; // Delete from interface only
        else if (!isNaN(noteDiv.id) && noteDiv.id == noteId) {
            // Delete from database and interface
            let url = "http://localhost:4000/api/notes/del/" + noteId;
            ajaxCall(url, "DELETE", reload);
        }
        else
            // Don't delete
            notesHtml += " " + noteDiv.outerHTML;
    }
    notesContainer.innerHTML = notesHtml;
}

function buildNoteHtml(title, content, noteId) {
    let html = "";
    if (!noteId) noteId = CreateGUID();

    html += "<div id='" + noteId + "' name='noteDiv' class='notes w-100 pt-2 pl-2 pr-2 mb-3'>";
    html += "<label class='form-label pl-2' for='noteTitle'><i class='fa fa-sticky-note-o pr-2'></i>Note Title</label>";

    html += "<div class='float-right'>";
    html += "<button type='button' class='btn text-secondary p-0 pr-1' data-toggle='tooltip' title='Save' onClick='onSaveNote(\"" + noteId + "\")'><i class='fa fa-floppy-o'></i></button>";
    html += "<button type='button' class='btn text-secondary p-0 pr-1' data-toggle='tooltip' title='Delete' onClick='onDeleteNote(\"" + noteId + "\")'><i class='fa fa-trash-o'></i></button>";
    html += "</div>";

    html += "<input type='text' class='form-control' value='" + title + "'/>";
    html += "<label class='form-label pl-2 pt-2' for='noteTitle'>Note Content</label>";
    html += "<textarea class='notes-content-textbox w-100 pl-2 pr-2'>" + content + "</textarea>";
    html += "</div>";
    return html;
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
        html += "<div class='col-4'><div class='btn1 folder ml-1 p-2 roundeda' style='height: 220px;'>";
        html += "<div class='folder-title rounded-pill p-2 m-1'>" + folderObj.name;
        html += "<div class='float-right'>";
        html += "<button type='button' class='btn p-0 pr-1 pb-1' data-toggle='tooltip' title='Edit' onClick='onEditNotes(" + folderJson + ")'><i class='fa fa-pencil-square-o'></i></button>";
        html += "<button type='button' class='btn p-0 pr-1 pb-1' data-toggle='tooltip' title='Delete folder' onClick='onDeleteFolder(" + folderObj.id + ")'><i class='fa fa-trash'></i></button>";
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

            html += "<div class='col-3'><div class='folder-notes' style='height: 50px;'></div></div>";

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
    html += "<div class='col-12 col-lg-9 col-xl-7  pt-3'>";
    html += "<div id = 'card' class='card border border-dark' style='border-radius: 30px;'>";
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
    ajaxCall(urlEdit, "PUT", null, post);

}