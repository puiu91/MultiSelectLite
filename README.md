# MultiSelectLite
A light javascript solution for creating an HTML component that mimics a select element but allows for multiple options to be selected at once from the dropdown.

**See it in action:**

https://cdn.rawgit.com/puiu91/MultiSelect-Lite/master/index.html

## Preset Options on Instantiation

Pass an array of strings. Each array key-value is expected to have a matching ```<li>``` element inside your HTML wherever you declare ```<ul id="MultiSelectLite-Dropdown">```

**HTML**
```
<div id="MultiSelectLite">
    <span id="MultiSelectLite-Message">Select options</span>
    <ul id="MultiSelectLite-Dropdown">
        <li>Province</li>
        <li>Territory</li>
        <li>State</li>
    </ul>
</div>
```

**Javascript**
```
MultiSelectLite.setPresetSelectedOptions([
    'Province',
    'Territory',
]);
```

change to

```
MultiSelectLite.setPresetDropdownOptions([
    'Province',
    'Territory',
]);
```

## Default Message

The default message is set to ```Select Options``` but can be changed to something else.


```
MultiSelectLite.setDefaultMessage('Select filters')
```

**Notes**
* alternate option is on click of the MultiSelectLite, add a named function eventListener to the body - then listen for clicks and compare the click event source to see if it is an: (i) li element (an option) (ii) the MultiSelectContainer (iii) neither of those, and on (iii) then it would close the MultiSelectLite dropdown

## ToDo's
* refactor the code that is responsible for toggling the MulitSelectLite options dropdown as well as the code responsible for hiding it when the ```<body>``` is clicked.
