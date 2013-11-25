/* 
    createItemsModel()

    Creates a model for the items in the menu.
    This uses the ListModel as the prototype, but adds 
    a few specific methods.
*/

function createItemsModel(config) {
    var model = createListModel(config);

    /*Acquire item via name, used for pizza rendering*/
    model.getItemByName = function(name) {
        var items = model.getItems();
        var item;
        var idx;

        for (idx = 0; idx < items.length; ++idx) {
            item = items[idx];
            if (name == item.name) {
                return item;
            } 
        }
        throw 'The item does not exist.'
    }

    model.refresh = function() {
        if (!this.menu) 
            throw new 'No menu has been supplied in config.'
        var items = this.menu;
        //set the items
        //prototype will trigger a change event        
        model.setItems(items);
    }; //refresh()

    return model;
} //createItemsModel()