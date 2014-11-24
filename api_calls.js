// chrome --disable-web-security
// husk at alle chromeprosesser må avsluttes


function getForms (){
	//url = window.location + "/api/programs.json";
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

			var programs = {}

			
			for(var i = 0; i < data.length; i++){
				programs[data[i].name] = data[i].id;
			}

			//hente html-objektets value


			//etter hver change, se etter navn (filtersak)

			//bestemme hvilke klinikker som kan ha denne formen
			
			getFacilities();

		}
	});
}

function getFacilities (formID){
	console.log("HEI");
	//url = window.location + "/api/programs" + formID + ".json";
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





