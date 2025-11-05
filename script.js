$(document).ready(function() {
    jQuery.validationEngineLanguage.allRules['passwordCheck'] = {
  "regex": /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/,
  "alertText": "Password me kam se kam ek uppercase, ek lowercase, aur ek special character hona chahiye"
    };

  $("#formDialog").dialog({
    autoOpen: false,
    modal: true,
    width: 400
  });

  $("#addRecordBtn").click(function() {
    $("#formDialog").dialog("open");
  });

  $("#recordForm").validationEngine();

  $("#recordForm").submit(function(event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const age = $("#age").val();

    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
      </tr>
    `;

    $("#dataTable tbody").append(newRow);

    $("#recordForm")[0].reset();
    $("#formDialog").dialog("close");
  });
});


