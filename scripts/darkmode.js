var darkTheme = document.getElementById("dark-theme");

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("darkmode");
    darkTheme.src = "images/icon/sun.png";
} else {
    darkTheme.src = "images/icon/moon.png";
}

darkTheme.onclick = function() {
    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
        darkTheme.src = "images/icon/sun.png";
        localStorage.setItem("theme", "dark"); 
    } else {
        darkTheme.src = "images/icon/moon.png";
        localStorage.setItem("theme", "light"); 
    }
}