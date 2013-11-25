/*
    controller.js
    Controller for Order Online! page
*/

$(function() {
    
    /*
        Checks order for validity; total > 20, all required boxes filled,
        checked when the 'Order' button is clicked.
    */
    $('.place-order').click(function(){
        var hollaholla = cartModel.getTotal();
        var cForm = $('.customer-form');
        var cInfo = {};
        cInfo.name = cForm.find('input[name="fullName"]').val();
        cInfo.address1 = cForm.find('input[name="address1"]').val();
        cInfo.address2 = cForm.find('input[name="address2"]').val();
        cInfo.zip = cForm.find('input[name="zipCode"]').val();
        cInfo.phone = cForm.find('input[name="phoneNumber"]').val();

        var sform = JSONFormat(cInfo, cartModel.getItems());

        if (hollaholla < 20) { //HOLLA HOLLA GET DOLLA
            alert("Minimum order total must be $20");
        } else if (cInfo.name.length == 0 || cInfo.address1.length == 0 
                    || cInfo.zip.length == 0 || cInfo.phone == 0) { 
                    //Check name, address, ZIP code, and phone are filled in
            alert("Name, Address, Zip Code, and Phone Required")
        } else { //Submits order to external server
            $('#cart-input').val(JSON.stringify(sform));
            $('#cart-form').submit();
        }   
    });

    /*
        Formats the order according to required data structure, in JSON
    */
    function JSONFormat(cInfo, customerItems) {
        var sform = {};

        sform.name = cInfo.name;
        sform.address1 = cInfo.address1;
        if (cInfo.address2) {
            sform.address2 = cInfo.address2; //Not required
        };
        sform.zip = cInfo.zip;
        sform.phone = cInfo.phone;
        
        sform.items = [];

        var idx;
        for (idx = 0; idx < customerItems.length; ++idx) {
            var item = customerItems[idx];
            if (item.type == 'pizza') {
                sform.items.push({
                    'type': 'pizza',
                    'name': item.foodName,
                    'size': item.size
                });
            } else {
                sform.items.push({
                    'type': item.type,
                    'name': item.foodName,
                });
            }
        }
        return sform;
    }

    var cartModel = createCartModel();

    var cartView = createCartView({
        model: cartModel,
        template: $('.cart-item-template'),
        container: $('.cart-items-container'),
        subtotal: $('.subtotal'),
        tax: $('.tax'),
        total: $('.total')
    });

    var pizzasModel = createItemsModel({
        menu: com.dawgpizza.menu.pizzas
    });

    var dessertsModel = createItemsModel({
        menu: com.dawgpizza.menu.desserts
    });

    var drinksModel = createItemsModel({
        menu: com.dawgpizza.menu.drinks
    });    

    var pizzasView = createPizzasView({
        model: pizzasModel,
        template: $('.pizza-template'),
        container: $('.pizzas-container')
    });

    var dessertsView = createDessertsView({
        model: dessertsModel,
        template: $('.dessert-template'),
        container: $('.desserts-container')
    });    

    var drinksView = createDrinksView({
        model: drinksModel,
        template: $('.drink-template'),
        container: $('.drinks-container')
    });

    /*OPTIONAL STEP: Store the customer's entire order 
    locally, and offer something the customer 
    can click on to place the same order as last time.
    get the cart JSON out of local storage, and if 
    there was any, it will parse that and pass the results 
    to the cart model's setItems() method*/
    $('.re-order').click(function(){
        var cartJSON = localStorage.getItem('cart');
        if (cartJSON && cartJSON.length > 0) {
            cartModel.setItems(JSON.parse(cartJSON));
        }
    }); 

    //Refresh to acquire server data!
    dessertsModel.refresh();
    pizzasModel.refresh();      
    drinksModel.refresh();

    /*When a new item is added to cart, this code adds the new item
    to the cart. Includes variable handling for food type, food name,
    size, and price.*/
    pizzasView.on('addToCart', function(data){
        var pizza = pizzasModel.getItemByName(data.pizzaName);
        var size;
        if (data.pizzaSize == 0) {
            size = 'small'; // size property for JSON format
            pizzaSize = '(Small 12")';
        } else if (data.pizzaSize == 1) {
            size = 'medium'; // size property for JSON format
            pizzaSize = '(Medium 14")';
        } else {
            size = 'large'; // size property for JSON format
            pizzaSize = '(Large 17")';
        }
        cartModel.addItem({
            type: 'pizza',
            foodName: data.pizzaName,
            size: this.size, // size property for JSON format
            pizzaSize: pizzaSize,
            price: pizza.prices[data.pizzaSize]
        });
    }); //addToCart event pizza

    dessertsView.on('addToCart', function(data){
        cartModel.addItem({
            type: 'dessert',
            foodName: data.dessertName,
            price: data.dessertPrice
        });
    }); //addToCart event desserts

    drinksView.on('addToCart', function(data){
        cartModel.addItem({
            type: 'drink',
            foodName: data.drinkName,
            price: data.drinkPrice
        });
    }); //addToCart event drinks

    //empties cart when empty cart button clicked
    $('.empty-cart').click(function(){
        cartModel.emptyCart();
    });

    //saves the current cart JSON to local storage 
    //whenever it changes, under the key 'cart'.
    cartModel.on('change', function(){
        localStorage.setItem('cart', cartModel.toJSON());
    });
}); //doc ready()
