# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a select element but allows for multiple options to be selected at once from the dropdown.

Ideally this is not intended to replace the ```<select>``` used in a ```<form>``` HTML element but as a standalone HTML component. If you wanted to pass the selected values
from MultiSelectLite to a form, you could hook into MultiSelectLite, json prepare the array of list items selected, and add them to a hidden input field. See the example below.

**Features**
* multiple options can be selected at once
* dropdown is disabled when user clicks outside
* dropdown is toggled when user clicks MultiSelectLite element 

## Browser Support
IE9+ and all modern browsers. Not tested on mobile devices.

## Demo ##

https://cdn.rawgit.com/puiu91/MultiSelectLite/master/index.html

![Image of MultiSelectLite](https://raw.githubusercontent.com/puiu91/MultiSelectLite/master/demo.png)

## Preset Options on Instantiation

Pass an array of strings. Each array value is expected to have a matching ```<li>``` element inside your HTML wherever you declare ```<ul id="MultiSelectLite-Dropdown">```

**HTML**
```html
<div id="MultiSelectLite">
    <span id="MultiSelectLite-Message">Select options</span>
    <ul id="MultiSelectLite-Dropdown">
        <li>Car</li>
        <li>Boat</li>
        <li>Train</li>
        <li>Airplane</li>
    </ul>
</div>
```

**Javascript**
```javascript
MultiSelectLite.setPresetSelectedOptions([
    'Car',
    'Train',
]);
```

## Passing Selected Items to a Form ##

```javascript
// store reference to hidden input field
var hiddenInputField = document.getElementById('hiddenInputField');

/**
 * Add custom click event handler for when a dropdown option is clicked whose function
 * is to add selected options from MultiSelectLite to a hidden input field.
 */
MultiSelectLite.MultiSelect.select.addEventListener('click', function() {

    hiddenInputField.value = JSON.stringify( 
        MultiSelectLite.getSelectedOptionsTextValues() 
    );
    
}, false);
```    

## Default Message

The default message is set to ```Select Options``` but can be changed to something else.


```javascript
MultiSelectLite.setDefaultMessage('Select filters')
```

**Notes**


## ToDo's
* need to allow for multiple instances of a MultiSelectLite element on a page
* need to reset the default message once a user has selected then deselected options