function handleCategoryFilter(event) {
    event.preventDefault(); 
    const filterQuery = event.currentTarget.getAttribute('data-category')
    localStorage.setItem('filterQuery', filterQuery)

    window.location.href = 'shop.html'
}