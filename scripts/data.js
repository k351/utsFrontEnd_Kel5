
const product = [
    { id: 0, image: 'images/products/f1.png', title: 't-shirts', name: 'Crew Neck T-Shirts', price: 199000 },
    { id: 1, image: 'images/products/f2.png', title: 't-shirts', name: 'Godzilla Short Sleeve UT', price: 209000 },
    { id: 2, image: 'images/products/f3.png', title: 'jacket', name: 'Fleece Full-Zip Jacket', price: 399000 },
    { id: 3, image: 'images/products/f4.png', title: 'sweatshirt', name: 'Unisex Sweatshirts', price: 269000 },
    { id: 4, image: 'images/products/f5.png', title: 'jeans', name: 'Ultra Strech Skinny Fit Jeans', price: 599000 },
    { id: 5, image: 'images/products/f6.png', title: 'shirts', name: 'White Polo', price: 299000 },
    { id: 6, image: 'images/products/f7.png', title: 't-shirts', name: 'Tailored Jacket Relax Fit', price: 399000 },
    { id: 7, image: 'images/products/f8.png', title: 'jacket', name: 'Soft Flannel Skipper Shirt', price: 399000 }
];

const categories = [...new Set(product.map((item) => { return item }))]

document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = categories.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchData)
        )
    })
    displayItem(filteredData)
});

const displayItem = (items) => {
    document.querySelector('.box-container').innerHTML = items.map((item) => {
        var { image, title, name, price } = item;
        return (
            `<div class="box">
                <img src="${image}" alt="">
                <div class="desc">
                    <span>${title}</span>
                    <h5>${name}</h5>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h4>Rp${price}</h4>
                </div>
            </div>`
        )
    }).join('');
};

displayItem(categories);