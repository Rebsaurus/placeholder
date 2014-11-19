// chrome --disable-web-security
// husk at alle chromeprosesser må avsluttes


function getForms (){
	//url = window.location + "/api/programs.json";
	url2 = "http://inf5750-1.uio.no/api/programs.json";

	$.getJSON(url2, function (data){
		data = data.programs;
		var items = []
console.log(JSON.stringify(data));
		if(data == null){
			document.getElementById("noJSON").style.display = "block";
		} else{

			for(var i = 0; i < data.length; i++) {
				//lagre i vanlig array
				$('#program').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}


			//hver hver change, se etter navn

			

		}
	});
}
/*
function getFacilities (form){
	url = window.location + "/api/programs" + form + ".json";



	$.getJSON({

	});
}

*/