/** @format */

// PARENT VARIABLE
const MatrixValue = new Map();
const CalculateTopsis = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let i = 1; i <= RowChoices.length; i++) {
    const ArrayValueFromMatrix = new Array();

    for (let j = 1; j <= RowCriteria.length; j++) {
      const tempIDForm = `choices-${i}-criteria-${j}`;
      ArrayValueFromMatrix.push(parseInt($(`#${tempIDForm}`).val()));
    }

    MatrixValue.set(`choices-${i}`, ArrayValueFromMatrix);
  }

  GetKuadratPembagiTernormalisasiValue();
};

const GetKuadratPembagiTernormalisasiValue = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let j = 0; j < RowCriteria.length; j++) {
    const tempArrayKuadratPemangkatan = new Array();

    let tempTotalBasicChoicesValueToKuadrat = 0;
    for (let i = 1; i <= RowChoices.length; i++) {
      const tempValueEachother = MatrixValue.get(`choices-${i}`);
      const tmepBasicValueKuadrat = Math.pow(tempValueEachother[j], 2);
      tempTotalBasicChoicesValueToKuadrat = tempTotalBasicChoicesValueToKuadrat + tmepBasicValueKuadrat;
    }
    tempArrayKuadratPemangkatan.push(tempTotalBasicChoicesValueToKuadrat);
    const nilaiAkarKuadratPemangkatan = Math.sqrt(tempTotalBasicChoicesValueToKuadrat);
    tempArrayKuadratPemangkatan.push(parseFloat(nilaiAkarKuadratPemangkatan.toFixed(3)));

    MatrixValue.set(`pemangkatan-kuadrat-criteria-${j + 1}`, tempArrayKuadratPemangkatan);
  }
  GetPembagianTernormalisasi();
};

const GetPembagianTernormalisasi = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let i = 1; i <= RowChoices.length; i++) {
    const tempArrayKuadratPembagiTernormalisasi = new Array();
    const tempValueEachother = MatrixValue.get(`choices-${i}`);

    for (let j = 0; j < RowCriteria.length; j++) {
      const tempValueEachotherMultipleTwo = MatrixValue.get(`pemangkatan-kuadrat-criteria-${j + 1}`);
      const hasilPerhitunganTernormalisasi = tempValueEachother[j] / tempValueEachotherMultipleTwo[1];
      tempArrayKuadratPembagiTernormalisasi.push(parseFloat(hasilPerhitunganTernormalisasi.toFixed(3)));
      // console.log(`${tempValueEachother[j]} / ${tempValueEachotherMultipleTwo[1]} = ${hasilPerhitunganTernormalisasi.toFixed(3)}`);
    }
    MatrixValue.set(`pemangkatan-kuadrat-ternormalisasi-choices-${i}`, tempArrayKuadratPembagiTernormalisasi);
  }
  GetTernormalisasiTerbobot();
};

const GetTernormalisasiTerbobot = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let i = 1; i <= RowChoices.length; i++) {
    const tempNilaiTernormalisasi = MatrixValue.get(`pemangkatan-kuadrat-ternormalisasi-choices-${i}`);
    const tempArrayTernormalisasiTerbobot = new Array();
    for (let j = 1; j <= RowCriteria.length; j++) {
      if ($(`#criteria-negative-${j}`).is(':checked')) {
        const tempNilaiTernormalisasiTerbobot = tempNilaiTernormalisasi[j - 1] * $(`#criteria-bobot-${j}`).val() * -1;
        tempArrayTernormalisasiTerbobot.push(parseFloat(tempNilaiTernormalisasiTerbobot.toFixed(3)));
      } else {
        const tempNilaiTernormalisasiTerbobot = tempNilaiTernormalisasi[j - 1] * $(`#criteria-bobot-${j}`).val() * 1;
        tempArrayTernormalisasiTerbobot.push(parseFloat(tempNilaiTernormalisasiTerbobot.toFixed(3)));
      }
    }
    MatrixValue.set(`nilai-ternormalisasi-terbobot-choices-${i}`, tempArrayTernormalisasiTerbobot);
  }
  GetAPlusandANegativeMaxandMin();
};

const GetAPlusandANegativeMaxandMin = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let j = 1; j <= RowCriteria.length; j++) {
    const tempIdealAplusandANegative = new Array();
    for (let i = 1; i <= RowChoices.length; i++) {
      const tempNilaiTernormalisasiTerbobot = MatrixValue.get(`nilai-ternormalisasi-terbobot-choices-${i}`);
      tempIdealAplusandANegative.push(tempNilaiTernormalisasiTerbobot[j - 1]);
    }

    const tempArrayAPlusandANegative = new Array();
    if ($(`#criteria-negative-${j}`).is(':checked')) {
      const tempPlusA = Math.min.apply(Math, tempIdealAplusandANegative);
      const tempNegatifA = Math.max.apply(Math, tempIdealAplusandANegative);
      tempArrayAPlusandANegative.push(tempPlusA);
      tempArrayAPlusandANegative.push(tempNegatifA);
    } else {
      const tempPlusA = Math.max.apply(Math, tempIdealAplusandANegative);
      const tempNegatifA = Math.min.apply(Math, tempIdealAplusandANegative);
      tempArrayAPlusandANegative.push(tempPlusA);
      tempArrayAPlusandANegative.push(tempNegatifA);
    }
    MatrixValue.set(`nilai-Aplus-Anegative-criteria-${j}`, tempArrayAPlusandANegative);
  }
  GetDplusandDnegativeMaxMin();
};

const GetDplusandDnegativeMaxMin = () => {
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  for (let i = 1; i <= RowChoices.length; i++) {
    const tempNilaiTernormalisasiTerbobot = MatrixValue.get(`nilai-ternormalisasi-terbobot-choices-${i}`);
    let tempHitungPlusD = 0;
    let tempHitungNegatifD = 0;
    const tempArrayDPlusandDNegative = new Array();
    for (let j = 0; j < RowCriteria.length; j++) {
      const tempArrayAPlusandANegative = MatrixValue.get(`nilai-Aplus-Anegative-criteria-${j + 1}`);
      const tempPlusD = tempArrayAPlusandANegative[0] - tempNilaiTernormalisasiTerbobot[j];
      const tempKuadratplusD = Math.pow(tempPlusD, 2);
      tempHitungPlusD = tempHitungPlusD + tempKuadratplusD;

      const tempNegativeD = tempArrayAPlusandANegative[1] - tempNilaiTernormalisasiTerbobot[j];
      const tempKuadratNegativeD = Math.pow(tempNegativeD, 2);
      tempHitungNegatifD = tempHitungNegatifD + tempKuadratNegativeD;
    }
    tempArrayDPlusandDNegative.push(parseFloat(Math.sqrt(tempHitungPlusD).toFixed(3)));
    tempArrayDPlusandDNegative.push(parseFloat(Math.sqrt(tempHitungNegatifD).toFixed(3)));
    MatrixValue.set(`nilai-Dplus-Dnegative-choices-${i}`, tempArrayDPlusandDNegative);
  }
  GetValueAlternativeForEachOther();
};

const GetValueAlternativeForEachOther = () => {
  const RowChoices = $('.row-choice');

  for (let i = 1; i <= RowChoices.length; i++) {
    const DplusandDnegative = MatrixValue.get(`nilai-Dplus-Dnegative-choices-${i}`);
    const tempNilaiPrefenceAlternative = DplusandDnegative[1] + DplusandDnegative[0];
    const nilaiPreferenceAlternative = DplusandDnegative[1] / tempNilaiPrefenceAlternative;
    MatrixValue.set(`nilai-preference-alternative-choices-${i}`, parseFloat(nilaiPreferenceAlternative.toFixed(3)));
  }
};

function openOverlay() {
  $('#myOverlay').css({
    display: 'block',
    visibility: 'visible',
  });

  DisplayTheTopsisData();
}

function DisplayTheTopsisData() {
  const RowChoices = $('.row-choice');
  const ArrayOfReferenceAlternativeValue = new Array();
  for (let i = 1; i <= RowChoices.length; i++) {
    const ReferenceAlternativeValue = MatrixValue.get(`nilai-preference-alternative-choices-${i}`);
    ArrayOfReferenceAlternativeValue.push(ReferenceAlternativeValue);
  }

  ArrayOfReferenceAlternativeValue.sort();
  ArrayOfReferenceAlternativeValue.reverse();
  const HtmlToAppend = ArrayOfReferenceAlternativeValue.map((value, index) => {
    for (let i = 1; i <= RowChoices.length; i++) {
      const ReferenceAlternativeValue = MatrixValue.get(`nilai-preference-alternative-choices-${i}`);
      if (value === ReferenceAlternativeValue) {
        const ChoicesName = $(`#choice-name-${i}`).val();
        return `
        <li>
          <span class="icon"><i class="fas fa-check-circle"></i></span>
          <span class="list-item">Pilihan <strong>${ChoicesName}</strong> dengan nilai <strong> ${value} </strong></span>
        </li>
        `;
      }
    }
  });
  $('#fill-the-best-calculate-topsis').html(HtmlToAppend[0]);
  $('#fill-the-calculate-topsis').html(HtmlToAppend);
}

function closeOverlay() {
  $('#myOverlay').css({
    display: 'none',
    visibility: 'collapse',
  });
}

let isTableOpen = false;
function ShowTableOfTOPSIS() {
  if (!isTableOpen) {
    $('#result-topsis-table-container').css({
      display: 'block',
      visibility: 'visible',
    });
    isTableOpen = true;
  } else {
    $('#result-topsis-table-container').css({
      display: 'none',
      visibility: 'collapse',
    });
    isTableOpen = false;
  }
  console.log(MatrixValue);
  TableOfTOPSIS();
}

const ReloadNameChoicesCriteriaOnMatrix = () => {
  CalculateTopsis();
  const RowChoices = $('.row-choice');
  for (let i = 1; i <= RowChoices.length; i++) {
    const ChoiceName = $(`#choice-name-${i}`).val();
    $(`#matriks-row-criteria-choices-${i} th`).html(ChoiceName);
  }

  const RowCriteria = $('.row-criteria');
  for (let i = 1; i <= RowCriteria.length; i++) {
    const CriteriaName = $(`#criteria-name-${i}`).val();
    $(`#matriks-criteria-name-${i}`).html(CriteriaName);
  }
};

function TableOfTOPSIS() {
  CalculateTopsis();
  const RowChoices = $('.row-choice');
  const RowCriteria = $('.row-criteria');

  const HtmlTabelChoices = `
  <table id="container-choices" class="table table-striped table-bordered">
    <thead id="header-choices">
      <tr style="background-color: #6cd9f5;">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nama Pilihan</th>
      </tr>
    </thead>
    <tbody id="body-choices">
    </tbody>
  </table>
  `;
  $('#result-topsis-table').html(HtmlTabelChoices);

  for (let i = 1; i <= RowChoices.length; i++) {
    const AllChoicesName = $(`#choice-name-${i}`).val();
    const HtmlChoicesName = `
    <tr>
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllChoicesName}</td>
    </tr>
    `;
    $('#body-choices').append(HtmlChoicesName);
  }

  const HtmlTabelCriterias = `
  <table id="container-criterias" class="table table-striped table-bordered">
    <thead id="header-criterias">
      <tr style="background-color: #6cd9f5;">
        <th colspan="3" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai Kriteria</th>
      </tr>
    </thead>
    <tbody id="body-criterias">
    <tr style="background-color: #6cd9f5;">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nama</th>
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Bobot</th>
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Cost/Benefit</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelCriterias);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const AllCriteriaValue = $(`#criteria-bobot-${i}`).val();
    const AllCriteriaCostBenefit = $(`#criteria-negative-${i}`).is(':checked') ? 'Cost' : 'Benefit';
    const HtmlCriteriaName = `
    <tr>
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllCriteriaName}</td>
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllCriteriaValue}</td>
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllCriteriaCostBenefit}</td>
    </tr>
    `;
    $('#body-criterias').append(HtmlCriteriaName);
  }

  const HtmlTabelMatrix = `
  <table id="container-matrix" class="table table-striped table-bordered">
    <thead id="header-matrix">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowCriteria.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai Matrix</th>
      </tr>
    </thead>
    <tbody id="body-matrix">
      <tr id="header-criteria-of-matrix">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelMatrix);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const HeaderCriteriaOfMatrix = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllCriteriaName}</th>`;
    $('#header-criteria-of-matrix').append(HeaderCriteriaOfMatrix);
  }

  for (let i = 1; i <= RowChoices.length; i++) {
    const AllChoicesName = $(`#choice-name-${i}`).val();
    const HtmlCriteriaName = `
    <tr id="choices-name-of-matrix-${i}">
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllChoicesName}</td>
    </tr>
    `;
    $('#body-matrix').append(HtmlCriteriaName);

    for (let j = 1; j <= RowCriteria.length; j++) {
      const ValueOfMatrix = $(`#choices-${i}-criteria-${j}`).val();
      const ValueOfMatrixChoices = `<td style="vertical-align: middle; text-align: center; font-weight: bold">${ValueOfMatrix}</td>`;
      $(`#choices-name-of-matrix-${i}`).append(ValueOfMatrixChoices);
    }
  }

  const HtmlTabelOfKuadratCriteria = `
  <table id="container-kuadrat" class="table table-striped table-bordered">
    <thead id="header-kuadrat">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowCriteria.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai Pemangkatan/Kuadrat Akar Criteria</th>
      </tr>
    </thead>
    <tbody id="body-kuadrat">
      <tr id="header-criteria-of-kuadrat">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
      <tr id="total-criteria-kuadrat-pemangkatan">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Total Kuadrat</th>
      </tr>
      <tr id="total-akar-criteria-pemangkatan">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Total Akar</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelOfKuadratCriteria);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const HeaderCriteriaOfMatrix = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllCriteriaName}</th>`;
    $('#header-criteria-of-kuadrat').append(HeaderCriteriaOfMatrix);

    const TempValueOfKuadratPemangkatanAkar = MatrixValue.get(`pemangkatan-kuadrat-criteria-${i}`);
    const TotalCriteriaPemangkatan = `<th style="font-weight: bold">${TempValueOfKuadratPemangkatanAkar[0]}</th>`;
    $('#total-criteria-kuadrat-pemangkatan').append(TotalCriteriaPemangkatan);

    const TempValueOfAkar = MatrixValue.get(`pemangkatan-kuadrat-criteria-${i}`);
    const TotalAkarPemangkatan = `<th style="font-weight: bold">${TempValueOfAkar[1]}</th>`;
    $('#total-akar-criteria-pemangkatan').append(TotalAkarPemangkatan);
  }

  const HtmlTabelOfTernormalisasi = `
  <table id="container-ternormalisasi" class="table table-striped table-bordered">
    <thead id="header-ternormalisasi">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowCriteria.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai Ternormalisasi</th>
      </tr>
    </thead>
    <tbody id="body-ternormalisasi">
      <tr id="header-criteria-of-ternormalisasi">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelOfTernormalisasi);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const HtmlTabelOfTernormalisasiCriteria = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllCriteriaName}</th>`;
    $('#header-criteria-of-ternormalisasi').append(HtmlTabelOfTernormalisasiCriteria);
  }

  for (let i = 1; i <= RowChoices.length; i++) {
    const AllChoicesName = $(`#choice-name-${i}`).val();
    const AllValueChoicesOfCriteriaTernormalisasi = MatrixValue.get(`pemangkatan-kuadrat-ternormalisasi-choices-${i}`);
    const HtmlCriteriaName = `
    <tr id="choices-name-of-matrix-ternormalisasi-${i}">
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllChoicesName}</td>
    </tr>
    `;
    $('#body-ternormalisasi').append(HtmlCriteriaName);

    for (let j = 1; j <= RowCriteria.length; j++) {
      const ValueOfMatrix = AllValueChoicesOfCriteriaTernormalisasi[j - 1];
      const ValueOfMatrixChoices = `<td style="vertical-align: middle; text-align: center; font-weight: bold">${ValueOfMatrix}</td>`;
      $(`#choices-name-of-matrix-ternormalisasi-${i}`).append(ValueOfMatrixChoices);
    }
  }

  const HtmlTabelOfTernormalisasiTerbobot = `
  <table id="container-ternormalisasi-terbobot" class="table table-striped table-bordered">
    <thead id="header-ternormalisasi-terbobot">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowCriteria.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai Ternormalisasi Terbobot</th>
      </tr>
    </thead>
    <tbody id="body-ternormalisasi-terbobot">
      <tr id="header-criteria-of-ternormalisasi-terbobot">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelOfTernormalisasiTerbobot);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const HtmlTabelOfTernormalisasiCriteria = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllCriteriaName}</th>`;
    $('#header-criteria-of-ternormalisasi-terbobot').append(HtmlTabelOfTernormalisasiCriteria);
  }

  for (let i = 1; i <= RowChoices.length; i++) {
    const AllChoicesName = $(`#choice-name-${i}`).val();
    const AllValueChoicesOfCriteriaTernormalisasiTerbobot = MatrixValue.get(`nilai-ternormalisasi-terbobot-choices-${i}`);;
    const HtmlCriteriaName = `
    <tr id="choices-name-of-matrix-ternormalisasi-terbobot-${i}">
      <td style="vertical-align: middle; text-align: center; font-weight: bold">${AllChoicesName}</td>
    </tr>
    `;
    $('#body-ternormalisasi-terbobot').append(HtmlCriteriaName);

    for (let j = 1; j <= RowCriteria.length; j++) {
      const ValueOfMatrix = AllValueChoicesOfCriteriaTernormalisasiTerbobot[j - 1];
      const ValueOfMatrixChoices = `<td style="vertical-align: middle; text-align: center; font-weight: bold">${ValueOfMatrix}</td>`;
      $(`#choices-name-of-matrix-ternormalisasi-terbobot-${i}`).append(ValueOfMatrixChoices);
    }
  }

  const HtmlTabelOfAplusAnegativeCriteria = `
  <table id="container-aplus-anegative" class="table table-striped table-bordered">
    <thead id="header-aplus-anegative">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowCriteria.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai A+/A- Criteria</th>
      </tr>
    </thead>
    <tbody id="body-aplus-anegative">
      <tr id="header-criteria-of-aplus-anegative">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
      <tr id="total-criteria-aplus">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">A+</th>
      </tr>
      <tr id="total-criteria-anegative">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">A-</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelOfAplusAnegativeCriteria);

  for (let i = 1; i <= RowCriteria.length; i++) {
    const AllCriteriaName = $(`#criteria-name-${i}`).val();
    const HeaderCriteriaOfMatrix = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllCriteriaName}</th>`;
    $('#header-criteria-of-aplus-anegative').append(HeaderCriteriaOfMatrix);

    const TempValueOfAPlusANegative = MatrixValue.get(`nilai-Aplus-Anegative-criteria-${i}`);
    const TotalCriteriaAplus = `<th style="font-weight: bold">${TempValueOfAPlusANegative[0]}</th>`;
    $('#total-criteria-aplus').append(TotalCriteriaAplus);
    
    const TotalCriteriaAnegative = `<th style="font-weight: bold">${TempValueOfAPlusANegative[1]}</th>`;
    $('#total-criteria-anegative').append(TotalCriteriaAnegative);
  }

  const HtmlTabelOfDplusDnegativeCriteria = `
  <table id="container-dplus-dnegative" class="table table-striped table-bordered">
    <thead id="header-dplus-dnegative">
      <tr style="background-color: #6cd9f5;">
        <th colspan="${
          RowChoices.length + 1
        }" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">Nilai D+/D- Choices</th>
      </tr>
    </thead>
    <tbody id="body-dplus-dnegative">
      <tr id="header-choices-of-dplus-dnegative">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
      </tr>
      <tr id="total-choices-dplus">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">D+</th>
      </tr>
      <tr id="total-choices-dnegative">
        <th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">D-</th>
      </tr>
    </tbody>
  </table>
  `;
  $('#result-topsis-table').append(HtmlTabelOfDplusDnegativeCriteria);

  for (let i = 1; i <= RowChoices.length; i++) {
    const AllChoicesName = $(`#choice-name-${i}`).val();
    const HeaderChoicesOfMatrix = `<th scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">${AllChoicesName}</th>`;
    $('#header-choices-of-dplus-dnegative').append(HeaderChoicesOfMatrix);

    const TempValueOfDPlusDNegative = MatrixValue.get(`nilai-Dplus-Dnegative-choices-${i}`);
    const TotalChoicesDplus = `<th style="font-weight: bold">${TempValueOfDPlusDNegative[0]}</th>`;
    $('#total-choices-dplus').append(TotalChoicesDplus);
    
    const TotalChoicesDnegative = `<th style="font-weight: bold">${TempValueOfDPlusDNegative[1]}</th>`;
    $('#total-choices-dnegative').append(TotalChoicesDnegative);
  }
  
  
  // MatrixValue.get(`nilai-preference-alternative-choices-${i}`);
}

// ExportToExcel('xlsx');
function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById('tbl_exporttable_to_xls');
  var wb = XLSX.utils.table_to_book(elt, { sheet: 'sheet1' });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
    : XLSX.writeFile(wb, fn || 'Data TOPSIS.' + (type || 'xlsx'));
}
