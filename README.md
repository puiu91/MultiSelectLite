# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a ```<select>``` element with the added functionality of allowing multiple options to be selected at once from the dropdown.

This is not intended to replace the ```<select>``` used in a ```<form>``` but as a separate standalone HTML component. However, you could still pass the selected options through a ```form``` to the server quite easily. You could do this by hooking into MultiSelectLite using an event listener to retrieve the selected options, then json prepare the array of list items selected, 
and then finally add them to a hidden input field. See the example further below for sample code.

**Features**
* multiple options can be selected at once
* dropdown is disabled when user clicks outside the MultiSelectLite element
* dropdown is toggled when user clicks MultiSelectLite element

**Notes and Gotchas**
* the dropdown items list is set to a height of 300px by default, but if you have only a few items to select from, then it is better to set the height to auto - you can make the change in the CSS ```ul#MultiSelectLite-Dropdown ```

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

## Passing Selected Items to a Form  ##

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

The default message is set to ```Select Options``` but can be changed to something else:


```javascript
MultiSelectLite.setDefaultMessage('Select filters')
```

**Notes**


## ToDo's
* need to allow for multiple instances of a MultiSelectLite element on a page
* need to reset the default message once a user has selected then deselected options
* need to set height to auto when there are only 5 select options and to a fixed height when there are more than 5 options