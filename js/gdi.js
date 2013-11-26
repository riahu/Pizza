/*
    After giving up on controller-based programming, I now have this.
    gdi.js does it all - renders the menu, renders the cart, and
    deals with both the cart submission and other various tasks as
    detailed in the homework.
*/

 $(function(){

    /*Rendering pizzas - name, description, size, price*/
    var idx;
    var pizza;
    var template = $('.template-pizza');
    var meatContainer = $('.meat');
    var vegContainer = $('.veg');
    var cTemp;   
    
    for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
        pizza = com.dawgpizza.menu.pizzas[idx];
        cTemp = template.clone();
        cTemp.find('.name').html(pizza.name);
        cTemp.find('.description').html(pizza.description);
        cTemp.find('.small').html('<button type="button" class="btn btn-default order" data-type="pizza" data-name= "' + pizza.name + '" data-size="small" data-price="' + pizza.prices[0] + '">' + "Small $" + pizza.prices[0] + '</button>');
        cTemp.find('.medium').html('<button type="button" class="btn btn-default order" data-type="pizza" data-name= "' + pizza.name + '" data-size="medium" data-price="' + pizza.prices[1] + '">' + "Medium $" + pizza.prices[1] + '</button>');
        cTemp.find('.large').html('<button type="button" class="btn btn-default order" data-type="pizza" data-name= "' + pizza.name + '" data-size="large" data-price="' + pizza.prices[2] + '">' + "Large $" + pizza.prices[2] + '</button>');

        cTemp.removeClass('template-pizza');
        if (pizza.vegetarian){
            vegContainer.append(cTemp);
        } else {
            meatContainer.append(cTemp);
        }
    }

    /*Rendering drinks - name, price*/
    var idx;
    var drink;
    var template = $('.template-drinks');
    var container = $('.drinks');
    var cTemp;
    for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
        drink = com.dawgpizza.menu.drinks[idx];
        cTemp = template.clone();
        cTemp.find('.name').html(drink.name);
        cTemp.find('.price').html('<button type="button" class="btn btn-default order" data-type="drink" data-name= "' + drink.name + '" data-price="' + drink.price + '">' + "$" + drink.price + '</button>');
        cTemp.removeClass('template-drinks');
        container.append(cTemp);

    }

    /*Rendering dessert - name, price*/
    var idx;
    var dessert;
    var template = $('.template-desserts');
    var container = $('.desserts');
    var cTemp;
    for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
        dessert = com.dawgpizza.menu.desserts[idx];
        cTemp = template.clone();
        cTemp.find('.name').html(dessert.name);
        cTemp.find('.price').html('<button type="button" class="btn btn-default order" data-type="dessert" data-name= "' + dessert.name + '" data-price="' + dessert.price + '">' + "$" + dessert.price + '</button>');
        cTemp.removeClass('template-desserts');
        container.append(cTemp);       
    }

    var total = 0;
    
    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        items: [] //empty array
    }; //cart data

    /*
        Handles a click of the 'Add to Cart' button by adding the item to the cart.
    */
    $('.order').click(function(){
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };
        cart.items.push(newCartItem);
        total = parseInt(this.getAttribute('data-price')) + total;
        renderCart(cart, $('.cart-items-container'));
    });

    $('.place-order').click(function(){
        var signupForm = $('form');
        var reqFields = ["name", "addr-1", "zip", "phone"];
        var reqField;
        var reqValue;
        for (var i = 0; i < reqFields.length; i++) {
            var fieldName = reqFields[i];
            reqField = signupForm.find('input[name="' + fieldName + '"]');
            reqValue = reqField.val().trim();
            if (0 === reqValue.length) {
                alert('You must enter your ' + reqField.attr('placeholder') + '!');
                return false;
            }
        }  
        var info = {
            address1: signupForm.find('input[name="addr-1"]').val(),
            address2: signupForm.find('input[name="addr-2"]').val(),
            name: signupForm.find('input[name="name"]').val(),
            zip: signupForm.find('input[name="zip"]').val(),
            phone: signupForm.find('input[name="phone"]').val(),
            items: JSON.parse(JSON.stringify(cart.items))
        };
        var json = JSON.stringify(info);
        localStorage.setItem('cart', JSON.stringify(cart.items));
        signupForm.find('input[name="cart"]').val(json);
        signupForm.submit();
    });

    /*
        Resets everything when the "Clear Cart" button is pressed.
        Cart returns to default state, empty and 0.00.
    */
    $('.start-over').click(function() {
        cart = {
            items: [] //empty array
        }
        renderCart(cart, $('.cart-items-container'));
    });

    $('.last-order').click(function() {
        var cartJSON = localStorage.getItem('cart');
        if (cartJSON && cartJSON.length > 0) {
            cart.items = JSON.parse(cartJSON);
        }
        renderCart(cart, $('.cart-items-container'))
    });
}); //doc ready

/*
    Renders the cart. Cart references the cart model, and the container
    references the <div>
*/
function renderCart(cart, container) {
    var idx, item;
    
    //Gotta clear the container for tumbleweeds
    container.empty();
    var cTemp = $('.cart-template');
    var subtotal = 0;
    var total = 0;
    var tax = 0;

    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        var CartItem = cTemp.clone().removeClass('cart-template');
        CartItem.html('<button type="button" class="btn btn-danger btn-xs remove" data-index = "' + idx + '">' + "x" + '</button>' + " " + item.name + " $" + item.price);
        container.append(CartItem);

        subtotal += parseInt(cart.items[idx].price);
        tax = subtotal * .095;
        total = subtotal + tax;

    } //for each cart item
    $('.subtotal-price').empty();
    $('.subtotal-price').html(subtotal);
    $('.tax-price').empty();
    $('.tax-price').html(tax.toFixed(2));
    $('.total-price').empty();
    $('.total-price').html(total.toFixed(2));
    
    $('.remove').click(function(){
        var idx = parseInt (this.getAttribute("data-index"));
        cart.items.splice(idx, 1);
   
        renderCart(cart, $('.cart-items-container'));
    });

} //renderCart()