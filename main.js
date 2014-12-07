//POST EXAMPLE http://inf5750-1.uio.no/api/systemSettings/phArray
//GET EXAMPLE http://inf5750-1.uio.no/api/systemSettings?key=ph-test
//alert("caller is " + arguments.callee.caller.toString()); // shows where a methods where called from

var formID;
var formName;
var facilityID;
var facilityName;
var rowCount;
var headerCount;
var completeRows;
var allClinicNames = []; 

var facilities;
var sorted;


String.prototype.startsWith = function(str){
  return this.indexOf(str) == 0;
}


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

    completeRows = checkedBoxes;
   // alert("Quality assesment results: " + checkedBoxes + " out of " + rowCount + " checks follows the quality standard.");
    checkedBoxes = 0;
    //createData();
  });
});

/**
* Displays table when form and facility have been selected  
* Is called by 
* Calls getProgramStagesID()
*/
function setSelected(event, ui){
  var selectedObj = ui.item; 
  facilityName = selectedObj.value;
  for (i in sorted){
    if (sorted[i].name === selectedObj.value){
      console.log(sorted[i]);
      //$("#selectFacilityDiv option:selected").value = sorted[i];
      setFacilityID(sorted[i].id);
      showInfo();
    }
  }


  
  
  //showInfo();
}
function showInfo(){         
  document.getElementById("table").style.display = "block";
  document.getElementById("selector").className = "hideOnPhone";
  document.getElementById("smallScreen").style.display = "block";

  formName = $( "#selectFormDiv option:selected" ).text();
  document.getElementById("selectedFormAndClinic").innerHTML = formName + ", " + facilityName;
  getProgramStagesID();
}

/**
* Shows the select options
*/
function selectNew(){
  document.getElementById("selector").className = "showOnPhone";
  document.getElementById("smallScreen").style.display = "none";
}

/**
* Prints the IDs of the forms and facilities
*/
function printIDs(){
  console.log("Form ID: " + formID);
  console.log("Facility ID: " + facilityID);
}

/**
* Pushes the ID and checked-status to checkboxArray
* Calls makeObjet() with checkboxArray
*/
function createData(){
  var checkBoxArray = [];
  $('#qaTable').find('input[type="checkbox"]').each(function () {
    var checkBox = this;
    
    //$.inArray(value, array)// returns index of a value in an index
    if(checkBox.checked == true){
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
    //console.log(checkBoxArray[key]);
  }
  makeObject(checkBoxArray);
}

/**
* Waits for fetFacilities to load
* Is called onChange() by div #program in index.html
*/
function waitForFacilities(value){
  $.when(getFacilities())
  .done(function(){

  })
  .fail(function(){

  });
}

/**
* Filters suggestions when user types
* Is called onKeyPress() by div #facility in index.html
*/

function textFilter(value){
  $(function(){
    $("#facility").autocomplete({
      source: allClinicNames,
      select: function (event, ui) {
            setSelected(event, ui)
        }
    });
  });
}
  
