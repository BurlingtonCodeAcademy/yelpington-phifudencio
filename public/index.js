//variable declaration
let markers = {}
let list = document.getElementById("restaurant_list")

//build map with burlington in the center
let mymap = L.map("map").setView([44.478166, -73.2142442], 14);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap)


//function that places markes on map for each restaurant in API, and builds the list
function map() {
	fetch("./api/restaurants.json")
	  .then((places) => {
		return places.json();
	  })
	  .then((placesArray) => {
		     //Builds restaurant list, and markes for JSON
		placesArray.forEach((restaurant) => {
			list.innerHTML += `<p id="${restaurant.id}" class="list-items">${restaurant.name}</p><div class ="hide-list"><p>${restaurant.category}</p><p>Price: ${restaurant.price}</p><p>Phone: ${restaurant.phone}</p><a class="link" href= "rest-page/${restaurant.id}">Learn More!</a></div>`;

			let cordinates = JSON.parse(restaurant.coords);
			console.log(cordinates)
		let marker = L.marker([cordinates[0], (cordinates[1])]).addTo(mymap);
			markers[restaurant.id] = marker;
			marker.bindPopup(`<p class= "popup" style="margin: .5px; text-align: center;"> ${restaurant.name}</br>${restaurant.address}</p>`)

		});
		return placesArray;
	  }).then(() =>{
//goes through all the list items and add a event listener
		let showInfo = Array.from(document.getElementsByClassName("list-items"))
		showInfo.forEach((restaurant) => {
			restaurant.addEventListener('click', () => {
				//hides all dropdowns 
				let info = Array.from(document.getElementsByClassName("show-list"))
				info.forEach((div) => {div.className = "hide-list"})
                //triggers dropdown wen clicked
				let id = event.target.id;
				let insideInfo = document.getElementById(id).nextElementSibling
				insideInfo.className = "show-list"
				insideInfo.scrollIntoView({behavior: "smooth", block: "center"})
                //fires a click on the marker of the popup
				markers[id].fire("click");

			})
		})

	  })
  }
  