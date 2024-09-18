var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var bookmarksList = [];


if (localStorage.getItem("bookmarks") !=null) {
    bookmarksList= JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

function addBookmark() {
    if (validateName() && validateUrl()) {
        var bookmarks = {
            name: siteName.value,
            Url: siteUrl.value
        };
        bookmarksList.push(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
        displayBookmarks();
        clearInput();
    } 
    
    else {

        // Show the modal when validation fails
        swal("Site Name or URL is not valid. Please follow the rules below:", "Site name must contain at least 3 characters.","Site URL must be a valid one (must start with http:// or https://",
             {
           
    
          });
    }
}

function clearInput() {
    siteName.value = '';
    siteUrl.value = '';
    siteUrl.classList.remove("is-valid");
    siteName.classList.remove("is-valid")

}

function displayBookmarks() {
    var table = ''; 
    for (let i = 0; i < bookmarksList.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarksList[i].name}</td>
            <td><a href="${bookmarksList[i].Url}" class="btn" target="_blank"><i class="fa-solid fa-eye px-1"></i>Visit</a></td>            <td><button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML = table;  
}

function deleteBookmark(i) {
    bookmarksList.splice(i, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks();
}

// Validate site name
function validateName() {
    var regex = /^\w{3,15}$/;
    var bookmarkName = siteName.value;

    if (regex.test(bookmarkName)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false;
    }
}

// Validate site URL
function validateUrl() {
    var regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[\w\.-]*)*\/?$/;
    var bookmarkUrl = siteUrl.value;

    if (regex.test(bookmarkUrl)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        return true;
    } else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        return false;
    }
}