/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
        var model = createListModel(config);

        model.getSubTotal = function() {
            var idx;
            var cost = 0;
            for (idx = 0; idx < this.items.length; ++idx) {
                cost += this.items[idx].price;
            }
            return cost.toFixed(2);
        }; //getSubTotal()

        model.getTax = function() {
            rate = 0.095;
            tax = (rate * this.getSubTotal)).toFixed(2);
            return tax;
        } //getTax()

        model.getTotal = function() {
            var sub = getSubTotal();
            var tax = getTax();
            var cost = (sub + tax).toFixed(2);
            return cost;
        } //getTotal()

        model.toJSON = function() {
                return JSON.stringify(this.items);
        };

        return model;
} //createCartModel()