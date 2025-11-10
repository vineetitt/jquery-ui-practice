$(document).ready(function () {
  const nameSuggestions = ["Vineet", "Arun", "Vishal", "David", "Rahul"];
  const emailSuggestions = [
    "vineet@gmail.com",
    "arun@gmail.com",
    "vishal2@gmail.com",
    "david32@outlook.com",
    "Rahul12@gmail.com",
  ];

  setTimeout(function () {
    $("#name").autocomplete({
      source: nameSuggestions,
    });

    $("#email").autocomplete({
      source: emailSuggestions,
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

  $("#recordForm").validationEngine();

  let editIndex = null;

  $("#addRecordBtn").click(function () {
    editIndex = null;
    $("#recordForm")[0].reset();
    CKEDITOR.instances.description.setData("");
    $("#formDialog").dialog("open");
  });

  $("#recordForm").submit(function (event) {
    event.preventDefault();
    CKEDITOR.instances.description.updateElement(); 

    if (!$("#recordForm").validationEngine("validate")) {
      return; 
    }

    const name = $("#name").val();
    const email = $("#email").val();
    const age = $("#age").val();
    const password = $("#password").val();
    const description = $("#description").val();

    if (editIndex === null) {
      const newRow = `
        <tr>
          <td>${name}</td>
          <td>${email}</td>
          <td>${age}</td>
          <td>${password}</td>
          <td>${description}</td>
          <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
          </td>
        </tr>
      `;
      $("#dataTable tbody").append(newRow);
    } else {
      const row = $("#dataTable tbody tr").eq(editIndex);
      row.find("td:eq(0)").text(name);
      row.find("td:eq(1)").text(email);
      row.find("td:eq(2)").text(age);
      row.find("td:eq(3)").text(password);
      row.find("td:eq(4)").text(description);
    }

    $("#recordForm")[0].reset();
    $("#formDialog").dialog("close");
    updateButtonState();
  });

  $("#dataTable").on("click", ".editBtn", function () {
    const row = $(this).closest("tr");
    editIndex = row.index();

    const name = row.find("td:eq(0)").text();
    const email = row.find("td:eq(1)").text();
    const age = row.find("td:eq(2)").text();
    const password = row.find("td:eq(3)").text();
    const description = row.find("td:eq(4)").html();

    $("#name").val(name);
    $("#email").val(email);
    $("#age").val(age);
    $("#password").val(password);
    CKEDITOR.instances.description.setData(description);

    $("#formDialog").dialog("open");
  });

  $("#dataTable").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
    updateButtonState();
  });

  function updateButtonState() {
    const hasRows = $("#dataTable tbody tr").length > 0;
    $("#dataTable .editBtn, #dataTable .deleteBtn").prop("disabled", !hasRows);
  }

  updateButtonState();
});
