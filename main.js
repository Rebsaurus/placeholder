//POST EXAMPLE http://inf5750-1.uio.no/api/systemSettings/phArray
//GET EXAMPLE http://inf5750-1.uio.no/api/systemSettings?key=ph-test

var formID;
var formName;
var facilityID;
var facilityName;
var rowCount;
var headerCount;
<<<<<<< HEAD
var completeRows;
=======
var facilities;
var sorted;


String.prototype.startsWith = function(str){
  return this.indexOf(str) == 0;
}
>>>>>>> rebeks_apiKall

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
*Displays table when form and facility have been selected  
*/
function showInfo(){
  document.getElementById("table").style.display = "block";
  document.getElementById("selector").className = "hideOnPhone";
  document.getElementById("smallScreen").style.display = "block";

  formName = $( "#selectFormDiv option:selected" ).text();
  facilityName = $( "#selectFacilityDiv option:selected" ).text();
  document.getElementById("selectedFormAndClinic").innerHTML = formName + ", " + facilityName;
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

function waitForFacilities(value){
  $.when(getFacilities())
  .done(function(){

  })
  .fail(function(){

  });
}

function textFilter(value){
  var dfdText = new jQuery.Deferred();

  var s = value;
  sorted = $.grep(sorted, function(auto){
    return auto.name.indexOf(s) ==0;

    //console.log(n.name.indexOf(s));
    /*if(n.name.indexOf(s) > -1){
      
      console.log(sorted.length);
    }
    //return(n.name.indexOf(s));*/
  });
  
  //console.log(sorted);
  $(function(){
    $("#facility").autocomplete({
      source: sorted.name
    });
  });

  dfdText.resolve();
  

  //$("#facility").autocomplete( { source: facilities });
  return dfdText.promise();
}
