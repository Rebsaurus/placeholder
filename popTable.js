//marker ut alt fra <form ... til </form> nede i tabellen i index!!
//erstatt med <script type="text/javascript">getTable()</script>


function getTable(JSONurl){
	//url = JSONurl;
	url = "http://inf5750-1.uio.no/api/programStages/MpL4KvKfdx9.json";
	$.getJSON(url, function (data) {
		data = data.programStageDataElements;
		var items = [];
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			for(var i = 0; i < data.length; i++) {
				//lagre i vanlig array
				items[i] = data[i].dataElement;
			}
		}
		console.log(items);

		//set med ting som journal, dhis, registry osv..
		var info = {};
		//set med sporsmål som age, sex, FUD osv...
		var sjekk = {};

		for (var i = 0; i < items.length; i++) {
			var splittet = items[i].name.split('_');

			info[splittet[0]] = true;
			sjekk[splittet[1]] = true;
		}
		console.log(info);
		console.log(sjekk);

		populateTable(info, sjekk);
	});
}

function populateTable(info, sjekk){

	var antallInfo = 0;
	var antallSjekk = 0;

	//oppretter tabellen og størrelsen
	var string = '<form action="" class="qaTabell" id="qaTabell" ><table border="1" style="width:100%">';

	//headeren til tabellen
	string = string + '<tr><th>Quality check</th>';
	for (var tmp in info) {
		string = string + '<th>' + tmp + '</th>';
		antallInfo = antallInfo + 1;
	}
	string = string + '</tr>';

	//resten av tabellen
	for (var tmp in sjekk) {
		string = string + '<tr id="tr' + antallSjekk + '"><td>' + tmp + '</td>';

		var i = 0;
		while (i != antallInfo) {
			string = string + '<td><input type="checkbox" class="largerCheckbox" id="td' + tmp + i + '" value="Ja"></td>';
			i = i + 1;
		}
		antallSjekk = antallSjekk + 1;
		string = string + '</tr>';
	}
	string = string + '</table></form>';

	//submit knappen
	//string = string + '<br><input type ="submit" class="submitButton" id="tabellSubmit" onClick="" value="Submit">';

	$('#qaTable').append(string);

	console.log(string);
	console.log("hesterbest");
}