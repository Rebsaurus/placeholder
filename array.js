//var phObject = []; //Allmighty array, should be fetched from a pretty systemSettings URL
var phObject = {};
var phArray = [];
var submits = [];
var forms = [];
var formTotalRows;
var formCompleteRows;

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

	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
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
				console.log("CONTEINSTRUU"); 
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
	console.log("POST OBJECTS")
	$.ajax({
		contentType: "text/plain",
		type: "POST",
		url: "http://inf5750-1.uio.no/api/systemSettings/phArray",
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
		url: "http://inf5750-1.uio.no/api/systemSettings/phArray",
		data: JSON.stringify(clear),
		success: function(data){
		}
	});
	console.log("Cleared systemSettings/phArray");
}