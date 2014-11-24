//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//KAST KAST KAST KAST, IKKE I BRUK
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/**
*Shows the select facility selector
*/
function showSelectFacilityDiv(){
	document.getElementById("selectFacilityDiv").style.display = "block";
}

/**
*Displays table when form and facility have been selected
*/
function showInfo(){
	document.getElementById("qaTable").style.display = "block";
	document.getElementById("selector").className = "hideOnPhone";
	document.getElementById("smallScreen").style.display = "block";

	var chosenForm = $( "#selectFormDiv option:selected" ).text();
	var chosenClinic = $( "#selectFacilityDiv option:selected" ).text();
	document.getElementById("selectedFormAndClinic").innerHTML = chosenForm + ", " + chosenClinic;
	getTable();
}



