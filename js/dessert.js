/*
    createDessertView()

    Renders each dessert item provided by config to the order
    page, adding an order button after each entry.
    Uses TemplateView as its prototype and overrides render()
    to create the add to cart buttons for the various formats.
*/

function createDessertView(config) {
    var view = createTemplateView(config);

    view.afterRender = function(clonedTemplate){
        var dTemplate = clonedTemplate.find('.dessert-template');
        clonedTemplate.find('.dessert-name').html(this.model.name);
        clonedTemplate.find('.dessert-price').html(this.model.price);
        clonedTemplate.find('.btn').attr({
            'data-dessert-name': this.model.name,
            'data-dessert-price': this.model.price
        });
        clonedTemplate.append(dTemplate);
        dTemplate.remove();
    };
    return view;
}