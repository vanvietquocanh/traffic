'use strict';
var table = $('tbody');
var sortItems = new SortItems;
var paginationUL = $('#pag');
function SortItems() {
	this.list = [],
	this.id = []
}
SortItems.prototype.getAPI = function(){
	let data = null;
	$.post( "http://localhost:3000/phono",data,function(res) {
	  	sortItems.checkicon(res);
	});
};
SortItems.prototype.platform = function(link){
	if(link.indexOf("play.google.com")!==-1){
		return "./assets/images/android.png";
    }else if(link.indexOf("itunes.apple.com")!==-1){
		return "./assets/images/apple.png";
    }else{
		return "./assets/images/error.png";
    }
};
SortItems.prototype.getIconLink = function(links){
	table.empty();
	$.each(links,function(index, link) {
		if(link){
			let data = {
				"id" : link
			};
			$.post( "http://localhost:3000/checkicon",data,function(res) {
				sortItems.render(res,sortItems.list[index], index);
			});
		}else{
			sortItems.render(null,sortItems.list[index], index);
		}
	});
};
SortItems.prototype.checkicon = function(res) {
	try {
		res.forEach((el,index)=>{
			var data = new Object;
			if (!el.offer_geo.target){
				data.country = '';
			}else{
				if(!el.offer_geo.target[0]){
					data.country = "";
				}else {
					data.country = el.offer_geo.target[0].country_code;
				}
			}
			data   		=   {
				"app"		: [],
				"id"		: el.offer.id,
				"name" 		: el.offer.name,
				"link"		: sortItems.cutIdApp(el.offer.preview_url),
				"country" 	: el.offer_geo.target,
				"platform"  : sortItems.platform(el.offer.preview_url),
				"url"    	: el.offer.tracking_link,
				"payout" 	: el.offer.payout,
				"category"  : el.offer.category,
			};
			if(!el.offer_cap){
				data.cap = '';
			}else {
				data.cap = el.offer_cap.cap_conversion;
			}
			this.list.push(data);
			this.id.push(data.link);
			if(index === res.length-1){
				sortItems.getIconLink(this.id)
			}
		});
	} catch(e) {
		sortItems.getAPI();
	}
}
SortItems.prototype.cutIdApp = function(link){
	var idApp;
    if(link.indexOf("play.google.com")!==-1){
        idApp = link.split("id=")[1].split("&")[0];
        return idApp;
    }else if(link.indexOf("itunes.apple.com")!==-1){
    	var x = link.split("/id").length-1;
    	idApp = link.split("id")[link.split("id").length-1].split("?")[0];
    	return idApp;
    }
};
SortItems.prototype.render = function(response, config, index){
	if(response){
		this.list[index].icon = response;
	}
	for (var i = 0; i < this.list.length; i++) {
		var elementHtml = 	`<tr role="row" class="odd fixcenter sel-items">
								<td class="sorting_1" tabindex="0">${config.id}</td>
								<td><img class="platformIcon" src="${config.platform}" alt="" style="width: 15%;border-radius:15em;"></td>`;
		if(config.icon){
			if(config.icon.icon===undefined){
				elementHtml+=  `<td>${"ERROR"}</td>
								<td>ID:${config.icon.id}</td>`;
			}else{
				elementHtml+=  `<td><img src="${config.icon.icon}" class="iconItems" alt="" style="width: 100%;border-radius:15em;"></td>
								<td class="showItems-name">${config.icon.name}</td>`;
			}
		}else{
			elementHtml+=  	   `<td><img src""></td>
								<td></td>`;
		}
		elementHtml+=	   	   `<td class="showItems-url">${config.url}</td>
								<td>${config.payout}</td>
								<td>${config.cap}</td>`
		if(config.country[0] === undefined || config.country[0] === null){	
			elementHtml+=  	   `<td class="showItems-country"></td>`;
		}else {
			elementHtml+=  	   `<td class="showItems-country">${config.country[0].country_code}</td>`;
		}
			elementHtml+=  	   `<td>${config.category}</td>
								<td>lead</td>
								<td>click</td>
								<td>request</td>
							</tr>`;
	}
	table.append(elementHtml);
	setTimeout(()=>{
		$(".iconItems").css("width",$('.platformIcon').width())
	},1000)
};
SortItems.prototype.addPagination = function(data) {
	let elementHtml =  `<li class="paginate_button previous disabled" aria-controls="datatable-responsive" tabindex="0" id="datatable-responsive_previous">
                            <a href="#">Previous</a>
                        </li>`;
    $.each(function(index, el) {
    	elementHtml+= `<li class="paginate_button" aria-controls="datatable-responsive" tabindex="0">
                            <a href="#"></a>
                        </li>`;
    });                
    elementHtml+=`<li class="paginate_button next" aria-controls="datatable-responsive" tabindex="0" id="datatable-responsive_next">
                            <a href="#">Next</a>
                        </li>`;
    paginationUL.append(elementHtml);
}

sortItems.getAPI();
