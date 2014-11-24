// chrome --disable-web-security
// husk at alle chromeprosesser må avsluttes

/**
*Gets a json object containing all forms and puts them in a html select
*/
$(function getForms (){
	//url = window.location + "/api/programs.json;
	url2 = "http://inf5750-1.uio.no/api/programs.json";

	$.getJSON(url2, function (data){
		data = data.programs;
		//console.log(JSON.stringify(data));
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			
			for(var i = 0; i < data.length; i++) {
				//lagre i vanlig array
				$('#program').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}
		}
	});
});

/**
*Gets a json object containing all facilities that have access to the chosen form and puts them in a html select
*/
function getFacilities (){
	document.getElementById("selectFacilityDiv").style.display = "block";
	//console.log(formID);
	//url = window.location + "/api/programs/" + formID + ".json";
	mockURL = "http://inf5750-1.uio.no/api/programs/" + formID + ".json";
	$.getJSON(mockURL, function (data){
		data = data.organisationUnits;
		//console.log(JSON.stringify(data));
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			for(var i = 0; i < data.length; i++) {
				$('#facility').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}
		}
	});
}





