var darkTheme = document.getElementById("dark-theme");

darkTheme.onclick = function() {
    document.body.classList.toggle("darkmode");
    if(document.body.classList.contains("darkmode")){
        darkTheme.src = "images/icon/sun.png";
    } else {
        darkTheme.src = "images/icon/moon.png";
    }
}