
//var imported = document.createElement('script');
//imported.src = 'jquery-1.9.1.min.js';
//document.head.appendChild(imported);


var imported1 = document.createElement('script');
imported1.src = 'http://code.jquery.com/jquery-1.12.4.js';
document.head.appendChild(imported1);

var imported2 = document.createElement('script');
imported2.src = 'http://code.jquery.com/ui/1.12.1/jquery-ui.js';
document.head.appendChild(imported2);

var imported3 = document.createElement('style');
imported3.src = '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css';
document.head.appendChild(imported3);

var imported4 = document.createElement('style');
imported4.src = '/resources/demos/style.css';
document.head.appendChild(imported4);

var imported5 = document.createElement('style');
imported5.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css';
document.head.appendChild(imported5);








(function () {
    var id;
    // Q returns new Library object that hold our selector. Ex: Q('.wrapper')
    var Q = function (selector) {
        id = selector;
        return new Library(selector);
    };

    var Library = function (selector) {
        // Get selector
        var selector = document.querySelectorAll(selector),
        i = 0;
        // Get selector length
        this.length = selector.length;
        this.version = '0.1.0';


        // Return as object
        return this;
    };

    // Assign our Q object to global window object.
    if (!window.Q) {
        window.Q = Q;
    }

    Q.fn = Library.prototype =
{
    /**
         * Hide element(s) from DOM
         * @returns {*}
         */
    demo: function (source, id_select) {

        //var len = this.length;
        //// Here we simply loop through our object (this) and set the css to display none. 
        ////If you got more that 1 node from DOM selected with querySelectorAll, you would hide them all.
        //while (len--) {
        //    this[len].style.display = 'none';
        //}
        //alert('in function');        
        var doc_id = source.id;
        if (doc_id == 'inpt1') {
            $('#' + id_select).load('Default2.aspx');
        }
        else if (doc_id == 'inpt2') {
            $('#' + id_select).load('Default3.aspx');
        }

        // It's important to return this if you want to chain methods!
        return this;
    },

    /**
         * Show element(s) from DOM
         * @returns {*}
         */
    show: function (a, b) {
        var len = this.length;
        while (len--) {
            this[len].style.display = 'block';
        }

        return this;
    },

    demo1: function (obj) {
        alert("First Argument " + obj.first + "Second Argument " + obj.second);

    },

    dataRequest: function (obj) {
        var objData = JSON.parse(obj);
        //alert("First Argument " + obj.first + "Second Argument " + obj.second);
       
        var url = ' http://mekportalqa.azurewebsites.net/Home/GetVehicleInfo?model=' + objData.Model + '&make=' + objData.Make + '&modelyear=' + objData.ModelYear;
        //var url = 'http://localhost:5001/Home/GetVehicleInfo?model=' + objData.Model + '&make=' + objData.Make + '&modelyear=' + objData.ModelYear;
        $("#dvright").html('');
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (jsondata) {
                if (jsondata.success) {
                    if ($('.ui-dialog').is(':visible')) {
                        $('.ui-dialog-titlebar-close').click();
                    }
                    var vehicleinfo = jsondata.aaData; //jsondata.aaData.quote;                    
                    var dvVehicleInfo = '';
                    for (var j = 0; j < vehicleinfo.length; j++) {
                        //var qId = vehicleinfo[j].Id;                        
                        $.ajax({
                            type: "GET",
                            url: 'GetQuoteServicesParts?quoteId=' + vehicleinfo[j].Id,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (rType) {
                                //dvVehicleInfo = dvVehicleInfo + '<div class="row"><div class="col-md-12"><a>Quote ' + qId + '</a></div></div>';  
                                var qId = 0;
                                var sData = rType.sData;
                                //alert(sData);
                                if (sData != null && sData.length > 0) {
                                    qId = sData[0].QuoteId;
                                    dvVehicleInfo = dvVehicleInfo + '<div class="row"><div class="col-md-12"><a>Quote ' + qId + '</a></div></div>';

                                    dvVehicleInfo = dvVehicleInfo + '<br/><div class="row"><div class="col-md-12">Labours</div></div><table class="table table-striped table-bordered table-hover dataTable no-footer" role="grid">';
                                    dvVehicleInfo = dvVehicleInfo + '<thead><tr role="row"><th>Labour Item Name</th><th>Description</th><th>Total ($)</th></tr></thead>';
                                    for (var i = 0; i < sData.length; i++) {
                                        dvVehicleInfo = dvVehicleInfo + '<tr role="row"><td>' + sData[i].ServiceName + '</td>'
                                                        + '<td>' + sData[i].Description + '</td>'
                                                        //+ '<td>' + sData[i].LaborTime + '</td>'
                                                        //+ '<td>' + sData[i].HourlyCost + '</td>'
                                                        + '<td>' + sData[i].TotalCost + '</td></tr>';
                                    }
                                    dvVehicleInfo = dvVehicleInfo + '</table>';
                                }

                                var pData = rType.pData;
                                if (pData != null && pData.length > 0) {
                                    if (qId == 0) {
                                        qId = pData[0].QuoteId;
                                        dvVehicleInfo = dvVehicleInfo + '<div class="row"><div class="col-md-12"><a>Quote ' + qId + '</a></div></div>';
                                    }
                                    dvVehicleInfo = dvVehicleInfo + '<br/><div class="row"><div class="col-md-12">Parts</div></div><table class="table table-striped table-bordered table-hover dataTable no-footer" role="grid">';
                                    dvVehicleInfo = dvVehicleInfo + '<thead><tr role="row"><th>Part Name</th><th>Description</th><th>Total ($)</th></tr></thead>';
                                    for (var i = 0; i < pData.length; i++) {

                                        dvVehicleInfo = dvVehicleInfo + '<tr role="row"><td>' + pData[i].PartName + '</td>'
                                                      + '<td>' + pData[i].Description + '</td>'
                                                      //+ '<td>' + pData[i].Quantity + '</td>'
                                                      //+ '<td>' + pData[i].MarkUp + '</td>'
                                                      //+ '<td>' + pData[i].PartCost + '</td>'
                                                      + '<td>' + pData[i].TotalCost + '</td></tr>';
                                    }
                                    dvVehicleInfo = dvVehicleInfo + '</table>';
                                }
                                var adData = rType.adData;
                                if (adData != null && adData.length > 0) {
                                    if (qId == 0) {
                                        qId = adData[0].QuoteId;
                                        dvVehicleInfo = dvVehicleInfo + '<div class="row"><div class="col-md-12"><a>Quote ' + qId + '</a></div></div>';
                                    }
                                    dvVehicleInfo = dvVehicleInfo + '<br/><div class="row"><div class="col-md-12">Adjustments</div></div><table class="table table-striped table-bordered table-hover dataTable no-footer" role="grid">';
                                    dvVehicleInfo = dvVehicleInfo + '<thead><tr role="row"><th>Name</th><th>Description</th><th>Total ($)</th></tr></thead>';
                                    for (var i = 0; i < adData.length; i++) {
                                        dvVehicleInfo = dvVehicleInfo + '<tr role="row"><td>' + adData[i].Name + '</td>'
                                                    + '<td>' + adData[i].Description + '</td>'
                                                    //+ '<td>' + adData[i].Amount + '</td>'
                                                    //+ '<td>' + adData[i].Quantity + '</td>'
                                                    + '<td>' + adData[i].Total + '</td></tr>';
                                    }
                                    dvVehicleInfo = dvVehicleInfo + '</table>';
                                }

                                dvVehicleInfo = dvVehicleInfo + '<br/>';


                            },
                            error: function (e) {
                                alert(e);
                            }
                        });

                    }
                    setTimeout(function () { $("#dvright").append(dvVehicleInfo); }, 1000);

                }
                else {
                    var dv = '<div id="dialog">'
                           + '<div class="dialogInner"  style="display:none;">'
                           + '<div class="row"><div class="col-md-4 clsMake"><label>Make</label><input value="' + jsondata.aaData.Make + '" type="text" name="make" id="make" /></div></div>'
                           + '<div class="row"><div class="col-md-4"><label>Model</label><input value="' + jsondata.aaData.Model + '" type="text" name="model" id="model" /></div></div>'                                                      
                           + '<div class="row"><div class="col-md-4 clsModelYear"><label>Model&nbsp;Year</label><input value="' + jsondata.aaData.ModelYear + '" type="text" name="modelyear" id="modelyear" /></div></div>'
                           + '<div class="row"><div class="col-md-4"><button name="btnSearchRequest" class="btnSearchRequest">Search</button></div></div>'
                           + '</div></div>';
                    //$("#dvright").html('');

                    $("#dvright").append(dv);
                    if ($('.ui-dialog').is(':visible')) {
                        $('.ui-dialog-titlebar-close').click();
                    }
                    //setTimeout(function () {                                                
                    $("#dialog").dialog();
                    $(".dialogInner").show();
                    var strmake = '';
                    var strmodel = '';
                    
                    $("[id=make]").autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                type: "GET",
                                url: 'GetVehicleMake?make=' + request.term,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (rType) {
                                    //alert('data='+rType);
                                    //$('.clsModel').empty();
                                    response($.map(rType.aaData, function (item) {

                                        return {
                                            label: item.Make,
                                            model: item.CarId
                                        }
                                    }));

                                },
                                error: function (e) {
                                    alert(e);
                                }
                            });
                        },
                        minLength: 3,
                        autoFill: true,
                        select: function (event, ui) {
                            $(this).val(ui.item.label);
                            strmake = ui.item.label;
                            return false;
                        }
                    });
                    $("[id=model]").autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                type: "GET",
                                url: 'GetVehicleModel?make=' + strmake + '&model=' + request.term,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (rType) {
                                    //alert('data='+rType);
                                    //$('.clsModel').empty();
                                    response($.map(rType.aaData, function (item) {
                                        return {
                                            label: item.Model,
                                            model: item.CarId
                                        }
                                    }));

                                },
                                error: function (e) {
                                    alert(e);
                                }
                            });
                        },
                        minLength: 3,
                        autoFill: true,
                        select: function (event, ui) {
                            $(this).val(ui.item.label);
                            return false;
                        }
                    });
                    $("[id=modelyear]").autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                type: "GET",
                                url: 'GetVehicleModelYear?make=' + strmake + '&model=' + strmodel + '&modelyear=' + request.term,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (rType) {
                                    //alert('data='+rType);
                                    //$('.clsModel').empty();
                                    response($.map(rType.aaData, function (item) {
                                        return {
                                            label: item.ModelYear,
                                            model: item.CarId
                                        }
                                    }));

                                },
                                error: function (e) {
                                    alert(e);
                                }
                            });
                        },
                        minLength: 3,
                        autoFill: true,
                        select: function (event, ui) {
                            $(this).val(ui.item.label);
                            return false;
                        }
                    });
                    //}, 2000);
                }


                //scan(objData);
            },
            error: function (e) {
                alert(e);
            }
        });
    }
};


})();


