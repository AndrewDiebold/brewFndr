


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
        
        let distanceFrom;

        for(i = 0; i < data.length; i++) {
         
            distanceFrom = distance(currentLat, currentLong, data[dataNumber].latitude, data[dataNumber].longitude, "M");
            
            if (distanceFrom < 10) {
                
                list.push({"id" : data[dataNumber].id,
                    "name" : data[dataNumber].name,
                    "street" : data[dataNumber].street,
                    "city" : data[dataNumber].city,
                    "state" : data[dataNumber].state,
                    "postal_code" : data[dataNumber].postal_code,
                    "country" : data[dataNumber].country,
                    "phone" : data[dataNumber].phone,
                    "website_url" : data[dataNumber].website_url,
                    "latitude" : data[dataNumber].latitude,
                    "longitude" : data[dataNumber].longitude,
                    "distanceFrom" : distanceFrom});
                
                
                //console.log(data[dataNumber]);
                
                //console.log("miles = " + distanceFrom + " " + data[dataNumber].id);
            }
            
            dataNumber++;
          }
          //console.log(list);
          console.log(list.sort(GetSortOrder("distanceFrom")));
          
          
          
          
         
          

    });






}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
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


