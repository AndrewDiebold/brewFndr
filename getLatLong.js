const brewFile = "/brewFndr/data.json";


const init = () => {

    let searchButton = document.querySelector("#searchButton");

    searchButton.addEventListener("click", getLocation);

    console.log(getLatForStreet("1600+Amphitheatre+Parkway,+Mountain+View,+CA"));

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

    let list = [];
    let noDataList = [];
    let zipCodeOnlyList = [];


    readData(brewFile, function(text){
        let data = JSON.parse(text);
        let dataNumber = 0;
        let distanceFrom;
        //let distanceRadius = document.getElementById("distanceRadius").value;

        for(i = 0; i < data.length; i++) {

            let zipCodeParam = data[dataNumber].postal_code;
            let fiveDigitZip = zipCodeParam.substring(5,0);

            if(data[dataNumber].latitude == "" && data[dataNumber].street == "" ) {
                zipCodeOnlyList.push({"id" : data[dataNumber].id,
                        "name" : data[dataNumber].name,
                        "street" : data[dataNumber].street,
                        "city" : data[dataNumber].city,
                        "state" : data[dataNumber].state,
                        "postal_code" : fiveDigitZip,
                        "country" : data[dataNumber].country,
                        "phone" : data[dataNumber].phone,
                        "website_url" : data[dataNumber].website_url,
                        "latitude" : data[dataNumber].latitude,
                        "longitude" : data[dataNumber].longitude,
                        "distanceFrom" : distanceFrom}); 

            } else {
            
                list.push({"id" : data[dataNumber].id,
                    "name" : data[dataNumber].name,
                    "street" : data[dataNumber].street,
                    "city" : data[dataNumber].city,
                    "state" : data[dataNumber].state,
                    "postal_code" : fiveDigitZip,
                    "country" : data[dataNumber].country,
                    "phone" : data[dataNumber].phone,
                    "website_url" : data[dataNumber].website_url,
                    "latitude" : data[dataNumber].latitude,
                    "longitude" : data[dataNumber].longitude,
                    "distanceFrom" : distanceFrom}); 
            }
           // console.log(data[dataNumber]);
            dataNumber++;
        
        }
    //console.log(list);
       
       //console.log(zipCodeOnlyList);
       
       

       


        //distanceFrom = distance(currentLat, currentLong, data[dataNumber].latitude, data[dataNumber].longitude, "M");
            
           // if (distanceFrom < distanceRadius) {}

    });

  

}


/*
const getLatForZip = (zipCode) =>{
    
}

const getLongForZip = (zipCode) =>{
    
}
*/

const getLatForStreet = (street) =>{
    let api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let apiKey = "&key=AIzaSyAYlZVQTYWsCshQnuvYxRCXZMHVeMpNt8I";
  
    let url = api + street + apiKey;
    let xhr = new XMLHttpRequest();
  
    xhr.open("get", url);
  
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        
        let data = JSON.parse(xhr.responseText);
        console.log(data);

        let latitude = data.results[0].geometry.location.lat;
        console.log(latitude);
        

        
      }
    }
    xhr.send(latitude);
    
}

/*
const getLongForStreet = (street) =>{
    
}
*/




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

    const replaceSpaces = (text) => { 
 
        return text.split(" ").join("+"); 
    } 
    



window.onload = init;