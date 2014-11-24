function showTable(value){
	//API-kall
	//document.getElementById("formName").style.display = "block";
	document.getElementById("qaTable").style.display = "block";
	//var chosenClinic = document.getElementById("clinicOpts").value;
	//document.getElementById("chosenClinic").innerHTML = chosenClinic;

	/*if (window.innerWidth < 481){
		document.getElementById("selector").style.display = "none";

	}*/
	console.log(value);
	
	document.getElementById("selector").className = "hideOnPhone";

	var chosenForm = $( "#selectFormDiv option:selected" ).text();
	var chosenClinic = $( "#selectFacilityDiv option:selected" ).text();
	document.getElementById("selectedFormAndClinic").innerHTML = chosenForm + ", " + chosenClinic;
}

function showFacilities(){
	document.getElementById("selectFacilityDiv").style.display = "block";
	getFacilities();
}
function getFacilities (form){
	//url = window.location + "/api/programs" + form + ".json";
	mockURL = "http://inf5750-1.uio.no/api/programs/RvSLGqbM5Ft.json";
	$.getJSON(mockURL, function (data){
		data = data.organisationUnits;
		//console.log(JSON.stringify(data));
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{

			for(var i = 0; i < data.length; i++) {
				//lagre i vanlig array
				$('#facility').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}
		}
	});
}

function selectNew(){
	console.log("inni selectNew");
	document.getElementById("selector").className = "showOnPhone";
}

function test(){
	alert("test");
}



