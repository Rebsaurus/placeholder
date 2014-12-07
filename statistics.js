function percentCalc() {
	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
		var altArray = data;
		//gar gjennom array[0], som er klinikkobjekter
		for (var key in altArray) {
			string = '<table border="1" style="width:60%"><tr><tr><th colspan="2">' + altArray[key].clinic.name + '</tr></thead><tbody>';

			string = string + '<tr><td>Form</td><td>Data Completed</td></tr>';
			//gar gjennom alle klinikkene sine forms
			for (var key2 in altArray[key].clinic.forms) {
				
				var totalR = altArray[key].clinic.forms[key2].formTotalRows;
				var completeR = altArray[key].clinic.forms[key2].formCompleteRows;
				
				string = string + '<tr><td>' + altArray[key].clinic.forms[key2].name + '</td><td>' + (completeR/totalR*100).toFixed(2) + '%</td></tr>';
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
			string = string + '</tbody></table>';
			$('#statisticsTable').append(string);
			string = '';
		}
	});
}
