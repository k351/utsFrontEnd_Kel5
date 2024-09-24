function search() {
    let filter = document.getElementById('searchBar').value.toUpperCase()
    let items = document.querySelectorAll('.box')
    let product = document.getElementsByTagName('h5')

    for (let i = 0; i < product.length; i++) {
        let a = product[i].innerHTML || product[i].innerText || product[i].textContent
        if (a.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = ""
        } else {
            items[i].style.display = "none"
        }
    }
}
