
//API-kall

function showSelectFacilityDiv(){
	//API-kall
	document.getElementById("selectFacilityDiv").style.display = "block";
	//document.getElementById("facilityName").style.display = "block";
	selectedForm();
}


function showInfo(){
	//API-kall
	//document.getElementById("formName").style.display = "block";
	document.getElementById("qaTable").style.display = "block";
	//var chosenClinic = document.getElementById("clinicOpts").value;
	//document.getElementById("chosenClinic").innerHTML = chosenClinic;

	/*if (window.innerWidth < 481){
		document.getElementById("selector").style.display = "none";

	}*/

	
	document.getElementById("selector").className = "hideOnPhone";
	document.getElementById("smallScreen").style.display = "block";
	//document.getElementById("smallScreen").className = "showOnPhone";


	var chosenForm = $( "#selectFormDiv option:selected" ).text();
	var chosenClinic = $( "#selectFacilityDiv option:selected" ).text();
	document.getElementById("selectedFormAndClinic").innerHTML = chosenForm + ", " + chosenClinic;

	getTable();
}



function selectedForm(){
	var form = document.getElementById('program').value;
	console.log(form);

	//getFacilities();
}

function selectNew(){
	console.log("inni selectNew");
	document.getElementById("selector").className = "showOnPhone";
}

