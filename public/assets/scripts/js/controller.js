const base_url = window.location.host;
const [host, port] = base_url.split(':');
const $base_url = (IsValidVal(port) ? `http://${host}:${port}` : `https://${host}`);

$(document).ready(function () {
    localStorage.clear();

    $.getScript(`${$base_url}/assets/scripts/js/functions.js`, function () {
        DisableRightClickOnMouse();
        // JQueryOnLoad();
        InputNumberOnly();
        AutoToIDR();
        InitAutocomplete();
    });

    $("#loadingAjax").hide();
    $("#loadingContetLoader").hide();
});

function ConvertToIDR($val) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format($val);
}

function ContentLoader($url, $id_content) {
    toastr.warning("Sedang diproses, mohon tunggu!", "Peringatan!");
    $('#loadingContetLoader').show();

    $.ajax({
        url: `${$base_url}${$url}`,
        type: 'GET',
        success: function ($response) {
            const $html = IsValidVal($response.datas) ? $response.datas : $response;
            $(`${$id_content}`).html($html);
        },
        complete: function () {
            $('#loadingContetLoader').hide();
            toastr.success("Berhasil mengambil data", "Success!");
        },
        error: function () {
            $('#loadingContetLoader').hide();
            toastr.error("Gagal mengambil data", "Kesalahan!");
        },
    });
}

function ContentLoaderDataTable($url, $id_content, $table_coloumn) {
    // if (!$.fn.DataTable.isDataTable($id_content)) {
    //     $(`${$id_content}`).DataTable().destroy();
    // }

    if (!$.fn.DataTable.isDataTable($id_content)) {
        toastr.warning("Sedang diproses, mohon tunggu!", "Peringatan!");
        $('#loadingContetLoader').show();

        $.ajax({
            url: `${$base_url}${$url}`,
            type: 'GET',
            success: function (response) {
                $(`${$id_content}`).DataTable({
                    dom: '<"top flex justify-between"Bfr>t<"bottom"lp><"clear">', // Custom DOM layout
                    buttons: [
                        {
                            extend: 'excelHtml5', // Excel export button
                            text: '<span class="text-sm"><i class="fa-regular fa-file-excel"></i> Excel</span>',
                            className: 'm-0 p-0', // Customize button style
                            exportOptions: {
                                modifier: {
                                    page: 'all' // Export all pages of the table, not just the current page
                                },
                                columns: ':visible' // Only export the visible columns
                            }
                        },
                        {
                            extend: 'colvis', // Excel export button
                            text: '<span class="text-sm"><i class="fa-solid fa-eye"></i> Show</span>',
                            className: 'm-0 p-0 w-fit', // Customize button style
                        },
                    ],
                    pageLength: 5, // Set initial page length (entries per page)
                    lengthMenu: [5, 10, 25, 50, 75, 100], // Provide options for entries per page
                    columnDefs: [
                        {
                            targets: -1, // Last column (Actions column)
                            visible: true // Ensure 'Actions' column is visible
                        }
                    ],
                    data: response.datas,
                    columns: $table_coloumn
                })
                $('#loadingContetLoader').hide();
            },
            complete: function () {
                $('#loadingContetLoader').hide();
                toastr.success("Berhasil mengambil data", "Success!");
            },
            error: function () {
                $('#loadingContetLoader').hide();
                toastr.error("Gagal mengambil data", "Kesalahan!");
            },
        });
    }
}

function ContentLoaderDataTableV2($datas, $id_content, $table_coloumn) {
    toastr.warning("Sedang diproses, mohon tunggu!", "Peringatan!");
    $('#loadingContetLoader').show();

    $(`${$id_content}`).DataTable({
        dom: '<"top flex justify-between"Bfr>t<"bottom"lp><"clear">', // Custom DOM layout
        buttons: [
            {
                extend: 'excelHtml5', // Excel export button
                text: '<span class="text-sm"><i class="fa-regular fa-file-excel"></i> Excel</span>',
                className: 'm-0 p-0', // Customize button style
                exportOptions: {
                    modifier: {
                        page: 'all' // Export all pages of the table, not just the current page
                    },
                    columns: ':visible' // Only export the visible columns
                }
            },
            {
                extend: 'colvis', // Excel export button
                text: '<span class="text-sm"><i class="fa-solid fa-eye"></i> Show</span>',
                className: 'm-0 p-0 w-fit', // Customize button style
            },
        ],
        pageLength: 5, // Set initial page length (entries per page)
        lengthMenu: [5, 10, 25, 50, 75, 100], // Provide options for entries per page
        columnDefs: [
            {
                targets: -1, // Last column (Actions column)
                visible: true // Ensure 'Actions' column is visible
            }
        ],
        data: $datas,
        columns: $table_coloumn
    });

    setTimeout(function () {
        $('#loadingContetLoader').hide();
        toastr.success("Berhasil mengambil data", "Success!");
    }, 1500);
}

async function GetFromAPI($url) {
    try {
        $('#loadingContetLoader').show();
        return await fetch(`${$base_url}${$url}`).then(function ($list) {
            $('#loadingContetLoader').hide();
            console.dir($list);
            return $list;
        }).catch(function ($err) {
            $('#loadingContetLoader').hide();
            console.dir($err);
        });
    } catch (err) {
        throw err;
    }
}

function IDRToDecimal($val) {
    return parseFloat($val.replace(/[^0-9.-]/g, ''))
}

function isnull($val) {
    return $val === null || $val === "null";
}

function isundefined($val) {
    return $val === undefined || $val === "undefined";
}

function empty($val) {
    if (typeof $val === "undefined" && isundefined($val)) {
        return true;
    } else if (typeof $val === "object" && isnull($val)) {
        return true;
    } else if (typeof $val === "object" && $val.length === 0) {
        return true;
    } else if (typeof $val === "object" && Object.keys($val).length === 0) {
        return true;
    } else if (typeof $val === "boolean" && $val === "") {
        return true;
    } else if (typeof $val === "number" && $val === "") {
        return true;
    } else if (typeof $val === "string" && $val === "") {
        return true;
    }

    return false;
}

function isset($val) {
    if (typeof $val === "undefined" && isundefined($val)) {
        return true;
    } else if (typeof $val === "object" && isnull($val)) {
        return true;
    } else if (typeof $val === "object" && $val.length > 0) {
        return true;
    } else if (typeof $val === "object" && Object.values($val).length > 0) {
        return true;
    } else if (typeof $val === "boolean" && $val) {
        return true;
    } else if (typeof $val === "number" && $val) {
        return true;
    } else if (typeof $val === "string" && $val) {
        return true;
    }

    return false;
}

function IsValidVal($val, $get = ["bool", "value", "equal"], $other = null, $key = null) {
    const $tmpVal = (isset($key) && $key != null ? (isset($val[$key]) ? $val[$key] : "") : (isset($val) ? $val : ""));
    if (isset($tmpVal)) {
        if ($get == "value") {
            if (isset($other) && $other != null) {
                return !empty($tmpVal) || $tmpVal == 0 ? $tmpVal : $other;
            } else {
                return !empty($tmpVal) || $tmpVal == 0 ? $tmpVal : "";
            }
        } else if (isset($other) && $other != null && $get == "equal") {
            return $tmpVal == $other;
        } else if (!empty($tmpVal)) {
            return true;
        } else {
            return false;
        }
    }

    return $get == "value" ? "" : false;
}

function LoadingInput($section, $elemnt) {
    if ($section == 'loading') {
        $(`#${$elemnt}_autocomplete_container div #search-icon`).hide();
        $(`#${$elemnt}_autocomplete_container div #loading-icon`).show();
    }

    if ($section == 'idle') {
        $(`#${$elemnt}_autocomplete_container div #search-icon`).show();
        $(`#${$elemnt}_autocomplete_container div #loading-icon`).hide();
    }
}

function LoginAjaxSection($postFormData, $token) {
    $("#_csrf-token").val($token);
    $("#csrf-token").val($token);

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $token,
        },
    });

    $.ajax({
        url: `${$base_url}/login`,
        type: "POST",
        data: $postFormData,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'X-CSRF-TOKEN': $token
        },
        success: function (callback) {
            console.dir('success', callback);
            toastr.success('berhasil login!', "Success!");

            setTimeout(() => {
                window.location.href = `${$base_url}/dashboard`;
            }, 1500);
        },
        error: function (callback) {
            const { responseJSON } = callback;
            const { errors, message, messages, datas } = responseJSON;
            let errorInfo, validator;
            if (datas) {
                const { errorInfo: errInfo, validator: validCallback } = datas
                errorInfo = errInfo;
                validator = validCallback;
            }
            console.dir('error', callback);

            if (errors) {
                for (let key in errors) {
                    toastr.error(errors[key][0], "Kesalahan!");
                    $(`#err_${key}`).show();
                    $(`#err_${key} li`).html(errors[key][0]);
                }
            } else if (message || messages || errorInfo || validator) {
                const tmpMsg = (validator ? "input data tidak sesuai atau tidak boleh kosong" : (errorInfo ? errorInfo[2] : (messages ? messages : message)));
                toastr.error(tmpMsg, "Kesalahan!");
            }

            $("#loadingAjax").hide();
            $(".hideBtnProcess").show();

            Swal.fire({
                title: "Kesalahan!",
                text: message || messages || errorInfo || validator,
                icon: "error"
            }).then(function () {
                window.location.reload();
            });
        },
    });
}

function OpenLink($link, $options = ["self", "new", "popup"]) {
    if ($options == "self") {
        window.location.href = `${$base_url}${$link}`;
    }

    if ($options == "new") {
        window.open(`${$base_url}${$link}`, "_blank");
    }

    if ($options == "popup") {
        window.open(`${$base_url}${$link}`, "_blank", "width=800,height=600,top=100,left=100,resizable=yes,scrollbars=yes");
    }
}

function CreatePopUpModal($idContainer, $valModal, $txtOpen, $formID, $formOnSubmit, $slot, $head_name = null, $head_description = null, $footer_description = null, $btn_submit = "Simpan", $btn_reset = "Reset", $btn_close = "Tutup") {
    const $htmlBtnOpen = (IsValidVal($txtOpen) ? `<button class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" @click="${$valModal} = true">${$txtOpen}</button>` : "");
    const $htmlTxtHead = (IsValidVal($head_name) ? `<h2 class="text-lg font-bold">${$head_name}</h2>` : "");
    const $htmlTxtDescription = (IsValidVal($head_description) ? `<div class="flex text-lg text-gray-800/50"><h3 class="mt-4">${$head_description}</h3></div>` : "");
    const $htmlTxtFoot = (IsValidVal($footer_description) ? `<div class="mt-6 flex justify-center"><p class="mt-4">${$footer_description}</p></div>` : "");
    const $htmlBtnClose = (IsValidVal($btn_close) ? `<span class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer" @click="${$valModal} = false">${$btn_close}</span>` : "");
    const $htmlBtnReset = (IsValidVal($btn_reset) ? `<button type="reset" class="inline-flex items-center px-4 py-2 bg-danger border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-danger focus:bg-danger active:bg-danger focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 hideBtnProcess ms-3">${$btn_reset}</button>` : "");
    const $htmlBtnSubmit = (IsValidVal($btn_submit) ? `<button type="submit" class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" @submit.prevent="${$formOnSubmit}">${$btn_submit}</button>` : "");
    const $htmlSlot = (IsValidVal($slot) ? $slot : "");

    const $htmlForm = (IsValidVal($formID) ? `
    <form id="${$formID}" @submit.prevent="${$formOnSubmit}">
        <div class="mt-4">
            ${$htmlSlot}
        </div>

        <div class="mt-6 flex justify-end space-x-2">
            ${$htmlTxtFoot}

            ${$htmlBtnClose}

            ${$htmlBtnReset}

            ${$htmlBtnSubmit}
        </div>
    </form>
    ` : "");

    const html = `
    ${$htmlBtnOpen}

    <div id="modal_section">
        <div x-show="${$valModal}" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" style="display: none;">
            <div class="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6" @click.away="${$valModal} = false"
                @keydown.escape.window="${$valModal} = false">
                <div class="flex justify-between items-center border-b pb-3">
                    ${$htmlTxtHead}
                    <button @click="${$valModal} = false" class="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                ${$htmlTxtDescription}

                ${$htmlForm}
            </div>
        </div>
    </div>
    `;

    $(`${$idContainer}`).html(html);
}

function Dropdown404Alpine($this, $target) {
    const $length = $(`li.list_${$target}`).length;
    const $404length = $(`li.list_${$target}`).filter(function() { return $(this).css('display') == 'none';}).length;

    // if ($404length === $length) {
    //     $(`#404_${$target}`).show();
    // } else {
    //     $(`#404_${$target}`).hide();
    // }
}

async function DropdownSelectAlpine($val = ["name", "id's"], $target) {
    $(`#${$target}`).val($val[0]);

    if (IsValidVal($val[1])) {
        $(`#id_${$target}`).val($val[1]);
    }
}

async function DropdownContentLoader($url, $target, $section = null) {
    await $.ajax({
        url: `${$base_url}${$url}`,
        type: 'GET',
        success: function ($response) {
            const $datas = IsValidVal($response.datas) ? $response.datas : $response;
            if (IsValidVal($datas) && $datas.length > 0) {
                let $html = ``;
                $datas.forEach(function ($list) {
                    const { type, postal_code } = $list;
                    const $tmpType = IsValidVal(type) && $section === "wilayah" ? `${type} ` : "";
                    const $tmpPostalCode = IsValidVal(postal_code) && $section === "wilayah" ? `<p><strong>Kode Pos: </strong>${postal_code}</p> ` : "";
                    const $txtDisplay = IsValidVal($section) && $section === "wilayah" ? `<p>${$tmpType}${$list.name}${$tmpPostalCode}</p>` : `${$list.name}`;

                    $html += `
                    <li @click="open = false" x-show="!search || '${$list.name}'.toLowerCase().includes(search.toLowerCase())" class="list_${$target} text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="DropdownSelectAlpine(['${$list.name}', ${$list.id }], '${$target}')">
                        ${$txtDisplay}
                    </li>
                    `;
                });
                $html += `<li id="404_${$target}" class="text-sm px-4 py-2 text-gray-500 hidden cursor-default" style="display: none !important">Data tidak ditemukan.</li>`;

                $(`#list_${$target}`).html($html);
            } else {
                $(`#list_${$target}`).html("");
            }
        }
    });
}

async function DropdownGetLoad($get, $from, $section = null, $searchForm = null) {
    const $formArray = $(`${$searchForm}`).serializeArray();
    const $localStorage = localStorage.getItem("search_params");

    let $statusResult = true;
    if (IsValidVal($localStorage)) {
        const $searchParams = JSON.parse($localStorage);
        $searchParams.forEach(function ($list, $index) {
            const { name, value } = $list;
            if (name.includes("id_") && IsValidVal(value)) {
                if (JSON.stringify($list) !== JSON.stringify($formArray[$index])) {
                    $statusResult = false;
                }
            }
        });
    }

    if (!$statusResult) {
        Object.values($formArray).forEach(function ($list) {
            const { name } = $list;
            if (name.includes("id_") && !name.includes("provinsi")) {
                $statusResult = true;

                const $tmpID = name.replace("id_", "");
                $(`#${$tmpID}`).val("");
                $(`#id_${$tmpID}`).val("");
            }
        });
    }

    if ($statusResult) {
        if (IsValidVal($formArray)) {
            localStorage.setItem("search_params", JSON.stringify($formArray));
        }

        const $listID = [];
        Object.values($formArray).forEach(function ($list) {
            const { name, value } = $list;
            if (name.includes("id_") && IsValidVal(value)) {
                $listID.push(`${name}=${value}`);
            }
        });

        const $params = IsValidVal($listID) && $listID.length > 0 ? $listID.join("&") : $listID;
        const $fxdParams = IsValidVal($params) ? `&${$params}` : "";
        await DropdownContentLoader(`/api/search?get_data=${$get}${$fxdParams}`, $get, $section);
    }
}
