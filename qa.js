//API-kall

function showForm(){
	//API-kall
	document.getElementById("findFormDiv").style.display = "block";
	//document.getElementById("facilityName").style.display = "block";
	selectedForm();
}

function showTable(){
	//API-kall
	//document.getElementById("formName").style.display = "block";
	document.getElementById("qaTable").style.display = "block";
	var chosenClinic = document.getElementById("clinicOpts").value;
	document.getElementById("chosenClinic").innerHTML = chosenClinic;

	/*if (window.innerWidth < 481){
		document.getElementById("selector").style.display = "none";
	}*/
}


function getFacilities (form){
	url = window.location + "/api/programs" + form + ".json";



	$.getJSON({

	});
}



function popup(){
	alert("test!");
}