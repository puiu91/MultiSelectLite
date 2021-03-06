# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a ```<select>``` element with the added functionality of allowing multiple options to be selected at once from the dropdown.

This is not intended to replace the ```<select>``` in a ```<form>``` but rather used a separate standalone HTML component. However, you could still pass the selected options through a ```<form>``` to the server quite easily. You could do this by hooking into MultiSelectLite using an event listener to retrieve the selected options, then json prepare the array of selected options, before finally adding the json to a hidden input field. See the sample code down below for more details.

**Features**
* multiple options can be selected at once
* dropdown is toggled when user clicks MultiSelectLite element
* dropdown is disabled when user clicks outside the MultiSelectLite element

**Notes and Gotchas**
* the dropdown items list is set to a height of 300px by default, but if you have only a few items to select from, then it is better to set the height to auto - you can make the change in the CSS ```ul#MultiSelectLite-Dropdown ```

## Browser Support
IE9+ and presumably all modern browsers. Not tested on mobile devices.

## Demo

https://cdn.rawgit.com/puiu91/MultiSelectLite/master/index.html

![Image of MultiSelectLite](https://raw.githubusercontent.com/puiu91/MultiSelectLite/master/demo.png)

# Examples

Some example code and public method documentation.

## Basic Include

```html
<!-- Javascript | MultiSelectLite -->
<link rel="stylesheet" href="MultiSelectLite/css/MultiSelectLite.css" /> 
<script src="MultiSelectLite/js/MultiSelectLite.js"></script>
```

## Preset Options on Instantiation

Pass an array of strings to the ```MultiSelectLite.setPresetSelectedOptions()``` function wherein each array value has a matching ```<li>``` element inside of ```<ul id="MultiSelectLite-Dropdown">```

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

## Passing Selected Items to a Form

```javascript
// store reference to hidden input field
var hiddenInputField = document.getElementById('hiddenInputField');

/**
 * When the MultiSelectLite HTML element is clicked, add all the selected options
 * to a hidden input field.
 */
MultiSelectLite.MultiSelect.select.addEventListener('click', function() {

    hiddenInputField.value = JSON.stringify( 
        MultiSelectLite.getSelectedOptionsTextValues() 
    );
    
}, false);
```    

## Default Message

The default message is set to ```Select Options``` but can be changed via ```MultiSelectLite.setDefaultMessage()```.


```javascript
MultiSelectLite.setDefaultMessage('Select filters')
```

# ToDo's
* need to allow for multiple instances of a MultiSelectLite element on a page
* need to reset the default message once a user has selected then deselected options
* need to set height to auto when there are only 5 select options and to a fixed height when there are more than 5 options
