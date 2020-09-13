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

                if (data[dataNumber].latitude == "") {
                    console.log("no Latitude");
                    let zipCode = data[dataNumber].postal_code;
                    let fiveDigitZip = zipCode.substring(5,0);
                    console.log(fiveDigitZip);

                    

                }
                
                
                
                
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
            let breweryName_li = document.createElement("li");
            let cityState_li = document.createElement("li");
            
            let websiteLink_li = document.createElement("li");
            let distance_li = document.createElement("li");

            let websiteLink = document.createElement("a");
            websiteLink.href = (list[i].website_url)
            websiteLink.target = "_blank"

            let miles = document.createTextNode(" miles");
 
            let name = document.createTextNode(list[i].name);
            let city = document.createTextNode(list[i].city + ",");
            let state = document.createTextNode(" " + list[i].state);
            let website_url = document.createTextNode(list[i].website_url);
            let distanceFrom = document.createTextNode(Math.round(list[i].distanceFrom*100)/100);
            

            ul.appendChild(breweryName_li);
            ul.appendChild(cityState_li);
            
            ul.appendChild(websiteLink_li);
            ul.appendChild(distance_li);

            websiteLink_li.appendChild(websiteLink);


            breweryName_li.appendChild(name);
            cityState_li.appendChild(city);
            cityState_li.appendChild(state);
            websiteLink.appendChild(website_url);
            distance_li.appendChild(distanceFrom);
            distance_li.appendChild(miles);


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