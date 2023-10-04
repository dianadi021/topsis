/** @format */

let isHamburgerMenuOpen = false;
function TogglerMainMenuHamburger() {
  if (isHamburgerMenuOpen) {
    $('#main-menu').removeClass('active');
    $('#hamburger-menu').html("<i class='fa-solid fa-bars'></i>");
    isHamburgerMenuOpen = false;
  } else {
    $('#main-menu').attr('class', 'active');
    $('#hamburger-menu').html("<i class='fa-solid fa-xmark'></i>");
    isHamburgerMenuOpen = true;
  }
}

function DisableRightClickOnMouse() {
  function disableselect(e) {
    return false;
  }

  function reEnable() {
    return true;
  }

  document.onselectstart = new Function('return false');

  if (window.sidebar) {
    document.onmousedown = disableselect;
    document.onclick = reEnable;
  }
}

const ChoicesButtonController = (isButtonAdd, IDForm) => {
  if (isButtonAdd) {
    const addForm = `
      <tr id="row-choice-${IDForm}" class="row-choice">
        <th scope="row" style="vertical-align: middle; text-align: center">${IDForm}</th>
        <td>
          <input id="choice-name-${IDForm}" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="Nama Pilihan ${IDForm}" />
        </td>
      </tr>
      `;
    $('#form-choices-section').append(addForm);

    let HTMLToAppendBody = ``;
    const RowChoices = $('.row-choice');
    const RowCriteria = $('.row-criteria');
    for (let i = 1; i <= RowChoices.length; i++) {
      const ChoiceValue = $(`#choice-name-${i}`).val();
      let tempHTMLToAppendHeaderName = `
    <tr id="matriks-row-criteria-choices-${i}" class="row-criteria-choices">
      <th scope="row" style="vertical-align: middle; text-align: center; font-weight: bold">${ChoiceValue}</th>
    `;
      for (let j = 1; j <= RowCriteria.length; j++) {
        const tempHTMLValueNumberOfMatrix = `
      <td id="row-data-choices-${i}-criteria-${j}">
        <select id="choices-${i}-criteria-${j}" class="form-select" aria-label="Default select example">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>
      `;
        tempHTMLToAppendHeaderName = tempHTMLToAppendHeaderName + tempHTMLValueNumberOfMatrix;
      }
      HTMLToAppendBody = tempHTMLToAppendHeaderName + `</tr>`;
    }
    $('#body-matriks').append(HTMLToAppendBody);
  } else {
    $(`#row-choice-${IDForm}`).remove();
    $(`#matriks-row-criteria-choices-${IDForm}`).remove();
  }
};

const CriteriaButtonController = (isButtonAdd, IDForm) => {
  if (isButtonAdd) {
    const addForm = `
    <tr id="row-criteria-${IDForm}" class="row-criteria">
        <th scope="row" style="vertical-align: middle; text-align: center">${IDForm}</th>
        <td>
            <input
                id="criteria-name-${IDForm}"
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value="Nama Kriteria ${IDForm}"
            />
        </td>
        <td>
            <input id="criteria-negative-${IDForm}" type="checkbox" />
        </td>
        <td>
            <select id="criteria-bobot-${IDForm}" class="form-select" aria-label="Default select example">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </td>
    </tr>
      `;
    $('#form-criteria-section').append(addForm);

    const RowCriteria = $('.row-criteria');
    const CriteriaValue = $(`#criteria-name-${RowCriteria.length}`).val();
    const tempHTMLToAppendHeaderName = `
    <th id="matriks-criteria-name-${IDForm}" class="matriks-criteria-name" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">
      ${CriteriaValue}
    </th>
    `;
    $('#header-matriks-criteria-name').append(tempHTMLToAppendHeaderName);

    const RowChoices = $('.row-choice');
    for (let i = 1; i <= RowChoices.length; i++) {
      const tempHTMLValueNumberOfMatrix = `
        <td id="row-data-choices-${i}-criteria-${IDForm}">
          <select id="choices-${i}-criteria-${IDForm}" class="form-select" aria-label="Default select example">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        `;
      $(`#matriks-row-criteria-choices-${i}`).append(tempHTMLValueNumberOfMatrix);
    }
  } else {
    $(`#row-criteria-${IDForm}`).remove();
    $(`#matriks-criteria-name-${IDForm}`).remove();

    const RowChoices = $('.row-choice');
    for (let i = 1; i <= RowChoices.length; i++) {
      $(`#row-data-choices-${i}-criteria-${IDForm}`).remove();
    }
  }
};

const informationHTML = `
<div class="container-content">
  <div id="title-article">
    <h2 class="brd-bt-3">informasi</h2>
  </div>
  <div class="container">
    <p>
      Tools (Website) ini merupakan suatu final projek yang dibuat untuk melengkapi tugas akhir (skripsi) jurusan S1 - Informatika di
      Universitas AMIKOM Yogyakarta. Tools ini dibuat karena terinspirasi dari website
      <a href="https://decision-radar.com/Topsis.html" target="_blank" rel="noopener noreferrer dofollow" dofollow="dofollow"
        >Decision Radar Ez-TOPSIS</a
      >. Namun semua sistem <i>back-end</i> dari tools ini dikerjakan secara <i>manual</i> hanya dengan menggunakan bahasa
      <i>JavaScript</i> atau tanpa campur tangan <i>framework</i>. <i>Framework</i> yang digunakan hanyalah
      <a
        href="https://getbootstrap.com/docs/5.1/getting-started/introduction/"
        target="_blank"
        rel="noopener noreferrer dofollow"
        dofollow="dofollow"
        >Bootstrap</a
      >. Untuk rumus perhitungan, mengikuti materi yang tertulis pada artikel
      <a
        href="https://payahtidur.com/project/topsis"
        target="_blank"
        rel="noopener noreferrer dofollow"
        dofollow="dofollow"
        >Buku Informatika</a
      >.
    </p>
  </div>
</div>
`;

const tutorialHTML = `
<div class="container-content">
  <div id="title-article">
    <h2 class="brd-bt-3">tutorial</h2>
  </div>
  <div class="container">
    <iframe
      width="content"
      height="content"
      src="https://www.youtube.com/embed/8JTXyhpRDiQ"
      title="Aplikasi Penghitung Metode TOPSIS"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</div>
`;

// .HTML or REPLACE THE INSIDE ELEMENT START
// const FormMatrixNumber = () => {
//   const RowChoices = $('.row-choice');
//   const RowCriteria = $('.row-criteria');

//   let HTMLToAppendHeaderName = `
//   <th class="matriks-criteria-name" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">#</th>
//   `;
//   for (let i = 1; i <= RowCriteria.length; i++) {
//     const CriteriaValue = $(`#criteria-name-${i}`);
//     const tempHTMLToAppendHeaderName = `
//     <th id="matriks-criteria-name-${i}" class="matriks-criteria-name" scope="col" style="font-weight: bold" style="vertical-align: middle; text-align: center">
//       ${CriteriaValue.val()}
//     </th>
//     `;
//     HTMLToAppendHeaderName = HTMLToAppendHeaderName + tempHTMLToAppendHeaderName;
//   }

//   $('#header-matriks-criteria-name').html(HTMLToAppendHeaderName);

//   let HTMLToAppendBody = ``;
//   for (let i = 1; i <= RowChoices.length; i++) {
//     const ChoiceValue = $(`#choice-name-${i}`);
//     let tempHTMLToAppendHeaderName = `
//     <tr id="matriks-row-criteria-choices-${i}" class="row-criteria-choices">
//       <th scope="row" style="vertical-align: middle; text-align: center; font-weight: bold">${ChoiceValue.val()}</th>
//     `;
//     for (let j = 1; j <= RowCriteria.length; j++) {
//       const tempHTMLValueNumberOfMatrix = `
//       <td>
//         <select id="choices-${i}-criteria-${j}" class="form-select" aria-label="Default select example">
//           <option value="1" selected>1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </td>
//       `;
//       tempHTMLToAppendHeaderName = tempHTMLToAppendHeaderName + tempHTMLValueNumberOfMatrix;
//     }
//     HTMLToAppendBody = tempHTMLToAppendHeaderName + `</tr>`;
//   }

//   $('#body-matriks').html(HTMLToAppendBody);
// };
// .HTML or REPLACE THE INSIDE ELEMENT END
