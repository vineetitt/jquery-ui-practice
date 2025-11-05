
$(document).ready(function () {
  const nameSuggestions = ["Vineet", "Arun", "Vishal", "David", "Rahul"];
  const emailSuggestions = ["vineet@gmail.com", "arun@gmail.com", "vishal2@gmail.com", "david32@outlook.com", "Rahul12@gmail.com"];
  setTimeout(function() {
  $("#name").autocomplete({
    source: nameSuggestions
  });

  $("#email").autocomplete({
    source: emailSuggestions
  });
    }, 500);

    CKEDITOR.replace("description");
  jQuery.validationEngineLanguage.allRules["passwordCheck"] = {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/,
    alertText:
      "Password me kam se kam ek uppercase, ek lowercase, aur ek special character hona chahiye",
  };
    

  $("#formDialog").dialog({
    autoOpen: false,
    modal: true,
    width: 400,
  });

  $("#addRecordBtn").click(function () {
    $("#formDialog").dialog("open");
  });

  $("#recordForm").validationEngine();

  $("#recordForm").submit(function (event) {
    event.preventDefault();

    CKEDITOR.instances.description.updateElement();

    const name = $("#name").val();
    const email = $("#email").val();
    const age = $("#age").val();
    const password = $("#password").val();
    const description = $("#description").val();

    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>${password}</td>
        <td>${description}</td>
      </tr>
    `;

    $("#dataTable tbody").append(newRow);

    $("#recordForm")[0].reset();
    $("#formDialog").dialog("close");
  });
});




