// import './hotsnackbar.css';
function hsSnackbarWrapper() {
  let hsOldId = 0;
  let hsIntervalToClear = 0;
  let hsTimeOut = 20000;

  function hsRemakeSnackbar(randomId, hsOldIdtoHide, textx) {
    clearTimeout(hsIntervalToClear);
    let timedOutSnackbars = document.getElementsByClassName("hs-snackbar-hide");
    while (timedOutSnackbars.length > 0) {
      timedOutSnackbars[0].remove();
    }
    document.getElementById(hsOldIdtoHide).className += " hs-snackbar-hide";
    hsOldId = 0;
    hsMakeSnackbar(randomId, textx);
  }

  function hsMakeSnackbar(randomId, textx) {
    let hsSnackbarDiv = document.createElement("div");
    hsSnackbarDiv.innerHTML = textx;
    hsSnackbarDiv.id = randomId;
    hsSnackbarDiv.className = "hs-snackbar";

    document.getElementsByTagName("body")[0].appendChild(hsSnackbarDiv);
    let currenths = hsSnackbarDiv;
    currenths.className += " hs-snackbar-show";
    hsOldId = randomId;
    hsIntervalToClear = setTimeout(function() {
      currenths.className += " hs-snackbar-hide";
      hsOldId = 0;
    }, hsTimeOut);
  }
  return function hotsnackbar(text) {
    let randomId = Math.random();
    if (hsOldId) {
      hsRemakeSnackbar(randomId, hsOldId, text);
    } else {
      hsMakeSnackbar(randomId, text);
    }
  };
}
let hotsnackbar = hsSnackbarWrapper();
module.exports =  hotsnackbar;