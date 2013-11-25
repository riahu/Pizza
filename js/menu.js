$(function(){
    renderPizza(com.dawgpizza.menu.pizzas, $('.pizza-t'), $('.menu-1'));
    renderDrink(com.dawgpizza.menu.drinks, $('.drink-t'), $('.menu-2'));
    renderDessert(com.dawgpizza.menu.desserts, $('.dessert-t'), $('.menu-3'));
});

function renderPizza(pizza, template, menuData) {
    var clone;
    var idx;
    var pizza;

    for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
        clone = template.clone();
        pizza = com.dawgpizza.menu.pizzas[idx];
            //pizza.name = name of pizza
        clone.find('.name').html(pizza.name);
        clone.find('.description').html(pizza.description);
            //pizza.description = description of pizza
        clone.find('.price').html('$' + pizza.prices[0] + ' | $' +pizza.prices[1] + ' | $' + pizza.prices[2])
            //pizza.prices = array of three numbers, which are prices for small, medium, and large
            //pizza.prices[0] = price for small
            //pizza.prices[1] = price for medium
            //pizza.prices[2] = price for large
        clone.removeClass('template');
        menuData.append(clone);
    }
}

function renderDrink(drinks, template, menuData) {
    var clone;
    var idx;
    var drink;

    for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
        clone = template.clone();
        drink = com.dawgpizza.menu.drinks[idx];
            //drink.name = name of drink
        clone.find('.name').html(drink.name);
        clone.find('.price').html('$' + drink.price);
            //drink.prices = price of drink
        clone.removeClass('template');
        menuData.append(clone);
    }
}

function renderDessert(desserts, template, menuData) {
    var clone;
    var idx;
    var dessert;

    for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
        clone = template.clone();
        dessert = com.dawgpizza.menu.desserts[idx];
            //dessert.name = name of dessert
        clone.find('.name').html(dessert.name);
        clone.find('.price').html('$' + dessert.price);
            //dessert.prices = price of dessert
        clone.removeClass('template');
        menuData.append(clone);
    }
}