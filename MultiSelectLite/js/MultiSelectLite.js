var MultiSelectLite = (function() {

    /**
     * Stores references to HTMLElements required by the plugin.
     * 
     * @type {Object}
     */
    var MultiSelect = {

        /**
         * Holds reference to the MultiSelectLite HTMLElement
         * 
         * @type {HTMLElement} <div>
         */
        select: document.getElementById('MultiSelectLite'),

        /**
         * Holds reference to the MultiSelectLite text field which is the equivalent of 
         * a default value in a standard HTML Select object
         * 
         * @type {HTMLElement} <span>
         */
        message: document.getElementById('MultiSelectLite-Message'),

        /**
         * Holds reference to the MultiSelectLite dropdown field which contains the 
         * available select options
         * 
         * @type {HTMLElement} <ul>
        */
        dropdown: document.getElementById('MultiSelectLite-Dropdown')
    };

    /**
     * Stores available options that user can select
     * 
     * @type {HTMLCollection} An array of <li> elements
     */
    var dropdownOptions = MultiSelect.dropdown.children;

    /**
     * Stores the HTMLLIElement <li> options selected by the user 
     * 
     * @type {Array}
     */
    var selectedOptions = [];

    /**
     * Stores text values of the HTMLLIElement <li> options selected by the user
     * 
     * @type {Array}
     */
    var selectedOptionsTextValues = [];

    /**
     * Default message to be displayed in the MultiSelectLite Object
     * 
     * @type {String}
     */
    var defaultMessage = 'Select options';

    /**
     * Stores a boolean value representing whether or not the body has a click event listener attached
     * 
     * @type {Boolean}
     */
    var bodyHasClickEventListener = false;

    /**
     * Event handler for when MultiSelect is clicked. Use event delgation to detect when
     * actual <li> option elements are clicked.
     * 
     * @return {void}
     */
    MultiSelect.select.onclick = function() {

        /**
         * Event delgation for when the MultiSelectLite container is clicked - represented by the MultiSelectLite 
         * element with an id of message since this element occupies the entirety of the MultiSelectLite container space
         */
        if (event.srcElement.id === 'MultiSelectLite-Message') {

            if (MultiSelect.select.className === '') {

                openMultiSelectLite();

                // add body event listener to disable the MultiSelectLite dropdown when the body is clicked
                if (bodyHasClickEventListener === false) {
                    document.body.addEventListener('click', bodyListener, false);
                    bodyHasClickEventListener = true;
                }

            } else {
                closeMultiSelectLite();   
            }
        }

        /**
         * Event delegation for when a MultiSelectLite dropdown li option is clicked
         */
        if (event.srcElement.nodeName === 'LI') {
            toggleCssClass(event.srcElement, 'selected');
            storeReferenceOfClickedOption(event.srcElement); // store reference to clicked-on option to internal array
            updateMessageWithAmountOfOptionsSelected(); // updates message to let user know amount of selected options
        };
    };
  
    /**
     * Function that listens for events on the body
     * 
     * @param  {Object} e Event information
     */
    function bodyListener(e) {

        /**
         * Traverse up the DOM tree from clicked element and check to see if an element with an id of MultiSelectLite is 
         * found. Otherwise, it means that the source of the click event was outside the MultiSelectLite container.
         */
        if ( ! searchParentNodeForIdIteratively( e.srcElement, 'MultiSelectLite' )) {

            closeMultiSelectLite();

            // remove listener from the body
            document.body.removeEventListener('click', bodyListener, false);
            bodyHasClickEventListener = false;
        }
    }

    /**
     * Simulates the opening of the MultiSelectLite object and options dropdown by adding corresponding css classes.
     * 
     * @return {void}
     */
    function openMultiSelectLite() {
        applyCssClass( MultiSelect.select, 'active' );
        applyCssClass( MultiSelect.dropdown, 'open' );
    }

    /**
     * Simulates the closing of the MultiSelectLite object and options dropdown by removing corresponding css classes.
     *     
     * @return {void}
     */
    function closeMultiSelectLite() {
        removeCssClassesMultipleElements([
            MultiSelect.select,
            MultiSelect.dropdown,
        ]);
    }

    /**
     * Searches up the node tree of an element until it finds the requested id.
     * 
     * @param  {Object} el  Element to start search from
     * @param  {String} id  The id to search for
     * @return {Boolean}    Whether the specified id was found while traversing up the DOM tree
     */
     function searchParentNodeForIdIteratively(el, id) {
        while (el.parentNode) {
            el = el.parentNode;

            if (el.id === id) {
                return true;
            }
        }
        return;
    }

    /**
     * Getter for selectedOptions variable
     * 
     * @return {Array} HTMLElements of type <li>
     */
    function getSelectedOptions() {
        return selectedOptions;
    }

    /**
     * Getter for selectedOptionsTextValues variable
     * 
     * @return {Array} Strings representing text values
     */
    function getSelectedOptionsTextValues() {
        return selectedOptionsTextValues;
    }

    /**
     * Setter for the default message
     * 
     * @param {String} message
     */
    function setDefaultMessage(message) {
        return defaultMessage = message;
    }

    /**
     * Overrides default HTMLElements with user specified ones
     * 
     * @param {object} elements An object containing HTMLElements
     */
    function setMultiSelectElements(elements) {}
    
    /**
     * Applies a css class of selected to options in the MultiSelectLite dropdown that
     * match options from the passed-in array.

     * @param {Array} desiredOptions Options to apply the css class on instantiation
     */
    function setPresetSelectedOptions(desiredOptions) {

        if ( ! desiredOptions) {
            throw new Error('No desired options supplied');
        }

        // compare each option from the passed-in array against available options
        for (var key in dropdownOptions) {
            if (dropdownOptions.hasOwnProperty(key)) {
                if (desiredOptions.indexOf( dropdownOptions[key].innerText ) !== -1) {

                    // apply class
                    dropdownOptions[key].className = 'selected';

                    // store reference to option
                    selectedOptions.push(dropdownOptions[key])
                    selectedOptionsTextValues.push(dropdownOptions[key].innerText)
                };
            };
        };

        // update the MultiSelectLite message
        updateMessageWithAmountOfOptionsSelected();
    }

    /**
     * Removes any existing selected options in the MultiSelectLite dropdown
     * @return {void}
     */
    function clearPresetSelectedOptions() {
        selectedOptions = []
        selectedOptionsTextValues = []

        // remove the selected style from each list element
        for (var key in dropdownOptions) {
            if (dropdownOptions.hasOwnProperty(key)) {
                removeCssClasses(
                    dropdownOptions[key]
                );
            };
        };

        // update the MultiSelectLite message
        updateMessageWithAmountOfOptionsSelected();        
    }

    /**
     * Applies a css class to an element, overwriting any existing classes. This method is used for
     * compatability with IE9. Preferred modern solution is the el.classList.toggle('class') alternative.
     * 
     * @param {HTMLElement} el
     * @param {String} cssClass
     */
    function toggleCssClass(el, cssClass) {
        el.className === '' ? el.className = cssClass : el.className = '';
    }

    /**
     * Applies a specified css class to an element overwriting any existing classes.
     * 
     * @param {HTMLElement} el
     * @param {String} cssClass
     */
    function applyCssClass(el, cssClass) {
        el.className = cssClass;
    }

    /**
     * Removes all css classes from an HTML element.
     * 
     * @param  {HTMLElement} el
     * @return {void}
     */
    function removeCssClasses(el) {
        el.className = '';
    }

    /**
     * Removes css classes from an array of HTML elements
     * 
     * @param  {Array} elements An array of HTML elements
     * @return {void}
     */
    function removeCssClassesMultipleElements(elements) {
        for (var i = elements.length; i--;) {
            elements[i].className = '';
        };
    }

    /**
     * Updates the MultiSelectLite message with the amount of options selected
     * 
     * @return {void}
     */
    function updateMessageWithAmountOfOptionsSelected() {

        if (selectedOptions.length !== 0) {
            MultiSelect.message.innerText = 'Selected ' + selectedOptions.length + ' out of ' + dropdownOptions.length
        } else {
            MultiSelect.message.innerText = defaultMessage
        }
    }

    /**
     * Appends a reference to a MultiSelectLite dropdown option to the selectedOptions and the 
     * selectedOptionsTextValues arrays, otherwise deletes the reference if it already exists.
     * 
     * @param  {HTMLLIElement} option MultiSelectLite dropdown option of type <li>
     * @return {void} 
     */
    function storeReferenceOfClickedOption(option) {

        /**
         * Stores the array key of where the option was found. Values of -1 signify that
         * the element was not found in the array.
         *     
         * @type {Number}
         */
        var index = selectedOptions.indexOf(option);

        if (index !== -1) {
            selectedOptions.splice(index, 1);
            selectedOptionsTextValues.splice(index, 1);
        } else {
            selectedOptions.push(option);
            selectedOptionsTextValues.push(option.innerText);
        }
    }

    /**
     * Revealing module pattern exposes private functions and properties
     * via public pointers
     */
    return {
        MultiSelect: MultiSelect,
        setPresetSelectedOptions: setPresetSelectedOptions,
        clearPresetSelectedOptions: clearPresetSelectedOptions,
        setDefaultMessage: setDefaultMessage,
        getSelectedOptions: getSelectedOptions,
        getSelectedOptionsTextValues: getSelectedOptionsTextValues
    }

})();
