/*
--------------------------------------------------------------------
THANK YOU DIALOG
--------------------------------------------------------------------
*/
$(document).ready(function () {
  const $overlay = $("#thankYouOverlay");

  // Open dialog
  window.showThankYouDialog = function showThankYouDialog() {
    $overlay.fadeIn();
    $("body").addClass("dialog-open"); // Add dialog-open to prevent scrolling
    window.trapFocus($overlay);
  };

  // Close dialog
  function closeDialog() {
    $overlay.fadeOut();
    $("body").removeClass("dialog-open"); // Remove dialog-open to re-enable scrolling
    window.releaseFocusTrap($overlay);
  }

  // Close on ESC key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeDialog();
    }
  });

  // Close on overlay click
  $overlay.on("click", function (e) {
    if ($(e.target).is("#thankYouOverlay")) {
      closeDialog();
    }
  });

  // Close on close button click
  $("#thankYouOverlay .close").on("click", function () {
    closeDialog();
  });

  // Let the keyboard close the dialog for better accesibility
  $("#thankYouOverlay .close").on("keydown", function (event) {
    if (event.key === "Enter") {
      closeDialog();
    }
  });
});
