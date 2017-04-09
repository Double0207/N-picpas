// JavaScript Document
document.oncontextmenu=function(){
		return false;
	}
window.onresize=function(){
	if(document.getElementById("lupbody")!=undefined){
		var wid=(document.body.scrollWidth-900)/2
		$("#lupbody").css("left",wid+"px");
	}
	
		if(window.innerWidth<910){
			$(document).ready(function(){
				$("#headdiv").load("head2.html");
			});	
		}else{			
			$(document).ready(function(){
				if($("#hh").val()==0){
					$("#headdiv").load("head.html");
				}else if($("#hh").val()==1){
					$("#headdiv").load("head1.html");
				}
			}); 
		}
		if(window.innerWidth<1080){
			$(".c_request_body_list2").css("width","84%");
			$(".c_request_body_list1").css("padding-left","0px");
			$(".c_challenge_body_list2").css("width","84%");
			$(".c_challenge_body_list1").css("padding-left","0px");
			$(".bottom_body_1 ul:eq(0)").css("width","100%")
			$(".bottom_body_1 ul:eq(1)").css("width","100%")
			$(".bottom_body_1 ul:eq(2)").css("width","100%")
			$(".bottom_body_1 ul:eq(3)").css("width","100%")
			$(".bottom_body_1 ul:eq(4)").css("width","100%") 	
		}else{
			$(".c_request_body_list2").css("width","30%");
			$(".c_request_body_list1").css("padding-left","16%");
			$(".c_challenge_body_list2").css("width","30%");
			$(".c_challenge_body_list1").css("padding-left","16%");
			$(".bottom_body_1 ul:eq(0)").css("width","36%")
			$(".bottom_body_1 ul:eq(1)").css("width","16%")
			$(".bottom_body_1 ul:eq(2)").css("width","16%")
			$(".bottom_body_1 ul:eq(3)").css("width","16%")
			$(".bottom_body_1 ul:eq(4)").css("width","16%") 	
		}
		if(document.body.clientWidth<=970){
			$("#c_edit_number").attr("disable",true);
			$("#c_edit_number").css("width","80%");
			$("#c_edit_number").css("margin-top","20px");
			$(".c_edit_body_form_up").css("width","100%");
			$(".c_edit_body_form_up").css("margin-left","0px");
			$(".c_edit_body_form_up").eq(1).css("margin-top","40px");
			$(".c_edit_body_form_up").eq(2).css("margin-top","40px");
			$(".c_edit_body_form_upimage img").css("width","50%");
			$(".c_edit_body_form_upbutton").css("width","85.2%");
			$(".c_edit_body_form_upbutton").css("margin-bottom","60px");
			$(".c_edit_body").css("height","1600px");
			}else{
			$("#c_edit_number").attr("disable",false);
			$("#c_edit_number").css("width","13%");
			$("#c_edit_number").css("margin-top","0px");
			$(".c_edit_body_form_up").css("width","28%");
			$(".c_edit_body_form_upimage img").css("width","100%");
			$(".c_edit_body_form_upbutton").css("width","24.3%");
			
			$(".c_edit_body_form_up").css("margin-left","30px");
			$(".c_edit_body_form_up").eq(0).css("margin-left","0px");
			$(".c_edit_body_form_up").css("margin-top","0px");
			$(".c_edit_body").css("height","1000px");
		
		}
	}  

