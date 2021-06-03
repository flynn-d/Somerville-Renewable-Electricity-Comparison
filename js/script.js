(function () {
    'use strict';

    var RPS_YEAR = 10; // TODO

    function init() {
        window.CCA = {};
        CCA.output = function (d) {
            var bill5 = d.custcharge + d.deliverycharges * d.kwhslider + d.rate5 * d.kwhslider;
            var bill100 = d.custcharge + d.deliverycharges * d.kwhslider + d.rate100 * d.kwhslider;
            var co2_5 = d.kwhslider * (RPS_YEAR + 5) / 100 * d.co2avoid;
            var co2_100 = d.kwhslider * d.co2avoid;

            console.log(bill5, bill100, co2_5, co2_100);
        };
    }

    function finalize() {
        window.App = {};
        App.form = document.querySelector('form');
        App.inputs = App.form.querySelectorAll('input');
        App.fields = [];
        App.inputs.forEach(function (el) {
            App.fields.push(el.getAttribute('name'));
        });
        App.parseAndValidate = function () {
            var validation = [];
            var valid = true;
            App.inputs.forEach(function (el) {
                var field = {
                    fieldName: el.getAttribute('name')
                };
                if (el.value) {
                    field.value = parseFloat(el.value);
                    field.valid = true;
                } else {
                    field.value = null;
                    field.valid = false;
                    valid = false;
                }
                validation.push(field);
            });

            if (valid) {
                var data = {};
                validation.forEach(function (field) {
                    data[field.fieldName] = field.value;
                });
                return data;
            } else {
                validation.forEach(function (field) {
                    if (!field.valid) {
                        // show errors
                    }
                });
                return false;
            }
        };
        

        App.form.querySelector('button').addEventListener('click', function (ev) {
            ev.preventDefault();
            var data = App.parseAndValidate();

            if (data) {
                CCA.output(data);
            }

        });
    }


    init();

    document.addEventListener("DOMContentLoaded", function () {
        finalize();
    });

})();