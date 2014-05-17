
var newHirePositions = ['TechSupport', 'Sales'],
    systemOS,
    employeeStatus = 'inactive',
    createdTimestamp,
    netid,
    emailid,
    emailAddress,
    repTag,
    passWord,
    pandionid,
    pandionpass
;

function getCreatedTimestamp() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    createdTimestamp = formattedTime;
    return false;
}

function getNetID() {
    //create network login id first initial last name
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var id = fname.charAt(0) + lname;
    netid = id.toLowerCase();
}

function getEmailID() {
    //create network login id first initial last name
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var id = fname + lname.charAt(0);
    emailid = id.toLowerCase();
}

function getEmailAddress(id) {
    emailAddress = id + '@example.com';
}

function hackify(str) {
    // hackify strings for things like passwords
    // hackify is l337 5p38k. 3 = e, 8 = a, etc. 
    str = str.replace('1','!');
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
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var ext = $('#phoneExt').val();
    var id = ( lname.charAt(0) + fname.charAt(0) + ext.slice(1,4) );
    repTag = id.toUpperCase();
}

function getPassWord() {
    // password = x10firstname last initial + hackified
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var id = 'x10' + hackify(fname + lname.charAt(0));
    passWord = id.toLowerCase();
}

function getPandionUser() {
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var id = fname + '.' + lname + '@chat.example.com';
    pandionid = id.toLowerCase();
}

function getPandionPassword() {
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var id = lname + fname.charAt(0);
    pandionpass = id.toLowerCase();
}

// Auto popuplate local storage
function autoFillDefaultData() {
    for (var n in json) {
        var id = "empman_" + Math.floor(Math.random()*10000001);
        localStorage.setItem(id, JSON.stringify(json[n]));
    }
}

function getDefaultData() {
    if ( localStorage.length === 0 ) {
        autoFillDefaultData();
        alert('There is no data in localStorage! Default data has been added.');
    } else {
        var clearCurrentDataFirst = confirm('Clear the current data and to add default data??');
        if (clearCurrentDataFirst === true) {
            localStorage.clear();
            autoFillDefaultData();
            alert('Old data is now gone and replaced with default data!');
        } else {
            alert('Old data is safe, default data was not added');
        }
    }
}

function getCheckboxValue() {
    if($('#empStatus').attr('checked')) {
        employeeStatus = 'active';
    } else {
        employeeStatus = 'inactive';
    }
}

// store employee into local storage
function storeData() {
    if ( $('#key').val() == "" ) { var id = "empman_" + Math.floor(Math.random()*10000001); }
    else { var id = $('#key').val(); };
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
        emp.fname       = ['First Name:', $('#firstName').val()];
        emp.lname       = ['Last Name:', $('#lastName').val()];
        emp.hired       = ['Hire Date:', $('#hireDate').val()];
        emp.created     = ['Created On:', createdTimestamp];
        emp.jobStatus   = ['Employee Status:', employeeStatus];
        emp.department  = ['Department', 'Default'];
        emp.position    = ['Position:', $('#jobTitle').val()];
        emp.swipeid     = ['SwipeID:', $('#swipeID').val()];
        emp.phoneExt    = ['Phone Ext:', $('#phoneExt').val()];
        emp.repTag      = ['Rep Tag:', repTag];
        emp.vmpass      = ['Voice Mail Password:','1234'];
        emp.compNumber  = ['Company Phone Number:', '(425) 203-3900'];
        emp.netid       = ['Network ID:', netid];
        emp.netPass     = ['Network Pass:', passWord];      
        emp.emailid     = ['Email ID:', emailid];
        emp.emailPass   = ['Email Pass:', passWord];        
        emp.emailAddress= ['Email Address:', emailAddress];
        emp.pandionid   = ['Pandion User:', pandionid];     
        emp.pandionpass = ['Pandion Pass:', pandionpass];
        emp.os          = ['Stations OS:', $('[name=os]:checked').val()];
        emp.notes       = ['Notes:', $('#notes').val()];

    // save data into local storage
    localStorage.setItem(id, JSON.stringify(emp));
    alert('Employee Saved!'); // alert me all this worked
    window.location = '#bEmployee?emp=' + id;
}

// edit an employeefrom local storage
function editEmployee(empKey) {
    var value = localStorage.getItem(empKey);
    var emp = JSON.parse(value);
    $('#firstName').val(emp.fname[1]);
    $('#lastName').val(emp.lname[1]);
    $('#hireDate').val(emp.hired[1]);
    $('#jobTitle').val(emp.position[1]);
    $('#swipeID').val(emp.swipeid[1]);
    $('#phoneExt').val(emp.phoneExt[1]);
    $('#notes').val(emp.notes[1]);
    $('#submit').text('Save Employee');
    if(emp.jobStatus[1] == 'Active'){ $('empStatus').checked = true; };
    for (var i=0; i< $('[name=os]').length; i++) {
        if( $('[name=os]:eq('+i+')').val() == 'WinXP' && emp.os[1] == "WinXP") {
            $('[name=os]:eq('+i+')').attr('checked','checked');
        } else if ( $('[name=os]:eq('+i+')').val() == 'Win7' && emp.os[1] == "Win7") {
            $('[name=os]:eq('+i+')').attr('checked','checked');
        }
    };
    $('#key').val(empKey);
}

function displayDataByFname(data) {
    $('#employeelistview').empty(); //empty div before writing it
    //Write data from local data to screen
    $('#employeelistview')
        .append($('<ul></ul>')
            .attr('data-role','listview')
            .attr('data-filter','true')
        )
    ;
    $.each(data, function(empKey, empVal){
        $.each(empVal, function(key,val){
            $('#employeelistview ul')
                .append($('<li></li>')
                    .append($('<a></a>')
                        .attr('href','#bEmployee?emp='+key)
                        //.append($('<img></img>')
                        //    .attr('src', listThumbSrc)
                        //) //<img>
                        .append($('<h3></h3>')
                            .text(val.empfname + " " + val.emplname)
                        ) //<h3>
                        .append($('<p></p>')
                            .text(val.emailAddress)
                        ) //<p>
                    ) //<a>
                ) //<li>
            ;        
        });

    });
};

// display list of employees from local storage
function getDataByFname() {
    $.ajax({
        url: '/xhr/getEmployeeList.py',
        type: 'GET',
        dataType: 'json',
        //data: 'sortBy:fname',
        success: function(result) {

            displayDataByFname(result); // build the data to display on the list page

            $.mobile.changePage('#bFname');
        }
    })
}

// clear local storage data
function clearLocal() {
    if(localStorage.length === 0) {
        alert('There is no data to clear');
    } else {
        var clearLocalStorageConfirm = confirm('Do you really want to clear local storage??');
        if (clearLocalStorageConfirm === true) {
            localStorage.clear();
            alert('localStorage has been cleared');
            //window.location.reload();
        } else {
            alert('localStorage is safe');
        }
        return false;
    }
}

// clear local storage data
function clearData() {
    var clearWholeDBConfirm = confirm('Do you really want to clear the whole DB??? This is NOT reversable!');
    if(clearWholeDBConfirm === true){
        $.ajax({
            url: 'xhr/clearDataMySQL.py',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({'clear':'true'}),
            success: function(result) {
                console.log(result);
            }
        }); 
        alert('DB is has been cleared');
    } else {
        alert('Whew, that was close to a big boo boo. Keep in mind, this is also why you should make backups of your databases')
    }
    window.location.reload();
    return false;
}

// delete employee from local storage
function deleteItem(empKey) {
    var ask = confirm('Are you sure you would like to delete this employee?');
    if (ask === true) {
        localStorage.removeItem(empKey);
        getDataByFname();
        alert('Employee was deleted successfully!');
    } else {
        alert('Employee was not deleted');
    }
}

// function to search through employees
function searchEmployees(term) {
    var results = [];
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

function showEmployee( urlObj, options ) {
    var employeeKey = urlObj.hash.replace( /.*emp=/, "" ),
        employeeInfo = localStorage.getItem(employeeKey),
        employeeData = JSON.parse(employeeInfo); // bring local storage back into app as JSON
        var pageSelector = urlObj.hash.replace( /\?.*$/, "" );

    console.log(urlObj)
    if ( employeeData ) {
        var $page = $( pageSelector ),
            $header = $page.children( ":jqmData(role=header)" ),
            $content = $page.children( ":jqmData(role=content)" ),
            markup = "<div class='ui-grid-a'>";
            for(var n in employeeData){
                markup += "<div class='ui-block-a'><strong>" + employeeData[n][0] + "</strong></div>";
                markup += "<div class='ui-block-b'>" + employeeData[n][1] + "</div>";
            }
            markup += "</div>";
            markup += "<a href='#addNewHirePage' onclick='editEmployee(\"" + employeeKey + "\")' data-role='button' data-theme='b'>Edit Employee</a>";
            markup += "<a href='#' onclick='deleteItem(\"" + employeeKey + "\")' data-role='button' data-theme='e'>Delete Employee</a>";
        $content.html( markup );
        $page.page();
        $content.find( ":jqmData(role=listview)" ).listview();
        options.dataUrl = urlObj.href;
        $.mobile.changePage( $page, options );
    }
}

// Listen for any attempts to call changePage().
$(document).on( "pagebeforechange", function( e, data ) {
    if ( typeof data.toPage === "string" ) {
        var url = $.mobile.path.parseUrl( data.toPage ),
            re = /^#bEmployee/;
        if ( url.hash.search(re) !== -1 ) {
            showEmployee( url, data.options );
            e.preventDefault();
        }
    }
});

$(document).on('pagechange', function() {
  $('.ui-page-active .ui-listview').listview('refresh');
  $('.ui-page-active :jqmData(role=content)').trigger('create');
});

$(document).ready(function(){
    $.ajaxSetup({
        timeout: 10000,
        error: function(err){
            console.log('error: ', err);
        }
    });
    $('#displayByFname').on('click', getDataByFname);
    $('#clearLink').on('click', clearData);
    $('#editEmployeeLink').on('click', editEmployee);
    $('#addDefaultDataLink').on('click', getDefaultData);
    $('#submitLink').on('click', function() {
        $('#addNewHireForm').submit(); 
        return false;
    });
    $.each(newHirePositions, function(key,value) {
        $('#addNewHireForm select')
            .append($('<option><option')
                .attr('value',value)
                .text(value));
    });
    $("#addNewHireForm").validate({
        errorContainer: "#errors, #errorsMsg",
        errorLabelContainer: "#errors ul",
        wrapper: "li", debug:true,
        submitHandler: function(form) { 
            var data = $("#addNewHireForm").serializeArray();
            storeData();
        }
    });
    $('#searchForm').on('change', function() {
        var q = $('#search-basic').val();
        searchEmployees(q);
    });
    $('#importDefualtJSONtMySQLFormSubmit').on('click',function(){
        $.each(json, function(i, val) {
            $.ajax({
                url: '/xhr/importDefaultJSONToMySQL.py',
                type: 'POST',
                dataType: 'json',
                data: json[i],
                success: function(result) {
                    console.log(result);
                }
            })      
        });
        // this fixes some bugs but doesn't wait for the ajax calls to finish
        //window.location = '/index.html';
    });
    $('#importNewDataForm').validate({
        submitHandler: function(form) {
            // console.log($('#importNewDataForm'));
            var formData = $("#importNewDataForm").serializeArray();
            $.ajax({
                url: '/xhr/importNewData.py',
                type: 'POST',
                dataType: 'json',
                data: formData,
                success: function(result) {
                    console.log(result);
                    $.mobile.changePage('#home');
                    window.location.reload();
                }
            })
        }
    });
    $('#importReplaceDataForm').validate({
        submitHandler: function(form) {
            // console.log($('#importNewDataForm'));
            var formData = $("#importReplaceDataForm").serializeArray();
            $.ajax({
                url: '/xhr/importRemoveAndReplaceData.py',
                type: 'POST',
                dataType: 'json',
                data: formData,
                success: function(result) {
                    console.log(result);
                    $.mobile.changePage('#home');
                    window.location.reload();
                }
            })
        }
    });
    $('[name=exportAllDataLocation]').on('click', function(){
        $('#exportAllEmailField').css('display','none');
        $('#exportAllDataTypes').css('display','none');
        $('#exportAllExportLocalField').css('display','none');
        if ($('input[name=exportAllDataLocation]:checked').val() == "email" ) {
            $("#exportAllEmailField").slideDown("fast"); //Slide Down Effect
            $("#exportAllDataTypes").slideDown("fast");
        } else if ($('input[name=exportAllDataLocation]:checked').val() == "backupLocally" ) {
            $("#exportAllDataTypes").slideUp("fast");
            $("#exportAllEmailField").slideUp("fast");  //Slide Up Effect
        } else {
            $("#exportAllEmailField").slideUp("fast");  //Slide Up Effect
            $("#exportAllDataTypes").slideDown("fast");
        }
    });
    $('#exportAllDataForm').validate({
        submitHandler: function(form) {
            // console.log($('#importNewDataForm'));
            var formData = $("#exportAllDataForm").serializeArray();
            $.ajax({
                url: '/xhr/exportAllData.py',
                type: 'POST',
                dataType: 'json',
                data: formData,
                success: function(result) {
                    console.log(result);
                }
            })
        }
    });
});

