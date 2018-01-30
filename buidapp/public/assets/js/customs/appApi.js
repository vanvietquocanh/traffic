'use strict';
var table = $('tbody');
var sortItems = new SortItems;
var paginationUL = $('#pag');
var countItemsInSide = 50;
var countItemsReportClick = 50;
var country = $("#country");
var platform = $("#os");
var result = $("#result");
var download = $('#download-btn');
var sortOS = $("#os");
var sortCountry = $("#country");
var tagDownload = $("#download");
var rowsTable = $("fixcenter");
var search = $('#search');
var refresh = $("#refresh")
function SortItems() {
	this.list;
	this.admin;
	this.dataReportClick;
}
SortItems.prototype.getAPI = function(path){
	let data = null;
	switch (path) {
		case "trackkinglink":
			$.post( `/${path}`,data,function(res) {
				sortItems.setData(res.offerList, res.admin)
			});
			break;
		case "reportclickgetdata":
			$.post( `/${path}`,data,function(res) {
				sortItems.setDataReport(res,null);
			});
			break;
		default:
			break;
	}
};
SortItems.prototype.setDataReport = function(data, idFacebook){
	this.dataReportClick = data;
	this.admin = idFacebook;
	sortItems.renderReport(countItemsReportClick)
};
SortItems.prototype.setData = function(data, isAdmin){
	this.list = data;
	this.admin = isAdmin;
	table.empty();
	sortItems.render(countItemsInSide);
};
SortItems.prototype.scroll = ()=>{
	var heightScreen = $("#datatable-responsive_wrapper").height();
	if($(window).scrollTop() > heightScreen/1000*690){
		table.empty();
		countItemsInSide=countItemsInSide+50;
		sortItems.render(countItemsInSide);
	}
}
SortItems.prototype.render = function(countItem){
	var elementHtml = "";
	var affID = this.admin;
	var lengthofListOffers = this.list.length;
	$.each(this.list, function(i, array) {

		$.each(array.data.offers, function(index, val) {
			var pathRedirect = `http://128.199163.213:3000/checkparameter/?offer_id=${index}&aff_id=${affID}`;
			if(index < countItem/lengthofListOffers){
				elementHtml += `<tr role="row" class="odd fixcenter sel-items" style="color: #fff">
									<td class="sorting_1" tabindex="0" style="color: #fff">${index}</td>
									<td class="sorting_1" tabindex="0" style="color: #fff">${val.offerid}</td>`;
			if(val.platform==="android"){
					elementHtml += `<td><img class="platformIcon" src="./assets/images/android.png" alt="" style="width: 30px;border-radius:15em;"></td>`;
			}else{
					elementHtml += `<td><img class="platformIcon" src="./assets/images/apple.png" alt="" style="width: 30px;border-radius:15em;"></td>`;
			}
					elementHtml += `<td><img src="${val.icon_url}" class="iconItems" alt="" style="width: 30px;border-radius:15em;"></td>
									<td class="showItems-name">${val.app_name}</td>`;
			if(this.admin === "904759233011090"){
					elementHtml += `<td style="color: #fff;">${val.offer_url}</td>`;
			}else{
					elementHtml += `<td style="color: #fff;">${pathRedirect}</td>`;
			}
					elementHtml += `<td>${val.payout}</td>
									<td>${val.daily_cap}</td>
									<td style="max-width:10px;">${val.geo}</td>
									<td> Click </td>
									<td> Conversion </td>
									<td> CVR </td>
								</tr>`;
			}
		});
	});
	table.append(elementHtml);
	setTimeout(()=>{
		var widthItem = `${$(".iconItems")[0].width}px`;
		$(".platformIcon").css("width",)
	},500)
};
SortItems.prototype.renderReport = function(countItem) {
	table.empty();
	var elementHtml = "";
	$.each(this.dataReportClick, function(index, val) {
		if(index < countItem){
			elementHtml += `<tr role="row" class="odd fixcenter sel-items" style="color: #fff">
								<td class="sorting_1" tabindex="0" style="color: #fff">${val.id}</td>
								<td class="sorting_1" tabindex="0" style="color: #fff">${val.name}</td>
								<td class="showItems-name">${val.idOffer}</td>
								<td style="color: #fff;">${val.time}</td>
								<td style="color: #fff;">${val.ip}</td>
								<td>${val.agent}</td>
								<td style="max-width:10px;">${"Country"}</td>
								<td>${val.key}</td>
							</tr>`;
		}
	});
	table.append(elementHtml);
}
// tagDownload.click(function(event) {
// 	sortItems.download("text.txt")
// });
// sortOS.change(function(event) {
// 	let valueOSSelect = event.target.value;
// 	let valueCountrySelect = sortCountry.val().toUpperCase();
// 	sortItems.sortList(valueCountrySelect, valueOSSelect);
// });
// sortCountry.change(function(event) {
// 	let valueOSSelect = sortOS.val();
// 	let valueCountrySelect = event.target.value.toUpperCase();
// 	sortItems.sortList(valueCountrySelect, valueOSSelect);
// });
// search.keyup(function(event) {
// 	let valueOSSelect = sortOS.val();
// 	let valueCountrySelect = sortCountry.val().toUpperCase();
// 	sortItems.sortList(valueCountrySelect, valueOSSelect, search.val());
// });
// refresh.click(()=>{
// 	window.location.href = window.location.href;
// })