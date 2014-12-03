function makeObject(checkboxArray){
	var mockURL =  "http://inf5750-1.uio.no/api/systemSettings/phArray";


	$.getJSON(mockURL, function(data){
		
		if(data == null){
			console.log("SWEETBEANS");
			
			//SKRIV SOM JSON-OBJECT I STRINGFORM
			var formPerClinic = [];

			for(var key in phArray){
				if(key == facilityID){
					phArray.push({
						facility: facilityID,
						form: formPerClinic
					});
				}
			}

			var phArray = []; //Vårt favorittarray -> THE one and only true JSON-object
			for(var i = 0; i < phArray.length; i){
				phArray.push({
					facility: facilityID,
					form: phArray.push({
						formID
					});
				});
			}

			for(var key in phArray){
				console.log(key);
			}
						
		} else {
			//ABUSE DAT ARRAY
			console.log("SOURBEANS");
		}
	});
}