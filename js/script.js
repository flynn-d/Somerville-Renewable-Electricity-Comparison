(function () {
    'use strict';

    var RPS_YEAR = 10; // TODO

    function init() {
        window.Model = {};
        Model.output = function (d) {
            var bill5 = d.custcharge + d.deliverycharges * d.kwhslider + d.rate10 * d.kwhslider;
            var bill100 = d.custcharge + d.deliverycharges * d.kwhslider + d.rate100 * d.kwhslider;
            var co2_5 = d.kwhslider * (RPS_YEAR + 5) / 100 * d.co2avoid;
            var co2_100 = d.kwhslider * d.co2avoid;

            return { bill5: bill5, bill100: bill100, co2_5: co2_5, co2_100: co2_100 };
        };
    }

    function finalize() {
        window.VM = {};
        VM.form = document.querySelector('form');
        VM.inputs = VM.form.querySelectorAll('input');
        VM.fields = [];
        VM.inputs.forEach(function (el) {
            VM.fields.push(el.getAttribute('name'));
        });
        VM.parseAndValidate = function () {
            var validation = [];
            var valid = true;
            VM.clearState();
            VM.inputs.forEach(function (el) {
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
                        document.querySelector('#error').innerHTML += "<br>" + field.fieldName + ": " + field.value + " is invalid";
                    }
                });
                return false;
            }
        };

        VM.clearState = function () {
            document.querySelector('#error').innerHTML = "";
            document.querySelector('#success').innerHTML = "";
        };


        VM.form.querySelector('button').addEventListener('click', function (ev) {
            ev.preventDefault();
            var data = VM.parseAndValidate();

            if (data) {
                var d = Model.output(data);
                document.querySelector('#success').innerHTML = "<br>bill5: " + Math.round(d.bill5 * 100) / 100 + "<br>bill100: " + Math.round(d.bill100 * 100) / 100 + "<br>co2_5: " + Math.round(d.co2_5 * 100) / 100 + "<br>co2_100: " + Math.round(d.co2_100 * 100) / 100;
            }

            /* Start bar chart */
            /* https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js */
            /* trying to start simpler with a table output */
            /*
            if (data) {
              var d = Model.output(data);

              var tr = d3.select("body")
                    .append("table")
                    .selectAll("tr")
                    .data(d)
                    .enter()
                    .append("tr");

              var td = tr.selectAll("td")
              .data(function (d) ){
                console.log(d);
                return d;
              })
              .enter()
              .append("td")
              .text( function (d) ){
                console.log(d);
                return d;
              });

            }
            */


        });
    }


    init();

    document.addEventListener("DOMContentLoaded", function () {
        finalize();
    });

})();
