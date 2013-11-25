/*
    createDrinkView()

    Renders each drink item provided by config to the order
    page, adding an order button after each entry.
    Uses TemplateView as its prototype and overrides render()
    to create the add to cart buttons for the various formats.
*/

function createDrinkView(config) {
    var view = createTemplateView(config);

    view.afterRender = function(clonedTemplate){
        var dTemplate = clonedTemplate.find('.drink-template');
        clonedTemplate.find('.drink-name').html(this.model.name);
        clonedTemplate.find('.drink-price').html(this.model.price);
        clonedTemplate.find('.btn').attr({
            'data-drink-name': this.model.name,
            'data-drink-price': this.model.price
        });
        clonedTemplate.append(dTemplate);
        dTemplate.remove();
    };
    return view;
}