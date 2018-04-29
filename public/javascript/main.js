$(function () {

    $("#search-query").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/product/search",
                    type: "GET",
                    data: request,  // request is the value of search input
                    success: function (data) {
                        // Map response values to field label and value
                        data = JSON.parse(data);
                        response($.map(data, function (el) {
                            return {
                                label: el.name,
                                value: el.productNo
                            };
                        }));
                    }
                });
            },

        // The minimum number of characters a user must type before a search is performed.
        minLength: 3,

        // set an onFocus event to show the result on input field when result is focused
        focus: function (event, ui) {
        this.value = ui.item.label;
        // Prevent other event from not being execute
        event.preventDefault();
    },
    select: function (event, ui) {
                console.log("ui.item.value: ", ui.item.value);
                console.log("ui.item.label: ", ui.item.label);
        // Prevent value from being put in the input:
        this.value = ui.item.label;
        // Set the id to the next input hidden field
        $(this).next("input").val(ui.item.value);
        // Prevent other event from not being execute
        event.preventDefault();
        // optionnal: submit the form after field has been filled up

        //$('#quickSearch').submit();
    }
});

});