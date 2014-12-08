/**
* METHODS NOT IN USE
*/


/**
* Sorts said array
*

sorted = facilities.sort(function(a,b){
	return a.name.localeCompare(b.name);
});

	* Appends and print to <select>
	*
    for(var key in facilities){
		$('#facility').append('<option value="' + facilities[key].id + '">' + facilities[key].name +  '</option>');
	}

<!--
    <div id="selectFacilityDiv" style="display:none">
       <br><br><br>
       <select id="facility" onChange="setFacilityID(value); showInfo()"> </select>
    </div>
-->
*/

/*function containsClinicObject(){
	for (var key in phObject) {
		if (!phObject.hasOwnProperty(key)) continue;
		if (phObject[key] === facilityID) {
			return true;
		}
	}
	return false;
}

function containsFormObject(){
	for (var key in phObject) {
		if (!phObject.hasOwnProperty(key)) continue;
		if (phObject[key] === formID) {
			return true;
		}
	}
	return false;
}*/

/*
function containsClinic() {
	for (var key in phArray){
		if (phArray[key].clinic.cID === facilityID) {
			return true;
		}
	}
	return false;
}
*/