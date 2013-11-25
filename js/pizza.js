/*
    createPizzaView()

    Renders each pizza item provided by config to the order
    page, adding an order button after each entry.
    Uses TemplateView as its prototype and overrides render()
    to create the add to cart buttons for the various formats.
*/

function createPizzaView(config) {
    var view = createTemplateView(config);

    view.afterRender = function(clonedTemplate){
        var price;
        var size;
        var sTemplate = clonedTemplate.find('.size-template');
        var pTemplate;

        clonedTemplate.find('.pizza-name').html(this.model.name);
        clonedTemplate.find('.pizza-description').html(this.model.description);
        for (size in this.model.prices) {
            pTemplate = sTemplate.clone();
            if (size == 0) {
                pizzaSize = 'Small (12")';
            } else if (size == 1) {
                pizzaSize = 'Medium (14")';
            } else {
                pizzaSize = 'Large (17")';
            }
            pTemplate.find('.pizza-size').html(pizzaSize);
            pTemplate.find('.size-price').html(this.model.prices[size]);
            
            pTemplate.find('button').attr({
                'data-pizza-name': this.model.name,
                'data-pizza-size': size
            });
            clonedTemplate.append(pTemplate);
        }
        sTemplate.remove();
    };
    return view;
}