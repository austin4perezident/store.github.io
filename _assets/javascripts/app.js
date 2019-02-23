// Insert current year for Copyright
$(function(){
    var theYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = theYear;
});

$(document).ready(function() {
	var products = new Array();

	var request = $.ajax({
	    type: "GET",
	    url: "https://spreadsheets.google.com/feeds/list/1a3ZE-VOhiCHF6HeqArKYqoGx9JYl5pyO3anxRCGXAFw/opsocqe/public/values?alt=json",
	    dataType: "jsonp"
	});


	request.done(function(data) {
		var dataResponse = data.feed.entry;

		for (var i = dataResponse.length - 1; i >= 0; i--) {
			products.push(
				Object.keys(dataResponse[i]).filter(function(p) {
					return p.indexOf('gsx$') == 0;
				}).reduce(function (newData, p) { 
					if (dataResponse[i][p].$t != "") {
						if (p.indexOf('gsx$') !== -1) {
							newData[p.replace('gsx$','')] = dataResponse[i][p].$t;
						} else {
							newData[p] = dataResponse[i][p].$t;
						}
					}
					return newData;
				}, {})
			);
		}

		AddProducts();
	});


	request.fail(function (xhr, ajaxOptions, thrownError) {
		console.log(xhr,ajaxOptions,thrownError);
		dataResponse = new Array();
	});

	function AddProducts() {
		var productChunks = products.chunk(3);
		// var rows = new Array();

		// for (var i = productChunks.length - 1; i >= 0; i--) {
		// 	var productRow = new Array();
		// 	productRow.push('<div id="products" class="row row-padding">')
		// 	for (var j = productChunks[i].length - 1; j >= 0; j--) {
		// 		productRow.push( 
		// 			'<div class="col-xs-4 p-container">' +
		// 			'<div class="product">' +
		// 			productChunks[i][j].name +
		// 			productChunks[i][j].description +
		// 			'</div>' +
		// 			'</div>'
		// 		);
		// 	}
		// 	productRow.push('</div>');
		// 	rows.push(productRow);
		// }
		// $('#products').html(rows.reverse().join());
		// $('#products').html('<pre><code>' + JSON.stringify(productChunks) + '</code></pre>');
	}
});