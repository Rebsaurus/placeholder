$(function howManyAreChecked() {
          var checkedBoxes = 0;
          $("#tabellSubmit").click(function howMany() {
            if($("#qaTabell input:checked").length > 2) {
              checkedBoxes = checkedBoxes +1;
              alert(checkedBoxes);
            }
          });
      });

$(function selectForm() {
          $("#facilityDropdown").select(getForms());
      });