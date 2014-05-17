




function getDataByDept() {
    //toggleControls('on');
    if(localStorage.length === 0) {
        alert('There is no data in localStorage! Default data has been added.');
        autoFillDefaultData();
    }
    //Write data from local data to screen
    var makeListView = document.createElement('ul');
    makeListView.setAttribute('data-role','listview');
    makeListView.setAttribute('data-filter','true');
    ge('departmentListView').appendChild(makeListView);

    for(var i = 0, j=localStorage.length; i<j; i++) {
        var makeLi = document.createElement('li');
        makeListView.appendChild(makeLi);

        makeLiA = document.createElement('a');
        // put link to individual employee screen here
        makeLiA.setAttribute('href','#bEmployee');

        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value); // bring local storage back into app as JSON
        
        var listThumb = document.createElement('img');
        var listThumbSrc = 'images/'+obj.position[1]+'.png';
        listThumb.setAttribute('src', listThumbSrc);

        var makeh3 = document.createElement('h3');
        var makeh3txt = obj.department[1];
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



function getDataByExt() {
    //toggleControls('on');
    if(localStorage.length === 0) {
        alert('There is no data in localStorage! Default data has been added.');
        autoFillDefaultData();
    }
    //Write data from local data to screen
    var makeListView = document.createElement('ul');
    makeListView.setAttribute('data-role','listview');
    makeListView.setAttribute('data-filter','true');
    ge('extlistview').appendChild(makeListView);

    for(var i = 0, j=localStorage.length; i<j; i++) {
        var makeLi = document.createElement('li');
        makeListView.appendChild(makeLi);

        makeLiA = document.createElement('a');
        // put link to individual employee screen here
        makeLiA.setAttribute('href','#bEmployee');

        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value); // bring local storage back into app as JSON
        
        var listThumb = document.createElement('img');
        var listThumbSrc = 'images/'+obj.position[1]+'.png';
        listThumb.setAttribute('src', listThumbSrc);

        var makeh3 = document.createElement('h3');
        var makeh3txt = obj.ext[1];
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


// get the image for the right position
function getImage(posiName, makeSubList) {
    var imageLi = document.createElement('li');
    makeSubList.appendChild(imageLi);
    var newImage = document.createElement('img');
    var setSrc = newImage.setAttribute('src', 'images/'+posiName+'.png')
    imageLi.appendChild(newImage);

}


// make item links
// create edit/delete links for each item
function makeItemLinks(key, linksLi) {
    // add edit single item link
    var editLink = document.createElement('a');
    editLink.href = '#';
    editLink.id = 'singleItemLink';
    editLink.key = key;
    var editText = 'Edit Employee';
    editLink.addEventListener('click', editItem);
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);

    // add delete single item link
    var deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.id = 'singleItemLink';
    deleteLink.key = key;
    var deleteText = 'Delete Employee';
    deleteLink.addEventListener('click', deleteItem);
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
}


function deleteItem() {
    var ask = confirm('Are you sure you would like to delete this Rep?');
    if (ask === true) {
        localStorage.removeItem(this.key);
        window.location.reload();
        alert('Rep was deleted successfully!');
    } else {
        alert('Rep was not deleted');
    }
}

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

function validate(eventData) {
    // Define the elements we want to check
    var getFname    = ge('firstName');
    var getLname    = ge('lastName');
    var getPosition = ge('jobTitle');
    var getSwipeid  = ge('swipeID');
    var getPhoneExt = ge('phoneExt');

    // reset error messages
    errMsg.innerHTML            = '';
    getPosition.style.border    = '1px solid #ccc';
    getFname.style.border       = '1px solid #ccc';
    getLname.style.border       = '1px solid #ccc';
    getSwipeid.style.border     = '1px solid #ccc';
    getPhoneExt.style.border    = '1px solid #ccc';

    // get error messages
    var messageArray = [];
    // position validation
    if (getPosition.value === '--Select a Position--') {
        var positionError = 'Please select a position.';
        getPosition.style.border = '1px solid red';
        messageArray.push(positionError);
    }

    // check first name 
    if (getFname.value === '') {
        var fNameError = 'Please enter a first name.';
        getFname.style.border = '1px solid red';
        messageArray.push(fNameError);
    }

    // check first name 
    if (getLname.value === '') {
        var lNameError = 'Please enter a first name.';
        getLname.style.border = '1px solid red';
        messageArray.push(lNameError); 
    }

    var reSwipe = /^[0-9]{5}ge/;
    if (getSwipeid.value === '') {
        var swipeIDError = 'Please enter a swipe ID Number.';
        getSwipeid.style.border = '1px solid red';
        messageArray.push(swipeIDError);
    } else if (!(reSwipe.exec(getSwipeid.value))) {
        var swipeIDError = 'Please correct the swipe ID Number.';
        getSwipeid.style.border = '1px solid red';
        messageArray.push(swipeIDError);
    }

    var rePhoneExt = /^[0-9]{4}ge/;
    if (getPhoneExt.value === '') {
        var phoneExtIDError = 'Please enter the Phone Extension.';
        getPhoneExt.style.border = '1px solid red';
        messageArray.push(phoneExtIDError);
    } else if (!(rePhoneExt.exec(getPhoneExt.value))) {
        var phoneExtIDError = 'Please correct the Phone Extension.';
        getPhoneExt.style.border = '1px solid red';
        messageArray.push(phoneExtIDError);
    }

    // if there were errors, display them on screen
    if (messageArray.length >= 1) {
        for (var i = 0, j = messageArray.length; i < j; i++) {
            var txt = document.createElement('li');
            txt.innerHTML = messageArray[i];
            errMsg.appendChild(txt);

        }
    eventData.preventDefault();
    return false;

    } else {
        // if all data is good, store it
        // send the key value (which comes from the editData function).
        // remember this key value was passed through the editSubmit event listener
        storeData(this.key);
    }


}









var parseNewHire = function(data) {
console.log(data);
}




$(document).ready(function()) {
    var newDeptForm = $('#newDepartmentForm');
    newDeptForm.validate({
        invalidHandler: function(form,validator){};
        submitHandler: function() {
            var data = newDeptForm.searlizeArray();
            parseNewHire(data);
        }
    });



}