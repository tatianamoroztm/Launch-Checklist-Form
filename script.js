// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      }
      if (!isNaN(pilotNameInput.value)|| !isNaN(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value )){
         alert("Make sure to enter valid information for each field!");
         // stop the form submission
         event.preventDefault(); 
      }
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch.`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch.`;
      if (fuelLevelInput.value < 10000){
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = "Fuel level is too low for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
      if (cargoMassInput.value > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = "Cargo mass is too high for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
      if (fuelLevelInput.value>= 10000 && cargoMassInput.value<=10000){
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch"; 
         document.getElementById("launchStatus").style.color = "green"; 
         let index = Math.floor(Math.random()*6);
         fetch("https://handlers.education.launchcode.org/static/planets.json")
         .then(response=>response.json())
         .then(data=>{
            document.getElementById("missionTarget").innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${data[index].name}</li>
               <li>Diameter: ${data[index].diameter}</li>
               <li>Star: ${data[index].star}</li>
               <li>Distance from Earth: ${data[index].distance}</li>
               <li>Number of Moons: ${data[index].moons}</li>
            </ol>
            <img src="${data[index].image}">`;
         });
      }
      event.preventDefault();
   });

});