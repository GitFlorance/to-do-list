import '../styles/some.scss';
import $ from "jquery";

$(function() {

    const $yourCase = $(".js__case");
    const $yourDate = $(".js__date");
    const $origin =  $(".js__list");
    const $list =  $(".list");

        
    $(".takeInfo").on("submit", (e)=>{
        // alert("boom");
        e.preventDefault();
        if ($yourCase.val() === "") {
            $yourCase.addClass("warning"); 
        }
        else {
            const $clone = $origin.clone().removeClass(".js__list").appendTo($list).css("display", "block");
            $clone.find(".js__a").text($yourCase.val())
            $clone.find(".js__b").text($yourDate.val())
            $yourCase.val("");
            $yourDate.val("");
            $yourCase.removeClass("warning");
        }
    });
});

