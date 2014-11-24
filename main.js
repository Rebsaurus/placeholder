$(function selectForm() {
  getForms();
});


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


function showSelectFacilityDiv(){
  //API-kall
  document.getElementById("selectFacilityDiv").style.display = "block";
  //document.getElementById("facilityName").style.display = "block";
  selectedForm();
}


function showInfo(){
  
  document.getElementById("qaTable").style.display = "block";
  
  document.getElementById("selector").className = "hideOnPhone";
  document.getElementById("smallScreen").style.display = "block";
  //document.getElementById("smallScreen").className = "showOnPhone";

  var chosenForm = $( "#selectFormDiv option:selected" ).text();
  var chosenClinic = $( "#selectFacilityDiv option:selected" ).text();
  document.getElementById("selectedFormAndClinic").innerHTML = chosenForm + ", " + chosenClinic;

  getURL();
}




function selectNew(){
  console.log("inni selectNew");
  document.getElementById("selector").className = "showOnPhone";

  document.getElementById("smallScreen").style.display = "none";
}

