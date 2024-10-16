$(document).ready(function () {
  btns = [
    $(".main_btna"),
    $(".main_btn"),
    $(".main_nav nav ul li:nth-child(2)"),
  ];

  closebtn = $(".close");

  overlay = $(".overlay");

  modal = $(".modal");

  closebtn.on("click", () => {
    $(overlay).fadeOut(200);
    $(modal).fadeOut(200);
    $(modal).css({
      top: "-50%",
    });
  });

  $.each(btns, function () {
    $(this).on("click", function () {
      overlay.fadeIn(200);
      modal.fadeIn(200);
      $(modal).css({
        top: "50%",
      });
    });
  });
});
