/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
        var formatLabels = {
            sm: 'Small',
            md: 'Medium',
            lg: 'Large'
        };
        var cartModel = createCartModel();
        var cartView = createCartView({
            model: cartModel,
            template: $('.cart-item-template'),
            container: $('.cart-items-container'),
            totalPrice: $('.total-price')
        });

        var cartJSON = localStorage.getItem('cart');
        if (cartJSON && cartJSON.length > 0) {
            cartModel.setItems(JSON.parse(cartJSON));
        }

        var moviesModel = createMoviesModel({
            url: 'https://courses.washington.edu/info343/ajax/movies/'
        });

        var moviesView = createMoviesView({
            model: moviesModel,
            template: $('.movie-template'),
            container: $('.movies-container')
        });

        //refresh to get movies from server
        moviesModel.refresh();



        //when the movies view triggers 'addToCart'
        //add a new item to the cart, using the supplied
        //movieID and format
        moviesView.on('addToCart', function(data){
            var movie = moviesModel.getItem(data.movieID);
            if (!movie)
                throw 'Invalid movie ID "' + movieID + '"!'; 

            cartModel.addItem({
                id: movie.id,
                title: movie.title,
                format: data.format,
                formatLabel: formatLabels[data.format],
                price: movie.prices[data.format]
            });
        }); //addToCart event

    cartModel.on('change', function(){
        localStorage.setItem('cart', cartModel.toJSON());
    });
    
    $('.place-order').click(function() {
        console.log(cartModel.toJSON());
    });

}); //doc ready()