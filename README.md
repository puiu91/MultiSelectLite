# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a select element but allows for multiple options to be selected at once from the dropdown.

**See it in action:**

https://cdn.rawgit.com/puiu91/MultiSelectLite/master/index.html

## Preset Options on Instantiation

Pass an array of strings. Each array value is expected to have a matching ```<li>``` element inside your HTML wherever you declare ```<ul id="MultiSelectLite-Dropdown">```

**HTML**
```
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
* alternate option is on click of the MultiSelectLite, add a named function eventListener to the body - then listen for clicks and compare the click event source to see if it is an: (i) li element (an option) (ii) the MultiSelectContainer (iii) neither of those, and on (iii) then it would close the MultiSelectLite dropdown

## ToDo's
* need to allow for multiple instances of a MultiSelectLite element on a page
