var formID;
var facilityID;

function setFormID(value){
  formID = value;
}

function setFacilityID(value){
  facilityID = value;
}

$(function howManyAreChecked() {
  var checkedBoxes = 0;
  $("#tabellSubmit").click(function howMany() {
    if($("#qaTabell #agetr input:checked").length > 2) 
      checkedBoxes = checkedBoxes +1;
            
      if($("#qaTabell #gendertr input:checked").length > 2) 
        checkedBoxes = checkedBoxes +1;

      if($("#qaTabell #childrentr input:checked").length > 2) 
         checkedBoxes = checkedBoxes +1;

        alert(checkedBoxes);

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