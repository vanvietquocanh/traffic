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
var renderMember = $("#renderAPIdata");
var promote = $("#promote");
var demote = $("#demote");
var dismissal = $("#dismissal");
var memberMasterList = $("#memberMasterList");
var select = [];
var arraySelectMember=[];
function API() {
	this.data;
	this.member;
}
API.prototype.fil = function(select, condition) {
	var result = select.filter(function(item) {
				return item.id === condition;
			});
	return result;
}
API.prototype.attachedNewMember = function(data) {
	$.each(data,(index, el) =>{
		var itemHTML = `<label for="${el.idFacebook}" style="width:100%">
				            <a>
				                <div class="inbox-item" style="display:flex; position: relative; border-bottom: 1px solid #777; padding-bottom: .5em">
				                    <div class="inbox-item-img"><img src="${el.profile.photos[0].value}" class="img-circle" alt="${el.profile.displayName}-image"></div>
				                    <p class="inbox-item-author" style="padding-left:1em; padding-top:1em; color:#fff">${el.profile.displayName}</p>
				                    <p class="inbox-item-date" style="position:absolute; right: 10%; top: 20%; color:#fff">${el.timeregis}</p>
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
	$.each(data,(i,person)=>{
		$.post("/savedata",person,function(data, textStatus, xhr){
		})
		if(i===data.length){
			window.location.reload(true);
		}
	})
};
API.prototype.getAPIManager = function(){
	$.post('/apiAwaitingApproval', function(data, textStatus, xhr) {
		this.data = data;
		api.attachedNewMember(this.data)
	});
};
API.prototype.attachedMember = function(data){
	var htmlAttached = "";
	$.each(data, function(index, el) {
		htmlAttached += `<label for="${el.idFacebook}" style="width:100%">
                            <a>
                                <div class="inbox-item">
                                    <div class="inbox-item-img"><img src="${el.profile.photos[0].value}" class="img-circle" alt="img-${el.profile.displayName}"></div>
                                    <p class="inbox-item-author" style="line-height: 3">${el.profile.displayName}</p>
                                    <p class="inbox-item-date">${el.sessionTime}</p>
                                    <input class="checkbox-person isMember" type="checkbox" name="${el.idFacebook}" id="${el.idFacebook}" value="${el.idFacebook}" style="position: absolute; right: 2%; top: 40%;"/>
                                </div>
                            </a>
                        </label>`;

	});
	renderMember.append(htmlAttached)
	$(".isMember").change(function(event) {
		if(event.target.checked){
			var member = {
				"master" : event.target.checked,
				"id"     : event.target.value
			}
			if(api.fil(arraySelectMember, event.target.value).length === 0){
				arraySelectMember.push(member)
			}
		}else{
			$.each(arraySelectMember, function(index, val) {
				if(val){
					if(val.id === event.target.value){
						arraySelectMember.splice(index,1);
					}
				}
			});
		}
	});
	$("#promote").click(()=>{
		var session = confirm("You sure you want to add this member ?")
		if(session&&arraySelectMember.length>0){
			$.each(arraySelectMember,(i,person)=>{
				$.post("/promote", person, (data, textStatus, xhr)=>{
					console.log(data)
				})
				if(i===arraySelectMember.length){
					window.location.reload(true);
				}
			})
		}
	});
	$("#demote").click(()=>{
		var session = confirm("You sure you want to add this member ?")
		if(session&&arraySelectMember.length>0){
			$.each(arraySelectMember,(i,person)=>{
				$.post("/demote", person, (data, textStatus, xhr)=>{
				})
				if(i===arraySelectMember.length){
					window.location.reload(true);
				}
			})
		}
	});
	$("#dismissal").click(()=>{
		var session = confirm("You sure you want to add this member ?")
		if(session&&arraySelectMember.length>0){
			$.each(arraySelectMember,(i,person)=>{
				$.post("/dismissal", person, (data, textStatus, xhr)=>{
				})
				if(i===arraySelectMember.length){
					window.location.reload(true);
				}
			})
		}
	});
	memberMasterList.click(function(event) {
		renderMember.empty();
		$("#memListTit").html("Master List");
		api.getMaster()
	});
};
API.prototype.getMaster = ()=>{
	$.post('/getmasterlist', function(data, textStatus, xhr) {
		api.attachedMember(data);
	});
}
API.prototype.getAPIMember = function(){
	$.post('/member', function(data, textStatus, xhr) {
		this.member = data;
		api.attachedMember(data);
	});
};
API.prototype.saveData = function(data){
	updateDB.click(function(event) {
		var session = confirm("You sure you want to add this member ?")
		if(session&&select.length>0){
			api.requestSave(select);
		}
	});
};
api.getAPIManager();
api.getAPIMember();