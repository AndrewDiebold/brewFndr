


const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLatLong);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

const getLatLong = (position) => {
    let currentLat = position.coords.latitude;
    let currentLong = position.coords.longitude;

    readData("/brewFndr/data.json", function(text){
        var data = JSON.parse(text);

        dataNumber = 0;
        let list = [];

        for(i = 0; i < data.length; i++) {
         
            distanceFrom = distance(currentLat, currentLong, data[dataNumber].latitude, data[dataNumber].longitude, "M");

            if (distanceFrom < 15) {
            
                list.push(data[dataNumber])

                console.log(list[0]);
                console.log("miles = " + distanceFrom);
                

                
                
            }

            dataNumber++;
          }


    });






}


const distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;  
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
        return dist;
        
	}
}



const readData = (file, callback) => {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


