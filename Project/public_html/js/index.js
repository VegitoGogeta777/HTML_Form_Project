var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var studDBName = 'STUD-DB';
var studRelationName = 'Stud-Relation';
var connToken = '90932038|-31949219440364981|90962233';

$('#studfullname').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getstudfullnameAsJsonObj() {
    var studfullname = $('#studfullname').val();
    return JSON.stringify({ name: studfullname });
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#studrollno').val(record.rollno);
    $('#studclass').val(record.class);
    $('#studbirthdate').val(record.birthdate);
    $('#studaddress').val(record.address);
    $('#studenrollmentdate').val(record.enrollmentdate);
}

function resetForm() {
    $('#studfullname').val('');
    $('#studrollno').val('');
    $('#studclass').val('');
    $('#studbirthdate').val('');
    $('#studaddress').val('');
    $('#studenrollmentdate').val('');
    $('#studfullname').prop('disabled', false);
    $('#save').prop('disabled', true);
    $('#change').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $('#studfullname').focus();
}

function validateData() {
    var studrollno = $('#studrollno').val();
    var studfullname = $('#studfullname').val();
    var studclass = $('#studclass').val();
    var studbirthdate = $('#studbirthdate').val();
    var studaddress = $('#studaddress').val();
    var studenrollmentdate = $('#studenrollmentdate').val();
    
    if (studfullname === '') {
        alert('Student Name is missing');
        $('#studfullname').focus();
        return "";
    }
    if (studrollno === '') {
        alert('Student Roll No is missing');
        $('#studrollno').focus();
        return "";
    }
    if (studclass === '') {
        alert('Student Class is missing');
        $('#studclass').focus();
        return "";
    }
    if (studbirthdate === '') {
        alert('Student Birth Date is missing');
        $('#studbirthdate').focus();
        return "";
    }
    if (studaddress === '') {
        alert('Student Address is missing');
        $('#studaddress').focus();
        return "";
    }
    if (studenrollmentdate === '') {
        alert('Student Enrollment Date is missing');
        $('#studenrollmentdate').focus();
        return "";
    }
    
    return JSON.stringify({
        rollno: studrollno,
        name: studfullname,
        class: studclass,
        birthdate: studbirthdate,
        address: studaddress,
        enrolldate: studenrollmentdate
    });
}

function checkName() {
    var studfullnameJsonObj = getstudfullnameAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelationName, studfullnameJsonObj);
    
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    
    if (resJsonObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
    } else if (resJsonObj.status === 200) {
        fillData(resJsonObj);
        $('#save').prop('disabled', true);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studDBName, studRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#studfullname').focus();
}

function changeData() {
    var jsonChange = validateData();
    if (jsonChange === '') {
        return;
    }
    var updateRequest = createUPDATERequest(connToken, jsonChange, studDBName, studRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#studfullname').focus();
}
