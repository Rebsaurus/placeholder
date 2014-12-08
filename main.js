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


/**
* Sets the ID of the chosen form
* Is called by select #facilities located in index.html
*/
function setFormID(value){
  formID = value;
}

/**
* Sets the ID of the chosen facility
*/
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
* Changes display properties of various divs
* Calls getProgramStages()
*/
function showInfo(){         
  document.getElementById("table").style.display = "block";
  document.getElementById("selector").className = "hideOnPhone";
  document.getElementById("smallScreen").style.display = "block";

  formName = $( "#selectFormDiv option:selected" ).text();
  document.getElementById("selectedFormAndClinic").innerHTML = formName + ", " + facilityName;
  getProgramStagesID();
}

/**
* Changes display properties of various divs
* Is called by 
*/
function selectNew(){
  document.getElementById("selector").className = "showOnPhone";
  document.getElementById("smallScreen").style.display = "none";
}

/**
* Filters suggestions when user types
* Is called onKeyPress() by div #facility in index.html
* Calls setSelected
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
  
/**
* Displays table when form and facility have been selected  
* Is called by textFilter()
* Calls setFacilityID() and showInfo()
*/
function setSelected(event, ui){
  var selectedObj = ui.item; 
  facilityName = selectedObj.value;
  for (i in sorted){
    if (sorted[i].name === selectedObj.value){
      setFacilityID(sorted[i].id);
      showInfo();
    }
  }
}

function loadingFacilities(){
  /*$("img.ajaxLoader").canvasLoader({
    'radius': 10,
    'color': rgb(255,0,0),
    'dotRadius':10,
    'className':'canvasLoader',   
    'backgroundColor':'transparent',   
    'id':'canvasLoader1',
    'fps':10
  });*/

  var cl = new CanvasLoader('canvasloader-container');
    cl.setColor('#1d5288'); // default is '#000000'
    cl.setShape('spiral'); // default is 'oval'
    cl.setDiameter(32); // default is 40
    cl.setDensity(100); // default is 40
    cl.setRange(1); // default is 1.3
    cl.setSpeed(5); // default is 2
    cl.show(); // Hidden by defaul

}


/**
* Prints the IDs of the forms and facilities
* Is not called by anything right now.
* Can be used to debug
*/
function printIDs(){
  console.log("Form ID: " + formID);
  console.log("Facility ID: " + facilityID);
}