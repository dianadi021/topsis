function DisableRightClickOnMouse() {
    function disabledSelection(e) {
        return false;
    }

    function reEnable() {
        return true;
    }

    document.onselectstart = new Function("return false");

    if (window.sidebar) {
        document.onmousedown = disabledSelection;
        document.onclick = reEnable;
    }
}

function TxtFooter() {
    const date = moment();
    $(`#txt-footer`).html(`${date.format('YYYY')} ©️ <a href="https://dianadi021.github.io/" target="_blank" dofollow style="color: var(--text-white) !important;" class="font-bold">Dian Adi Nugroho</a>`);
}

function TabsTrigger() {
    $(function () {
        $("#tabs").tabs({
            activate: function (event, ui) {
                $(".tab-content").addClass("hidden").removeClass("block");
                $(ui.newPanel).removeClass("hidden").addClass("block");
            }
        });

        $(".txt-tabs").click(function () {
            $('.txt-tabs').removeClass('active');
            $(this).toggleClass('active');
        })

        // const rows = document.querySelectorAll('tbody tr');
        // rows.forEach((row, index) => {
        //     if (index % 2 === 0) {
        //         row.classList.add('bg-gray-100'); // Genap
        //     } else {
        //         row.classList.add('bg-white'); // Ganjil
        //     }
        //     row.classList.add('hover:bg-gray-200'); // Efek hover
        // });
    });
}