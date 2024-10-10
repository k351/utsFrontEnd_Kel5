function handleCategoryFilter(event) {
    event.preventDefault(); // Prevent page reload

    const filterQuery = event.target.getAttribute('data-category')
    localStorage.setItem('filterQuery', filterQuery)
    
    window.location.href = 'shop.html'
}