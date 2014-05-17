// Activity 3
// Michael Youngblood
// MiU 1205
// Full Sail University

//getElementById function
function ge(x) {
    var theElement = document.getElementById(x);
    return theElement;
}

// Variable Defaults
var newHirePositions = ['--Select a Position--', 'TechSupport', 'Sales'],
    systemOS,
    employeeStatus = 'inactive',
    createdTimestamp,
    netid,
    emailid,
    emailAddress,
    repTag,
    passWord,
    pandionid,
    pandionpass,
    errMsg = ge('errors')
;

//Create seleect drop down box and populate with options
function makePositions() {
    var formTag = document.getElementsByTagName('form'),
        selectDiv = ge('select'),
        makeSelect = document.createElement('select');
        makeSelect.setAttribute('id', 'jobTitle');
    for(var i=0, j=newHirePositions.length; i<j; i++) {
        var makeOption = document.createElement('option');
        var optText = newHirePositions[i];
        makeOption.setAttribute('value', optText);
        makeOption.innerHTML = optText;
        makeSelect.appendChild(makeOption);
    }
    selectDiv.appendChild(makeSelect);
}


//Find value of selected radio button
function getSelectedRadio() {
    radios = document.forms[1].os;
    for(var i=0; i<radios.length; i++) {
        if (radios[i].checked) {
            systemOS = radios[i].value;
        }
    }
}


function getCheckboxValue() {
    if(ge('empStatus').checked) {
        employeeStatus = ge('empStatus').value;
    } else {
        employeeStatus = 'inactive';
    }
}



function getCreatedTimestamp() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    formattedTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    createdTimestamp = formattedTime;
    return false;

}

function getNetID() {
    //create network login id first initial last name
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;

    id = fname.charAt(0) + lname;
    netid = id.toLowerCase();
}


function getEmailID() {
    //create network login id first initial last name
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;

    id = fname + lname.charAt(0);
    emailid = id.toLowerCase();
}

function getEmailAddress(id) {
    emailAddress = id + '@x10.com';
}


function hackify(str) {
    // hackify strings for things like passwords
    // hackify is l337 5p38k. 3 = e, 8 = a, etc. 
    str = str.replace('1','!'); // do number replacement first so it doesn't change i to !
    str = str.replace(' ','_');
    str = str.replace('a','8');
    str = str.replace('A','8');
    str = str.replace('e','3');
    str = str.replace('E','3');
    str = str.replace('i','1');
    str = str.replace('I','1');
    str = str.replace('o','0');
    str = str.replace('O','0');
    str = str.replace('s','5');
    str = str.replace('S','5');
    str = str.replace('t','7');
    str = str.replace('T','7');
    return str;
}

function getRepTag() {
     // rep tag (Last Initial, First Initial, last 3 of extension: YM225)
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;
    var ext = ge('phoneExt').value;

    id = ( lname.charAt(0) + fname.charAt(0) + ext.slice(1,4) );
    repTag = id.toUpperCase();
}

function getPassWord() {
    // password = x10firstname last initial + hackified
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;

    id = 'x10' + hackify(fname + lname.charAt(0));
    passWord = id.toLowerCase();
}

function getPandionUser() {
    // pandion user (firstname.lastname@sku.x10.com)
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;

    id = fname + '.' + lname + '@sku.x10.com';
    pandionid = id.toLowerCase();
}


function getPandionPassword() {
    var fname = ge('firstName').value;
    var lname = ge('lastName').value;

    id = lname + fname.charAt(0);
    pandionpass = id.toLowerCase();
}



// Auto popuplate local storage
function autoFillDefaultData() {
    // the json object required for this function is from json.js
    // store the json object into local storage
    for (var n in json) {
        var id = Math.floor(Math.random()*10000001);
        localStorage.setItem(id, JSON.stringify(json[n]));
    }
}


function displayDataByFname(data) {
    $('#employeelistview').empty(); //empty div before writing it
    //Write data from local data to screen
    var makeListView = document.createElement('ul');
    makeListView.setAttribute('data-role','listview');
    makeListView.setAttribute('data-filter','true');
    ge('employeelistview').appendChild(makeListView);

    for(var i = 0, j=data.length; i<j; i++) {
        var makeLi = document.createElement('li');
        makeListView.appendChild(makeLi);

        var makeLiA = document.createElement('a');
        // put link to individual employee screen here
        makeLiA.setAttribute('href','#bEmployee?emp=' + localStorage.key(i));

        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value); // bring local storage back into app as JSON
        
        var listThumb = document.createElement('img');
        var listThumbSrc = 'images/'+obj.position[1]+'.png';
        listThumb.setAttribute('src', listThumbSrc);

        var makeh3 = document.createElement('h3');
        var makeh3txt = obj.fname[1] + " " + obj.lname[1];
        makeh3.innerHTML = makeh3txt;

        var makeDescrip = document.createElement('p');
        var makeDescriptxt = obj.emailAddress[1];
        makeDescrip.innerHTML = makeDescriptxt;

        makeLiA.appendChild(listThumb);
        makeLiA.appendChild(makeh3);
        makeLiA.appendChild(makeDescrip);

        makeLi.appendChild(makeLiA);
    }
}

// display list of employees from local storage
function getDataByFname() {
    // if no list is present, fill it with default data
    if ( localStorage.length === 0 ) {
        alert('There is no data in localStorage! Default data has been added.');
        autoFillDefaultData();
    }
    displayDataByFname(localStorage); // build the data to display on the list page
    $.mobile.changePage('#bFname');   // go to page to display list
}


// store employee into local storage
function storeData(key) {
    if (!key) {
        // if there is a no key, this is a new item and needs a new key
        var id = "empman_" + Math.floor(Math.random()*10000001);
    } else {
        // set the id to the existing key we are editing
        id = key;
    }
    //Gather up all form field values in an object
    //object properties will contain an array of both form lable and input values.
    getSelectedRadio();
    getCheckboxValue();
    getCreatedTimestamp();
    getNetID();
    getEmailID();
    getEmailAddress(emailid);
    getRepTag();
    getPassWord();
    getPandionUser();
    getPandionPassword();
    var emp             = {};
        emp.fname       = ['First Name:', ge('firstName').value];
        emp.lname       = ['Last Name:', ge('lastName').value];
        emp.hired       = ['Hire Date:', ge('hireDate').value];
        emp.created     = ['Created On:', createdTimestamp];
        emp.jobStatus   = ['Employee Status:', employeeStatus];
        emp.department  = ['Department', 'Default'];
        emp.position    = ['Position:', ge('jobTitle').value];
        emp.exp         = ['Experience Level:', ge('exp').value];
        emp.swipeid     = ['SwipeID:', ge('swipeID').value];

        emp.phoneExt    = ['Phone Ext:', ge('phoneExt').value];
        emp.repTag      = ['Rep Tag:', repTag];
        emp.vmpass      = ['Voice Mail Password:','1234'];
        emp.compNumber  = ['Company Phone Number:', '(425) 203-3900'];

        emp.netid       = ['Network ID:', netid];
        emp.netPass     = ['Network Pass:', passWord];      // network password
        emp.emailid     = ['Email ID:', emailid];
        emp.emailPass   = ['Email Pass:', passWord];        // email password 
        emp.emailAddress= ['Email Address:', emailAddress];
        emp.pandionid   = ['Pandion User:', pandionid];     // pandion user (firstname.lastname@sku.x10.com)
        emp.pandionpass = ['Pandion Pass:', pandionpass];   // pandion password (lastname first initial)
        emp.os          = ['Stations OS:', systemOS];

        emp.notes       = ['Notes:', ge('notes').value];

    // save data into local storage
    localStorage.setItem(id, JSON.stringify(emp));
    alert('New Hire Created!'); // alert me all this worked
}

// edit an employeefrom local storage
function editItem() {
    // grab the data for our item from local storage
    var value = localStorage.getItem(this.key);
    var emp = JSON.parse(value);


    //populate form fields with current local storage values
    ge('firstName').value = emp.fname[1];
    ge('lastName').value = emp.lname[1];
    ge('hireDate').value = emp.hired[1];
    if(emp.jobStatus[1] == 'Active'){
        ge('empStatus').setAttribute('checked', 'checked');
    }
    ge('jobTitle').value = emp.position[1];
    ge('exp').value = emp.exp[1];
    var radios = document.forms[0].os;
    for (var i=0; i<radios.length; i++) {
        if(radios[i].value == 'WinXP' && emp.os[1] == "WinXP") {
            radios[i].setAttribute('checked', 'checked');
        } else if (radios[i].value == 'Win7' && emp.os[1] == "Win7") {
            radios[i].setAttribute('checked', 'checked');
        }
    }
    ge('swipeID').value = emp.swipeid[1];
    ge('phoneExt').value = emp.phoneExt[1];
    ge('notes').value = emp.notes[1];


    // remove initial listener from save contact button
    save.removeEventListener('click', storeData);
    //change submit button value to edit button
    ge('submit').value = 'Edit Rep';
    var editSubmit = ge('submit');
    // save the key value established so we can use that value so we can 
    // save the data we edited
    editSubmit.addEventListener('click', validate);
    editSubmit.key = this.key;

}


// delete employee from local storage
function deleteItem(empKey) {
    var ask = confirm('Are you sure you would like to delete this Rep?');
    if (ask === true) {
        localStorage.removeItem(empKey);
        getDataByFname();
        alert('Rep was deleted successfully!');
    } else {
        alert('Rep was not deleted');
    }
}


// function to search through employees
function searchEmployees(data) {
    var term = data[0].value,
        results = [];

    if(term !== ""){
        for (var i=0, j=localStorage.length; i<j; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);


            for (var n in obj) {
                if (term === obj[n][1]) {
                    results.push(localStorage.key(i));

                }
            }
        }
        displayDataByFname(results);
        $.mobile.changePage('#bFname');
    }
}
                    


// clear local storage data
function clearLocal() {
    if(localStorage.length === 0) {
        alert('There is no data to clear');
    } else {
        localStorage.clear();
        alert('localStorage has been cleared');
        window.location.reload();
        return false;
    }
}


// Set link and click events
var displayByFname = ge('displayByFname');
displayByFname.addEventListener('click', getDataByFname);

//var displayByDept = ge('displayByDept');
//displayByDept.addEventListener('click', getDataByDept);

//var displayByExt = ge('displayByExt');
//displayByExt.addEventListener('click', getDataByExt);

var clearLink = ge('clearLink');
clearLink.addEventListener('click', clearLocal);

//var save = ge('submit');
//save.addEventListener('click', validate);

//var search = ge('search-basic');
//search.addEventListener('click', getSearch);


google.load("feeds", "1");
function initialize() {
    var feed = new google.feeds.Feed("http://www.aliendev.com/feed");
    var feed2 = new google.feeds.Feed('http://feeds.gawker.com/Gizmodo/full');
    var feed3 = new google.feeds.Feed('http://blog.x10.com/feed')

    feed.setNumEntries(30);
    feed2.setNumEntries(30);
    feed3.setNumEntries(30);


    feed.load(function(result) {
        if (!result.error) {
            var newsFeedUl = document.getElementById("feed1");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var makeLi = document.createElement("li");

                var makeLink = document.createElement('a');
                var itemUrl = entry.link;
                makeLink.setAttribute('href',itemUrl);
                makeLink.setAttribute('rel','external');
                
                var makeH3 = document.createElement('h3');
                var storyHeader = entry.title + " (" + entry.publishedDate + ")"
                makeH3.appendChild(document.createTextNode(storyHeader));

                var makeDesc = document.createElement('p');
                makeDesc.appendChild(document.createTextNode(entry.contentSnippet));

                makeLink.appendChild(makeH3);
                makeLink.appendChild(makeDesc);
                makeLi.appendChild(makeLink);
                newsFeedUl.appendChild(makeLi);
            }
        }
    });

    feed2.load(function(result) {
        if (!result.error) {
            var newsFeedUl = document.getElementById("feed2");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var makeLi = document.createElement("li");

                var makeLink = document.createElement('a');
                var itemUrl = entry.link;
                makeLink.setAttribute('href',itemUrl);
                makeLink.setAttribute('rel','external');
                
                var makeH3 = document.createElement('h3');
                var storyHeader = entry.title + " (" + entry.publishedDate + ")"
                makeH3.appendChild(document.createTextNode(storyHeader));

                var makeDesc = document.createElement('p');
                makeDesc.appendChild(document.createTextNode(entry.contentSnippet));

                makeLink.appendChild(makeH3);
                makeLink.appendChild(makeDesc);
                makeLi.appendChild(makeLink);
                newsFeedUl.appendChild(makeLi);
            }
        }
    });
    feed2.load(function(result) {
        if (!result.error) {
            var newsFeedUl = document.getElementById("feed3");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var makeLi = document.createElement("li");

                var makeLink = document.createElement('a');
                var itemUrl = entry.link;
                makeLink.setAttribute('href',itemUrl);
                makeLink.setAttribute('rel','external');
                
                var makeH3 = document.createElement('h3');
                var storyHeader = entry.title + " (" + entry.publishedDate + ")"
                makeH3.appendChild(document.createTextNode(storyHeader));

                var makeDesc = document.createElement('p');
                makeDesc.appendChild(document.createTextNode(entry.contentSnippet));

                makeLink.appendChild(makeH3);
                makeLink.appendChild(makeDesc);
                makeLi.appendChild(makeLink);
                newsFeedUl.appendChild(makeLi);
            }
        }
    });




}



function showEmployee( urlObj, options ) {
    var employeeKey = urlObj.hash.replace( /.*emp=/, "" ),

        // Get the object that represents the category we
        // are interested in. Note, that at this point we could
        // instead fire off an ajax request to fetch the data, but
        // for the purposes of this sample, it's already in memory.

        employeeInfo = localStorage.getItem(employeeKey),
        employeeData = JSON.parse(employeeInfo); // bring local storage back into app as JSON

        // The pages we use to display our content are already in
        // the DOM. The id of the page we are going to write our
        // content into is specified in the hash before the '?'.
        pageSelector = urlObj.hash.replace( /\?.*$/, "" );

    if ( employeeData ) {
        // Get the page we are going to dump our content into.
        var $page = $( pageSelector ),

            // Get the header for the page.
            $header = $page.children( ":jqmData(role=header)" ),

            // Get the content area element for the page.
            $content = $page.children( ":jqmData(role=content)" ),

            // The markup we are going to inject into the content
            // area of the page.
            markup = "<div class='ui-grid-a'>";

            for(var n in employeeData){
                markup += "<div class='ui-block-a'><strong>" + employeeData[n][0] + "</strong></div>";
                markup += "<div class='ui-block-b'>" + employeeData[n][1] + "</div>";
            }
            //makeEmployeeDataLinks(localStorage.key(i), linksLi); //Creat our edit and delete buttons link for our item in local storage.
            markup += "</div>";

            markup += "<a href='#' id='editEmployee' data-role='button' data-theme='b'>Edit Employee</a>";
            markup += "<a href='#' onclick='deleteItem(" + employeeKey + ")' data-role='button' data-theme='e'>Delete Employee</a>";


        // Find the h1 element in our header and inject the name of
        // the employeeData into it.
        // $header.find( "h1" ).html( employeeData.fname[1] + " " + employeeData.lname[1] );

        // Inject the employeeData items markup into the content element.
        $content.html( markup );

        // Pages are lazily enhanced. We call page() on the page
        // element to make sure it is always enhanced before we
        // attempt to enhance the listview markup we just injected.
        // Subsequent calls to page() are ignored since a page/widget
        // can only be enhanced once.
        $page.page();

        // Enhance the listview we just injected.
        $content.find( ":jqmData(role=listview)" ).listview();

        // We don't want the data-url of the page we just modified
        // to be the url that shows up in the browser's location field,
        // so set the dataUrl option to the URL for the employeeData
        // we just loaded.
        options.dataUrl = urlObj.href;

        // Now call changePage() and tell it to switch to
        // the page we just modified.
        $.mobile.changePage( $page, options );
    }
}




// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {

    // We only want to handle changePage() calls where the caller is
    // asking us to load a page by URL.
    if ( typeof data.toPage === "string" ) {

        // We are being asked to load a page by URL, but we only
        // want to handle URLs that request the data for a specific
        // employee.
        var u = $.mobile.path.parseUrl( data.toPage ),
            re = /^#bEmployee/;

        if ( u.hash.search(re) !== -1 ) {

            // We're being asked to display the items for a specific employee.
            // Call our internal method that builds the content for the employee
            // on the fly based on our in-memory employee data structure.
            showEmployee( u, data.options );

            // Make sure to tell changePage() we've handled this call so it doesn't
            // have to do anything.
            e.preventDefault();
        }

    }
});

$(document).bind('pageinit', function() {
    var newForm = $('#addNewHire');
        newForm.validate();
});


$(document).ready(function(){
    makePositions();
    google.setOnLoadCallback(initialize);

    var addNewHireForm = $('#addNewHire');
    addNewHireForm.validate({
        //invalidHandler: function(form,validator) {
        //    console.log('error');
        //}
        submitHandler: function(form) {
            var data = addNewHireForm.serializeArray();
            storeData();
        }

    });

    var searchForm = $('#searchForm');
    searchForm.validate({
        //invalidHandler: function(form,validator) {
        //    console.log('error');
        //}
        submitHandler: function(form) {
            var data = searchForm.serializeArray();
            searchEmployees(data);

        }
    });




});



console.log(employees[1])