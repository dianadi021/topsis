/** @format */
document.addEventListener('DOMContentLoaded', function () {
  const RowChoices = $('.row-choice');
  if (RowChoices.length <= 3) {
    $('#remove-choice').attr('disabled', 'disabled');
  }
  const RowCriteria = $('.row-criteria');
  if (RowCriteria.length <= 3) {
    $('#remove-kriteria').attr('disabled', 'disabled');
  }
});

$(document).ready(() => {
  // const serverURL = `http://${window.location.host}/assets`;
  const serverURL = 'https://dianadi021.github.io/topsis/assets';

  $.getScript(serverURL + '/scripts/js/personal-function.js', () => {
    DisableRightClickOnMouse();
    $('#information').html(informationHTML);
    $('#tutorial').html(tutorialHTML);

    $('#add-choice').click(() => {
      const RowChoices = $('.row-choice');
      ChoicesButtonController(true, ++RowChoices.length);

      if (RowChoices.length > 1) {
        $('#remove-choice').removeAttr('disabled');
      }
    });
    $('#remove-choice').click(() => {
      const RowChoices = $('.row-choice');
      ChoicesButtonController(false, RowChoices.length);

      if (RowChoices.length <= 3) {
        $('#remove-choice').attr('disabled', 'disabled');
      }
    });

    $('#add-kriteria').click(() => {
      const RowCriteria = $('.row-criteria');
      CriteriaButtonController(true, ++RowCriteria.length);

      if (RowCriteria.length > 1) {
        $('#remove-kriteria').removeAttr('disabled');
      }
    });
    $('#remove-kriteria').click(() => {
      const RowCriteria = $('.row-criteria');
      CriteriaButtonController(false, RowCriteria.length);

      if (RowCriteria.length <= 3) {
        $('#remove-kriteria').attr('disabled', 'disabled');
      }
    });
  });

  $.getScript(serverURL + '/views/topsis.js', () => {
    $('#reload-name-choices-criteria').click(() => {
      ReloadNameChoicesCriteriaOnMatrix();
    });

    $('#calculate-topsis').click(() => {
      CalculateTopsis();
      openOverlay();
    });

    $('#show-table-of-topsis').click(() => {
      ShowTableOfTOPSIS();
    });

    $('#reload-table').click(() => {
      TableOfTOPSIS();
    });

    $('#download-topsis').click(() => {
      window.location.href = 'https://saweria.co/dianskuad';
      // window.location.replace('https://www.example.com');
    });

    closeOverlay();
  });
});
