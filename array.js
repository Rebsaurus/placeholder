//var phObject = []; //Allmighty array, should be fetched from a pretty systemSettings URL
var phObject = {};
var phArray = [];

function makeObject(checkboxArray){
	var mockURL =  "http://inf5750-1.uio.no/api/systemSettings/phArray";


	$.getJSON(mockURL, function(data){
		
		if(data == null){
			//console.log("CHILIBEANS");
			
			//SKRIV SOM JSON-OBJECT I STRINGFORM
			var formPerClinic = [];

			for(var key in phArray){
				if(key == facilityID){
					phArray.push({
						facility: facilityID,
						form: formPerClinic
					});
				}
			}

			var phArray = []; //Vårt favorittarray -> THE one and only true JSON-object
			/*for(var i = 0; i < phArray.length; i){
				phArray.push({
					facility: facilityID,
					form: phArray.push({
						formID
					});
				});
}*/

for(var key in phArray){
	console.log(key);
}

} else {
			//ABUSE DAT ARRAY
			console.log("SOURBEANS");
		}
	});

//the larsikls maggix code!
// må finne ut av hvordan vi kan legge til flere submit arrays i en form{}
var clinic = {};
var form = {}
var submits =[];

clinic = {
	name: facilityName,
	cID: facilityID,
	form: { 
		name: formName,
		fID: formID,
		submits: checkboxArray
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
			}else{
				//TODO add form to clinic and save data
			}
		}else{
			phArray.push({
				clinic:clinic
			});
		}
		//phObject.clinic = $.extend({}, phObject.clinic, clinic)
	}
	//}

	console.log(phArray);	
	var myJsonString = JSON.stringify(phArray);
	console.log(myJsonString);
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