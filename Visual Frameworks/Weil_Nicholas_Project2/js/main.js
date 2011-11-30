// Visual Frameworks (VFW)
// Nick Weil
// Nov.-Dec. 2011
// Project 2

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
    
    // getElementById Function
    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    // Create Select field element and populate it with options
    function makeManufacturers(){
        var formTag = document.getElementsByTagName("form"),  // Form tag is an array.
            selectLi = $('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "manufacturer");
        for(var i=0, j=carMakes.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = carMakes[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    // Find value of selected radio button.
    function getSelectedRadio() {
        var radios = document.forms[0].engine;
        for (var i=0; i < radios.length; i++) {
            if (radios[i].checked) {
                engineValue = radios[i].value;
            }
        }   
    }
    
    function getCheckBoxValue () {
        if ($('synthetic').checked) {
            syntheticValue = true;
        } else {
            syntheticValue = false;
        }
    }
    // Save data to local storage for one item = localStorage.setItem("Key","data");

    function storeData () {
        var id                  = Math.floor(Math.random()*100000001);
        getCheckBoxValue ();
        getSelectedRadio ();
        // Gather up form field values and store them in an object.
        // Oject properties contain array with the form label and input value.
        var item                = {};
            item.year           = ["Car Year:", $('year').value];
            item.manfacturer    = ["Make:", $('manufacturer').value];
            item.model          = ["Model:", $('model').value];
            item.engine         = ["Engine Size:", engineValue];
            item.lastOilDate    = ["Date of last Oil Change:", $('lastOilDate').value];
            item.synthetic      = ["Synthetic Oil:", syntheticValue];
            item.oilDuration    = ["Oil Change Duration (miles):", $('oilDuration').value];
            item.notes          = ["Notes:", $('notes').value];
        // Save data to Local Storage:  Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        
        alert("Car Registered!");
            
    }
    // Variable Defaults
    var carMakes = ["--Choose a Car---", "Acura", "BMW","Chevrolet", "Dodge", "Ford", "Saturn"],
        engineValue,
        syntheticValue = false;
    makeManufacturers();
    
    
    // Set Link & Submit Click Events
/*    var displayCar = $('displayCar');
    displayCar.addEventListener("click", getData);
    var clearCar = $('clear');
    clearCar.addEventListener("click", clearLocal); */
    var save = $('submit');
    save.addEventListener("click", storeData);    

});