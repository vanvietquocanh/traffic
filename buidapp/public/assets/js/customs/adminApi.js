"use strict";
// css 
$("#sidebar-menu>ul>li>a.waves-effect:first").addClass('active');
$(".checkbox-person").css({
    "position":"absolute",
    "top" : "40%",
    "right" : "1%"
})
// api
var api = new API();
var updateDB = $("#updateDB");
var select = [];
function API() {
	this.data;
}
API.prototype.fil = function(select, condition) {
	var result = select.filter(function(item) {
				return item.id === condition;
			});
	return result;
}
API.prototype.attached = function(data) {
	$.each(data,(index, el) =>{
		var itemHTML = `<label for="${el.idFacebook}" style="width:100%">
				            <a>
				                <div class="inbox-item" style="display:flex; position: relative; border-bottom: 1px solid #777; padding-bottom: .5em">
				                    <div class="inbox-item-img"><img src="${el.profile.photos[0].value}" class="img-circle" alt="${el.profile.displayName}-image"></div>
				                    <p class="inbox-item-author" style="padding-left:1em; padding-top:1em; color:#fff">${el.profile.displayName}</p>
				                    <p class="inbox-item-date" style="position:absolute; right: 10%; top: 20%; color:#fff">13:40 PM</p>
				                    <input class="checkbox-person noMember" type="checkbox" name="sel" id="${el.idFacebook}" value="${el.idFacebook}" style="position:absolute; right: 3%; top: 50%;">
				                </div>
				            </a>
				        </label>`;
	    $("#renderManagerAPI").append(itemHTML)
	})
	$(".noMember").change(function(event) {
		if(event.target.checked){
			var member = {
				"mem" : event.target.checked,
				"id"  : event.target.value
			}
			if(api.fil(select, event.target.value).length === 0){
				select.push(member)
			}
		}else{
			$.each(select, function(index, val) {
				if(val){
					if(val.id === event.target.value){
						select.splice(index,1);
					}
				}
			});
		}
	});
	api.saveData(data);
}
API.prototype.requestSave = function(data){
	$.post("/savedata",data,function(data, textStatus, xhr){
		console.log(typeof data)
	})
};
API.prototype.fixMember = function(data, select){
	$.each(select, function(index, val) {
		$.each(data, function(i, items){
			if(val.id === items.idFacebook){
				items.member =  val.mem;
			}
		})
	});	
	$.each(data, function(index, el) {
		api.requestSave(el)
	});	
}
API.prototype.getAPIManager = function(){
	$.post('/apiAwaitingApproval', function(data, textStatus, xhr) {
		this.data = data;
		api.attached(this.data)
	});
};
API.prototype.saveData = function(data){
	updateDB.click(function(event) {
		api.fixMember(data, select)
	});
};
api.getAPIManager();