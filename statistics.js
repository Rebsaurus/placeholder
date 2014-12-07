var altArray = [];


function getAllData() {

	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
		altArray = data;
		//gar gjennom array[0], som er klinikkobjekter
		for (var key in altArray) {
			//gar gjennom alle klinikkene sine forms
			for (var key2 in altArray[key].clinic.forms) {
				var rCount = altArray[key].clinic.forms[key2].rows;
				var hCount = altArray[key].clinic.forms[key2].coloumns;
				//gar gjennom hver form sine submits
				for (var key3 in altArray[key].clinic.forms[key2]) {
					//gar gjennom alle submitene i submits
					for (var key4 in altArray[key].clinic.forms[key2].submits[key3]) {
						console.log(altArray[key].clinic.forms[key2].submits[key3])
					}
				}

			}
		}
	});
}