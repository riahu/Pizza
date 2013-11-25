/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

function createCartView(config) {
    config.cartModel = config.model;
        config.templateView = createCartItemView(config);
        var view = createTemplateListView(config);
        view.afterRender = function() {
            this.subtotal.html(this.model.getSubTotal());
            this.tax.html(this.model.getTax());
            this.total.html(this.model.getTotal());
        }; //afterRender()
        return view;
} //createCartView()