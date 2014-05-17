// Activity 3
// Michael Youngblood
// MiU 1204
// Full Sail University

// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//getElementById function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create seleect drop down box and populate with options
	function makePositions() {
		var formTag = document.getElementsByTagName('form'),
			selectDiv = $('select'),
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
		radios = document.forms[0].os;
		for(var i=0; i<radios.length; i++) {
			if (radios[i].checked) {
				systemOS = radios[i].value;
			}
		}
	}

	function getCheckboxValue() {
		if($('empStatus').checked) {
			employeeStatus = $('empStatus').value;
		} else {
			employeeStatus = 'inactive';
		}
	}

        //off doesn't work just yet
	function toggleControls(n) {
		switch(n){
			case "on":
				$('addNewHire').style.display = 'none';
				$('clearLink').style.display = 'inline';
				$('displayLink').style.display = 'none';
				$('addNewLink').style.display = 'inline';
				break;
			case "off":
				$('addNewHire').style.display = 'block';
				$('clearLink').style.display = 'inline';
				$('displayLink').style.display = 'inline';
				$('addNewLink').style.display = 'none';
				$('employeeList').style.display = 'none';
				break;
			default:
				return false;

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
		var fname = $('firstName').value;
		var lname = $('lastName').value;

		id = fname.charAt(0) + lname;
		netid = id.toLowerCase();
	}


	function getEmailID() {
		//create network login id first initial last name
		var fname = $('firstName').value;
		var lname = $('lastName').value;

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
		var fname = $('firstName').value;
		var lname = $('lastName').value;
		var ext = $('phoneExt').value;

		id = ( lname.charAt(0) + fname.charAt(0) + ext.slice(1,4) );
		repTag = id.toUpperCase();
	}

	function getPassWord() {
		// password = x10firstname last initial + hackified
		var fname = $('firstName').value;
		var lname = $('lastName').value;

		id = 'x10' + hackify(fname + lname.charAt(0));
		passWord = id.toLowerCase();
	}

	function getPandionUser() {
		// pandion user (firstname.lastname@sku.x10.com)
		var fname = $('firstName').value;
		var lname = $('lastName').value;

		id = fname + '.' + lname + '@sku.x10.com';
		pandionid = id.toLowerCase();
	}


	function getPandionPassword() {
		var fname = $('firstName').value;
		var lname = $('lastName').value;

		id = lname + fname.charAt(0);
		pandionpass = id.toLowerCase();
	}

	function storeData(key) {
		if (!key) {
			// if there is a no key, this is a new item and needs a new key
			var id = Math.floor(Math.random()*10000001);
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
		var emp 			= {};
			emp.fname 		= ['First Name:', $('firstName').value];
			emp.lname 		= ['Last Name:', $('lastName').value];
			emp.hired		= ['Hire Date:', $('hireDate').value];
			emp.created 	= ['Created On:', createdTimestamp];
			emp.jobStatus	= ['Employee Status:', employeeStatus];
			emp.position	= ['Position:', $('jobTitle').value];
			emp.exp 		= ['Experience Level:', $('exp').value];
			emp.swipeid		= ['SwipeID:', $('swipeID').value];

			emp.phoneExt	= ['Phone Ext:', $('phoneExt').value];
			emp.repTag 		= ['Rep Tag:', repTag];
			emp.vmpass 		= ['Voice Mail Password:','1234'];
			emp.compNumber 	= ['Company Phone Number:', '(425) 203-3900'];

			emp.netid 		= ['Network ID:', netid];
			emp.netPass 	= ['Network Pass:', passWord];		// network password
			emp.emailid		= ['Email ID:', emailid];
			emp.emailPass 	= ['Email Pass:', passWord];		// email password 
			emp.emailAddress= ['Email Address:', emailAddress];
			emp.pandionid 	= ['Pandion User:', pandionid]; 	// pandion user (firstname.lastname@sku.x10.com)
			emp.pandionpass = ['Pandion Pass:', pandionpass]; 	// pandion password (lastname first initial)
			emp.os 			= ['Stations OS:', systemOS];

			emp.notes		= ['Notes:', $('notes').value];

		// save data into local storage
		localStorage.setItem(id, JSON.stringify(emp));
		alert('New Hire Created!'); // alert me all this worked
	}

	function getData() {
		toggleControls('on');
		if(localStorage.length === 0) {
			alert('There is no data in localStorage! Default data has been added.');
			autoFillDefaultData();
		}
		//Write data from local data to screen
		var makeArticle = document.createElement('article');
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute('id', 'employeeList');
		makeArticle.appendChild(makeDiv);
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeArticle);
		$('employeeList').style.display = 'block';
		for(var i = 0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value); // bring local storage back into app as JSON
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.position[1], makeSubList);
			for(var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = "<strong>"+obj[n][0]+"</strong> "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			// make a line to break employees apart unless it is the last one in the list
			if (i < j-1) {
				var makeSubLiBreak = document.createElement('hr');
				makeSubLiBreak.setAttribute('id', 'employeeBreak');
				makeSubList.appendChild(makeSubLiBreak);
			}

			makeItemLinks(key, linksLi); // create edit/delete links for each item
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


	// Auto popuplate local storage
	function autoFillDefaultData() {
		// the json object required for this function is from json.js
		// store the json object into local storage
		for (var n in json) {
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]))
		}
	}

	function editItem() {
		// grab the data for our item from local storage
		var value = localStorage.getItem(this.key);
		var emp = JSON.parse(value);

		// show the form
		toggleControls("off");

		//populate form fields with current local storage values
		$('firstName').value = emp.fname[1];
		$('lastName').value = emp.lname[1];
		$('hireDate').value = emp.hired[1];
		if(emp.jobStatus[1] == 'Active'){
			$('empStatus').setAttribute('checked', 'checked');
		}
		$('jobTitle').value = emp.position[1];
		$('exp').value = emp.exp[1];
		var radios = document.forms[0].os;
		for (var i=0; i<radios.length; i++) {
			if(radios[i].value == 'WinXP' && emp.os[1] == "WinXP") {
				radios[i].setAttribute('checked', 'checked');
			} else if (radios[i].value == 'Win7' && emp.os[1] == "Win7") {
				radios[i].setAttribute('checked', 'checked');
			}
		}
		$('swipeID').value = emp.swipeid[1];
		$('phoneExt').value = emp.phoneExt[1];
		$('notes').value = emp.notes[1];


		// remove initial listener from save contact button
		save.removeEventListener('click', storeData);
		//change submit button value to edit button
		$('submit').value = 'Edit Rep';
		var editSubmit = $('submit');
		// save the key value established so we can use that value so we can 
		// save the data we edited
		editSubmit.addEventListener('click', validate);
		editSubmit.key = this.key;

	}

	function validate(eventData) {
		// Define the elements we want to check
		var getFname 	= $('firstName');
		var getLname 	= $('lastName');
		var getPosition	= $('jobTitle');
		var getSwipeid	= $('swipeID');
		var getPhoneExt	= $('phoneExt');

		// reset error messages
		errMsg.innerHTML 			= '';
		getPosition.style.border 	= '1px solid #ccc';
		getFname.style.border 		= '1px solid #ccc';
		getLname.style.border 		= '1px solid #ccc';
		getSwipeid.style.border 	= '1px solid #ccc';
		getPhoneExt.style.border	= '1px solid #ccc';

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

		var reSwipe = /^[0-9]{5}$/;
		if (getSwipeid.value === '') {
			var swipeIDError = 'Please enter a swipe ID Number.';
			getSwipeid.style.border = '1px solid red';
			messageArray.push(swipeIDError);
		} else if (!(reSwipe.exec(getSwipeid.value))) {
			var swipeIDError = 'Please correct the swipe ID Number.';
			getSwipeid.style.border = '1px solid red';
			messageArray.push(swipeIDError);
		}

		var rePhoneExt = /^[0-9]{4}$/;
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

	function addNewHire() {
		document.location.reload();
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
		errMsg = $('errors')
	;
	makePositions();

	// Set link and click events
	var displayLink = $('displayLink');
	displayLink.addEventListener('click', getData);

	var addNewLink = $('addNewLink');
	addNewLink.addEventListener('click', addNewHire)

	var clearLink = $('clearLink');
	clearLink.addEventListener('click', clearLocal);

	var save = $('submit');
	save.addEventListener('click', validate);

});