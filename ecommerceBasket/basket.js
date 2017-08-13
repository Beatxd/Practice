'use strict';
var buttons = document.querySelectorAll('button');
var finalCoast = 0;
document.getElementById('final-coast').innerHTML = finalCoast;

for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function () {
        var item = this.parentNode;
        var coast = +item.querySelector('.coast').innerHTML;
        addItemToBasket(this);
        finalCoast += coast;
        document.getElementById('final-coast').innerHTML = finalCoast;

        function addItemToBasket(item){
            var itemName = item.parentNode.querySelector('h3');
            var basketList = document.querySelector('.basket-list');
            var listItemName = basketList.appendChild(document.createElement('div'));
            listItemName.innerHTML = itemName.innerHTML + ": ";
            var itemCoast = basketList.appendChild(document.createElement('div'));
            basketList.appendChild(document.createElement('br'));
            itemCoast.innerHTML = coast;
        }
    })
}