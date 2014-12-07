/**
* Calculates the consitency in data of each clinic for each form
* Creates and populates all tables to div #statistics in statistics.html
* Is shown in statistics.htms
* Called by body onLoad in statistics.html
*/
function percentCalc() {
	mockURL = "http://inf5750-1.uio.no/api/systemSettings/phArray";

	$.getJSON(mockURL, function(data){
		var altArray = data;
		// iterates through array[0] which is clinic-objects
		for (var key in altArray) {
			string = '<table border="1" style="width:60%"><tr><tr><th colspan="3">' + altArray[key].clinic.name + '</tr></thead><tbody>';

			string = string + '<tr style="background-color:#7aa6d3"><td style="width:50%" class="alignleft">Form</td><td>Number of submits</td><td>Data Consistency</td></tr>';
			//gar gjennom alle klinikkene sine forms
			string = string + '<tr style="background-color:#7aa6d3"><td style="width:50%">Form</td><td>Number of submits</td><td>Data Consistency</td></tr>';
			// iterates through each clinic's form

			for (var key2 in altArray[key].clinic.forms) {
				
				var totalR = altArray[key].clinic.forms[key2].formTotalRows;
				var completeR = altArray[key].clinic.forms[key2].formCompleteRows;
				
				string = string + '<tr><td class="alignleft">' + altArray[key].clinic.forms[key2].name + '</td><td>' + altArray[key].clinic.forms[key2].submitCount + '</td><td>' + (completeR/totalR*100).toFixed(2) + '%</td></tr>';
				var rCount = altArray[key].clinic.forms[key2].rows;
				var hCount = altArray[key].clinic.forms[key2].coloumns;
				// iterates through each form's submits
				for (var key3 in altArray[key].clinic.forms[key2]) {
					//iterates all submits' submits
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
