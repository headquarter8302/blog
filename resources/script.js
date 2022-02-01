// Prevent cookies to being set, at all.
document.__defineGetter__("cookie", function() { return '';} );
document.__defineSetter__("cookie", function() {} );

var isChanged = false;
function changeTheme() {
    if (isChanged == true) {
        document.getElementById('html').style.filter = "initial";
        isChanged = false;
    } else {
        document.getElementById('html').style.filter = "invert\(1\)";
        isChanged = true;
    }
}

console.log(
        "%cHello! :)",
        "color:red;font-family:monospace;font-size:3rem;font-weight:bold"
      );