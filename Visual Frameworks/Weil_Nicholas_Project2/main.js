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
    
    
    // Variable Defaults
    var carMakes = ["--Choose a Car---", "Chevrolet", "Dodge", "Ford"];
    makeManufacturers();
    
    // Set Link & Submit Click Events
    var displayCar = $('displayCar');
    displayCar.addEventListener("click", getData);
    var clearCar = $('clear');
    clearCar.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", storeData);
    

});