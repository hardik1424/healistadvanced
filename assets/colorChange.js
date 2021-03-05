setTimeout(function () {
if ($(".template-index").length) {
    // First Time Color Change
    const initialColor = $(".Timeline__NavItem").eq(0).attr("data-color")

    changeColor(initialColor)

    $(".Timeline__NavItem").click(function () {
        const bgColor = $(this).attr("data-color");
        changeColor(bgColor);
    });

    function changeColor(bgColor) {
        $(".timeline__section").css("background-color", bgColor);
    }
}
}, 0);



$(function() {

    if ($("#sortsleep")) {
        $( "#sortsleep" ).click(function() {
          console.log("you need sleep")
        });
    }

});