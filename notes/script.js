var listSection = document.getElementById("list");
var newNoteSection = document.getElementById("new-note");
var viewNoteSection = document.getElementById("view-note");

var listButton = document.getElementById("list-button");
var newNoteButton = document.getElementById("new-note-button");
var addNoteButton = document.getElementById("add-note-button");
var closeNoteButton = document.getElementById("close-note-button");
var deleteNoteButton = document.getElementById("delete-note-button");
var editNoteButton = document.getElementById("edit-note-button");

var viewNoteTitle = document.getElementById("view-note-title");
var viewNoteContent = document.getElementById("view-note-content");

var newNoteTitle = document.getElementById("new-note-title");
var newNoteContent = document.getElementById("new-note-content");

window.addEventListener("beforeunload", uploadArray);
listButton.addEventListener("click", showList);
newNoteButton.addEventListener("click", showNewNote);
addNoteButton.addEventListener("click", addNote);
closeNoteButton.addEventListener("click", closeNote);
deleteNoteButton.addEventListener("click", deleteNote);

editNoteButton.addEventListener("click", function() {
    if (!editMode) {
        editNote();
    } else {
        saveNote(closeNoteButton.value);
    }
});

var titleArray = [];
var contentArray = [];
var editMode = false;

loadArray();
showList();

function showList() {
    listSection.style.display = "flex";
    newNoteSection.style.display = "none";
    viewNoteSection.style.display = "none";

    loadNotes();
}

function showNewNote() {
    newNoteSection.style.display = "flex";
    listSection.style.display = "none";
    viewNoteSection.style.display = "none";
}

function showNote(i) {
    newNoteSection.style.display = "none";
    listSection.style.display = "none";
    viewNoteSection.style.display = "flex";

    viewNoteTitle.value = titleArray[i];
    viewNoteContent.value = contentArray[i];
    closeNoteButton.value = i;
}

function loadNotes() {
    list.innerHTML = "";

    if (titleArray.length != 0) {
        listSection.style.textAlign = "left";
        listSection.style.fontSize = "16px";
        listSection.style.fontWeight = "400";
        listSection.style.justifyContent = "flex-start";

        if (titleArray.length > 11) {
            list.style.overflowY = "scroll";
        } else {
            list.style.overflowY = "none";
        }

        for (var i = 0; i < titleArray.length; i++) {
            var note = document.createElement("div");
            note.className = "note";
            listSection.appendChild(note);

            var showNoteButton = document.createElement("button");
            showNoteButton.className = "show-note-button";
            showNoteButton.innerText = titleArray[i];
            showNoteButton.setAttribute("value", i);
            showNoteButton.addEventListener("click", function() {
                showNote(this.value);
            });
            note.appendChild(showNoteButton);
        }
    } else {
        list.innerText = "There aren't any notes!";
        list.style.textAlign = "center";
        list.style.fontSize = "32px";
        list.style.fontWeight = "700";
        list.style.justifyContent = "center";
        list.style.overflow = "none";
    }
}

function addNote() {
    var title = newNoteTitle.value;
    var content = newNoteContent.value;

    if (title && content) {
        titleArray.push(title);
        contentArray.push(content);

        newNoteTitle.value = "";
        newNoteContent.value = "";

        showList();
    }
}

function closeNote() {
    showList();
}

function editNote() {
    editMode = true;

    viewNoteTitle.removeAttribute("readonly");
    viewNoteContent.removeAttribute("readonly");

    editNoteButton.innerText = "Save";
}

function saveNote(i) {
    editMode = false;

    var i = closeNoteButton.value;

    titleArray[i] = viewNoteTitle.value;
    contentArray[i] = viewNoteContent.value;

    viewNoteTitle.setAttribute("readonly", "true");
    viewNoteContent.setAttribute("readonly", "true");

    editNoteButton.innerText = "Edit";
}

function deleteNote() {
    var i = closeNoteButton.value;

    titleArray.splice(i, 1);
    contentArray.splice(i, 1);

    showList();
}

function loadArray() {
    titleArray = JSON.parse(localStorage.getItem("titleArray"));
    contentArray = JSON.parse(localStorage.getItem("contentArray"));
}

function uploadArray() {
    localStorage.setItem("titleArray", JSON.stringify(titleArray));
    localStorage.setItem("contentArray", JSON.stringify(contentArray));
}