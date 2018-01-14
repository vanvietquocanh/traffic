"use strict";
var download = $('#download-btn');
var sortOS = $("#os");
var sortCountry = $("#country");
var tagDownload = $("#download");
var rowsTable = $("fixcenter");
var search = $('#search');
var refresh = $("#refresh")
SortItems.prototype.download = function(filename){
	var text = "";
    $.each(this.list,function(index, el) {
        text+= `\r\n${el.url}|${(el.country[0])?el.country[0].country_code:""}|${el.name}|${el.id}|${el.platform.split(".png")[0].split("/images/")[1]}`;
    });
    var blob = new Blob([text],{type:"octet/stream"});
    var url  = window.URL.createObjectURL(blob);
    tagDownload.attr("href",url);
    tagDownload.download = filename;
};
SortItems.prototype.dateTime = function (value) {

}
SortItems.prototype.sortList = function(valueCountrySelect, valueOSSelect, keySearch){
	if(valueCountrySelect === "ALL"){
		valueCountrySelect = "";
	}
	if(valueOSSelect==="all"){
		valueOSSelect = "";
	}
	var list = this.list.filter(function(items) {
		var nameApp;
		if(items.icon.name === undefined){
			nameApp = items.icon.id;
		}else{
			nameApp = items.icon.name;
		}
		if(items.country[0] === undefined || items.country[0] === null)
			return;
		else {
			return items.country[0].country_code.indexOf(valueCountrySelect)!==-1
					&& items.platform.split("./assets/images/")[1].split(".png").indexOf(valueOSSelect)!==-1
					&& nameApp.toUpperCase().indexOf(keySearch.toUpperCase())!==-1;
		}
	});
	table.empty();
	list.map(function(val, index){
		sortItems.render(null, val, index)
	})
};
tagDownload.click(function(event) {
	sortItems.download("text.txt")
});
sortOS.change(function(event) {
	let valueOSSelect = event.target.value;
	let valueCountrySelect = sortCountry.val().toUpperCase();
	sortItems.sortList(valueCountrySelect, valueOSSelect);
});
sortCountry.change(function(event) {
	let valueOSSelect = sortOS.val();
	let valueCountrySelect = event.target.value.toUpperCase();
	sortItems.sortList(valueCountrySelect, valueOSSelect);
});
search.keyup(function(event) {
	let valueOSSelect = sortOS.val();
	let valueCountrySelect = sortCountry.val().toUpperCase();
	sortItems.sortList(valueCountrySelect, valueOSSelect, search.val());
});
refresh.click(()=>{
	window.location.href = window.location.href;
})