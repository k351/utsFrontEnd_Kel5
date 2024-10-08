function toggleFilter(element) {
    const filterSection = element.parentElement;
    const filterOptions = filterSection.querySelector('.filter-options');
    
    if (filterSection.classList.contains('active')) {
        filterOptions.style.height = '0px';
        filterSection.classList.remove('active');
    } else {
        const fullHeight = filterOptions.scrollHeight + 'px';
        filterOptions.style.height = fullHeight;
        filterSection.classList.add('active');
    }
}
