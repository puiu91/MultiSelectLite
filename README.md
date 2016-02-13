# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a select element but allows for multiple options to be selected at once from the dropdown.

## Browser Support
IE9+ and all modern browsers

## Demo ##

https://cdn.rawgit.com/puiu91/MultiSelectLite/master/index.html

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

## Default Message

The default message is set to ```Select Options``` but can be changed to something else.


```javascript
MultiSelectLite.setDefaultMessage('Select filters')
```

**Notes**


## ToDo's
* need to allow for multiple instances of a MultiSelectLite element on a page
