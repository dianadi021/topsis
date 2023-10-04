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

function JQueryOnLoad() {
    // AJAX SECTION START
    // Tampilkan loading overlay saat form dikirim
    // $(document).on("submit", "form", function () {
    //     $("#loadingAjax").removeClass("hidden");
    // });

    // Tampilkan loading overlay untuk Ajax request
    // $(document).ajaxStart(function () {
    //     $("#loadingAjax").removeClass("hidden");
    // });

    // Sembunyikan loading overlay setelah Ajax selesai
    // $(document).ajaxStop(function () {
    //     $("#loadingAjax").addClass("hidden");
    // });
    // AJAX SECTION END
}

function AutoToIDR() {
    $(".convert_to_idr").on("input", function () {
        let value = $(this).val().replace(/[^0-9]/g, "");
        let formatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 2}).format(value);
        $(this).val(formatted);
    });
}

function InputNumberOnly() {
    $(".input_number_only").on("input", function () {
        let value = $(this).val().replace(/[^0-9]/g, "");
        $(this).val(value);
    });
}

function InitAutocomplete() {
    $(document).ready(function () {
        if ($("#provinsi").length) {
            $("#provinsi").autocomplete({
                source: async function (request, response) {
                    if (request.term.length < 1) return;

                    LoadingInput('loading', 'provinsi');

                    try {
                        const { datas } = await $.ajax({
                            url: `/api/search?get_data=provinsi`,
                            data: { q: request.term },
                        });

                        LoadingInput('idle', 'provinsi');

                        response(datas.length ? datas : [{ name: 'Data tidak ditemukan', id: '' }]);
                    } catch (error) {
                        console.dir("error", error);
                        LoadingInput('idle', 'provinsi');
                        response([{ name: 'Data tidak ditemukan', id: '' }]);
                    }
                },
                minLength: 1,
                focus: function (_, ui) {
                    if (ui.item.id) {
                        $("#provinsi").val(ui.item.name);
                        $("#id_provinsi").val(ui.item.id);
                    }
                    return false;
                },
                select: function (_, ui) {
                    if (ui.item.id) {
                        $("#provinsi").val(ui.item.name);
                        $("#id_provinsi").val(ui.item.id);
                    }
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>").append(`<div>Provinsi: <strong>${item.name}</strong></div>`).appendTo(ul);
            };
        }

        if ($("#kabupaten").length) {
            $("#kabupaten").autocomplete({
                source: async function (request, response) {
                    if (request.term.length < 1) return;

                    LoadingInput('loading', 'kabupaten');

                    try {
                        const { datas } = await $.ajax({
                            url: `/api/search?get_data=kabupaten`,
                            data: { q: request.term, id_provinsi: (IsValidVal($("#provinsi").val()) ? $("#id_provinsi").val() : null) },
                        });

                        LoadingInput('idle', 'kabupaten');
                        response(datas.length ? datas : [{ name: 'Data tidak ditemukan', id: '' }]);
                    } catch (error) {
                        console.dir("error", error);
                        LoadingInput('idle', 'kabupaten');
                        response([{ name: 'Data tidak ditemukan', id: '' }]);
                    }
                },
                minLength: 1,
                focus: function (_, ui) {
                    if (ui.item.id) {
                        $("#kabupaten").val(ui.item.name);
                        $("#id_kabupaten").val(ui.item.id);
                    }
                    return false;
                },
                select: function (_, ui) {
                    if (ui.item.id) {
                        $("#kabupaten").val(ui.item.name);
                        $("#id_kabupaten").val(ui.item.id);
                    }
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>").append(`<div><strong>${item.name}</strong></div>`).appendTo(ul);
            };
        }

        if ($("#kecamatan").length) {
            $("#kecamatan").autocomplete({
                source: async function (request, response) {
                    if (request.term.length < 1) return;

                    LoadingInput('loading', 'kecamatan');

                    try {
                        const { datas } = await $.ajax({
                            url: `/api/search?get_data=kecamatan`,
                            data: { q: request.term, id_kabupaten: IsValidVal($("#kabupaten").val()) ? $("#id_kabupaten").val() : null },
                        });

                        LoadingInput('idle', 'kecamatan');
                        response(datas.length ? datas : [{ name: 'Data tidak ditemukan', id: '' }]);
                    } catch (error) {
                        console.dir("error", error);
                        LoadingInput('idle', 'kecamatan');
                        response([{ name: 'Data tidak ditemukan', id: '' }]);
                    }
                },
                minLength: 1,
                focus: function (_, ui) {
                    if (ui.item.id) {
                        $("#kecamatan").val(ui.item.name);
                        $("#id_kecamatan").val(ui.item.id);
                    }
                    return false;
                },
                select: function (_, ui) {
                    if (ui.item.id) {
                        $("#kecamatan").val(ui.item.name);
                        $("#id_kecamatan").val(ui.item.id);
                    }
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>").append(`<div>Kecamatan: <strong>${item.name}</strong></div>`).appendTo(ul);
            };
        }

        if ($("#kelurahan").length) {
            $("#kelurahan").autocomplete({
                source: async function (request, response) {
                    if (request.term.length < 1) return;

                    LoadingInput('loading', 'kelurahan');

                    try {
                        const { datas } = await $.ajax({
                            url: `/api/search?get_data=kelurahan`,
                            data: { q: request.term, id_kecamatan: (IsValidVal($("#kecamatan").val()) ? $("#id_kecamatan").val() : null) },
                        });

                        LoadingInput('idle', 'kelurahan');
                        response(datas.length ? datas : [{ name: 'Data tidak ditemukan', id: '' }]);
                    } catch (error) {
                        console.dir("error", error);
                        LoadingInput('idle', 'kelurahan');
                        response([{ name: 'Data tidak ditemukan', id: '' }]);
                    }
                },
                minLength: 1,
                focus: function (_, ui) {
                    if (ui.item.id) {
                        $("#kelurahan").val(ui.item.name);
                        $("#id_kelurahan").val(ui.item.id);
                    }
                    return false;
                },
                select: function (_, ui) {
                    if (ui.item.id) {
                        $("#kelurahan").val(ui.item.name);
                        $("#id_kelurahan").val(ui.item.id);
                    }
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>").append(`<div>Kelurahan: <strong>${item.name}</strong></div>`).appendTo(ul);
            };
        }

        if ($("#golongan_darah").length) {
            $("#golongan_darah").autocomplete({
                source: async function (request, response) {
                    if (request.term.length < 1) return;

                    LoadingInput('loading', 'golongan_darah');

                    try {
                        const { datas } = await $.ajax({
                            url: `/api/search?get_data=golongan_darah`,
                            data: { q: request.term },
                        });

                        LoadingInput('idle', 'golongan_darah');
                        response(datas.length ? datas : [{ name: 'Data tidak ditemukan', id: '' }]);
                    } catch (error) {
                        console.dir("error", error);
                        LoadingInput('idle', 'golongan_darah');
                        response([{ name: 'Data tidak ditemukan', id: '' }]);
                    }
                },
                minLength: 1,
                focus: function (_, ui) {
                    if (ui.item.id) {
                        $("#golongan_darah").val(ui.item.name);
                        $("#id_golongan_darah").val(ui.item.id);
                    }
                    return false;
                },
                select: function (_, ui) {
                    if (ui.item.id) {
                        $("#golongan_darah").val(ui.item.name);
                        $("#id_golongan_darah").val(ui.item.id);
                    }
                    return false;
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>").append(`<div>Golongan Darah: <strong>${item.name}</strong></div>`).appendTo(ul);
            };
        }
    });
}
