// Visual Frameworks (VFW)
// Nick Weil
// Nov.-Dec. 2011
// Project 4
// December 15, 2011

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
    
    function toggleControls(n) {
        switch(n) {
            case "on":
                $('carRegister').style.display = "none";
                $('clearCar').style.display = "inline";
                $('displayCar').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('carRegister').style.display = "block";
                $('clearCar').style.display = "inline";
                $('displayCar').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";           
                break;
            default:
        }
        return false;
    }
    // Save data to local storage for one item = localStorage.setItem("Key","data");

    function storeData (key) {
        //  If there is no key, this is a brand new item and a key needs to be assigned.
        if (!key) {
            var id                  = Math.floor(Math.random()*100000001);
        } else {
            // A key already exists and is being passed through from the exisitng key.
            // From the editSubmit event handler.
            id = key;
        }
        
        getCheckBoxValue ();
        getSelectedRadio ();
        // Gather up form field values and store them in an object.
        // Oject properties contain array with the form label and input value.
        var item                = {};
            item.year           = ["Car Year:", $('year').value];
            item.manufacturer    = ["Make:", $('manufacturer').value];
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

    function getData () {
        toggleControls ("on");
        if(localStorage.length === 0) {
            autoFillData();
            alert("There is no data in Local Storage so default data was added.");
            
        }
        // Write Data from Local Storage to the Browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i= 0, len=localStorage.length; i < len; i++) {
            var makeLi = document.createElement('li');
            var linksLi = document.createElement ('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // Converting string from Local Storage value back to object using JSON.parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            makeLi.setAttribute('id','vehicleList');
            getImage(obj.manufacturer[1], makeSubList);
            for(var n in obj) {
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);  //  Create Edt/Delete buttons for each item in local storage.
        }
    }
    
    // Get the Image to represent the proper Manfuacturer.
    function getImage(manName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src","images/" + manName + ".png");
        imageLi.appendChild(newImg);
    }
    // JSON Object Which will auto populate local storage.
    function autoFillData() {
        alert ("Filling JSON Data NOW!");
        var json = {
            "vehicle1": {
                "year": ["Car Year:", 1970],
                "manufacturer": ["Manufacturer:", "Chevrolet"],
                "model": ["Model:", "Cavalier"],
                "engine": ["Engine:", "6 cyl."],
                "lastOilDate": ["Date of Last Oil Change:", "2008-11-29"],
                "synthetic": ["Synthetic", "checked"],
                "oilDuration": ["Desired Oil Change Duration:", 5000],
                "notes": ["Notes:", "Testing JSON"]
            },
            "vehicle2": {
                "year": ["Car Year:", 1978],
                "manufacturer": ["Manufacturer:", "Chevrolet"],
                "model": ["Model:", "Malibu"],
                "engine": ["Engine:", "8 cyl."],
                "lastOilDate": ["Date of Last Oil Change:", "2005-06-29"],
                "synthetic": ["Synthetic", "checked"],
                "oilDuration": ["Desired Oil Change Duration:", 5000],
                "notes": ["Notes:", "First Car"]
            },
            "vehicle3": {
                "year": ["Car Year:", 2002],
                "manufacturer": ["Manufacturer:", "Chevrolet"],
                "model": ["Model:", "Silverado"],
                "engine": ["Engine:", "8 cyl."],
                "lastOilDate": ["Date of Last Oil Change:", "2011-11-15"],
                "synthetic": ["Synthetic", "checked"],
                "oilDuration": ["Desired Oil Change Duration:", 5000],
                "notes": ["Notes:", "Truck"]
            },
            "vehicle4": {
                "year": ["Car Year:", 2002],
                "manufacturer": ["Manufacturer:", "BMW"],
                "model": ["Model:", "M3"],
                "engine": ["Engine:", "8 cyl."],
                "lastOilDate": ["Date of Last Oil Change:", "2011-11-15"],
                "synthetic": ["Synthetic", "checked"],
                "oilDuration": ["Desired Oil Change Duration:", 6000],
                "notes": ["Notes:", "Beemer"]
            }
        }
        //  Store JSON OBject into Local Storage
        for (var n in json) {
            var id                  = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    // Make Item Links
   // Create edit/delete links for each Local Storage Item.
    function makeItemLinks(key, linksLi) {
        // add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Vehicle";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        // add line break
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Vehicle";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);

    }
    
    // Edit Item Function
    function editItem () {
        //Grab the data of the edited item from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        // Show the form
        toggleControls("off");
        
        // populate the form fields with the current Local Storage values.
        $('year').value = item.year[1];
        $('manufacturer').value = item.manufacturer[1];
        $('model').value = item.model[1];
        var radios = document.forms[0].engine;
        for (var i=0; i < radios.length; i++) {
            if (radios[i].value == item.engine[1]) {
                radios[i].setAttribute("checked", "checked");
            }
        }
        $('lastOilDate').value = item.lastOilDate[1];
        if (item.synthetic[1] === true) {
            $('synthetic').setAttribute("checked", "checked");            
        }
        
        $('oilDuration').value = item.oilDuration[1];
        $('notes').value = item.notes[1];
        
        // Removing the initial Listener from the input 'register vehicle' button.
        save.removeEventListener("click", storeData);
        // Change Submit Button Value to Edit Button.
        $('submit').value = "Edit Vehicle";
        var editSubmit = $('submit');
        //  Save the key value established in this function as a property of the editSubmit event
        //  so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    // Delete Item function
    
    function deleteItem () {
        var ask = confirm ("Are you sure you want to REMOVE this vehicle?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("The vehicle was REMOVED!");
            window.location.reload();
        } else {
            alert("Item was NOT REMOVED!");
        }
    }
    function clearLocal (){
        if (localStorage.length === 0) {
            alert("There is no data to clear!");
        } else {
            localStorage.clear();
            alert("All vehicles have been removed!");
            window.location.reload();
            return false;
        } 
    }
    
    function validate (e) {
        // Define the elements we want to check.
        var getYear = $('year');
        var getManufacturer = $('manufacturer');
        var getLastOilDate = $('lastOilDate');
        
        // Reset Error Mesages.
        
        errMsg.innerHTML = "";
        getYear.style.border = "1px solid black";
        getManufacturer.style.border = "1px solid black";
        getLastOilDate.style.border = "1px solid black";

        
        // Get error messages.
        var messageAry = [];
        // Year Validation.
        if(getYear.value === "" || getYear.value < 1955 || getYear.value > 2012) {
            var yearError = "Please input a valid year (1955 - 2012)";
            getYear.style.border = "1.5px solid red";
            messageAry.push(yearError);
        }
        //  Manufacturer validation.
        if(getManufacturer.value === "--Choose a Car--") {
            var manufacturerError = "Please select a valid Manufacturer from the list.";
            getManufacturer.style.border = "1.5px solid red";
            messageAry.push(manufacturerError);
        }
        // Date validation.
        if(getLastOilDate.value === "") {
            var oilDateError = "Please input a date for your last oil change.";
            getLastOilDate.style.border = "1.5px solid red";
            messageAry.push(oilDateError);
        }
        // If there are errors, display them on the screen.
        if (messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i<j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        } else {
            // If everything is good, save Data. Send the key value (comes from editData Function).
            // This key value was passed through editSubmit eventListener as a property.
            storeData(this.key);
        }
    }
    

    // Variable Defaults
    var carMakes = ["--Choose a Car--", "Acura", "BMW","Chevrolet", "Dodge", "Ford"],
        engineValue,
        syntheticValue = false,
        errMsg = $('errors');
    makeManufacturers();
    
    
    // Set Link & Submit Click Events
    var displayCar = $('displayCar');
    displayCar.addEventListener("click", getData);
    var clearCar = $('clearCar');
    clearCar.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", validate);    

});