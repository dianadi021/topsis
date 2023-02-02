var choice = 3;
var indicator = 3;

/* SIMPLE JQUERY START */
$(document).ready(function () {
  $("#add-choice").click(function () {
    if (choice > 2) {
      $("#choice_field").append(
        `<tr id='choice-` +
          choice +
          `'><th scope='row'>` +
          choice +
          `</th><td>
                    <input type='text' class='form-control handleChangeGlobal choices' value='name ` +
          choice +
          `' id='choices-` +
          choice +
          `'>
                  </td></tr>`
      );
      choice++;
      if (choice > 2) {
        document.getElementById("remove-choice").removeAttribute("disabled");
        /*if (choice == 8) {
                      document.getElementById("add-choice").setAttribute("disabled", "disabled");
                    }*/
      }
    }
  });
  $("#remove-choice").click(function () {
    if (choice != 2) {
      choice--;
      document.getElementById("choice_field").deleteRow(choice);
    }
    if (choice == 3) {
      document.getElementById("remove-choice").setAttribute("disabled", "disabled");
      //document.getElementById("add-choice").removeAttribute("disabled");
    }
  });
  $("#add-indicator").click(function () {
    //if (indicator > 7) {
    if (indicator > 2) {
      $("#indicator_field").append(
        `<tr id='indicator-` +
          indicator +
          `'><th scope='row'>` +
          indicator +
          `</th><td>
          <input type="text" class="form-control handleChangeGlobal indicator-name" value='name ` +
          indicator +
          `' id="indicator-name-` +
          indicator +
          `"></td><td>
          <input type="checkbox" class="indicator-negatif" id="indicator-negatif-` +
          indicator +
          `"></td> <td>
          <input type="number" class="form-control indicator-weight" value="1" id="indicator-weight-` +
          indicator +
          `"></td> <!--<td>
           <input type="checkbox" class="indicator-qualitative" id="indicator-qualitative-` +
          indicator +
          `"></td>--></tr>`
      );
      indicator++;
      if (indicator > 2) {
        document.getElementById("remove-indicator").removeAttribute("disabled");
        /*if (indicator == 8) {
              document.getElementById("add-indicator").setAttribute("disabled", "disabled");
            }*/
      }
    }
  });
  $("#remove-indicator").click(function () {
    if (indicator != 2) {
      indicator--;
      document.getElementById("indicator_field").deleteRow(indicator);
    }
    if (indicator == 3) {
      document.getElementById("remove-indicator").setAttribute("disabled", "disabled");
      //document.getElementById("add-indicator").removeAttribute("disabled");
    }
  });
  $(".accordion-button").click(function () {
    $("#valueChoicesName").html(handleChange("choices"));
    $("#valueIndicatorName").html(handleChange("indicator"));
  });
  $("#valueChoicesName").html(handleChange("choices"));
  $("#valueIndicatorName").html(handleChange("indicator"));
});
/* SIMPLE JQUERY END */
function handleChange(x) {
  /*----- AUTO FORM MATRIX NAME AND INDICATOR VALUE -----*/
  /*----- START -----*/
  const choicesArrayLength = document.getElementsByClassName("choices").length;
  const indicatorNameArrayLength = document.getElementsByClassName("indicator-name").length;

  if (x == "choices") {
    var innerHTMLChangeChoicesName = "<th></th>";
    for (let index = 1; index <= choicesArrayLength; index++) {
      innerHTMLChangeChoicesName += "<th><center>" + document.getElementById("choices-" + index).value + "</center></th>";
    }
    //document.getElementById("valueChoicesName").innerHTML = innerHTMLChangeChoicesName;
    return innerHTMLChangeChoicesName;
  }

  if (x == "indicator") {
    var innerHTMLChangeIndicatorName = "";
    for (let iLoopIndicator = 1; iLoopIndicator <= indicatorNameArrayLength; iLoopIndicator++) {
      innerHTMLChangeIndicatorName += `<tr class="rowsFormCols" id="rowsFormCols-` + iLoopIndicator + `"><th>` + document.getElementById("indicator-name-" + iLoopIndicator).value + `</th>`;
      for (let iLoopChoices = 1; iLoopChoices <= choicesArrayLength; iLoopChoices++) {
        innerHTMLChangeIndicatorName += `<td><input type="number" class="form-control matrixAll Matrix_` + iLoopIndicator + `" value="1" id="matrix_` + iLoopIndicator + `-` + iLoopChoices + `"></td>`;
      }
      innerHTMLChangeIndicatorName += `</tr>`;
    }

    //document.getElementById("valueIndicatorName").innerHTML = innerHTMLChangeIndicatorName;
    return innerHTMLChangeIndicatorName;
  }

  /*----- AUTO FORM MATRIX NAME AND INDICATOR VALUE -----*/
  /*----- END -----*/
}
