//API-kall

function showForm(){
	//API-kall
	document.getElementById("findFormDiv").style.display = "block";

}

function showTable(){
	//API-kall
	document.getElementById("qaTable").style.display = "block";
	var chosenClinic = document.getElementById("clinicOpts").value;
	document.getElementById("chosenClinic").innerHTML = chosenClinic;

	/*if (window.innerWidth < 481){
		document.getElementById("selector").style.display = "none";
	}*/
}


function popup(){
	alert("test!");
}