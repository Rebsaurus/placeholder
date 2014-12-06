//var phObject = []; //Allmighty array, should be fetched from a pretty systemSettings URL
var phObject = {};
var phArray = [];
var submits =[];

function makeObject(checkboxArray){
	getObjects();

	var clinic = {};
	var form = {}
	var submit = [];
	var counter = 0;

	submits.push({
		submit: checkboxArray
	});

	clinic = {
		name: facilityName,
		cID: facilityID,
		form: { 
			name: formName,
			fID: formID,
			submits: submits
		}
	}

 	//IF phObject is empty, this adds the first element/clinic
 	//phObject må hentes fra SystemSettings først da... sånn egentlig :D
 	if (phArray.length === 0){
 		phArray.push({
 			clinic:clinic
 		});
 	}else{
 		if (containsClinic() === true){
 			if(containsForm() === true){
				//TODO add data to form and save
				clinic = {
					name: facilityName,
					cID: facilityID,
					form: { 
						name: formName,
						fID: formID,
						submits: submits
					}
				}
				postObjects(phArray);
			}else{
				//TODO add form to clinic and save data
			}
		}else{
			phArray.push({
				clinic:clinic
			});
		}
	}

	console.log(phArray);	
	var myJsonString = JSON.stringify(phArray);
	//console.log(myJsonString);
	postObjects(phArray);
}

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
		if (phArray[key].clinic.form.fID === formID){ ////må muligens bytte ut "form" med noe annet, kan se ut som det er brukt til noe lurt
			return true;
	}
}
return false;
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

function postObjects(dataJSON){
	$.ajax({
		contentType: "text/plain",
		type: "POST",
		url: "http://inf5750-1.uio.no/api/systemSettings/phArray",
		data: JSON.stringify(dataJSON),
		success: function(data){
			console.log("SWEEEEEEEEEEEET");
		}
	});
}

function getObjects(){
	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
		phArray = data;
		console.log(phArray[0].clinic.form.submits.length);
	});
}