$(function howManyAreChecked() {
          $("#tabellSubmit").click(function howMany() {
              var checkedBoxes = $("#qaTabell input:checked");
              alert(checkedBoxes.length + " checked.");
          });
      });

$(function selectForm() {
          $("#facilityDropdown").select(getForms());
      });