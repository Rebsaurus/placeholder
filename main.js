var formID;
var facilityID;
var rowCount;
var headerCount;

function setFormID(value){
  formID = value;
}

function setFacilityID(value){
  facilityID = value;
}

$(function howManyAreChecked() {
  var checkedBoxes = 0;

  $("#tabellSubmit").click(function howMany() {
    rowCount = $('#qaTabell tr').length -1;
    headerCount = $('#qaTabell th').length -1;
    var i = 0;

    while (i < rowCount) {
      if($("#qaTabell #tr" + i + " input:checked").length == headerCount)
        checkedBoxes = checkedBoxes +1;
      i = i + 1;
    }

    alert("Quality assesment results: " + checkedBoxes + " out of " + rowCount + " checks follows the quality standard.");
    checkedBoxes = 0;
    sendData();
  });
});

/**
*Displays table when form and facility have been selected  
*/
function showInfo(){
  document.getElementById("table").style.display = "block";
  document.getElementById("selector").className = "hideOnPhone";
  document.getElementById("smallScreen").style.display = "block";

  var chosenForm = $( "#selectFormDiv option:selected" ).text();
  var chosenClinic = $( "#selectFacilityDiv option:selected" ).text();
  document.getElementById("selectedFormAndClinic").innerHTML = chosenForm + ", " + chosenClinic;
  getProgramStagesID();
}

/**
*Shows the select options
*/
function selectNew(){
  document.getElementById("selector").className = "showOnPhone";
  document.getElementById("smallScreen").style.display = "none";
}

function printIDs(){
  console.log("Form ID: " + formID);
  console.log("Facility ID: " + facilityID);
}

function sendData(){
  var typeDB = [];
  var checkBoxArray = [];
  $('#qaTable').find('input[type="checkbox"]').each(function () {
    var checkBox = this;

    /*var splitID = checkBox.id.split('_');
    typeDB.push({
      id: splitID[0]
    })*/

    //$.inArray(value, array)// returns index of a value in an index
    if(checkBox.checked == true){
      //trueOrFalse = true;
      checkBoxArray.push({
        id: checkBox.id,
        checked: true
      })
    }else{
      checkBoxArray.push({
        id: checkBox.id,
        checked: false
      })
    }
  });
  for(var key in checkBoxArray){
    console.log(checkBoxArray[key]);
  }
}
