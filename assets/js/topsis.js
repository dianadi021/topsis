$(document).ready(function () {
  $("#topsisResultModal").click(function () {
    resultTOPSIS();
    $("#popup_result").attr("style", "width: 100%;");
  });
});

/* TOPSIS START */
var arrayIndicatorJSONData = '{"MatrixAll":[],"nilaiKuadratBasic":[],"nilaiTernormalisasi":[],"nilaiTerbobot":[],"maxMinPlusNegatifA":[],"nilaiPlusNegatifD":[],"nilaiPreferensiAlternatif":[]}';
function resultTOPSIS() {
  var objIndicator = JSON.parse(arrayIndicatorJSONData);

  const matrixArrayLength = document.getElementsByClassName("matrixAll").length;
  const indicatorArrayLength = document.getElementsByClassName("indicator-name").length;
  const choicesArrayLength = document.getElementsByClassName("choices").length;

  /* LOOPING UNTUK MENYIMPAN DARI FORM KE DALAM ARRAY DALAM BENTUK AWAL MATRIX*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      var tempNameChoices = document.getElementById("choices-" + iChoicesLength).value;
      let arrayTempValueKuadrat = document.getElementById("matrix_" + iIndicatorLength + "-" + iChoicesLength).value;

      objIndicator["MatrixAll"].push({ Matrix: matrixName, MatrixOf: tempNameIndicator, Value: arrayTempValueKuadrat, Choice: tempNameChoices });
      arrayIndicatorJSONData = JSON.stringify(objIndicator);
    }
  }
  /* LOOPING UNTUK MENYIMPAN DARI FORM KE DALAM ARRAY DALAM BENTUK AWAL MATRIX*/
  /* END*/

  /* LOOPING UNTUK MENGHITUNG KUADRAT MATRIX*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    let tempHitungKuadrat = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = Math.pow(objIndicator.MatrixAll[iMatrixAll].Value, 2);
        tempHitungKuadrat = tempHitungKuadrat + arrayTempValueKuadrat;
      }
    }

    /*  PUSH TO NILAI KUADRAT BASIC   */
    objIndicator["nilaiKuadratBasic"].push({ Matrix: matrixName, MatrixOf: tempNameIndicator, Value: tempHitungKuadrat, KuadratBasic: Math.sqrt(tempHitungKuadrat) });
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
    /*console.log(Math.sqrt(tempHitungKuadrat));*/
  }
  /* LOOPING UNTUK MENGHITUNG KUADRAT MATRIX*/
  /* END*/

  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    let tempIndexIndicatorArry = iIndicatorLength - 1;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    let tempHitungTernormalisasi = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        tempHitungTernormalisasi = objIndicator.MatrixAll[iMatrixAll].Value / objIndicator.nilaiKuadratBasic[tempIndexIndicatorArry].KuadratBasic;
        objIndicator["nilaiTernormalisasi"].push({ Matrix: objIndicator.MatrixAll[iMatrixAll].Choice, MatrixOf: tempNameIndicator, Value: tempHitungTernormalisasi });
        arrayIndicatorJSONData = JSON.stringify(objIndicator);
        /*console.log(tempHitungTernormalisasi);*/
      }
    }
  }
  /* LOOPING UNTUK MENGHITUNG KUADRAT PEMBAGI*/
  /* END*/

  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/
  /* PADA BAGIAN INI HARUS DI *1 JIKA ITU PROFIT JIKA COST *-1 */
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    var tempWeightIndicator = document.getElementById("indicator-weight-" + iIndicatorLength).value;
    var tempIfIndicator = document.getElementById("indicator-negatif-" + iIndicatorLength).checked;
    let tempHitungTernormalisasi = 0;

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.nilaiTernormalisasi[iMatrixAll].MatrixOf == tempNameIndicator) {
        if (tempIfIndicator == true) {
          tempHitungTernormalisasi = objIndicator.nilaiTernormalisasi[iMatrixAll].Value * tempWeightIndicator * -1;
          objIndicator["nilaiTerbobot"].push({ Choice: objIndicator.MatrixAll[iMatrixAll].Choice, Indicator: tempNameIndicator, Value: tempHitungTernormalisasi });
          arrayIndicatorJSONData = JSON.stringify(objIndicator);
          /*console.log(tempHitungTernormalisasi);*/
        } else {
          tempHitungTernormalisasi = objIndicator.nilaiTernormalisasi[iMatrixAll].Value * tempWeightIndicator * 1;
          objIndicator["nilaiTerbobot"].push({ Choice: objIndicator.MatrixAll[iMatrixAll].Choice, Indicator: tempNameIndicator, Value: tempHitungTernormalisasi });
          arrayIndicatorJSONData = JSON.stringify(objIndicator);
          /*console.log(tempHitungTernormalisasi);*/
        }
      }
    }
  }
  /* LOOPING UNTUK MENGHITUNG TERBOBOT*/
  /* END*/

  /* LOOPING UNTUK MENCARI NILAI MIN/MAX APLUS/ANEGATIF*/
  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    var tempIfIndicator = document.getElementById("indicator-negatif-" + iIndicatorLength).checked;

    let tempPlusA = 0;
    let tempNegatifA = 0;
    const tempArrayValueToSort = new Array();

    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.nilaiTerbobot[iMatrixAll].Indicator == tempNameIndicator) {
        tempArrayValueToSort.push(objIndicator.nilaiTerbobot[iMatrixAll].Value);
      }
    }
    /*console.log(tempArrayValueToSort);*/
    if (tempIfIndicator == true) {
      tempPlusA = Math.min.apply(Math, tempArrayValueToSort);
      tempNegatifA = Math.max.apply(Math, tempArrayValueToSort);
    } else {
      tempPlusA = Math.max.apply(Math, tempArrayValueToSort);
      tempNegatifA = Math.min.apply(Math, tempArrayValueToSort);
    }

    objIndicator["maxMinPlusNegatifA"].push({ MatrixOf: tempNameIndicator, plusA: tempPlusA, negatifA: tempNegatifA });
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
  }
  /* LOOPING UNTUK MENCARI NILAI MIN/MAX APLUS/ANEGATIF*/
  /* END*/

  /* LOOPING UNTUK MENCARI NILAI D+/D-*/
  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    var tempNameChoices = document.getElementById("choices-" + iChoicesLength).value;
    let tempHitungPlusD = 0;
    let tempHitungNegatifD = 0;

    for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
      var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;

      for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
        if (objIndicator.nilaiTerbobot[iMatrixAll].Choice == tempNameChoices && objIndicator.nilaiTerbobot[iMatrixAll].Indicator == tempNameIndicator) {
          /*     MELAKUKAN PERHITUNGAN PLUSD      */
          let tempPlusD = objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].plusA - objIndicator.nilaiTerbobot[iMatrixAll].Value;
          let tempKuadratplusD = Math.pow(tempPlusD, 2);
          tempHitungPlusD = tempHitungPlusD + tempKuadratplusD;

          /*     MELAKUKAN PERHITUNGAN NEGATIFD      */
          let tempNegatifD = objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].negatifA - objIndicator.nilaiTerbobot[iMatrixAll].Value;
          let tempKuadratnegatifD = Math.pow(tempNegatifD, 2);
          tempHitungNegatifD = tempHitungNegatifD + tempKuadratnegatifD;

          /*    MENAMPILKAN HASIL DARI PENGURANGAN DAN NILAI ISI DARI maxMinPlusNegatifA.plusA DAN nilaiTerbobot.Value
            console.log(tempNameChoices+" - "+tempNameIndicator);
            console.log(objIndicator.maxMinPlusNegatifA[iIndicatorLength-1].plusA+" - "+objIndicator.nilaiTerbobot[iMatrixAll].Value);
            console.log(tempKuadratplusD);
            */
        }
      }
    }
    objIndicator["nilaiPlusNegatifD"].push({ Choice: tempNameChoices, plusD: Math.sqrt(tempHitungPlusD), negatifD: Math.sqrt(tempHitungNegatifD) });
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
  }
  /* LOOPING UNTUK MENCARI NILAI D+/D-*/
  /* END*/

  /* LOOPING UNTUK MENCARI NILAI PREFERENSI UNTUK SETIAP ALTERNATIF*/
  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    let tempNilaiPreferensiAlternatif = objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].negatifD + objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].plusD;
    let nilaiPreferensiAlternatif = objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].negatifD / tempNilaiPreferensiAlternatif;
    objIndicator["nilaiPreferensiAlternatif"].push({ Choice: objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].Choice, NilaiPreferensi: nilaiPreferensiAlternatif });
    arrayIndicatorJSONData = JSON.stringify(objIndicator);
  }
  /* LOOPING UNTUK MENCARI NILAI PREFERENSI UNTUK SETIAP ALTERNATIF*/
  /* END*/

  /* VIEW CONSOLE ARRAY */
  console.log(objIndicator);

  var innerHTMLSimpleResultFirst = `<!-- POPUP RESULT -->
                <div class="container result_TOPSIS_container">
                  <div class="closebtn">
                    <a href="javascript:void(0)" onclick="closeResult()"><i class="fa-solid fa-xmark"></i></a>
                  </div>
                  <div class="row">
                    <div class="col-12 header_result_close">
                      <div class="row">
                        <div class="col-10">
                          <h4>TOPSIS ANALYSIS</h4>
                        </div>
                      </div>
                    </div>
                    <div class="col result_TOPSIS">
                      <div role="alert" class="alert alert-success">
                      <strong>Pilihan Terbaik</strong> adalah <strong>`;
  var innerHTMLSimpleResultMiddle = `
                        </div>
                        <div role="alert" class="alert alert-warning">
                        <ul class="list-group">`;
  var innerHTMLSimpleResultLast = `</ul>
                        </div>
                        <!--<button type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block" onclick="openFullResult()">Full Calculation Result <span class="oi oi-eye "></span></button>-->
                        <!--<a id="downloadJSON" onclick="exportJson(this);" type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block">Download File JSON <span class="oi oi-eye "></span></button></a>-->
                        <a onclick="showTable();" type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-success btn-lg btn-block">Show Table <span class="oi oi-eye "></span></button></a>
                      </div>
                    </div>
                  </div>`;

  /* SHOW RESULT START */
  let allChoicesValue = new Array();
  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    let tempReff = objIndicator.nilaiPreferensiAlternatif[iChoicesLength - 1].NilaiPreferensi;
    for (let index = 1; index <= choicesArrayLength; index++) {
      if (tempReff == objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi) {
        allChoicesValue.push(objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi);
      }
    }
    /*if (objIndicator.nilaiTernormalisasi[iChoicesLength-1].Value == 0.7071067811865475) {
                      innerHTMLSimpleResultMiddle = innerHTMLSimpleResultMiddle;
                    }else{
                      
                    };*/
    /*innerHTMLSimpleResultMiddle += `<li class="list-group-item "><strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].Choice+`</strong> With score <strong>`+objIndicator.nilaiPreferensiAlternatif[iChoicesLength-1].NilaiPreferensi+`</strong></li>`;*/
  }

  allChoicesValue.sort();
  let bestChoiceValue = Math.max.apply(Math, allChoicesValue);
  //console.log(allChoicesValue);

  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    if (bestChoiceValue == objIndicator.nilaiPreferensiAlternatif[iChoicesLength - 1].NilaiPreferensi) {
      var bestChoiceName = objIndicator.nilaiPreferensiAlternatif[iChoicesLength - 1].Choice;
      innerHTMLSimpleResultFirst += bestChoiceName + `</strong> dengan nilai <strong>` + bestChoiceValue.toFixed(3) + `</strong></br>`;
    }
    for (let index = 1; index <= choicesArrayLength; index++) {
      allChoicesValue.sort();
      allChoicesValue.reverse();
      //console.log(allChoicesValue);
      if (allChoicesValue[iChoicesLength - 1] == objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi) {
        innerHTMLSimpleResultMiddle += `<li class="list-group-item "><strong>Rank ` + iChoicesLength + ` </strong>` + objIndicator.nilaiPreferensiAlternatif[index - 1].Choice + `</strong> dengan nilai <strong>` + objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi.toFixed(3) + `</strong></li>`;
      }
    }
  }

  $("#popup_result").html(innerHTMLSimpleResultFirst + innerHTMLSimpleResultMiddle + innerHTMLSimpleResultLast);

  /*document.getElementById("popup_result").innerHTML = innerHTMLSimpleResultFirst + innerHTMLSimpleResultMiddle + innerHTMLSimpleResultLast;*/
  /*  document.getElementById("popup_full_result").innerHTML = ;*/
}
/* TOPSIS END */

/* SHOW TABLE START */
function showTable() {
  var objIndicator = JSON.parse(arrayIndicatorJSONData);
  const matrixArrayLength = document.getElementsByClassName("matrixAll").length;
  const indicatorArrayLength = document.getElementsByClassName("indicator-name").length;
  const choicesArrayLength = document.getElementsByClassName("choices").length;

  /* SHOWING CHOICES TABLE START */
  var tempChoicesShow = `<tbody id="choices_show"><tr style="background-color: #d6eeee">
    <td><strong>Pilihan Alternatif</strong></td>
  </tr>`;
  for (let i = 1; i <= choicesArrayLength; i++) {
    tempChoicesShow +=
      `<tr>
      <td>` +
      document.getElementById("choices-" + i).value +
      `</td>
    </tr>`;
  }
  tempChoicesShow += `</tbody>`;
  /* SHOWING CHOICES TABLE END */

  /* SHOWING INDICATOR TABLE START */
  var tempIndicatorShow = `<tbody id="indicator_show"><tr style="background-color: #d6eeee">
    <td colspan="3">
      <center><strong>Nilai Kriteria</strong></center>
    </td>
  </tr><tr>
  <td><strong>Nama Kriteria</strong></td>
  <td><strong>Bobot</strong></td>
  <td><strong>Cost/Benefit</strong></td>
  </tr>`;
  for (let i = 1; i <= indicatorArrayLength; i++) {
    var tempIfIndicator = document.getElementById("indicator-negatif-" + i).checked;
    var tempIndictorChecked = "";
    if (tempIfIndicator == true) {
      tempIndictorChecked = "Cost";
      tempIndicatorShow +=
        `<tr>
      <td>` +
        document.getElementById("indicator-name-" + i).value +
        `</td><td>` +
        document.getElementById("indicator-weight-" + i).value +
        `</td>
      <td>` +
        tempIndictorChecked +
        `</td>
      </tr>`;
    } else {
      tempIndictorChecked = "Benefit";
      tempIndicatorShow +=
        `<tr>
      <td>` +
        document.getElementById("indicator-name-" + i).value +
        `</td><td>` +
        document.getElementById("indicator-weight-" + i).value +
        `</td>
      <td>` +
        tempIndictorChecked +
        `</td>
      </tr>`;
    }
  }
  tempIndicatorShow += `</tbody>`;
  /* SHOWING INDICATOR TABLE END */

  /* SHOWING ALL MATRIKS TABLE START */
  var tempColspan = choicesArrayLength + 1;
  var tempAllMatrixShow =
    `<tbody id="all_matrix">
    <tr style="background-color: #d6eeee">
      <td colspan="` +
    tempColspan +
    `">
        <center><strong>Nilai Matriks</strong></center>
      </td>
    </tr>
    <tr>
      <td></td>`;

  for (let i = 1; i <= choicesArrayLength; i++) {
    tempAllMatrixShow +=
      `
      <td><strong>` +
      document.getElementById("choices-" + i).value +
      `</strong></td>`;
  }
  tempAllMatrixShow += `</tr>`;

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    tempAllMatrixShow +=
      `<tr>
      <td><strong>` +
      tempNameIndicator +
      `</strong></td>`;
    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      let arrayTempValueKuadrat = document.getElementById("matrix_" + iIndicatorLength + "-" + iChoicesLength).value;
      tempAllMatrixShow += `<td>` + arrayTempValueKuadrat + `</td>`;
    }
    tempAllMatrixShow += `</tr>`;
  }
  tempAllMatrixShow += `</tbody>`;
  /* SHOWING ALL MATRIKS TABLE END */

  /* SHOWING AKAR JUMLAH KUADRAT TABLE START */
  var tempNilaiAkarKuadrat =
    `<tbody id="nilai_kuadrat">
    <tr style="background-color: #d6eeee">
      <td colspan="` +
    tempColspan +
    `">
        <center><strong>Nilai Akar</strong></center>
      </td>
    </tr>
    <tr>
      <td></td>`;
  for (let i = 1; i <= choicesArrayLength; i++) {
    tempNilaiAkarKuadrat +=
      `
      <td><strong>` +
      document.getElementById("choices-" + i).value +
      `</strong></td>`;
  }
  tempNilaiAkarKuadrat += `</tr>`;

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    tempNilaiAkarKuadrat +=
      `<tr>
      <td><strong>` +
      tempNameIndicator +
      `</strong></td>`;
    let tempHitungKuadrat = 0;
    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = Math.pow(objIndicator.MatrixAll[iMatrixAll].Value, 2);
        tempHitungKuadrat = tempHitungKuadrat + arrayTempValueKuadrat;
      }
    }
    for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
      let tempAkarKuadrat = Math.sqrt(tempHitungKuadrat);
      tempNilaiAkarKuadrat += `<td>` + tempAkarKuadrat.toFixed(3) + `</td>`;
    }
    tempNilaiAkarKuadrat += `</tr>`;
  }
  tempNilaiAkarKuadrat += `</tbody>`;
  /* SHOWING AKAR JUMLAH KUADRAT TABLE END */

  /* SHOWING TERNORMALISASI TABLE START */
  var tempNilaiTernormalisasi =
    `<tbody id="nilai_kuadrat">
    <tr style="background-color: #d6eeee">
      <td colspan="` +
    tempColspan +
    `">
        <center><strong>Nilai Ternormalisasi</strong></center>
      </td>
    </tr>
    <tr>
      <td></td>`;
  for (let i = 1; i <= choicesArrayLength; i++) {
    tempNilaiTernormalisasi +=
      `
      <td><strong>` +
      document.getElementById("choices-" + i).value +
      `</strong></td>`;
  }
  tempNilaiTernormalisasi += `</tr>`;

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    tempNilaiTernormalisasi +=
      `<tr>
      <td><strong>` +
      tempNameIndicator +
      `</strong></td>`;
    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = objIndicator.nilaiTernormalisasi[iMatrixAll].Value;
        tempNilaiTernormalisasi += `<td>` + arrayTempValueKuadrat.toFixed(3) + `</td>`;
      }
    }
    tempNilaiTernormalisasi += `</tr>`;
  }
  tempNilaiTernormalisasi += `</tbody>`;
  /* SHOWING TERNORMALISASI TABLE END */

  /* SHOWING TERNORMALISASI TERBOBOT TABLE START */
  var tempNilaiTernormalisasiTerbobot =
    `<tbody id="nilai_kuadrat">
    <tr style="background-color: #d6eeee">
      <td colspan="` +
    tempColspan +
    `">
        <center><strong>Nilai Ternormalisasi Terbobot</strong></center>
      </td>
    </tr>
    <tr>
      <td></td>`;
  for (let i = 1; i <= choicesArrayLength; i++) {
    tempNilaiTernormalisasiTerbobot +=
      `
      <td><strong>` +
      document.getElementById("choices-" + i).value +
      `</strong></td>`;
  }
  tempNilaiTernormalisasiTerbobot += `</tr>`;

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var matrixName = "Matrix_" + iIndicatorLength;
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    tempNilaiTernormalisasiTerbobot +=
      `<tr>
      <td><strong>` +
      tempNameIndicator +
      `</strong></td>`;
    for (let iMatrixAll = 0; iMatrixAll < matrixArrayLength; iMatrixAll++) {
      if (objIndicator.MatrixAll[iMatrixAll].Matrix == matrixName) {
        let arrayTempValueKuadrat = objIndicator.nilaiTerbobot[iMatrixAll].Value;
        tempNilaiTernormalisasiTerbobot += `<td>` + arrayTempValueKuadrat.toFixed(3) + `</td>`;
      }
    }
    tempNilaiTernormalisasiTerbobot += `</tr>`;
  }
  tempNilaiTernormalisasiTerbobot += `</tbody>`;
  /* SHOWING TERNORMALISASI TERBOBOT TABLE END */

  /* SHOWING A+/A- TABLE START */
  var tempAPlusNegatifShow = `<tbody id="nilai_aplusnegatif">
    <tr style="background-color: #d6eeee">
    <td></td>
      <td>
        <center><strong>Nilai A+ (Max)</strong></center>
      </td>
      <td>
        <center><strong>Nilai A- (Min)</strong></center>
      </td>
    </tr>
    <tr>`;

  for (let iIndicatorLength = 1; iIndicatorLength <= indicatorArrayLength; iIndicatorLength++) {
    var tempNameIndicator = document.getElementById("indicator-name-" + iIndicatorLength).value;
    if (objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].MatrixOf == tempNameIndicator) {
      tempAPlusNegatifShow += `<td><strong>` + objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].MatrixOf + `</strong></td><td>` + objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].plusA.toFixed(3) + `</td><td>` + objIndicator.maxMinPlusNegatifA[iIndicatorLength - 1].negatifA.toFixed(3) + `</td></tr>`;
    }
  }
  tempAPlusNegatifShow += `</tbody>`;
  /* SHOWING A+/A- TABLE END */

  /* SHOWING D+/D- TABLE START */
  var tempDPlusNegatifShow = `<tbody id="nilai_aplusnegatif">
    <tr style="background-color: #d6eeee">
    <td></td>
      <td>
        <center><strong>Nilai D+ (Max)</strong></center>
      </td>
      <td>
        <center><strong>Nilai D- (Min)</strong></center>
      </td>
    </tr>
    <tr>`;

  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    var tempNameChoices = document.getElementById("choices-" + iChoicesLength).value;
    if (objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].Choice == tempNameChoices) {
      tempDPlusNegatifShow += `<td><strong>` + objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].Choice + `</strong></td><td>` + objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].plusD.toFixed(3) + `</td><td>` + objIndicator.nilaiPlusNegatifD[iChoicesLength - 1].negatifD.toFixed(3) + `</td></tr>`;
    }
  }
  tempDPlusNegatifShow += `</tbody>`;
  /* SHOWING D+/D- TABLE END */

  /* SHOWING NILAI PILIHAN PREFERENSI TABLE START */
  var tempNilaiPilihanAlternatifShow = `<tbody id="nilai_pilihanAlternatif">
    <tr style="background-color: #d6eeee">
      <td colspan="3">
        <center><strong>Nilai Preferensi Pilihan Alternatif</strong></center>
      </td>
    </tr>`;
  let allChoicesValue = new Array();
  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    let tempReff = objIndicator.nilaiPreferensiAlternatif[iChoicesLength - 1].NilaiPreferensi;
    for (let index = 1; index <= choicesArrayLength; index++) {
      if (tempReff == objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi) {
        allChoicesValue.push(objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi);
      }
    }
  }

  for (let iChoicesLength = 1; iChoicesLength <= choicesArrayLength; iChoicesLength++) {
    for (let index = 1; index <= choicesArrayLength; index++) {
      allChoicesValue.sort();
      allChoicesValue.reverse();
      //console.log(allChoicesValue);
      if (allChoicesValue[iChoicesLength - 1] == objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi) {
        if (iChoicesLength == 1) {
          tempNilaiPilihanAlternatifShow +=
            `<tr class="btn-success">
        <td><strong>Rank ` +
            iChoicesLength +
            `</strong></td>
        <td><strong>` +
            objIndicator.nilaiPreferensiAlternatif[index - 1].Choice +
            `</strong></td>
        <td><strong>` +
            objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi.toFixed(3) +
            `</strong></td></tr>`;
        } else {
          tempNilaiPilihanAlternatifShow +=
            `<tr>
        <td><strong>Rank ` +
            iChoicesLength +
            `</strong></td>
        <td><strong>` +
            objIndicator.nilaiPreferensiAlternatif[index - 1].Choice +
            `</strong></td>
        <td><strong>` +
            objIndicator.nilaiPreferensiAlternatif[index - 1].NilaiPreferensi.toFixed(3) +
            `</strong></td></tr>`;
        }
      }
    }
  }
  tempNilaiPilihanAlternatifShow += `</tbody>`;
  /* SHOWING NILAI PILIHAN PREFERENSI TABLE END */

  var tempBtnDownloadXLS = `
    <div class="col-sm-12">
      <center><a id="downloadExcel" onclick="ExportToExcel('xlsx')" type="button" data-toggle="modal" data-target="#topsisFullResult" class="btn btn-info btn-lg btn-block">Download File Excel <span class="oi oi-file "></span></button></a></center>
    </div>`;

  $("#tbl_exporttable_to_xls").html(tempChoicesShow + tempIndicatorShow + tempAllMatrixShow + tempNilaiAkarKuadrat + tempNilaiTernormalisasi + tempNilaiTernormalisasiTerbobot + tempAPlusNegatifShow + tempDPlusNegatifShow + tempNilaiPilihanAlternatifShow);
  $("#btn_download_xls").html(tempBtnDownloadXLS);
  /*document.getElementById("tbl_exporttable_to_xls").innerHTML = tempChoicesShow + tempIndicatorShow + tempAllMatrixShow + tempNilaiAkarKuadrat + tempNilaiTernormalisasi + tempNilaiTernormalisasiTerbobot + tempAPlusNegatifShow + tempDPlusNegatifShow + tempNilaiPilihanAlternatifShow + tempBtnDownloadXLS;*/
}

/* DOWNLOAD FILE START*/
/* onclick="exportJson(this)" */
function exportJson(el) {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayIndicatorJSONData));
  // what to return in order to show download window?

  el.setAttribute("href", "data:" + data);
  el.setAttribute("download", "dataTOPSIS.json");
}

/*<script type="text/javascript" src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>*/
function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" }) : XLSX.writeFile(wb, fn || "Data TOPSIS." + (type || "xlsx"));
}
/*END DOWNLOAD FILE*/

function closeResult() {
  $("#popup_result").attr("style", "width: 0%;");
  arrayIndicatorJSONData = '{"MatrixAll":[],"nilaiKuadratBasic":[],"nilaiTernormalisasi":[],"nilaiTerbobot":[],"maxMinPlusNegatifA":[],"nilaiPlusNegatifD":[],"nilaiPreferensiAlternatif":[]}';
}
