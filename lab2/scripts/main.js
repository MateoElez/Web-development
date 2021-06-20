let update = function() {
    let cartItems = document.querySelector('#cart-items');
    let total = localStorage.getItem('totalAmount');

    if(total === null){
        total = 0;
    }
    cartItems.textContent = total;
}

update();
