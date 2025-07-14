$.extend($.ui.slider.prototype.options, {
    animate: 300,
});

$("#flat-slider-vertical-1").slider({
    max: 11,
    min: 0,
    range: "min",
    value: 11,
    orientation: "vertical",
});
$("#flat-slider-vertical-2").slider({
    max: 6,
    min: 0,
    range: "min",
    value: 2,
    orientation: "vertical",
});
$("#flat-slider-vertical-3").slider({
    max: 2,
    min: 0,
    range: "min",
    value: 1,
    orientation: "vertical",
});
$("#flat-slider-vertical-4").slider({
    max: 2,
    min: 0,
    range: "min",
    value: 1,
    orientation: "vertical",
});

$("#flat-slider-vertical-1, #flat-slider-vertical-2, #flat-slider-vertical-3,#flat-slider-vertical-4")
    .slider("pips", {
        first: "pip",
        last: "pip",
    })
    .slider("float");
