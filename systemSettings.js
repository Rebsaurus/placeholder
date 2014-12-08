var phArray = [];
var submits = [];
var forms = [];
var formTotalRows;
var formCompleteRows;


/**
* Gets a JSON object containing all forms from /api/programs.json
* Sorts them alphabetically
* Puts them in a HTML select #programs located in index.html
* Is called by itself when index is loaded
*/
$(function getForms (){
	url = window.location + "/api/programs.json";
	//url2 = "http://inf5750-1.uio.no/api/programs.json";

	$.getJSON(url, function (data){
		data = data.programs;

		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			var forms = [];
			for(var i = 0; i < data.length; i++) {
				if(i == 0){
					forms.push({
						id: "index",
						name: " <---- Choose a form ---->"
					});
				} else {
					forms.push({
						id: data[i].id,
						name: data[i].name
					});					
				}
			}
			
			/**
			* Sorts said array
			*/
			var sorted = forms.sort(function(a,b){
				return a.name.localeCompare(b.name);
			});

			for(var key in forms){
				$('#program').append('<option value="' + forms[key].id + '">' + forms[key].name +  '</option>');
			}
		}
	});
});

/**
* Sets a JSON object containing all facilities that have access to the chosen
* Sorts them alphabetically
* Is called by onChange in select #programs located in index.html
*/
function getFacilities (){
	document.getElementById("waitingForFacilities").style.display = "block";
	document.getElementById("facility").value = "";
	document.getElementById("table").style.display = "none";

	url = window.location + "/api/programs/" + formID + ".json";
	//mockURL = "http://inf5750-1.uio.no/api/programs/" + formID + ".json";
	$.getJSON(url, function (data){
		data = data.organisationUnits;

		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{

			/**
			* Places all clinics in an associative array
			*/
			facilities = [];
			for(var i = 0; i < data.length; i++) {
				facilities.push({
					id: data[i].id,
					name: data[i].name
				});					
			}

			sorted = facilities.sort(function(a,b){
				return a.name.localeCompare(b.name);
			});

			for (var i in sorted){
				allClinicNames[i] = sorted[i].name;
			}

			document.getElementById("waitingForFacilities").style.display = "none";
			document.getElementById("selectFacilityDiv").style.display = "block";
		}
	});
}

/**
* Pushes the ID and checked-status to checkboxArray
* Calls waitForMakeObjet() with checkboxArray
* Is called by onClick submit-button in index.html
*/
function createData(){
  var checkBoxArray = [];
  $('#qaTable').find('input[type="checkbox"]').each(function () {
    var checkBox = this;

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

  waitForMakeObjects(checkBoxArray);
}

/**
* Waits for getObjects to resolve jQuery.Deferrence
* Is called by createData
* Calls makeObject, sends checkboxArray
*/
function waitForGetObjects(checkboxArray){
	//clearSystemSettings(); return;
	console.log("MAKE OBJECT");
	formTotalRows = 0;
	formCompleteRows = 0;
	$.when(getObjects())
	.done(function() {
		makeObject(checkboxArray);
	})
	.fail(function() {
		console.log( 'I fire if request failed.' );
	});
}

/**
* Creates jQuery.Deferred so the program has to wait for this method before it can continue
* Gets JSON-object from /api/systemSettings/phArray
* Places the objects inside phArray
* Updates variables formCompleteRows, formTotalRows and number of submits within each form
* Resolves jQuery.Deferred when for-loop is done.
*/
function getObjects(){
	console.log("GET OBJECTS");

	var dfd = new jQuery.Deferred();

	var url = window.location + "/api/systemSettings/phArray";
	//mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(url, function(data){
		phArray = data;
		console.log("PH: " + phArray.length);
		for (var key in phArray){
			if(phArray[key].clinic.cID === facilityID){
				forms = phArray[key].clinic.forms;
			}
			for (var key2 in phArray[key].clinic.forms){
				if (phArray[key].clinic.cID === facilityID && phArray[key].clinic.forms[key2].fID === formID){
					formCompleteRows = phArray[key].clinic.forms[key2].formCompleteRows;
					formTotalRows = phArray[key].clinic.forms[key2].formTotalRows;
					submits = phArray[key].clinic.forms[key2].submits;
					console.log(submits);
				}
			}
		}
		dfd.resolve();
	});
	return dfd.promise();
}

/**
* Is called by waitForGetObjects
* Finds out what already exist in phArray
* Updates clinic, form, submits in phArray
* i.e. updates variables that are to be posted to /api/systemSettings/phArray
* Calls postObjects
*/
function makeObject(checkboxArray){
	var clinic = {};
	var form = {}
	var submit = [];
	var counter = 0;

	submits.push({
		completeRows: completeRows,
		totalRows: rowCount,
		submit: checkboxArray
	});

	// If the clinic already has this form
	if(containsForm() === true){
		postObjects(phArray);
	}else{
		// If the clinic contains no forms
		submits = []
		submits.push({
			completeRows: completeRows,
			totalRows: rowCount,
			submit: checkboxArray
		});

		for(key in phArray){

			// If the clinic does not contain this spesific form. Returns true
			if(phArray[key].clinic.cID === facilityID){
				
				phArray[key].clinic.forms.push({
					name: formName,
					fID: formID,
					formCompleteRows: completeRows,
					formTotalRows: rowCount,
					submitCount: 1,
					submits: submits
				});
				postObjects(phArray);
				return;
			}
		}
		
		// phArray does not contain clinic
		forms = [];

		console.log(forms);
		forms.push({
			name: formName,
			fID: formID,
			formCompleteRows: completeRows,
			formTotalRows: rowCount,
			submitCount: 1,
			submits: submits
		});
		console.log(forms);

		clinic = {
			name: facilityName,
			cID: facilityID,
			forms: forms
		}
		
		phArray.push({
			clinic: clinic
		});

		postObjects(phArray);
	}
}

/**
* Adds submit's values to form
* Updates form
* Returns true or false
* Is called by ifs in makeObject
*/
function containsForm(){
	for (var key in phArray){
		for (var key2 in phArray[key].clinic.forms){
			if (phArray[key].clinic.cID === facilityID && phArray[key].clinic.forms[key2].fID === formID){
				phArray[key].clinic.forms[key2].formCompleteRows = formCompleteRows + completeRows;
				phArray[key].clinic.forms[key2].formTotalRows = formTotalRows + rowCount;
				phArray[key].clinic.forms[key2].submitCount++;
				phArray[key].clinic.forms[key2].submits = submits;
 
				return true;
			}
		}
	}
	return false;
}

/**
* Posts strigified JSON-object to URL /api/systemSettings/phArray
*/
function postObjects(dataJSON){

	$.ajax({
		contentType: "text/plain",
		type: "POST",
		url: window.location + "/api/systemSettings/phArray", //"http://inf5750-1.uio.no/api/systemSettings/phArray",
		data: JSON.stringify(dataJSON),
		success: function(data){
		}
	});
}

/**
* WARNING
* This method clears all data in /api/systemSettings/phArray if called
* Advised not to call this method
*/
function clearSystemSettings(){
	var clear = [];
	$.ajax({
		contentType: "text/plain",
		type: "POST",
		url: window.location + "/api/systemSettings/phArray", //"http://inf5750-1.uio.no/api/systemSettings/phArray",
		data: JSON.stringify(clear),
		success: function(data){
		}
	});
	console.log("Cleared systemSettings/phArray");
}