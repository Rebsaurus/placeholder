
/**
* Gets programStages' ID for the selected form
* Is called by showInfo in main.js
* Calls createTable
*/
function getProgramStagesID(){
	//url = window.location + "/api/programs/" + formID + ".json";
	var mockURL = "http://inf5750-1.uio.no/api/programs/" + formID + ".json";
	var programStagesID;
	$.getJSON(mockURL, function (data){
		data = data.programStages;
		programStagesID = data[0].id;
		createTable(programStagesID);
	});
}

/**
* Extract the names the names for both the x and y axis from JSON
* Calls clearTable at the begining
* Calls populateTable
* Is called by getProgramStagesID
*/
function createTable(programStagesID){
	clearTable();
	var url = "http://inf5750-1.uio.no/api/programStages/" + programStagesID + ".json";
	//var url = "http://inf5750-1.uio.no/api/programStages/MpL4KvKfdx9.json"
	
	$.getJSON(url, function (data) {
		data = data.programStageDataElements;
		var items = [];
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			for(var i = 0; i < data.length; i++) {
				//saves to array
				items[i] = data[i].dataElement;
			}
		}

		//set containing the coloums. journal, dhis, registry etc.
		var info = {};
		//set containing the rows. age, sex, FUD etc...
		var sjekk = {};


		for (var i = 0; i < items.length; i++) {
			var splittet = items[i].name.split('_');

			info[splittet[0]] = true;
			sjekk[splittet[1]] = true;
		}

		populateTable(info, sjekk);
		tableExists = true;
	});
}

/**
* Creates HTML table and populates 
* Is called by createTable()
* Saves amount of rows and coloums in rowCount and headCount
*/
function populateTable(info, sjekk){

	var antallInfo = 0;
	var antallSjekk = 0;
	var infoArray =[];

	//oppretter tabellen og størrelsen  
	var string = '<form action="" class="qaTabell" id="qaTabell" ><table border="1" style="width:100%">';

	//headeren til tabellen
	string = string + '<tr><th>Quality check</th>';
	var teller = 0;
	for (var tmp in info) {
		string = string + '<th id="th' + antallInfo + '" name="' + tmp + '">' + tmp + '</th>';
		antallInfo = antallInfo + 1;
 		infoArray[teller] = tmp;
 		teller = teller + 1;
	}
	string = string + '</tr>';

	//resten av tabellen
	for (var tmp2 in sjekk) {
		string = string + '<tr id="tr' + antallSjekk + '" name="' + tmp2 + '"><td>' + tmp2 + '</td>';
		var y = 0;
		var i = 0;
		while (i != antallInfo) {
			string = string + '<td><input type="checkbox" class="largerCheckbox" id="' + infoArray[y] + '_' + tmp2 + '" value="Ja"></td>';
			i = i + 1;
			y = y + 1
		}
		
		antallSjekk = antallSjekk + 1;
		string = string + '</tr>';
	}
	string = string + '</table></form>';

	$('#qaTable').append(string);

	rowCount = antallSjekk;
	headerCount = antallInfo;
}

/**
* Clears qaTable, preventing multiple tables
* Is called by createTable 
*/
function clearTable(){
	$("#qaTable").html(""); 
}