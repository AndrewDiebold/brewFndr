const init = () => {

    let searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", clearDiv);
    searchButton.addEventListener("click", getLocation);

}

const clearDiv = () => {
    let div = document.getElementById("results");
    div.innerHTML = "";
}

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
        let data = JSON.parse(text);
        let dataNumber = 0;
        let list = [];
        let distanceFrom;

        let distanceRadius = document.getElementById("distanceRadius").value;

        for(i = 0; i < data.length; i++) {
         
            distanceFrom = distance(currentLat, currentLong, data[dataNumber].latitude, data[dataNumber].longitude, "M");
            
            if (distanceFrom < distanceRadius) {
                
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
            }
            dataNumber++;
        }
        console.log(list.sort(GetSortOrder("distanceFrom")));

        
        
        for(let i = 0; i < list.length; i++) {
           
            
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            let li1 = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            let name = document.createTextNode(list[i].name);
            let city = document.createTextNode(list[i].city);
            let website_url = document.createTextNode("<a herf=" + list[i].website_url + ">" + list[i].website_url + "</a>");
            let distanceFrom = document.createTextNode(list[i].distanceFrom);

            
            ul.appendChild(li);
            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);
            li.appendChild(name);
            li1.appendChild(city);
            li2.appendChild(website_url);
            li3.appendChild(distanceFrom);


            document.getElementById("results").appendChild(ul);
            
         };
    });
}

const GetSortOrder = (prop) => {    
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


  window.onload = init;