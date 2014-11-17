/*var district = ["Aclinic" "Bclinic", "Cclinic"];*/

function showClinic(){
	var selectedDistrict = document.getElementById("districtSelect").value;
	if (selectedDistrict > 0){
		document.getElementById("clinicSelect").style.display = "block";
	}
}

function showTable(){
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