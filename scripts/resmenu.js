document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item')
    const navbar = document.querySelector('.navbar')
    let signInButton

    function updateNav(e) {
        navItems.forEach(item => {
            const navLink = item.querySelector('.nav-link')
            if (e.matches) {
                // Replace icons with text for mobile view
                if (navLink.innerHTML.includes('fa-cart-shopping')) {
                    navLink.innerHTML = 'Cart'
                } else if (navLink.innerHTML.includes('fa-heart')) {
                    navLink.innerHTML = 'Wishlist'
                } else if (navLink.innerHTML.includes('fa-angle-down')) {
                    navLink.innerHTML = 'Explore'
                }

                // Add a "Sign In" button if it doesn't exist
                if (!signInButton) {
                    signInButton = document.createElement('li')
                    signInButton.classList.add('nav-item')
                    signInButton.innerHTML = '<a href="#" class="nav-link">Sign In</a>'
                    navbar.querySelector('.nav-menu').appendChild(signInButton)

                // Add event listener to close the menu when "Sign In" is clicked
                    signInButton.querySelector('.nav-link').addEventListener('click', () => {
                    hamburger.classList.remove("active")
                    navMenu.classList.remove("active")
                    })
                }
            } else {
                // Restore icons for desktop view
                if (navLink.textContent === 'Cart') {
                    navLink.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
                } else if (navLink.textContent === 'Wishlist') {
                    navLink.innerHTML = '<i class="fa-regular fa-heart"></i>'
                } else if (navLink.textContent === 'Explore') {
                    navLink.innerHTML = 'Explore <i class="fa-solid fa-angle-down"></i>'
                }

                // Remove "Sign In" button when in desktop view
                if (signInButton) {
                    signInButton.remove()
                    signInButton = null
                }
            }
        })
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addListener(updateNav)
    updateNav(mediaQuery)
})
