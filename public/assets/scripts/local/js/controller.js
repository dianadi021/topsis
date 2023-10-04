$(document).ready(function () {
    const HOST = window.location.host;
    const URL = HOST.includes("github.io") ? `https://${HOST}` : `http://${HOST}/topsis`;

    $.getScript(`${URL}/public/assets/scripts/local/js/functions.js`, function () {
        DisableRightClickOnMouse();
        TxtFooter();
        TabsTrigger();
    });
});
