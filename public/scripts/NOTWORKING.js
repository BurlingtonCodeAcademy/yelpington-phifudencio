let id = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

let info = document.getElementById("restaurant-list")

function build(){
    fetch(`./api/${id}.json`).then((data) =>{
        return data.json()
    }).then((obj) =>{
        return obj;
    }).then((restaurant) =>{
        let cordinates = JSON.parse(restaurant.coords)

        let mymap = L.map("map").setView([cordinates[0], cordinates[1]], 14.5)
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(mymap)

        let marker = L.marker([cordinates[0],cordinates[1]]).addTo(mymap);
        marker.bindPopup(`<p class="popup-text" style="margin: .5px; text-align: center; background-color:white;">${restaurant.name}</br>${restaurant.address}</p>`);

        let name = restaurant.name;
        let address = restaurant.address
        let phone = restaurant.phone
        let website = restaurant.website
        let hours = restaurant.hours

      info.innerHTML += `<h3>${name}</h3>`
      info.innerHTML += `<p class="info"> Phone:${phone} <br><br> Address: ${address}<br><br>Hours: ${hours}</p>`
      info.innerHTML += `<a href="${website}" target="blank" class="info">Website</a>`
        
    })
}