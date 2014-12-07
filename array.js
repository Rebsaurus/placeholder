//var phObject = []; //Allmighty array, should be fetched from a pretty systemSettings URL
var phObject = {};
var phArray = [];
var submits = [];
var forms = [];
var formTotalRows;
var formCompleteRows;

function makeObject(checkboxArray){
	//clearSystemSettings(); return;
	console.log("MAKE OBJECT");
	formTotalRows = 0;
	formCompleteRows = 0;
	$.when(getObjects())
	.done(function() {
		console.log( 'I fire once completed!' );
		makeObjectA(checkboxArray);
	})
	.fail(function() {
		console.log( 'I fire if request failed.' );
	});
}

function makeObjectA(checkboxArray){
	var clinic = {};
	var form = {}
	var submit = [];
	var counter = 0;
	//formTotalRows = formTotalRows + rowCount;
	console.log(formTotalRows + "ds");
	//formCompleteRows = formCompleteRows + completeRows;


	submits.push({
		completeRows: completeRows,
		totalRows: rowCount,
		submit: checkboxArray
	});

/*form = {
	name: formName,
	fID: formID,
	submits: submits
}*/




/*clinic = {
	name: facilityName,
	cID: facilityID,
	forms:{ 
		name: formName,
		fID: formID,
		submits: submits
	}
}*/

 	//IF phObject is empty, this adds the first element/clinic
 	/*if (phArray.length === 0){
 		console.log("ARRAYLENGTH " + phArray.length)
 		console.log("TOM" + phArray);
 		phArray.push({
 			clinic:clinic
 		});
 		postObjects(phArray);
 		console.log("ARRAYLENGTH " + phArray.length)
 	}else{*/
 		/*if (containsClinic() === true){
 			if(containsForm() === true){
				postObjects(phArray);
				return;
			}
			if(!containsForm() || !containsClinic()){
				forms.push({
						name: formName,
						fID: formID,
						submits: submits
					});
				phArray.clinic.forms = forms;
				postObjects(phArray);
			}
		}else{
			phArray.push({
				clinic:clinic
			});
		}
		postObjects(phArray);*/
	//}

	if(containsForm() === true){
		postObjects(phArray);
	}else{
		console.log("FORMPUSH");
		console.log(submits);
		console.log(forms);

		submits = []
		submits.push({
			completeRows: completeRows,
			totalRows: rowCount,
			submit: checkboxArray
		});

		for(key in phArray){
			console.log(phArray[key].clinic.cID);
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
		
		console.log("JALLABEANS");
		forms = [];
		//submits.submit = checkboxArray;
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
		console.log(clinic.forms + " noe mongo");
		
		phArray.push({
			clinic: clinic
		});

		//phArray.clinic.forms = forms;
		postObjects(phArray);
	}
}
//Not in use atm
function containsClinic() {
	for (var key in phArray){
		if (phArray[key].clinic.cID === facilityID) {
			return true;
		}
	}
	return false;
}

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

function getObjects(){
	console.log("GET OBJECTS");

	var dfd = new jQuery.Deferred();

	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
		phArray = data;
		console.log("PH: " +phArray.length);
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
		dfd.resolve("YAY");
	});
	return dfd.promise();
}

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

/*function containsClinicObject(){
	for (var key in phObject) {
		if (!phObject.hasOwnProperty(key)) continue;
		if (phObject[key] === facilityID) {
			return true;
		}
	}
	return false;
}

function containsFormObject(){
	for (var key in phObject) {
		if (!phObject.hasOwnProperty(key)) continue;
		if (phObject[key] === formID) {
			return true;
		}
	}
	return false;
}*/