// chrome --disable-web-security
// husk at alle chromeprosesser må avsluttes  

/**
* Gets a JSON object containing all forms 
* Sorts them alphabetically
* Puts them in a HTML select located in index
*/
$(function getForms (){
	//url = window.location + "/api/programs.json;
	url2 = "http://inf5750-1.uio.no/api/programs.json";

	$.getJSON(url2, function (data){
		data = data.programs;

		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{
			var forms = [];
			for(var i = 0; i < data.length; i++) {
				if(i == 0){
					forms.push({
						id: "index",
						name: " <---- Choose a form ---->"
					});
				} else {
					forms.push({
						id: data[i].id,
						name: data[i].name
					});					
				}
			}
			
			var sorted = forms.sort(function(a,b){
				//console.log(forms[key]);
				return a.name.localeCompare(b.name);
			});


			for(var key in forms){
				$('#program').append('<option value="' + forms[key].id + '">' + forms[key].name +  '</option>');
			}
		}
	});
});

/**
* Sets a JSON object containing all facilities that have access to the chosen
* sorts them alphabetically
* Puts them in a HTML select located in index
*/
function getFacilities (){

	////document.getElementById("selectFacilityDiv").style.display = "block";
	//console.log(formID);
	//url = window.location + "/api/programs/" + formID + ".json";
	mockURL = "http://inf5750-1.uio.no/api/programs/" + formID + ".json";
	$.getJSON(mockURL, function (data){
		data = data.organisationUnits;
		//console.log(JSON.stringify(data));
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{

			/**
			* Places all clinics in an associative array
			*/
			facilities = [];
			for(var i = 0; i < data.length; i++) {
				/*if(i == 0){
					facilities.push({
						id: "index",
						name: " <---- Choose a facility ---->"
					});
				} else {*/
					facilities.push({
						id: data[i].id,
						name: data[i].name
					});					
				//}
			}
			
			/**
			* Sorts said array
			*/ 
			sorted = facilities.sort(function(a,b){
				return a.name.localeCompare(b.name);
			});
			for (var i in sorted){
				allClinicNames[i] = sorted[i].name;
			}
			console.log("ready");
			document.getElementById("selectFacilityDiv").style.display = "block";

			/**
			* Appends and print to <select>
			*
			for(var key in facilities){
				$('#facility').append('<option value="' + facilities[key].id + '">' + facilities[key].name +  '</option>');
			}
			*/
			
		}
	});
}




