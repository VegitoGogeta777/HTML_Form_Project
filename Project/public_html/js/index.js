/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var studDBName = 'STUD-DB';
var studRelationName = 'Stud-Relation';
var connToken = '90932038|-31949219440364981|90962233';

$('#studrollno').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getstudrollnoAsJsonObj(){
    var studrollno = $('#studrollno').val();
    var jsonStr = {
        id: studrollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#studfullname').val(record.name);
    $('#studclass').val(record.class);
    $('#studbirthdate').val(record.birthdate);
    $('#studaddress').val(record.address);
    $('#studenrollmentdate').val(record.enrollmentdate);
}

function resetForm(){
    $('#studrollno').val('');
    $('#studfullname').val('');
    $('#studclass').val('');
    $('#studbirthdate').val('');
    $('#studaddress').val('');
    $('#studenrollmentdate').val('');
    $('#studrollno').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#studrollno').focus();
}

function validateData(){
    var studrollno, studfullname, studclass, studbirthdate, studaddress, studenrollmentdate;
    studrollno = $('#studrollno').val();
    studfullname = $('#studfullname').val();
    studclass = $('#studclass').val();
    studbirthdate = $('#studbirthdate').val();
    studaddress = $('#studaddress').val();
    studenrollmentdate = $('#studenrollmentdate').val();
    
    if(studrollno === ''){
        alert('Student Roll No is missing');
        $('#studrollno').focus();
        return "";
    }
    if(studfullname === ''){
        alert('Student Name is missing');
        $('#studfullname').focus();
        return "";
    }
    if(studclass === ''){
        alert('Student Class is missing');
        $('#studclass').focus();
        return "";
    }
    if(studbirthdate === ''){
        alert('Student Birth Date is missing');
        $('#studbirthdate').focus();
        return "";
    }
    if(studaddress === ''){
        alert('Student Address is missing');
        $('#studaddress').focus();
        return "";
    }
    if(studenrollmentdate === ''){
        alert('Student Enrollment No is missing');
        $('#studenrollmentdate').focus();
        return "";
    }
    
    var jsonStrObj = {
        rollno: studrollno,
        name: studfullname,
        class: studclass,
        birthdate: studbirthdate,
        address: studaddress,
        enrolldate: studenrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}

function getStud(){
    var studrollnoJsonObj = getstudrollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelationName, studrollnoJsonObj);   
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    
    if(resJsonObj.status === 400){
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false); 
        $('#studfullname').focus();
    }
    else if(resJsonObj.status === 200){
        $('#studrollno').prop('disabled', true);
        fillData(resJsonObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#studfullname').focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studDBName, studRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#studrollno').focus();
}

function changeData(){
    $('#change').prop('disabled',true);
    jsonChange = validateData();
    var updateRequest = createUPDATERequest(connToken, jsonChange, studDBName, studRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#studrollno').focus();
}