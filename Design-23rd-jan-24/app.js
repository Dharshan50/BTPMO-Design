var originalOrder = {};
var lstOrder = [];

$(document).ready(function () {
	$(".page_content").show();
	$(".loading_container").hide();
	$("[class^='header_']").hide();
	$(".CanvasZone").css("max-width", "100%");
	$("[class^='pageContent_']")
		.css("max-width", "100%")
		.css("position", "unset");
	$("#workbenchCommandBar").hide();

	date_picker();
	hide_all_details();
	$("#top_div").hide();
	$("#dev_break_tbl").hide();
	// $('#project_charter_data').hide();
	// $('#function_req').hide();
	// $('#function_req_2').hide();
	// $('#project_charter_data_2').hide();
	$("#tab1").get(0).click();
	$(".prot_ali_items").hide();
	$("#port_dev_view").hide();
	$("#proj_tsk_manage").hide();
	$("#prj_tsk_assign").hide();
	$("#proj_stage_task").hide();
	$("#create_proj_form_container").hide();
	$(document).find("input:text").addClass("rounded-0 boxes");
	$(document).find("select").addClass("rounded-0 boxes");
	//diwakar
	$("[id^='Close_Pending_']").hide();
	$("[id^='Close_Assigned_']").hide();
	$("[id^='Form_Template_']").hide();
	$(document).find("[class^='batch_field_1']").hide();
	$(document).find("[class^='Batch_Buttons']").hide();
	//diwakar

	// $('#project_charter_data_3').hide();
	// $('#project_charter_data_4').hide();
	// $('#project_charter_data_5').hide();
	// $('#function_req_3').hide();
	hideProjData();
	$(document).find("[class^='EditField_']").hide();
	//$(document).find("[class^='card_button_']").hide();
	$(document).find("[id^='edit_revenddate_']").hide();
	$(document).find("[id^='edit_revstrdate_']").hide();
	$(document).find("[id^='edit_enddate_']").hide();
	$(document).find("[id^='edit_status_']").hide();
	$(document).find("[id^='edit_strdate_']").hide();
	$(document).find("[id^='edit_revendrevdate_']").hide();
	$(document).find("[id^='edit_revstrrevdate_']").hide();
	$(document).find("[id^='edit_endrevdate_']").hide();
	$(document).find("[id^='edit_strrevdate_']").hide();
	$(document).find("[id^='edit_revstatus_']").hide();

	$(document).find("[id^='edit_revenddate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_revstrdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_enddate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_strdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_revendrevdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_revstrrevdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_endrevdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	$(document).find("[id^='edit_strrevdate_']").datepicker({
		dateFormat: "dd/mm/yy",
	});
	// sortElements();
});

let draggedItem;

// For Task menu
var $Task_menudiv = $(".Task_plus_drop_dwn");
var $Task_plus_icon = $("#Task_Column_menus");

$Task_plus_icon.on("click", function () {
	if ($Task_menudiv.css("display") === "none") {
		$Task_menudiv.css("display", "flex");
		$Task_plus_icon.css("transform", "rotate(315deg)");
	} else {
		$Task_menudiv.css("display", "none");
		$Task_plus_icon.css("transform", "rotate(0deg)");
	}
});

// For Project menu
var $Project_menudiv = $(".Project_plus_drop_dwn");
var $Project_plus_icon = $("#Project_Column_menus");

$Project_plus_icon.on("click", function () {
	if ($Project_menudiv.css("display") === "none") {
		$Project_menudiv.css("display", "flex");
		$Project_plus_icon.css("transform", "rotate(315deg)");
	} else {
		$Project_menudiv.css("display", "none");
		$Project_plus_icon.css("transform", "rotate(0deg)");
	}
});

// For Portfolio menu
var $Portfolio_menudiv = $(".Portfolio_plus_drop_dwn");
var $Portfolio_plus_icon = $("#Portfolio_Column_menus");

$Portfolio_plus_icon.on("click", function () {
	if ($Portfolio_menudiv.css("display") === "none") {
		$Portfolio_menudiv.css("display", "flex");
		$Portfolio_plus_icon.css("transform", "rotate(315deg)");
	} else {
		$Portfolio_menudiv.css("display", "none");
		$Portfolio_plus_icon.css("transform", "rotate(0deg)");
	}
});

// Ba Manager menu
var $BaManager_menudiv = $(".BAManager_plus_drop_dwn");
var $BaManager_plus_icon = $("#BAManager_Column_menus");

$BaManager_plus_icon.on("click", function () {
	if ($BaManager_menudiv.css("display") === "none") {
		$BaManager_menudiv.css("display", "flex");
		$BaManager_plus_icon.css("transform", "rotate(315deg)");
	} else {
		$BaManager_menudiv.css("display", "none");
		$BaManager_plus_icon.css("transform", "rotate(0deg)");
	}
});

// PM Manager menu
var $PMManager_menudiv = $(".PMManager_plus_drop_dwn");
var $PMManager_plus_icon = $("#PMManager_Column_menus");

$PMManager_plus_icon.on("click", function () {
	if ($PMManager_menudiv.css("display") === "none") {
		$PMManager_menudiv.css("display", "flex");
		$PMManager_plus_icon.css("transform", "rotate(315deg)");
	} else {
		$PMManager_menudiv.css("display", "none");
		$PMManager_plus_icon.css("transform", "rotate(0deg)");
	}
});

function drag(event) {
	draggedItem = event.target;
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	const target = event.target.closest(".label_td_prot");
	if (target) {
		const rect = target.getBoundingClientRect();
		if (event.clientY > rect.top + rect.height / 2) {
			// Drop below the target label
			target.parentNode.insertBefore(draggedItem, target.nextElementSibling);
		} else {
			// Drop above the target label
			target.parentNode.insertBefore(draggedItem, target);
		}
	} else {
		// Drop at the end if no label is present
		event.currentTarget.appendChild(draggedItem);
	}
}

$(document)
	.find("[id^='Expand_Pending_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find("[class^='pending_Assignment_View_']").hide();
		$("[id^='Expand_Pending_']").show();
		$("[id^='Close_Pending_']").hide();
		$(document).find(`.pending_Assignment_View_${id}`).show();
		$(document).find(`#Close_Pending_${id}`).show();
		$(document).find(`#Expand_Pending_${id}`).hide();
		initializeDraggable();
	});

$(document)
	.find("[id^='Ba_view_reassign_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find("[class^='pending_Assignment_View_']").hide();
		$("[id^='Ba_view_reassign_']").show();
		$("[id^='Close_Pending_']").hide();
		$(document).find(`.pending_Assignment_View_${id}`).show();
		$(document).find(`#Close_Pending_${id}`).show();
		$(document).find(`#Expand_Pending_${id}`).hide();
		initializeDraggable();
	});

$(document)
	.find("[id^='Task_Edit_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		// hide existing
		$(document).find(`[id^='Task_Body_']`).hide().css("max-height", " ");
		$(document).find(`[class^='Task_Field_']`).hide();
		$(document).find(`[class^='Task_Label_']`).show();
		$(document).find(`[id^='Task_Edit_']`).show();
		$(document).find(`[id^='Task_Save_']`).hide();
		$(document).find(`[id^='Task_Cancel_']`).hide();

		$(document).find(`#Task_Body_${id}`).show().css("max-height", "335px");
		$(document).find(`[class^='Task_Field_${id}']`).show();
		$(document).find(`[class^='Task_Label_${id}']`).hide();
		$(document).find(`#Task_Edit_${id}`).hide();
		$(document).find(`#Task_Save_${id}`).show();
		$(document).find(`#Task_Cancel_${id}`).show();
		// initializeDraggable()
	});

$(document)
	.find("[class^='chooseProject__']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("__");
		var id = splitArray[splitArray.length - 1];

		var flag = $(this).prop("checked");
		if (flag) {
			// $(this).prop('checked', false);
			$(document).find(`.${id}`).show();
		} else {
			// $(this).prop('checked', true);
			$(document).find(`.${id}`).hide();
		}
	});

function doRestoreProjectColumns() {
	$(document)
		.find("[class^='chooseProject__']")
		.each(function () {
			var temp_id = this.id;
			var splitArray = temp_id.split("__");
			var id = splitArray[splitArray.length - 1];

			var flag = $(this).prop("checked");
			if (flag) {
				$(document).find(`.${id}`).show();
			} else {
				$(document).find(`.${id}`).hide();
			}
		});
}

$(document)
	.find("[class^='choosePortfolio__']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("__");
		var id = splitArray[splitArray.length - 1];

		var flag = $(this).prop("checked");
		if (flag) {
			// $(this).prop('checked', false);
			$(document).find(`.${id}`).show();
		} else {
			// $(this).prop('checked', true);
			$(document).find(`.${id}`).hide();
		}
	});

function doRestorePortfolioColumns() {
	$(document)
		.find("[class^='choosePortfolio__']")
		.each(function () {
			var temp_id = this.id;
			var splitArray = temp_id.split("__");
			var id = splitArray[splitArray.length - 1];

			var flag = $(this).prop("checked");
			if (flag) {
				$(document).find(`.${id}`).show();
			} else {
				$(document).find(`.${id}`).hide();
			}
		});
}

$(document)
	.find("[class^='chooseBaManger__']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("__");
		var id = splitArray[splitArray.length - 1];

		var flag = $(this).prop("checked");
		if (flag) {
			// $(this).prop('checked', false);
			$(document).find(`.${id}`).show();
		} else {
			// $(this).prop('checked', true);
			$(document).find(`.${id}`).hide();
		}
	});

function doRestoreBaManagerColumns() {
	$(document)
		.find("[class^='chooseBaManger__']")
		.each(function () {
			var temp_id = this.id;
			var splitArray = temp_id.split("__");
			var id = splitArray[splitArray.length - 1];

			var flag = $(this).prop("checked");
			if (flag) {
				$(document).find(`.${id}`).show();
			} else {
				$(document).find(`.${id}`).hide();
			}
		});
}

$(document)
	.find("[class^='choosePMManger__']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("__");
		var id = splitArray[splitArray.length - 1];

		var flag = $(this).prop("checked");
		if (flag) {
			// $(this).prop('checked', false);
			$(document).find(`.${id}`).show();
		} else {
			// $(this).prop('checked', true);
			$(document).find(`.${id}`).hide();
		}
	});

function doRestorePMManagerColumns() {
	$(document)
		.find("[class^='choosePMManger__']")
		.each(function () {
			var temp_id = this.id;
			var splitArray = temp_id.split("__");
			var id = splitArray[splitArray.length - 1];

			var flag = $(this).prop("checked");
			if (flag) {
				$(document).find(`.${id}`).show();
			} else {
				$(document).find(`.${id}`).hide();
			}
		});
}

$(document)
	.find("[class^='chooseTask__']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("__");
		var id = splitArray[splitArray.length - 1];

		var flag = $(this).prop("checked");
		if (flag) {
			// $(this).prop('checked', false);
			$(document).find(`.${id}`).show();
		} else {
			// $(this).prop('checked', true);
			$(document).find(`.${id}`).hide();
		}
	});

function doRestoreTaskColumns() {
	$(document)
		.find("[class^='chooseTask__']")
		.each(function () {
			var temp_id = this.id;
			var splitArray = temp_id.split("__");
			var id = splitArray[splitArray.length - 1];

			var flag = $(this).prop("checked");
			if (flag) {
				$(document).find(`.${id}`).show();
			} else {
				$(document).find(`.${id}`).hide();
			}
		});
}

$(document).ready(function () {
	// Make each label draggable
	$(".draggable").draggable({
		revert: true,
		zIndex: 1000,
		cursor: "move",
		helper: "clone",
	});

	// Make drop zone droppable
	$(".dropzone").droppable({
		accept: ".draggable",
		drop: function (event, ui) {
			// When a draggable element is dropped onto the drop zone
			// Append the dropped element to the drop zone
			$(this).append(ui.draggable.clone());
		},
	});
});

// $(document).ready(function() {
//     // Make td elements droppable
//     $(".droppable").droppable({
//         accept: ".draggable",
//         drop: function(event, ui) {
//             // When a draggable element is dropped onto the droppable td
//             // Append the dropped element to the td
//             $(this).append(ui.draggable);
//         }
//     });
// });

$(document)
	.find("[id^='Task_Cancel_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`#Task_Body_${id}`).hide();
		$(document).find(`[class^='Task_Field_${id}']`).hide();
		$(document).find(`[class^='Task_Label_${id}']`).show();
		// $(document).find(`.Task_Field_${id}`).hide()
		// $(document).find(`.Task_Label_${id}`).show()
		$(document).find(`#Task_Edit_${id}`).show();
		$(document).find(`#Task_Save_${id}`).hide();
		$(document).find(`#Task_Cancel_${id}`).hide();
		// initializeDraggable()
	});

$(document)
	.find("[id^='Task_Save_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`#Task_Body_${id}`).hide();
		$(document).find(`.Task_Field_${id}`).hide();
		$(document).find(`.Task_Label_${id}`).show();
		$(document).find(`#Task_Edit_${id}`).show();
		$(document).find(`#Task_Save_${id}`).hide();
		$(document).find(`#Task_Cancel_${id}`).hide();
		// initializeDraggable()
	});

$(document)
	.find("[id^='Edit_Batch_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`.batch_field_${id}`).show();
		$(document).find(`.Batch_Req_${id}`).show();
		$(document).find(`.batch_label_${id}`).hide();
		$(document).find(`#Edit_Batch_${id}`).hide();
		// initializeDraggable()
	});

$(document)
	.find("[class^='close_batch_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`.batch_field_${id}`).hide();
		$(document).find(`.Batch_Req_${id}`).hide();
		$(document).find(`.batch_label_${id}`).show();
		$(document).find(`#Edit_Batch_${id}`).show();
		// initializeDraggable()
	});

$(document)
	.find("[id^='Close_Pending_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`.pending_Assignment_View_${id}`).hide();
		$(document).find(`#Expand_Pending_${id}`).show();
		$(document).find(`#Close_Pending_${id}`).hide();
	});

$(document)
	.find("[id^='Expand_Assigned_']")
	.on("click", function () {
		// $(this).parent().parent().hide();
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find("[class^='Assigned_Record_View_']").hide();
		$("[id^='Close_Assigned_']").hide();
		$("[id^='Expand_Assigned_']").show();
		$("[id^='GoPendingAssignment_']").show();
		$(document).find(`.Assigned_Record_View_${id}`).show();
		$(document).find(`#Close_Assigned_${id}`).show();
		$(document).find(`#Expand_Assigned_${id}`).hide();
		$(document).find(`#GoPendingAssignment_${id}`).hide();
		initializeDraggable();
	});

$(document)
	.find("[id^='GoPendingAssignment_']")
	.on("click", function () {
		$(this).parent().parent().hide();
		// var temp_id = this.id;
		// var splitArray = temp_id.split('_');
		// var id = splitArray[splitArray.length - 1];
		// $(document).find("[class^='Assigned_Record_View_']").hide();
		// $("[id^='Close_Assigned_']").hide();
		// $("[id^='Expand_Assigned_']").show();
		// $("[id^='GoPendingAssignment_']").show();
		// $(document).find(`.Assigned_Record_View_${id}`).show()
		// $(document).find(`#Close_Assigned_${id}`).show()
		// $(document).find(`#Expand_Assigned_${id}`).hide()
		// $(document).find(`#GoPendingAssignment_${id}`).hide()
		// initializeDraggable()
	});

$(document)
	.find("[id^='Close_Assigned_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find(`.Assigned_Record_View_${id}`).hide();
		$(document).find(`#Expand_Assigned_${id}`).show();
		$(document).find(`#GoPendingAssignment_${id}`).show();
		$(document).find(`#Close_Assigned_${id}`).hide();
	});

$(document).on("change", ".order_select", function () {
	var $selectedOption = $(this).find("option:selected");
	var newOrder = $selectedOption.val();
	var $parentCard = $(this).closest(".card_main_box");
	$parentCard.attr("data-order", newOrder);
	// sortElements();
});

document.addEventListener("DOMContentLoaded", function () {
	var yesCheckbox = document.getElementById("batch_ys");
	var noCheckbox = document.getElementById("batch_no");
	var addBatchDiv = document.querySelector("#batch_nam_box");

	// Event listener for 'Yes' checkbox
	yesCheckbox.addEventListener("click", function () {
		if (this.checked) {
			addBatchDiv.style.display = "block";
			noCheckbox.checked = false; // Uncheck the 'No' checkbox
		} else {
			addBatchDiv.style.display = "none";
		}
	});

	// Event listener for 'No' checkbox
	noCheckbox.addEventListener("click", function () {
		if (this.checked) {
			addBatchDiv.style.display = "none";
			yesCheckbox.checked = false; // Uncheck the 'Yes' checkbox
		}
	});
});

function initializeDraggable() {
	$(".card_main_box").each(function () {
		$(this)
			.find(".move")
			.on("mousedown", function (e) {
				var $draggable = $(this).closest(".card_main_box");
				$draggable.draggable({
					revert: "invalid", // Snap back to original position if not dropped on droppable
					cursor: "move",
					helper: "clone", // Drag a clone instead of the original element
					zIndex: 1000,
					start: function (event, ui) {
						$(this).css("z-index", 1001);
						var parentWidth = $(this).width();
						ui.helper.css("width", parentWidth);
					},
					drag: function (event, ui) {
						var parent = $(this).parent();
						var containment = {
							top: parent.offset().top,
							left: parent.offset().left,
							bottom:
								parent.offset().top + parent.height() - $(this).outerHeight(),
							right:
								parent.offset().left + parent.width() - $(this).outerWidth(),
						};
						ui.position.top = Math.min(
							Math.max(ui.position.top, containment.top),
							containment.bottom
						);
						ui.position.left = Math.min(
							Math.max(ui.position.left, containment.left),
							containment.right
						);
					},
				});
			});
	});
}
$(document)
	.find(".droppable")
	.droppable({
		// accept: ".card_main_box", // Only accept draggable elements
		over: function (event, ui) {
			// Remove hover class from all items
			$(".card_main_box").removeClass("hover");

			// Find the index of the dragged item
			var draggedIndex = $(ui.helper).index();

			// Add hover class to the item directly below the dragged item
			var $hoveredItem = $(this)
				.children(".card_main_box")
				.eq(draggedIndex + 1);
			$hoveredItem.addClass("hover");

			// Apply custom styles to the hovered item
			$hoveredItem.css({
				opacity: "0", // Set opacity to 0
				border: "2px solid red", // Apply a red border
				// Add any other styles you want to apply
			});
		},
		out: function (event, ui) {
			// Remove hover class from all items
			$(".card_main_box").removeClass("hover");

			// Reset styles of the hovered item
			// $(this).children('.card_main_box').css({
			//     "opacity": "", // Reset opacity
			//     "border": "" // Reset border
			//     // Reset any other styles you applied
			// });
		},
		drop: function (event, ui) {
			var $draggable = ui.draggable;
			var $droppable = $draggable.parent();

			// Remove the original draggable element
			$draggable.remove();

			// Get the index of the hovered item
			var hoveredIndex = $(this).children(".hover").index();

			// Reset styles of the hovered item
			// $(this).children('.card_main_box').eq(hoveredIndex).css({
			//     "opacity": "", // Reset opacity
			//     "border": "" // Reset border
			//     // Reset any other styles you applied
			// });

			lstOrder = [];
			// Find the position where the item is dropped
			var $nextItem = $droppable
				.find(".card_main_box")
				.filter(function () {
					return $(this).offset().top > ui.offset.top;
				})
				.first();

			// If no next item, append to the end
			if ($nextItem.length === 0) {
				$droppable.append($draggable);
			} else {
				$draggable.insertBefore($nextItem);
			}

			// Update the order of items
			var $items = $droppable.find(".card_main_box");
			for (var i = 0; i < $items.length; i++) {
				$($items[i]).attr("data-order", i + 1);
				if (
					$($items[i]).attr("id") !== undefined &&
					$($items[i]).attr("id") !== null
				)
					lstOrder.push($($items[i]).attr("id"));
			}

			var droppableId = $droppable.attr("name");
			originalOrder[droppableId] = lstOrder;

			setTimeout(initializeDraggable, 200);
		},
	});

// function sortElements() {
//     var $droppable = $(".droppable");
//     var $elements = $droppable.find(".card_main_box");

//     $elements.sort(function (a, b) {
//         return parseInt($(a).attr("data-order")) - parseInt($(b).attr("data-order"));
//     });

//     $droppable.empty().append($elements);
// }

function date_picker() {
	$("#upd_reviseend_date").datepicker();
	$("#upd_reviseselect_date").datepicker();
	$("#task_closuredate").datepicker();
	$("#task_revisedenddate").datepicker();
	// $('#task_revisemandays').datepicker();
	$("#task_revisedstartdate").datepicker();
	$("#task_enddate").datepicker();
	$("#proj_reviselive").datepicker();
	$("#proj_targlive").datepicker();
	$("#proj_deadline").datepicker();
	$("#task_startdate").datepicker();
}

function hide_all_details() {
	$("#task_manage").hide();
	$("#task_content").hide();
	$("#proj_content").hide();
	$("#update_task").hide();
	$("#view_proj").hide();
	$("#buttons").hide();
	$("#upd_userlog_cmts").hide();
	$("#proj_tsk_manage").hide();
	$("#prj_tsk_assign").hide();
	$("#proj_stage_task").hide();
	$("#create_proj_form_container").hide();
	$("#project_charter_data_3").hide();
	$("#function_req_3").hide();
	$("#project_charter_data_4").hide();
	$("#project_charter_data_5").hide();
	//$('#bt_dev_tasks').hide();
	hideProjData();
}

function task_hide_details() {
	$("#task_content").hide();
	$("#proj_content").hide();
	$("#update_task").hide();
	$("#view_proj").hide();
	$("#buttons").hide();
	$("#upd_userlog_cmts").hide();
	$("#proj_tsk_manage").hide();
	$("#prj_tsk_assign").hide();
	$("#proj_stage_task").hide();
	$("#create_proj_form_container").hide();
	$("#project_charter_data_3").hide();
	$("#function_req_3").hide();
	$("#project_charter_data_4").hide();
	$("#project_charter_data_5").hide();
	hideProjData();
	//$('#bt_dev_tasks').hide();
}
$("#task_pmtab2").on("click", function () {
	$("#pm_projects_table").hide();
	$("#pm_res_table").show();

	$("#pm_pending").show();
});
$("#task_BAtab2").on("click", function () {
	$("#Ba_man_table_section").hide();
	$(".port_table_view").hide();
	$(".prot_BA_view").hide();
	$(".ba_mana_table").hide();

	$("#select_filter_bamanager").hide();

	$("#ba_res_table").show();

	$("#ba_pending_tb").show();
	$("#ba_pending").show();
});
$("#task_BAtab3").on("click", function () {
	$("#Ba_man_table_section").hide();
	$(".port_table_view").hide();
	$(".prot_BA_view").hide();
	$(".ba_mana_table").hide();

	$("#select_filter_bamanager").hide();

	$("#ba_res_table").show();

	$("#ba_pending_tb").show();
	$("#ba_pending").show();
});
$("#task_pmtab3").on("click", function () {
	$("#pm_projects_table").hide();
	$("#pm_res_table").show();

	$("#pm_pending").show();
});
$("#task_pmtab4").on("click", function () {
	$("#pm_projects_table").hide();
	$("#pm_res_table").show();

	$("#pm_pending").show();
});
$("#task_pmtab1").on("click", function () {
	$("#pm_pending").hide();
	$("#pm_projects_table").show();
	$(".important_section_pm").show();

	$("#pm_myprojects").show();
	$("#pm_res_table").hide();
});

$("#tab1").on("click", function () {
	$("#proj_summary_tbl").show();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").show();
	$(".important_section_ps").show();
	$("#pmo_imp").hide();

	$("#task_content_changereq").hide();

	$("#bt_dev_tasks").hide();
	$(".important_section").hide();
	$(".imp_bamanager").hide();
	$("#pm_res_table").hide();
	$("#port_quarter_view").hide();

	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$("#change_req_tbl").hide();

	$(".important_section").hide();
	$(".imp_bamanager").hide();
	$("#pm_res_table").hide();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();

	$("#pm_tab_div").hide();

	$(".prot_ali_items").hide();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").hide();
	$("#prot_BA_view").hide();
	hide_all_details();
	doRestoreProjectColumns();
});
$("#tasktab1").on("click", function () {
	$("#task_tab1_details").show();
	$("#task_tab2_details").hide();
	$("#task_tab3_details").hide();
	$("#task_tab4_details").hide();
	$("#task_tab6_details").hide();
});
$("#tasktab2").on("click", function () {
	$("#task_tab2_details").show();
	$("#task_tab1_details").hide();
	$("#task_tab3_details").hide();
	$("#task_tab6_details").hide();

	$("#task_tab5_details").hide();
});
$("#tasktab3").on("click", function () {
	$("#task_tab1_details").hide();
	$("#task_tab2_details").hide();
	$("#task_tab4_details").hide();
	$("#task_tab5_details").hide();
	$("#task_tab6_details").hide();

	$("#task_tab3_details").show();
});
$("#tasktab5").on("click", function () {
	$("#task_tab1_details").hide();
	$("#task_tab2_details").hide();
	$("#task_tab3_details").hide();
	$("#task_tab4_details").show();
	$("#task_tab5_details").hide();

	$("#task_tab6_details").hide();
});
$("#tasktab6").on("click", function () {
	$("#task_tab1_details").hide();
	$("#task_tab2_details").hide();
	$("#task_tab3_details").hide();
	$("#task_tab4_details").hide();
	$("#task_tab6_details").hide();

	$("#task_tab5_details").show();
});
$("#tasktab7").on("click", function () {
	$("#task_tab1_details").hide();
	$("#task_tab2_details").hide();
	$("#task_tab3_details").hide();
	$("#task_tab4_details").hide();
	$("#task_tab5_details").hide();

	$("#task_tab6_details").show();
});

$("#taskfuntab1").on("click", function () {
	$("#task_fun1_details").show();
	$("#task_fun2_details").hide();
	$("#task_fun3_details").hide();
	$("#task_fun4_details").hide();
	$("#task_fun5_details").hide();
});
$("#taskfuntab2").on("click", function () {
	$("#task_fun1_details").hide();
	$("#task_fun3_details").hide();
	$("#task_fun4_details").hide();
	$("#task_fun5_details").hide();

	$("#task_fun2_details").show();
});
$("#taskfuntab3").on("click", function () {
	$("#task_fun1_details").hide();
	$("#task_fun2_details").hide();
	$("#task_fun4_details").hide();
	$("#task_fun3_details").show();
	$("#task_fun5_details").hide();
});
$("#taskfuntab5").on("click", function () {
	$("#task_fun1_details").hide();
	$("#task_fun2_details").hide();
	$("#task_fun3_details").hide();
	$("#task_fun5_details").hide();

	$("#task_fun4_details").show();
});
$("#taskfuntab6").on("click", function () {
	$("#task_fun1_details").hide();
	$("#task_fun2_details").hide();
	$("#task_fun3_details").hide();
	$("#task_fun4_details").hide();

	$("#task_fun5_details").show();
});
$("#taskdevtab1").on("click", function () {
	$("#task_dev3_details").hide();
	$("#task_dev2_details").hide();

	$("#task_dev4_details").hide();

	$("#task_dev1_details").show();
});
$("#taskdevtsktab1").on("click", function () {
	$("#task_devtask3_details").hide();
	$("#task_devtask2_details").hide();

	$("#task_devtask4_details").hide();

	$("#task_devtask1_details").show();
});
$("#taskdevtab2").on("click", function () {
	$("#task_dev3_details").hide();
	$("#task_dev2_details").show();

	$("#task_dev4_details").hide();

	$("#task_dev1_details").hide();
});
$("#taskdevtsktab2").on("click", function () {
	$("#task_devtask3_details").hide();
	$("#task_devtask2_details").show();

	$("#task_devtask4_details").hide();

	$("#task_devtask1_details").hide();
});
$("#taskdevtab3").on("click", function () {
	$("#task_dev3_details").show();
	$("#task_dev2_details").hide();

	$("#task_dev4_details").hide();

	$("#task_dev1_details").hide();
});
$("#taskdevtsktab3").on("click", function () {
	$("#task_devtask3_details").show();
	$("#task_devtask2_details").hide();

	$("#task_devtask4_details").hide();

	$("#task_devtask1_details").hide();
});
$("#taskdevtab5").on("click", function () {
	$("#task_dev3_details").hide();
	$("#task_dev2_details").hide();

	$("#task_dev4_details").show();

	$("#task_dev1_details").hide();
});
$("#taskdevtsktab5").on("click", function () {
	$("#task_devtask3_details").hide();
	$("#task_devtask2_details").hide();

	$("#task_devtask4_details").show();

	$("#task_devtask1_details").hide();
});
$("#task_cr1").on("click", function () {
	$(".Assinged_chagereq").show();
	$(".Pending_chahge_req").hide();
	$(".Completed_chagereq").hide();
	$("[class^='pending_Assignment_View_']").hide();
	$("[id^='Expand_Pending_']").get(0).click();
});
$("#task_cr7").on("click", function () {
	$(".Assinged_chagereq").hide();
	$(".Pending_chahge_req").show();
	$(".Completed_chagereq").hide();
});
$("#task_cr3").on("click", function () {
	$(".Assinged_chagereq").hide();
	$(".Pending_chahge_req").hide();
	$(".Completed_chagereq").show();
});
$("#task_proj_tab2").on("click", function () {
	$("#tab3").get(0).click();
	$("#task_cr7").get(0).click();
	$("#pm_tab_div").hide();
	$("#port_dev_view").hide();
	$(".Assinged_chagereq").hide();
	$("#port_quarter_view").hide();

	$("#change_req_tbl").show();

	$("#pm_res_table").hide();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$("#not_started").hide();
	$(".Current_task").hide();
	$("#task_content_changereq").show();
	$("#task_content_proj").hide();
	$(".pro_hd_tab").hide();
	doRestoreTaskColumns();
	$("#task_manage").hide();
	$(".task_tabwrap").show();
	$("#table  tbl_all_proj").hide();
	task_hide_details();
	$("#proj_summary_tbl").hide();
	$(".prot_ali_items").hide();
	$("#ba_manag_view").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").show();
	$("#task_tab1").get(0).click();
	$("#bt_dev_tasks").hide();
	$("#portfolio_sec_tab").hide();
	$("#week_date_display").hide();

	$("#prot_BA_view").hide();
	$("#Func_Cancel_Ba_1").hide();
	$("#Func_Save_Ba_1").hide();
	$(".Proj_detail_field_1").hide();
	$("#stage_clousure").hide();
	$("#Ba_responsible").hide();
	hideProjData();
});
$("#task_proj_tab1").on("click", function () {
	$("#task_content_changereq").hide();
	$("#task_content_proj").show();
});
$("#taskfuntab1").on("click", function () {
	// $('#task_batch1_details').show();
	// $('#task_batch2_details').hide();
});
$("#taskfuntab2").on("click", function () {
	// $('#task_batch1_details').hide();
	// $('#task_batch2_details').show();
});

$("#taskfun_tab1").on("click", function () {
	$("#task_batch1_details").show();
	$("#task_rev1_details").hide();
	$("#task_reqfun1_details").hide();
	$("#task_reqfun1_details").hide();

	$("#task_reqsingoff1_details").hide();
	$("#task_signof1_details").hide();
});
$("#taskfun_tab2").on("click", function () {
	$("#task_batch1_details").hide();
	$("#task_rev1_details").show();
	$("#task_reqfun1_details").hide();

	$("#task_reqsingoff1_details").hide();
	$("#task_signof1_details").hide();
	$("#task_batch1_details").hide();
});
$("#taskfun_tab3").on("click", function () {
	$("#task_batch1_details").hide();
	$("#task_rev1_details").hide();
	$("#task_reqfun1_details").show();

	$("#task_reqsingoff1_details").hide();
	$("#task_signof1_details").hide();
	$("#task_batch1_details").hide();
});
$("#taskfun_tab4").on("click", function () {
	$("#task_batch1_details").hide();
	$("#task_rev1_details").hide();
	$("#task_reqfun1_details").hide();

	$("#task_reqsingoff1_details").hide();
	$("#task_signof1_details").show();
	$("#task_batch1_details").hide();
});
$("#taskfun_tab5").on("click", function () {
	$("#task_batch1_details").hide();
	$("#task_rev1_details").hide();
	$("#task_reqfun1_details").hide();

	$("#task_reqsingoff1_details").show();
	$("#task_signof1_details").hide();
	$("#task_batch1_details").hide();
});
$("#task_assfun_tab1").on("click", function () {
	$("#task_batch2_details").show();
	$("#task_rev2_details").hide();
	$("#task_reqfun2_details").hide();
	$("#task_reqfun2_details").hide();

	$("#task_reqsingoff2_details").hide();
	$("#task_signof2_details").hide();
});
$("#task_assfun_tab2").on("click", function () {
	$("#task_batch2_details").hide();
	$("#task_rev2_details").show();
	$("#task_reqfun2_details").hide();

	$("#task_reqsingoff2_details").hide();
	$("#task_signof2_details").hide();
	$("#task_batch2_details").hide();
});
$("#task_assfun_tab3").on("click", function () {
	$("#task_batch2_details").hide();
	$("#task_rev2_details").hide();
	$("#task_reqfun2_details").show();

	$("#task_reqsingoff2_details").hide();
	$("#task_signof2_details").hide();
	$("#task_batch2_details").hide();
});
$("#task_assfun_tab4").on("click", function () {
	$("#task_batch2_details").hide();
	$("#task_rev2_details").hide();
	$("#task_reqfun2_details").hide();

	$("#task_reqsingoff2_details").hide();
	$("#task_signof2_details").show();
	$("#task_batch2_details").hide();
});
$("#task_assfun_tab5").on("click", function () {
	$("#task_batch2_details").hide();
	$("#task_rev2_details").hide();
	$("#task_reqfun2_details").hide();

	$("#task_reqsingoff2_details").show();
	$("#task_signof2_details").hide();
	$("#task_batch2_details").hide();
});
$("#assign_tsk").on("click", function () {
	$("#slct_proj_drop").val("");
	$("#proj_tsk_manage").hide();
	$("#prj_tsk_assign").show();
	$("#pagination_container").hide();
});
$("#prj_tsk_rtrn").on("click", function () {
	$("#tab2").get(0).click();
	$("#proj_tsk_manage").show();
	$("#prj_tsk_assign").hide();
	$("#pagination_container").show();
});

// $('#proj_taskpri_tab4').on('click', function () {
//     $('.project_filter_bar').show();
//     $('.proj_task_tabwrap').show();

//     $('#pm_tab_div').hide();
//     $('#port_dev_view').hide();
//     $('#pm_res_table').hide();

//     $('#task_manage').hide();
//     $('.prot_ali_items').hide();
//     task_hide_details();
//     $('#proj_summary_tbl').hide();
//     $('.hide_default_Projects_Tab').hide();
//     $('#pagination_container').show();

//     $('#portfolio_sec_tab').show();

//     $('#proj_tsk_manage').hide();
//     $('#Projects_Tab').hide();

//     $('#porfolio_names').hide();

//     $('#proj_task_tab1').get(0).click();
//     $('#bt_dev_tasks').hide();

//     $('#Ba_man_table_section').hide();

//     $('#prot_BA_view').hide();
//     $('.task_tabwrap').show();

//     $(document).find(`[id^='Task_Body_']`).hide().css('max-height', '335px')
//     $(document).find(`[class^='Task_Field_']`).hide()
//     $(document).find(`[class^='Task_Label_']`).show()
//     $(document).find(`[id^='Task_Edit_']`).show()
//     $(document).find(`[id^='Task_Save_']`).hide()
//     $(document).find(`[id^='Task_Cancel_']`).hide()
//     hideProjData();
//     $('#prot_BA_view').show();
//     $('#port_tab_table').hide();
//     $('pagination_container').show();
//     $('.prot_ali_items').show();
//     $('.proj_task_tabwrap').hide();
//     $('#port_proj_type_filter').hide();
//     $('#port_BA_type_filter').show();

//     $('.pending_Assignment_Record').hide();
//     $(document).find("[class^='Assigned_Record_View_']").hide();
//     $(document).find("[class^='pending_Assignment_View_']").hide();
//     $("[id^='Close_Assigned_']").hide();

//     $(document).find("[class^='batch_field_']").hide();
//     $(document).find("[class^='batch_label_']").show();
//     $(document).find("[class^='Batch_Buttons']").hide();
//     $(document).find("[class^='Batch_Req_']").hide();
//     $(document).find("[id^='Edit_Batch_']").show();

//     $(document).find(`[id^='Task_Body_']`).hide().css('max-height', '335px')
//     $(document).find(`[class^='Task_Field_']`).hide()
//     $(document).find(`[class^='Task_Label_']`).show()
//     $(document).find(`[id^='Task_Edit_']`).show()
//     $(document).find(`[id^='Task_Save_']`).hide()
//     $(document).find(`[id^='Task_Cancel_']`).hide()

//     $(document).find("[class^='Proj_detail_label_']").show();
//     $(document).find("[class^='Proj_detail_field_']").hide();
//     $(document).find("[id^='Project_Detail_Edit_']").show();
//     $(document).find("[id^='Project_Detail_Save_']").hide();
//     $(document).find("[id^='Project_Detail_Cancel_']").hide();

//     $(document).find("[class^='Development_Detail_label_']").show();
//     $(document).find("[class^='Development_Detail_field_']").hide();
//     $(document).find("[id^='Development_Detail_Edit_']").show();
//     $(document).find("[id^='Development_Detail_Save_']").hide();
//     $(document).find("[id^='Development_Detail_Cancel_']").hide();

//     $(document).find(`[class^='Func_ba_label_']`).show()
//     $(document).find(`[class^='Func_ba_field_']`).hide()
//     $(document).find("[id^='Func_Edit_Ba_']").show();
//     $(document).find("[id^='Func_Save_Ba_']").hide();
//     $(document).find("[id^='Func_Cancel_Ba_']").hide();

//     $(".fa-minus").each(function () {
//         $(this).removeClass('fa-minus').addClass('fa-plus');
//     });
// })

$("#slct_proj_drop").on("change", function () {
	var val = $("#slct_proj_drop").val();
	if (val != "") {
		$("#proj_stage_task").show();
		initializeDraggable();
	} else {
		$("#proj_stage_task").hide();
	}
	$(document).find("[id^='Form_Template_']").hide();
	$(document).find("[class^='LabelField_']").show();
	$(document).find("[class^='EditField_']").hide();
});

$("#slc_dashboard_filt").on("change", function () {
	var val = $("#slc_dashboard_filt").val();

	if (val == 1) {
		$("#slc_filt_badev").show();
		$("#port_table_view").hide();
		$("#select_port_filter").hide();
		$("#slc_filt_baname").hide();

		$("#task_tbl").hide();
		$("#port_dev_view").hide();
		$(".ba_name_prot").hide();
		$("#task_proj_filter").show();
		$("#task_content_proj").show();
		$("#prot_BA_view").show();
		$("#port_tab_table").hide();
		$("pagination_container").show();
		$(".prot_ali_items").show();
		$(".proj_task_tabwrap").show();
		$("#port_proj_type_filter").hide();
		$("#port_proj_name_filter").show();
		$("#port_quarter_view").hide();

		$("#port_BA_type_filter").show();
		$(".port_table_view").show();
		$("#port_BA_type_filter").show();
		$("#prot_BA_view").show();
		$("pagination_container").show();
		$(".prot_ali_items").show();
		$("#per_quater_filter").hide();
	} else if (val == 2) {
		$("#port_quarter_view").show();
		$("#per_quater_filter").show();

		$("#slc_filt_badev").hide();
		$("#slc_filt_baname").hide();

		$("#port_tab_table").hide();
		$("#port_dev_view").hide();
		$("#port_table_view").hide();
		$("#task_tbl").hide();

		$(".ba_name_prot").hide();
		$("#task_proj_filter").hide();
		$("#task_content_proj").hide();
		$("#prot_BA_view").show();

		$("pagination_container").hide();
		$(".prot_ali_items").hide();
		$(".proj_task_tabwrap").show();
		$("#port_proj_type_filter").hide();
		$("#port_proj_name_filter").hide();

		$("#port_BA_type_filter").hide();
	} else {
		$("#slc_filt_badev").hide();
		$("#slc_filt_baname").hide();
		$(".ba_name_prot").hide();
		$("#per_quater_filter").hide();
	}
});
$("#slc_filt_badev").on("change", function () {
	var val = $("#slc_filt_badev").val();
	if (val == 1) {
		$("#slc_filt_baname").show();
		$(".ba_name_prot").hide();
	}
});

$("#res_stage_sel").on("change", function () {
	var val = $("#res_stage_sel").val();
	if (val == 1) {
		$("#res_req_id").hide();
		$(".btn_app_rej").hide();
	} else {
		$("#res_req_id").show();
		$(".btn_app_rej").show();
	}
});

$("#res_stage_Devsel").on("change", function () {
	var val = $("#res_stage_Devsel").val();
	if (val == 1) {
		$(".reass_dev_pri").hide();
		$(".btn_appsen_rej").hide();
	} else {
		$(".reass_dev_pri").show();
		$(".btn_appsen_rej").show();
	}
});
$("#port_proj_name_filter").on("change", function () {
	var val = $("#port_proj_name_filter").val();
	if (val == 2) {
		$("#prot_BA_view").show();
		$("#port_tab_table").hide();
		$(".ba_name_prot").Show();
		$("pagination_container").show();
		$(".prot_ali_items").show();
		$(".proj_task_tabwrap").hide();
		$("#port_proj_type_filter").hide();
		$("#port_BA_type_filter").show();
	} else if (val == 1) {
		$("#prot_BA_view").hide();
		$("#port_tab_table").show();
		$(".proj_task_tabwrap").show();
		$(".prot_ali_items").hide();
		$("#port_proj_type_filter").show();
		$("#port_BA_type_filter").hide();
	} else if (val == 3) {
		$("#prot_BA_view").show();
		$("#port_tab_table").hide();
		$("pagination_container").show();
		$(".prot_ali_items").show();
		$(".proj_task_tabwrap").hide();
		$("#port_proj_type_filter").hide();
		$("#port_BA_type_filter").show();
	} else if (val == "") {
		$("#prot_BA_view").hide();
		$("#port_tab_table").show();
		$("pagination_container").show();
	}
});
$("#proj_namealltask_filter").on("change", function () {
	var val = $("#proj_namealltask_filter").val();
	if (val == 2) {
		$("#task_tbl").hide();
		$(".ba_name_prot").hide();
		$("#task_proj_filter").show();
		$("#task_content_proj").show();
		$("#prot_BA_view").show();
		$("#port_tab_table").hide();
		$("pagination_container").show();
		$(".prot_ali_items").show();
		$(".proj_task_tabwrap").show();
		$("#port_proj_type_filter").hide();
		$("#port_BA_type_filter").show();
		$(".task_tabwrap").hide();
		$(".task_content").css("justify-content", "flex-end");
	}
	if (val == 1) {
		$(".task_tabwrap").show();
		$(".task_content").css("justify-content", "space-between");
		$("#task_tbl").show();
		$(".ba_name_prot").show();
		$("#task_proj_filter").hide();
		$("#task_content_proj").hide();
		$("#prot_BA_view").hide();
		$("#port_tab_table").show();
		$("pagination_container").show();
		$(".prot_ali_items").hide();
		$(".proj_task_tabwrap").show();
		$("#port_proj_type_filter").hide();
		$("#port_BA_type_filter").show();

		$("#task_content_proj").show();
	}
});
$("#port_all_tab2").on("click", function () {
	document.getElementById("dashboard_filter").style.display = "Flex";

	$("#port_table_view").hide();
	$("#select_port_filter").hide();

	$("#task_tbl").hide();
	$("#port_dev_view").hide();
	$(".ba_name_prot").show();
	$("#task_proj_filter").show();
	$("#task_content_proj").show();
	$("#prot_BA_view").show();
	$("#port_tab_table").hide();
	$("pagination_container").show();
	$(".prot_ali_items").show();
	$(".proj_task_tabwrap").show();
	$("#port_proj_type_filter").hide();
	$("#port_proj_name_filter").show();
	$("#port_quarter_view").hide();
	$(".ba_name_prot").hide();

	$("#port_BA_type_filter").show();
	$(".port_table_view").show();
	$("#port_BA_type_filter").show();
	$("#prot_BA_view").show();
	$("pagination_container").show();
	$(".prot_ali_items").show();
});
$("#port_mypro_tab1").on("click", function () {
	$("#port_table_view").show();
	$("#task_tbl").show();
	$(".ba_name_prot").show();
	$("#task_proj_filter").hide();
	$("#port_dev_view").hide();
	$("#select_port_filter").hide();
	$("#dashboard_filter").hide();
	$("#port_quarter_view").hide();

	$("#task_content_proj").hide();
	$("#prot_BA_view").hide();
	$("#port_tab_table").show();
	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").show();

	$("#port_proj_type_filter").hide();
	$("#port_proj_name_filter").hide();

	$("#port_BA_type_filter").hide();
});
$("#add_cmts").on("click", function () {
	$("#cmt_form").show();
	$("#comt_txt_area").show();
	$("#cmt_save").show();
});
$("#cmt_save").on("click", function () {
	$("#cmt_msg").show();
	$("#cmt_rply").show();
	$("#cmt_form").hide();
	$("#comt_txt_area").hide();
	$("#cmt_save").hide();
});
$("#cmt_rply").on("click", function () {
	$("#cmt_txt_rply").show();
	$("#Rply_cmt_save").show();
	$("#cmt_rply").hide();
});
$("#Rply_cmt_save").on("click", function () {
	$("#rply_txt").show();
	$("#cmt_txt_rply").hide();
	$("#Rply_cmt_save").hide();
	$("#cmt_rply").show();
});
$("#add_cmts_2").on("click", function () {
	$("#cmt_form_2").show();
	$("#comt_txt_area_2").show();
	$("#cmt_save_2").show();
});
$("#cmt_save_2").on("click", function () {
	$("#cmt_msg_2").show();
	$("#cmt_rply_2").show();
	$("#cmt_form_2").hide();
	$("#comt_txt_area_2").hide();
	$("#cmt_save_2").hide();
});
$("#cmt_rply_2").on("click", function () {
	$("#cmt_txt_rply_2").show();
	$("#Rply_cmt_save_2").show();
	$("#cmt_rply_2").hide();
});
$("#Rply_cmt_save_2").on("click", function () {
	$("#rply_txt_2").show();
	$("#cmt_txt_rply_2").hide();
	$("#Rply_cmt_save_2").hide();
	$("#cmt_rply_2").show();
});

$("#add_cmts_1").on("click", function () {
	$("#cmt_form_1").show();
	$("#comt_txt_area_1").show();
	$("#cmt_save_1").show();
});
$("#cmt_save_1").on("click", function () {
	$("#cmt_msg_1").show();
	$("#cmt_rply_1").show();
	$("#cmt_form_1").hide();
	$("#comt_txt_area_1").hide();
	$("#cmt_save_1").hide();
});
$("#cmt_rply_1").on("click", function () {
	$("#cmt_txt_rply_1").show();
	$("#Rply_cmt_save_1").show();
	$("#cmt_rply_1").hide();
});
$("#Rply_cmt_save_1").on("click", function () {
	$("#rply_txt_1").show();
	$("#cmt_txt_rply_1").hide();
	$("#Rply_cmt_save_1").hide();
	$("#cmt_rply_1").show();
});

$(document)
	.find("[id^='close_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		$(document).find("[id^='Form_Template_']").hide();
		$(document).find("[class^='card_button_']").hide();
	});

$(document)
	.find("[id^='EditRecord_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];
		console.log(id);
		$(document).find(`.LabelField_${id}`).hide();
		$(document).find(`.EditField_${id}`).show();
		// $(document).find("[id^='Save_']").show();
		// $(document).find("[id^='Cancel_']").show();
		$(document).find(`.card_button_${id}`).show();
		var current_style = $(`#card_bdy_${id}`).css("max-height");
		if (current_style === "145px") {
			$(`#card_bdy_${id}`).css({
				"max-height": "145px",
				transition: "max-height:0.8s",
			});
		}
		$(`#card_bdy_${id}`).css({
			"max-height": "1000px",
			transition: "max-height:0.8s",
		});
		$(this).hide();
	});

$("[id^='upd_time_']").on("click", function () {
	$(`#edit_strdate_${id}`).val("");
	$(`#edit_enddate_${id}`).val("");
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	console.log(id);
	$(document).find(`#label_strdate_${id}`).hide();
	$(document).find(`#label_enddate_${id}`).hide();
	$(document).find(`#label_status_${id}`).hide();
	// $(document).find(`#label_revstrdate_${id}`).hide();
	// $(document).find(`#label_revenddate_${id}`).hide();
	$(document).find(`#edit_strdate_${id}`).show();
	$(document).find(`#edit_enddate_${id}`).show();
	$(document).find(`#edit_status_${id}`).show();
	// $(document).find(`#edit_revstrdate_${id}`).show();
	// $(document).find(`#edit_revenddate_${id}`).show();
	$(`#upd_time_${id}`).hide();
	$(`#save_time_${id}`).show();
});

$("[id^='Update_revis_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	console.log(id);
	$(document).find(`#rev_str_${id}`).hide();
	$(document).find(`#rev_task_${id}`).hide();
	$(document).find(`#rev_golive_${id}`).hide();
	$(document).find(`#rev_end_${id}`).hide();
	$(document).find(`#edit_revstrport_${id}`).show();
	$(document).find(`#edit_revstrtask_${id}`).show();
	$(document).find(`#edit_revendport_${id}`).show();
	$(document).find(`#edit_revgoliveport_${id}`).show();
	$(`#Update_revis_${id}`).hide();
	$(`#save_revis_${id}`).show();
});

$("[id^='save_revis_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	console.log(id);
	$(document).find(`#rev_str_${id}`).show();
	$(document).find(`#rev_task_${id}`).show();
	$(document).find(`#rev_end_${id}`).show();
	$(document).find(`#rev_golive_${id}`).show();
	$(document).find(`#edit_revstrport_${id}`).hide();
	$(document).find(`#edit_revstrtask_${id}`).hide();
	$(document).find(`#edit_revendport_${id}`).hide();
	$(document).find(`#edit_revgoliveport_${id}`).hide();
	$(`#Update_revis_${id}`).show();
	$(`#save_revis_${id}`).hide();
});

$("[id^='upd_revtime_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	$(`#edit_revendrevdate_${id}`).val("");
	$(`#edit_revstrrevdate_${id}`).val("");
	console.log(id);
	$(document).find(`#label_revstrrevdate_${id}`).hide();
	$(document).find(`#label_revendrevdate_${id}`).hide();
	$(document).find(`#label_revstatus_${id}`).hide();

	$(document).find(`#edit_revstatus_${id}`).show();
	$(document).find(`#edit_revstrrevdate_${id}`).show();
	$(document).find(`#edit_revendrevdate_${id}`).show();
	$(`#upd_revtime_${id}`).hide();
	$(`#save_revtime_${id}`).show();
});
$("[id^='save_time_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	var strdate = $(`#edit_strdate_${id}`).val();
	var enddate = $(`#edit_enddate_${id}`).val();
	console.log(id);
	$(document).find(`#label_strdate_${id}`).show();
	$(document).find(`#label_enddate_${id}`).show();
	$(document).find(`#label_status_${id}`).show();
	// $(document).find(`#label_revstrdate_${id}`).show();
	// $(document).find(`#label_revenddate_${id}`).show();
	$(document).find(`#edit_strdate_${id}`).hide();
	$(document).find(`#edit_enddate_${id}`).hide();
	$(document).find(`#edit_status_${id}`).hide();
	// $(document).find(`#edit_revstrdate_${id}`).hide();
	// $(document).find(`#edit_revenddate_${id}`).hide();
	$(`#upd_time_${id}`).show();
	$(`#save_time_${id}`).hide();
});
$("[id^='save_revtime_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	var revstr = $(`#edit_revstrrevdate_${id}`).val();
	var revend = $(`#edit_revendrevdate_${id}`).val();
	console.log(id);
	$(document).find(`#label_revstrrevdate_${id}`).show();
	$(document).find(`#label_revendrevdate_${id}`).show();
	$(document).find(`#label_revstatus_${id}`).show();

	$(document).find(`#edit_revstrrevdate_${id}`).hide();
	$(document).find(`#edit_revstatus_${id}`).hide();
	$(document).find(`#edit_revendrevdate_${id}`).hide();

	$(`#upd_revtime_${id}`).show();
	$(`#save_revtime_${id}`).hide();
});

var elements = document.querySelectorAll(".icon_show_tsk");

// Loop through each element in the collection
for (var i = 0; i < elements.length; i++) {
	// Check if the current element contains the class 'fa-minus'
	if (elements[i].classList.contains("fa-minus")) {
		document.getElementById("task_tbl").style.overflowX = "hidden";
		break; // Exit loop if a matching element is found
	}
}
$("[id^='edit_ba_testing_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];

	$(document).find(`.txt_ba_testing_${id}`).show();
	$(document).find(`.end_ba_testing_${id}`).show();
	$(document).find(`.start_ba_testing_${id}`).show();
	$(document).find(`#edit_ba_testing_${id}`).hide();
	$(document).find(`#save_ba_testing_${id}`).show();
	$(document).find(`#status_ba_testing_${id}`).show();
	$(document).find(`.comment_ba_testing_${id}`).show();

	$(document).find(`#status_ba_${id}`).hide();

	$(document).find(`.desc_ba_testing_${id}`).show();
});
$("[id^='save_ba_testing_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];

	$(document).find(`.txt_ba_testing_${id}`).hide();
	$(document).find(`.end_ba_testing_${id}`).hide();
	$(document).find(`.start_ba_testing_${id}`).hide();
	$(document).find(`#edit_ba_testing_${id}`).show();
	$(document).find(`#save_ba_testing_${id}`).hide();
	$(document).find(`#status_ba_testing_${id}`).hide();
	$(document).find(`#status_ba_${id}`).show();
	$(document).find(`.comment_ba_testing_${id}`).hide();

	$(document).find(`.desc_ba_testing_${id}`).hide();
});

$("[id^='Save_Rec_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	$(document).find(`.LabelField_${id}`).show();
	$(document).find(`.EditField_${id}`).hide();
	$(document).find(`#EditRecord_${id}`).show();
	var current_style = $(`#card_bdy_${id}`).css("max-height");
	if (current_style === "145px") {
		$(`#card_bdy_${id}`).css({
			"max-height": "145px",
			transition: "max-height:0.8s",
		});
	}
	$(`#card_arrow_${id}`).trigger("click");
	// $(document).find("[id^='Cancel_']").hide();
	$(document).find(`.card_button_${id}`).hide();
});

$("[id^='Cancel_Rec_']").on("click", function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	$(document).find(`.LabelField_${id}`).show();
	$(document).find(`.EditField_${id}`).hide();
	$(document).find(`#EditRecord_${id}`).show();
	var current_style = $(`#card_bdy_${id}`).css("max-height");
	if (current_style === "145px") {
		$(`#card_bdy_${id}`).css({
			"max-height": "145px",
			transition: "max-height:0.8s",
		});
	}
	$(`#card_arrow_${id}`).trigger("click");
	// $(document).find("[id^='Save_']").hide();
	$(document).find(`.card_button_${id}`).hide();
	// $(this).hide()
});

$(document)
	.find("#upload_template")
	.change(function (e) {
		var file = e.target.files[0];
		if (!file) {
			$(".Excel_upload").prop("disabled", true).css("cursor", "not-allowed");
			$(".Excel_Template_view").hide();
			return;
		} else {
			$(".Excel_upload").prop("disabled", false).css("cursor", "pointer");
			$(".Excel_Template_view").show();
		}
	});

$("#proj_type").on("change", function () {
	var val = $("#proj_type").val();
	if (val == 0) {
		$("#create_proj_form_container").hide();
		$("#file-upload-container").hide();
		$("#buttons").hide();
	} else {
		if (val == 1) {
			$("#not_accepted").hide();
			$("#accepted_proj").show();
		} else {
			$("#accepted_proj").hide();
			$("#not_accepted").show();
		}

		$("#create_proj_form_container").show();

		// $('.project_type_2').hide();
		$("#create_proj_form").hide();
		$("#proj_summary").hide();

		$("#buttons").hide();
		$(".file-upload").show();
		$(".Excel_upload").prop("disabled", true).css("cursor", "not-allowed");
		$(".Excel_Template_view").hide();
		// $('.proj_name_text_box').show();
		// $('.proj_name_slct').hide();
		// $('#buttons').show();
		// $('#proj_currentstage').prop('disabled', false);
		// $('#proj_status').prop('disabled', false);
		// $('#proj_ragstatus').prop('disabled', false);
		// $('#proj_currentstage').val('0');
		// $('#proj_status').val('0');
		// $('#proj_ragstatus').val('0');
	}
});
$("#Project_filter_Proc").on("click", function () {
	console.log("filter");
});

$("#create_proj").on("click", function () {
	$("#proj_type").val(0);
	$("#cancel_btn").attr("data-bs-action", "");
	$("#retrn_task_page").attr("data-bs-action", "");
	$("#proj_summary_tbl").hide();
	$(".hide_default_Projects_Tab").hide();
	$(".tabwrap").hide();
	$("#pagination_container").hide();
	//$('#rqst_cntnt').show();
	$("#proj_content").show();
	$("#project_type_select").show();

	$("#buttons").hide();
	$("#file-upload-container").hide();
});
$("#task_pro_view").on("click", function () {
	$("#tab3").get(0).click();
	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$("#port_quarter_view").hide();

	doRestoreTaskColumns();
	$(".important_section").show();
	$("#task_manage").show();
	$(".imp_bamanager").hide();
	$("#pm_res_table").hide();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$(".important_section_ps").hide();
	$("#pmo_imp").hide();
	$("#change_req_tbl").hide();

	$(".pro_hd_tab").show();
	$(".task_tabwrap").show();
	$("#pm_tab_div").hide();
	$("#port_dev_view").hide();

	$("#task_tbl").show();
	task_hide_details();
	$("#proj_summary_tbl").hide();
	$(".prot_ali_items").hide();
	$("#ba_manag_view").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").show();
	$("#task_tab1").get(0).click();
	$("#bt_dev_tasks").hide();
	$("#portfolio_sec_tab").hide();
	$("#prot_BA_view").hide();
	$("#Func_Cancel_Ba_1").hide();
	$("#Func_Save_Ba_1").hide();
	$(".Proj_detail_field_1").hide();
	$("#stage_clousure").hide();
	$("#Ba_responsible").hide();
	hideProjData();
	$("#task_content_changereq").hide();
	$("#task_content_proj").show();
});
$("#portfolio_tab6").on("click", function () {
	$("#pm_tab_div").show();
	$("#pmo_imp").hide();

	doRestoreTaskColumns();
	doRestorePMManagerColumns();

	hideProjData();
});

$("#sumbit_values").on("click", function () {
	closeContent();
	$(".tabwrap").show();
});

$("#tab6").on("click", function () {
	$("#task_pmtab1").get(0).click();
	$("#pagination_container").show();
	$("#pmo_imp").hide();
	$("#pm_tab_div").show();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$(".important_section_ps").hide();
	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$("#port_quarter_view").hide();

	$("#pm_projects_table").show();
	$(".important_section_pm").show();
	$(".prot_ali_items").hide();
	$(".important_section").hide();
	$("#ba_manag_view").hide();
	$("#task_manage").hide();
	$(".hide_default_PMManger_Tab").hide();
	doRestorePMManagerColumns();
	task_hide_details();
	$(".imp_bamanager").hide();

	$("#pmo_imp").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").hide();
	$("#task_tab1").get(0).click();
	$("#proj_task_tab1").get(0).click();

	$("#bt_dev_tasks").hide();
	$("#portfolio_sec_tab").hide();
	$("#prot_BA_view").hide();
	$("#proj_tsk_manage").hide();
	$("#pagination_container").hide();
	$(document).find(`[id^='Task_Body_']`).hide().css("max-height", "335px");
	$(document).find(`[class^='Task_Field_']`).hide();
	$(document).find(`[class^='Task_Label_']`).hide();
	$(document).find(`[id^='Task_Edit_']`).hide();
	$(document).find(`[id^='Task_Save_']`).hide();
	$(document).find(`[id^='Task_Cancel_']`).hide();
	hideProjData();
});

$("[id^='task_tab']").on("click", function () {
	$(".E_Procurement_Table").show();
	$(".hide_default_Tasks_Tab").hide();
	$(".E_Staff_Table").hide();
	doRestoreTaskColumns();
});

$("[id^='clone_']").on("click", function () {
	$("#proj_summary_tbl").hide();
	$(".tabwrap").hide();
	$("#pagination_container").hide();
	$("#buttons").show();
	$("#proj_content").show();
	$(".requst_form").show();
	$(".create_proj_form_container").show();
	// $('.create_proj_form').show();

	$("#create_proj_form_container").show();
	$("#accepted_proj").hide();
	$("#not_accepted").hide();
	// $('.project_type_2').show();
	$("#create_proj_form").show();
	$("#proj_summary").show();

	$("#buttons").show();
	$(".file-upload").hide();
	$(".proj_name_text_box").hide();
	$("#project_type_select").hide();

	$(".proj_name_slct").show();
	$("#buttons").show();
	// $('#proj_currentstage').prop('disabled', true);
	// $('#proj_status').prop('disabled', true);
	// $('#proj_ragstatus').prop('disabled', true);
	// $('#proj_currentstage').val('1');
	// $('#proj_status').val('1');
	// $('#proj_ragstatus').val('1');
});

$("[id^='Edit_Project_']").on("click", function () {
	$("#proj_summary_tbl").hide();
	$(".tabwrap").hide();
	$("#pagination_container").hide();
	$("#buttons").show();
	$("#proj_content").show();
	$(".requst_form").show();
	$(".create_proj_form_container").show();
	// $('.create_proj_form').show();

	$("#create_proj_form_container").show();
	$("#proj_summary").show();
	$("#not_accepted").hide();
	$("#accepted_proj").hide();
	// $('.project_type_2').show();
	$("#create_proj_form").show();
	$("#buttons").show();
	$(".file-upload").hide();
	$(".proj_name_text_box").hide();
	$("#project_type_select").hide();

	$(".proj_name_slct").show();
	$("#buttons").show();
	// $('#proj_currentstage').prop('disabled', true);
	// $('#proj_status').prop('disabled', true);
	// $('#proj_ragstatus').prop('disabled', true);
	// $('#proj_currentstage').val('1');
	// $('#proj_status').val('1');
	// $('#proj_ragstatus').val('1');
});
$("#AddBatch_2").on("click", function () {
	$("#batch_divisions_2").show();
});
$("#NoBatch_2").on("click", function () {
	$("#batch_divisions_2").hide();
});
// var Batch_id_tem = "";
// $(document).on('click', `[id^='AddBatch_']`, function () {
//     var temp_id = this.id;
//     var splitarr = temp_id.split('_');
//     var id = splitarr[splitarr.length - 1];
//     if (Batch_id_tem != id) {

//         // $(document).find(`[id^='batch_options_']`).hide();
//         Batch_id_tem = id;

//         $(document).find(`[id^='batch_options_${id}']`).show();
//         // $('#dev_break_tbl').hide();
//     }
//     else {

//         $(`#batch_options_${id}`).hide();

//         Batch_id_tem = "";
//     }
// })
// function toggleBatchOptions(inputName, value, number) {
//     var divisionsID = '#batch_divisions_' + number;
//     var optionsID = '#batch_options_' + number;
//     var selectBA ='#Select_ba_'+number;
//     var val = $('input[name="' + inputName + '"][value="' + value + '"]:checked').val();

//     if (val == value) {
//         $(divisionsID).show();
//         $(selectBA).show();
//         $(optionsID).hide();
//     } else {
//         $(divisionsID).hide();
//         $(selectBA).hide();
//         $(optionsID).hide();
//     }
// }

$('[name^="addbatch_"]').on("change", function () {
	var id = $(this).attr("name").split("_")[1];

	// toggleBatchOptions("addbatch_" + id, 1, id);
});

$("#task_tab1").on("click", function () {
	$(".action_needed_row").hide();
	$("#proj_tsk_data_1").hide();
	$(".action_requested_row").show();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").show();
	$(".development_row").hide();
	$(".All_tasks").hide();
	$("#needs_help").hide();
	$(".Next_week").hide();
	$(".Current_task").show();
	$("#proj_namealltask_filter").hide();
	$("#delayed_tasks").hide();
	$("#week_date_display").hide();
	$("#nextweek_date_display").hide();

	$(".pending_tasks").hide();
	$(".completed_tasks").hide();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#task_tab2").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").hide();
	$(".Current_task").hide();
	$("#week_date_display").hide();
	$("#nextweek_date_display").hide();

	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$("#delayed_tasks").hide();
	$(".Next_week").hide();
	$("#proj_namealltask_filter").hide();
	$(".All_tasks").hide();
	$(".completed_tasks").hide();
	$(".pending_tasks").show();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#task_tab3").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").show();
	$("#week_date_display").show();
	$("#nextweek_date_display").hide();

	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();

	$("#todo_task").hide();
	$(".Current_task").hide();
	$("#proj_namealltask_filter").hide();
	$(".development_row").show();
	$(".All_tasks").show();

	$("#delayed_tasks").show();
	$(".Next_week").hide();
	$("#needs_help").hide();
	$(".completed_tasks").hide();
	$(".pending_tasks").hide();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#task_tab4").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").show();
	$("#proj_tsk_data_3").hide();
	$(".Current_task").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$(".All_tasks").hide();
	$("#proj_namealltask_filter").hide();
	$(".Next_week").show();
	$(".pending_tasks").hide();
	$("#not_started").hide();
	$("#week_date_display").hide();
	$("#nextweek_date_display").show();

	$(".completed_tasks").hide();
	$("#delayed_tasks").hide();
	$("#needs_help").hide();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#task_tab5").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").show();
	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$(".completed_tasks").hide();
	$(".pending_tasks").hide();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
	$("#delayed_tasks").show();
	$(".All_tasks").hide();
	$(".delayed").show();
	$("#proj_namealltask_filter").hide();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
});

$("#task_tab6").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").show();
	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$(".All_tasks").hide();
	$(".needs_help").show();
	$(".pending_tasks").hide();
	$(".completed_tasks").hide();
	$("#proj_namealltask_filter").hide();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
	hideProjData();
});

$("#task_tab7").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").show();
	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").show();
	$(".All_tasks").show();
	$(".pending_tasks").hide();
	$(".completed_tasks").show();
	$("#proj_namealltask_filter").show();
	$("#prot_BA_view").hide();
	$("#week_date_display").hide();
	$("#nextweek_date_display").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();

	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#task_tab8").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").hide();
	$("#proj_tsk_data_3").hide();
	$(".important_section").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$(".All_tasks").hide();
	$(".pending_tasks").hide();
	$(".completed_tasks").hide();
	$("#prot_BA_view").show();
	$("#week_date_display").hide();
	$("#nextweek_date_display").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").show();
	$(".prot_ali_items").show();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").show();

	$("#proj_namealltask_filter").hide();
	$("#task_tbl").hide();

	$(".port_table_view").show();
	$("#port_BA_type_filter").show();
	$("#prot_BA_view").show();
	$("pagination_container").show();
	$(".prot_ali_items").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});

$(document).ready(function () {
	$("#bt_task_tab_1").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp_8"));
	});

	$("#bt_pro_taskdrp_8").click(function () {
		toggleDropdown($("#bt_task_tab_1"), $(this));
	});

	$("#port_proj_tab").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp_7"));
	});

	$("#bt_pro_taskdrp_7").click(function () {
		toggleDropdown($("#port_proj_tab"), $(this));
	});

	$("#bt_proj-task_ta").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp"));
	});

	$("#bt_pro_taskdrp").click(function () {
		toggleDropdown($("#bt_proj-task_ta"), $(this));
	});

	$("#bt_task_tab").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp_2"));
	});

	$("#bt_pro_taskdrp_2").click(function () {
		toggleDropdown($("#bt_task_tab"), $(this));
	});

	$("#BaMan_tab4").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp_3"));
	});

	$("#bt_pro_taskdrp_3").click(function () {
		toggleDropdown($("#BaMan_tab4"), $(this));
	});

	$("#Devman_tab7").mouseover(function () {
		toggleDropdown($(this), $("#bt_pro_taskdrp_5"));
		hideDropdown($("#bt_pro_taskdrp_6"));
	});
	$("#bt_pro_taskdrp_5").click(function () {
		toggleDropdown($("#Devman_tab7"), $(this));
		hideDropdown($("#bt_pro_taskdrp_6")); // Additional line to hide other dropdown
	});

	$("#mouse_hover")
		.mouseover(function () {
			$("#bt_pro_taskdrp_4").css("display", "block");
		})
		.mouseout(function () {
			$("#bt_pro_taskdrp_4").css("display", "none");
		});

	$("#mouse_hover_tw")
		.mouseover(function () {
			$("#bt_pro_taskdrp_6").css("display", "block");
		})
		.mouseout(function () {
			$("#bt_pro_taskdrp_6").css("display", "none");
		});

	// Function to toggle dropdown visibility
	function toggleDropdown(button, dropdown) {
		if (button.hasClass("active")) {
			dropdown.css("display", "none");
			button.removeClass("active");
		} else {
			$(".dropdown").css("display", "none"); // Close any open dropdown
			$(".dropdown-toggle").removeClass("active"); // Remove 'active' class from all dropdown toggles
			dropdown.css("display", "block");
			button.addClass("active");
		}
	}

	// Function to hide dropdown
	function hideDropdown(dropdown) {
		dropdown.css("display", "none");
	}
});

$(".req_two").on("click", function () {
	$(".reassign_req_two").show();
	$(".req_save_two").show();
	$(".req_two").hide();
});
$(".req_save_two").on("click", function () {
	$(".reassign_req_two").show();
	$(".req_save_two").hide();
	$(".req_two").hide();
});

$("#tab2").on("click", function () {
	$("#tab2").get(0).click();
	$("#task_manage").hide();
	$("#all_btpmo_tasks").hide();
	$("#ba_pending_tb").hide();
	$("#port_quarter_view").hide();

	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();

	$(".prot_ali_items").hide();
	$("#pm_tab_div").hide();
	$("#port_dev_view").hide();

	$(".important_section").hide();
	$(".important_section_ps").hide();

	$(".imp_bamanager").hide();
	$("#pm_res_table").hide();

	task_hide_details();
	$("#proj_summary_tbl").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").show();
	$(".project_filter_bar").show();
	$(".proj_task_tabwrap").show();
	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();

	$("#proj_tsk_manage").show();
	$("#proj_task_tab1").get(0).click();
	$("#bt_dev_tasks").hide();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").hide();
	$("#prot_BA_view").hide();

	$(document).find(`[id^='Task_Body_']`).hide().css("max-height", "335px");
	$(document).find(`[class^='Task_Field_']`).hide();
	$(document).find(`[class^='Task_Label_']`).show();
	$(document).find(`[id^='Task_Edit_']`).show();
	$(document).find(`[id^='Task_Save_']`).hide();
	$(document).find(`[id^='Task_Cancel_']`).hide();
	hideProjData();
});
$("#Projects_tab_ResPri").on("click", function () {
	$("#tab2").get(0).click();
	$("#task_manage").hide();
	$(".prot_ali_items").hide();
	task_hide_details();
	$("#proj_summary_tbl").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").show();
	$("#portfolio_sec_tab").show();
	$("#proj_tsk_manage").hide();
	$("#proj_task_tab1").get(0).click();
	$("#bt_dev_tasks").hide();

	$("#ba_manag_view").hide();
	$("#prot_BA_view").hide();

	$(document).find(`[id^='Task_Body_']`).hide().css("max-height", "335px");
	$(document).find(`[class^='Task_Field_']`).hide();
	$(document).find(`[class^='Task_Label_']`).show();
	$(document).find(`[id^='Task_Edit_']`).show();
	$(document).find(`[id^='Task_Save_']`).hide();
	$(document).find(`[id^='Task_Cancel_']`).hide();
	hideProjData();
	$("#prot_BA_view").show();
	$("#port_tab_table").hide();
	$("pagination_container").show();
	$(".prot_ali_items").show();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").show();
});

$("#btn_pri_viw1").on("click", function () {
	$("#viw_cur_div1").show();
	$("#btn_pri_viw1").hide();
	$("#close_pri_viw1").show();
	$(".btn_app_rej").show();
});
$("#close_pri_viw1").on("click", function () {
	$("#viw_cur_div1").hide();
	$("#btn_pri_viw1").show();
	$("#close_pri_viw1").hide();
	$(".btn_app_rej").hide();
});
$("#task_devtab4").on("click", function () {
	document.getElementById("all_btpmo_taks").style.display = "none";
	$(".e-procurrement-proj").hide();
	$("#pmo_imp").hide();
	$(".portfolio_sec_tab").hide();
	$("#btpmo_table").hide();
	$(".search_icon_grp").hide();
	$(".ba_mana_table").hide();
	$("#select_filter_bamanager").hide();

	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();
	$(".ba_name_prot").show();

	$(".port_table_view").show();
	$("#port_BA_type_filter").show();
	$("#prot_BA_view").show();
	$("pagination_container").show();
	$(".prot_ali_items").show();
	$("#ba_res_table").hide();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
});
$("#task_BAtab4").on("click", function () {
	document.getElementById("all_btpmo_taks").style.display = "none";
	$(".e-procurrement-proj").hide();
	$("#pmo_imp").hide();
	$("#task_Assenged_pending").hide();

	$(".portfolio_sec_tab").hide();
	$("#btpmo_table").hide();
	$(".search_icon_grp").hide();
	$(".ba_mana_table").hide();
	$("#select_filter_bamanager").hide();

	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();
	$(".ba_name_prot").show();

	$(".port_table_view").show();
	$("#port_BA_type_filter").show();
	$("#prot_BA_view").show();
	$("pagination_container").show();
	$(".prot_ali_items").show();
	$("#ba_res_table").hide();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
});
$("#proj_taskpri_tab4").on("click", function () {
	document.getElementById("all_btpmo_taks").style.display = "none";
	$(".e-procurrement-proj").hide();
	$("#pmo_imp").hide();
	$(".portfolio_sec_tab").hide();
	$("#btpmo_table").hide();
	$(".search_icon_grp").hide();
	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();
	$(".port_table_view").show();
	$("#port_BA_type_filter").show();
	$("#prot_BA_view").show();
	$("pagination_container").show();
	$(".prot_ali_items").show();
});
$("#task_BAtab1").on("click", function () {
	$("#Ba_man_table_section").show();
	$("#select_filter_bamanager").hide();

	$(".ba_mana_table").show();
	$("#port_tab_table").hide();
	$("#prot_BA_view").hide();
	$("#ba_res_table").hide();
	$(".ba_name_prot").show();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();

	$("#all_btpmo_taks").hide();

	$("#pm_tab_div").hide();
	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$(".ba_table_view").show();

	$("#port_table_view").hide();

	$("#pm_res_table").hide();
});
$("#task_devtab5").on("click", function () {
	$(".ba_mana_table").show();
	$("#select_filter_bamanager").show();
	$("#task_Assenged_pending").hide();

	$("#port_tab_table").hide();
	$("#prot_BA_view").hide();
	$("#ba_res_table").hide();
	$(".ba_name_prot").hide();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$("#Ba_man_table_section").show();
});
$("#task_BAtab5").on("click", function () {
	$(".ba_mana_table").show();
	$("#select_filter_bamanager").show();

	$("#port_tab_table").hide();
	$("#prot_BA_view").hide();
	$("#ba_res_table").hide();
	$(".ba_name_prot").hide();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$("#Ba_man_table_section").show();
});
$(".retrn_main_page").on("click", function () {
	closeContent();
});
$("#cancel_btn").on("click", function () {
	var action = $(this).data("bs-action");
	if (action == "rtrnupd_proj") {
		$("#view_proj").show();
		$("#upd_userlog_cmts").show();
		$("#update_task").hide();
		$("#task_manage").hide();
		$("#task_content").hide();
		$("#buttons").hide();
		$(this).data("bs-action", "");
		$("#retrn_task_page").data("bs-action", "");
	} else if (action == "rtrntask_page") {
		$("#upd_userlog_cmts").hide();
		$("#task_manage").show();
		$("#pagination_container").show();
		$("#task_content").hide();
		$("#buttons").hide();
		$(this).data("bs-action", "normal");
		$("#retrn_task_page").data("bs-action", "");
	} else {
		closeContent();
	}
	$(".tabwrap").show();
});
function closeContent() {
	$("#tab1").get(0).click();
	$(".tabwrap").show();
	$("#task_content").hide();
	$("#proj_content").hide();
	$("#update_task").hide();
	$("#view_proj").hide();
	$("#buttons").hide();
	$("#upd_userlog_cmts").hide();
	$("#file-upload-container").hide();
}

$(".view_proj_data").on("click", function () {
	$("#view_proj").show();
	$("#proj_summary_tbl").hide();
	$(".hide_default_Projects_Tab").hide();
	$("#pagination_container").hide();
	$("#upd_userlog_cmts").show();
});

$(".updt_proj").on("click", function () {
	$("#view_proj").hide();
	$("#upd_userlog_cmts").hide();
	$("#update_task").show();
	$("#upd_userlog_cmts").show();
	$("#task_manage").hide();
	$("#pagination_container").hide();
});

$("#crt_tsk").on("click", function () {
	DoShowCreateTask();
});

$("#retrn_task").on("click", function () {
	$("#view_proj").show();
	$("#upd_userlog_cmts").show();
	$("#update_task").hide();
	$("#task_manage").hide();
	$("#task_content").hide();
	$("#buttons").hide();
});
$("#retrn_task_page").on("click", function () {
	var action = $(this).data("bs-action");
	console.log(action);
	if (action == "rtrnupd_proj") {
		$("#view_proj").show();
		$("#upd_userlog_cmts").show();
		$("#update_task").hide();
		$("#task_manage").hide();
		$("#task_content").hide();
		$("#buttons").hide();

		// Remove the data-bs-action attribute
		$(this).data("bs-action", "");
		$("#cancel_btn").data("bs-action", "");
	} else if (action == "rtrntask_page") {
		$("#upd_userlog_cmts").hide();
		$("#task_manage").show();
		$("#pagination_container").show();
		$("#task_content").hide();
		$("#buttons").hide();

		// Remove the data-bs-action attribute
		$(this).data("bs-action", "");
		$("#cancel_btn").data("bs-action", "");
	}
});

$(".view_task_btn").on("click", function () {
	$("#task_manage").hide();
	$("#pagination_container").hide();
	$("#buttons").show();
	$("#task_content").show();
	$("#retrn_task_page").data("bs-action", "rtrntask_page");
	$("#cancel_btn").data("bs-action", "rtrntask_page");
});

function DoShowCreateTask() {
	$("#view_proj").hide();
	$("#upd_userlog_cmts").hide();
	$("#task_content").show();
	$("#buttons").show();
	$("#retrn_task_page").data("bs-action", "rtrnupd_proj");
	$("#cancel_btn").data("bs-action", "rtrnupd_proj");
}

var click = 0;

function hideProjData() {
	var lst = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];
	for (var i = 0; i <= lst.length; i++) {
		$(`#proj_tsk_data_${lst[i]}`).hide();
		$(`.card_button_${lst[i]}`).hide();
		$(`#assign_tsk_data_${lst[i]}`).hide();
		$(`#save_time_${lst[i]}`).hide();
		$(`#port_delay_tab_${lst[i]}`).hide();
		$(`#edit_revstrport_${lst[i]}`).hide();
		$(`#edit_revstrtask_${lst[i]}`).hide();
		$(`#edit_revendport_${lst[i]}`).hide();
		$(`#edit_revgoliveport_${lst[i]}`).hide();
		$(`#save_revis_${lst[i]}`).hide();

		$(`#save_revtime_${lst[i]}`).hide();
	}
}

var open_id = "";
$(document).on("click", `[id^='view_tsk_data_']`, function () {
	var temp_id = this.id;
	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];
	console.log(id);
	if (open_id != id) {
		$(`#view_tsk_data_${id}`).removeClass("fa-plus");
		$(`#view_tsk_data_${id}`).addClass("fa-minus");
		$(`#view_tsk_data_${id}`).css({
			transition: "0.2s",
			transform: "rotate(180deg)",
		});
		open_id = id;
		console.log(open_id);
		$(`#proj_tsk_data_${id}`).show();
	} else {
		$(`#view_tsk_data_${id}`).removeClass("fa-minus");
		$(`#view_tsk_data_${id}`).addClass("fa-plus");
		$(`#view_tsk_data_${id}`).css({
			transition: "0.2s",
			transform: "rotate(0deg)",
		});
		$(`#proj_tsk_data_${id}`).hide();
		open_id = "";
	}
});

var open_id_dev_tsk = "";
$(document).on("click", `[id^='view_assign_tsk_']`, function () {
	var temp_id = this.id;
	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];
	if (open_id_dev_tsk != id) {
		$(document).find(`[id^='assign_tsk_data_']`).hide();
		open_id_dev_tsk = id;
		//console.log(open_id);
		$(document).find(`[id^='assign_tsk_data_${id}']`).show();

		$("#dev_break_tbl").hide();
	} else {
		$(`#assign_tsk_data_${id}`).hide();
		$("#dev_break_tbl").hide();
		//$(`#assign_tsk_data_${id}`).css({ 'transition': '0.2s',});
		open_id_dev_tsk = "";
	}
});

$(document).on("click", '[class^="viw_pri_btn_"]', function () {
	var temp_id = $(this).attr("class");

	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];

	$(document).find(`[class^='cls_pri_btn_${id}']`).show();

	$(`.viw_pri_btn_${id}`).hide();
	$(`#viw_cur_${id}`).show();

	$(`#btn_apprej_${id}`).show();
});

$(document).on("click", '[class^="cls_pri_btn_"]', function () {
	var temp_id = $(this).attr("class");

	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];
	$(`.cls_pri_btn_${id}`).hide();
	$(`.cls_pri_btn_${id}`).hide();
	$(`.viw_pri_btn_${id}`).show();
	$(`#viw_cur_${id}`).hide();
	$(`#btn_apprej_${id}`).hide();
});

$(document).on("click", '[id^="add_batch_task_"]', function () {
	var temp_id = $(this).attr("id");

	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];

	$(document).find(`[id^='add_btc_det_${id}']`).show();

	$(`.add_batch_task_${id}`).hide();
	$(`#add_batch_task_${id}`).hide();

	$(`#del_btch_${id}`).show();
});

$(document).on("click", '[id^="del_btch_"]', function () {
	var temp_id = $(this).attr("id");

	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];

	$(document).find(`[id^='add_btc_det_${id}']`).hide();

	$(`.add_batch_task_${id}`).show();
	$(`#del_btch_${id}`).hide();
	$(`#add_batch_task_${id}`).show();
});

var open_id_port_tsk = "";
$(document).on("click", `[id^='delay_dropdwn_']`, function () {
	var temp_id = this.id;
	var splitarr = temp_id.split("_");
	var id = splitarr[splitarr.length - 1];
	if (open_id_port_tsk != id) {
		$(`#delay_dropdwn_${id}`).css({
			transition: "0.2s",
			transform: "rotate(180deg)",
		});
		open_id_port_tsk = id;
		//console.log(open_id);
		$(`#port_delay_tab_${id}`).show();
		$(`#port_delay_tab_${id}`).css({ transition: "0.2s" });
	} else {
		$(`#delay_dropdwn_${id}`).css({
			transition: "0.2s",
			transform: "rotate(0deg)",
		});
		$(`#port_delay_tab_${id}`).hide();
		$(`#port_delay_tab_${id}`).css({ transition: "0.2s" });
		open_id_port_tsk = "";
	}
});

var task_dropdown = "";
$(document).on("click", `[id^='task_dropdwn_']`, function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	if (task_dropdown != id) {
		$(`#task_dropdwn_${id}`).css({
			transition: "0.2s",
			transform: "rotate(0deg)",
		});
		$(`#task_tab_Drop_${id}`).hide();
		task_dropdown = id;
	} else {
		$(`#task_dropdwn_${id}`).css({
			transition: "0.2s",
			transform: "rotate(180deg)",
		});
		$(`#task_tab_Drop_${id}`).show();
		task_dropdown = "";
	}
});

var arrow_id = "";

$(document).on("click", `[id^='card_arrow_']`, function () {
	var temp_id = this.id;
	var splitArray = temp_id.split("_");
	var id = splitArray[splitArray.length - 1];
	console.log(id);
	if (arrow_id !== id) {
		$("#card_arrow_" + id).removeClass("fa-arrow-circle-down");
		arrow_id = id;
		console.log(arrow_id);
		$(`#card_bdy_${id}`).css({
			"max-height": "1000px",
			transition: "max-height:0.8s",
		});
		$("#card_arrow_" + id).addClass("fa-arrow-circle-up");
	} else {
		$("#card_arrow_" + id).removeClass("fa-arrow-circle-UP");
		$(`#card_bdy_${id}`).css({
			"max-height": "145px",
			transition: "max-height:0.8s",
		});
		$("#card_arrow_" + id).addClass("fa-arrow-circle-down");
		arrow_id = "";
	}
});

$(document).on("change", "#proj_status", function () {
	var selectedValue = $(this).val();
	if (selectedValue == "6") {
		$(".Status_comments").show();
	} else {
		$(".Status_comments").hide();
	}
});

$("#sub_batch").on("click", function () {
	$(".action_needed_row").hide();
	$(".action_requested_row").hide();
	$(".Current_task").hide();
	$("#proj_tsk_data_3").hide();
	$("#proj_tsk_data_1").hide();
	$("#proj_tsk_data_10").hide();
	$("#todo_task").hide();
	$(".development_row").hide();
	$("#delayed_tasks").hide();
	$(".Next_week").hide();
	$("#proj_namealltask_filter").hide();
	$(".All_tasks").hide();
	$(".completed_tasks").hide();
	$(".pending_tasks").show();
	$("#prot_BA_view").hide();

	$("#port_tab_table").hide();
	$(".ba_name_prot").hide();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").hide();
	$("#port_proj_type_filter").hide();
	$("#port_BA_type_filter").hide();
	$("#task_tbl").show();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
	$("#task_tab2").get(0).click(0);

	$("#assign_tsk_data_10").hide();
});

$("#save_modal").on("click", function () {
	$("#dev_breakdown_data").modal("hide");
	$(".dev_break_tbl").show();
	$("#card_arrow_81").trigger("click");
});

$("#bell").on("click", function () {
	bell();
});

function bell() {
	var bell = document.getElementById("top_div");
	if (bell.classList.contains("fadeInDown")) {
		bell.classList.remove("fadeInDown");
		bell.classList.add("fadeInup");
		$("#top_div").hide();
	} else {
		$("#top_div").show();
		bell.classList.remove("fadeInup");
		bell.classList.add("fadeInDown");
	}
}

$("#proj_task_tab1").on("click", function () {
	$("[id^='assign_tsk_data_']").hide();
	$("#all_btpmo_taks").hide();

	$(".pending_Assignment_Record").show();
	$(".e-procurrement-proj").show();
	$("#pmo_imp").show();
	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();

	$(document).find("#Projects_Tab").html(`<tr>
     
    <th>No.</th>
        <th>Project Priority</th>
        <th>Project Name</th>
        <th>Current Stage</th>
        <th>Batch Name</th>
        <th>Current stage status</th>
        <th>Stage to assign</th>
        <th>Status</th>
        <th>Action</th>
    </tr>`);
	$(".Assigned_Record").hide();
	$(document).find("[class^='pending_Assignment_View_']").hide();
	// $(document).find("[class^='pending_Assignment_View_']").hide();
	$(document).find("[class^='Assigned_Record_View_']").hide();
	$("[id^='Expand_Pending_']").show();
	$("[id^='Close_Pending_']").hide();

	$(document).find("[class^='dev_break_tbl']").hide();

	$(document).find("[class^='Proj_detail_label_']").show();
	$(document).find("[class^='Proj_detail_field_']").hide();
	$(document).find("[class^='Project_Detail_Edit_']").show();
	$(document).find("[class^='Project_Detail_Save_']").hide();
	$(document).find("[class^='Project_Detail_Cancel_']").hide();

	$(document).find("[class^='Development_Detail_label_']").show();
	$(document).find("[class^='Development_Detail_field_']").hide();
	$(document).find("[id^='Development_Detail_Edit_']").show();
	$(document).find("[id^='Development_Detail_Save_']").hide();
	$(document).find("[id^='Development_Detail_Cancel_']").hide();

	$(document).find(`[class^='Func_ba_label_']`).show();
	$(document).find(`[class^='Func_ba_field_']`).hide();
	$(document).find("[id^='Func_Edit_Ba_']").show();
	$(document).find("[id^='Func_Save_Ba_']").hide();
	$(document).find("[id^='Func_Cancel_Ba_']").hide();
	$(".port_table_view").hide();
	$("#port_BA_type_filter").hide();
	$("#prot_BA_view").hide();
	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});

$(document).on("click", "#port_task_tab2", function () {
	$("#port_table_view").hide();

	$("#prot_BA_view").show();
});

$(document).on("click", "#port_task_tab1", function () {
	$("#port_table_view").show();
	$("#prot_BA_view").hide();
});

$(".dw_content_data").on("click", function () {
	$("#tab3").get(0).click(0);

	// Create the notification icon dynamically

	$("#delayed_tasks").css({
		border: "2px solid red",
	});
	// Remove the notification icon after 10 seconds
	setTimeout(() => {
		$("#delayed_tasks").css({
			"border-color": "inherit",
			"border-style": "solid",
			"border-width": "0",
		});
	}, 5000);
	$("#top_div").hide();
});
$("#port_all_tab3").on("click", function () {
	$("#select_port_filter").show();
	$("#port_table_view").show();
	$("#task_tbl").show();
	$(".ba_name_prot").show();
	$("#task_proj_filter").hide();
	$("#port_dev_view").hide();
	$("#dashboard_filter").hide();
	$("#port_quarter_view").hide();

	$("#task_content_proj").hide();
	$("#prot_BA_view").hide();
	$("#port_tab_table").show();
	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").show();

	$("#port_proj_type_filter").hide();
	$("#port_proj_name_filter").hide();

	$("#port_BA_type_filter").hide();
});

$("#proj_task_tab2").on("click", function () {
	$("#Pri_upd_btn").hide();
	$("#all_btpmo_taks").hide();
	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();
	$(".port_table_view").hide();
	$("#port_BA_type_filter").hide();
	$("#prot_BA_view").hide();
	$("pagination_container").hide();
	$(".prot_ali_items").hide();

	$(".Assigned_Record").show();
	$(".e-procurrement-proj").show();
	$("#pmo_imp").show();

	$(document).find("#Projects_Tab").html(`<tr>
    <th>Task details</th>
        <th>No.</th>
        <th>Project Priority</th>
        <th>Project Name</th>
        <th>Assigned Stage</th>
        <th>Batch</th>
        <th>Status</th>
        <th>Current Stage Status</th>
      
        <th>Action</th>
    </tr>`);
	$(".pending_Assignment_Record").hide();
	$(document).find("[class^='Assigned_Record_View_']").hide();
	$(document).find("[class^='pending_Assignment_View_']").hide();
	$("[id^='Close_Assigned_']").hide();
	$("[id^='Expand_Assigned_']").show();
	$("[id^='GoPendingAssignment_']").show();

	$(document).find("[class^='batch_field_']").hide();
	$(document).find("[class^='batch_label_']").show();
	$(document).find("[class^='Batch_Buttons']").hide();
	$(document).find("[class^='Batch_Req_']").hide();
	$(document).find("[id^='Edit_Batch_']").show();

	$(document).find(`[id^='Task_Body_']`).hide().css("max-height", "335px");
	$(document).find(`[class^='Task_Field_']`).hide();
	$(document).find(`[class^='Task_Label_']`).show();
	$(document).find(`[id^='Task_Edit_']`).show();
	$(document).find(`[id^='Task_Save_']`).hide();
	$(document).find(`[id^='Task_Cancel_']`).hide();

	$(document).find("[class^='Proj_detail_label_']").show();
	$(document).find("[class^='Proj_detail_field_']").hide();
	$(document).find("[id^='Project_Detail_Edit_']").show();
	$(document).find("[id^='Project_Detail_Save_']").hide();
	$(document).find("[id^='Project_Detail_Cancel_']").hide();

	$(document).find("[class^='Development_Detail_label_']").show();
	$(document).find("[class^='Development_Detail_field_']").hide();
	$(document).find("[id^='Development_Detail_Edit_']").show();
	$(document).find("[id^='Development_Detail_Save_']").hide();
	$(document).find("[id^='Development_Detail_Cancel_']").hide();

	$(document).find(`[class^='Func_ba_label_']`).show();
	$(document).find(`[class^='Func_ba_field_']`).hide();
	$(document).find("[id^='Func_Edit_Ba_']").show();
	$(document).find("[id^='Func_Save_Ba_']").hide();
	$(document).find("[id^='Func_Cancel_Ba_']").hide();

	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});

$(document)
	.find("[id^='Func_Edit_Ba_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Func_ba_label_${id}`).hide();
		$(document).find(`.Func_ba_field_${id}`).show();

		$(document).find(`[id^='Func_Save_Ba_${id}']`).show();
		$(document).find(`[id^='Func_Cancel_Ba_${id}']`).show();
		$(document).find(`[id^='Func_Edit_Ba_${id}']`).hide();
	});

$(document)
	.find("[id^='Func_Save_Ba_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Func_ba_label_${id}`).show();
		$(document).find(`.Func_ba_field_${id}`).hide();

		$(document).find(`[id^='Func_Save_Ba_${id}']`).hide();
		$(document).find(`[id^='Func_Cancel_Ba_${id}']`).hide();
		$(document).find(`[id^='Func_Edit_Ba_${id}']`).show();
	});

$(document)
	.find("[id^='Func_Cancel_Ba_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Func_ba_label_${id}`).show();
		$(document).find(`.Func_ba_field_${id}`).hide();

		$(document).find(`[id^='Func_Save_Ba_${id}']`).hide();
		$(document).find(`[id^='Func_Cancel_Ba_${id}']`).hide();
		$(document).find(`[id^='Func_Edit_Ba_${id}']`).show();
	});

$(document)
	.find("[id^='Project_Detail_Edit_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Proj_detail_label_${id}`).hide();
		$(document).find(`#Proj_detail_label_${id}`).hide();

		$(document).find(`.Proj_detail_field_${id}`).show();
		$(document).find(`#Proj_detail_field_${id}`).show();

		$(document).find(`#Project_Detail_Save_${id}`).show();
		$(document).find(`#Project_Detail_Cancel_${id}`).show();
		$(document).find(`#Project_Detail_Edit_${id}`).hide();
	});

$(document)
	.find("[id^='Project_Detail_Cancel_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Proj_detail_label_${id}`).show();
		$(document).find(`#Proj_detail_label_${id}`).show();

		$(document).find(`.Proj_detail_field_${id}`).hide();
		$(document).find(`#Proj_detail_field_${id}`).hide();

		$(document).find(`#Project_Detail_Save_${id}`).hide();
		$(document).find(`#Project_Detail_Cancel_${id}`).hide();
		$(document).find(`#Project_Detail_Edit_${id}`).show();
	});

$(document)
	.find("[id^='Project_Detail_Save_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Proj_detail_label_${id}`).show();
		$(document).find(`#Proj_detail_label_${id}`).show();

		$(document).find(`.Proj_detail_field_${id}`).hide();
		$(document).find(`#Proj_detail_field_${id}`).hide();

		$(document).find(`#Project_Detail_Save_${id}`).hide();
		$(document).find(`#Project_Detail_Cancel_${id}`).hide();
		$(document).find(`#Project_Detail_Edit_${id}`).show();
	});

$(document)
	.find("[id^='Development_Detail_Edit_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Development_Detail_label_${id}`).hide();
		$(document).find(`.Development_Detail_field_${id}`).show();

		$(document).find(`#Development_Detail_Save_${id}`).show();
		$(document).find(`#Development_Detail_Cancel_${id}`).show();
		$(document).find(`#Development_Detail_Edit_${id}`).hide();
	});

$(document)
	.find("[id^='Development_Detail_Cancel_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Development_Detail_label_${id}`).show();
		$(document).find(`.Development_Detail_field_${id}`).hide();

		$(document).find(`#Development_Detail_Save_${id}`).hide();
		$(document).find(`#Development_Detail_Cancel_${id}`).hide();
		$(document).find(`#Development_Detail_Edit_${id}`).show();
	});

$(document)
	.find("[id^='Development_Detail_Save_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`.Development_Detail_label_${id}`).show();
		$(document).find(`.Development_Detail_field_${id}`).hide();

		$(document).find(`#Development_Detail_Save_${id}`).hide();
		$(document).find(`#Development_Detail_Cancel_${id}`).hide();
		$(document).find(`#Development_Detail_Edit_${id}`).show();
	});

$("#proj_task_tab3").on("click", function () {
	$(".inprogress_proj").hide();
	$(".action_need_proj").hide();
	$(".action_need_proj_2").show();
	$(".on_hold_proj").hide();
	$(".pending_proj").hide();
	$(".not_start_proj").hide();
	$(".e_staff_proj").hide();
	$(".pending_proj").hide();
	$(".delayed_proj").hide();
	$(".action_need_proj_3").hide();
	$(".on_hold_proj_2").hide();
	$(".pending_Assignment_Record").hide();

	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});

$("#proj_vw_id").on("click", function () {
    $(".priority_ba_tab").show();
	$(".bapm_ba_tab").show();
	$(".priority_dev_tab").hide();
	$(".developer_dev_tab").hide();
	$(".stage_signoff_ba_dev_tab").hide();
    
	$("#tab4").get(0).click();
	$("#task_BAtab5").get(0).click();
	$("#all_btpmo_taks").hide();
	$("#change_request_dev").hide();
	$("#task_content_devproj").hide();
	$(".task_Assenged_pending").hide();
	$("#port_quarter_view").hide();
	$("#task_batab_changereq").hide();
	$("#ba_pending_tb").hide();
	$(".important_section_ps").hide();
	$("#pmo_imp").hide();
	$(".pro_hd_tab_chg").hide();
	$(".pro_hd_tab").show();

	$("#task_content_baproj").show();
	$("#select_filter_bamanager").show();

	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$(".pendingass_dev_cr").hide();
	$("#pm_tab_div").hide();
	$(".ba_name_prot").hide();
	$(".dev_manager_tab").hide();
	$(".ba_manager_tab").show();

	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$("#ba_table_view").show();
	$("#Ba_man_table_section").show();

	$("#port_table_view").hide();

	$("#change_request_div").hide();
	$("#change_req_btn").hide();

	$("#pm_res_table").hide();

	$(".important_section").hide();
	$("#task_manage").hide();
	$(".prot_ali_items").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_BaManger_Tab").hide();
	$("#bt_dev_tasks").show();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").show();
	$("#prot_BA_view").hide();
	doRestoreBaManagerColumns();
	hideProjData();
	hide_all_details();
	task_hide_details();
});
$("#task_BAtab7").on("click", function () {
	$(".ba_mana_table").show();
	$("#task_Assenged_pending").show();

	$("#port_tab_table").hide();
	$("#prot_BA_view").hide();
	$("#ba_res_table").hide();

	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$("#Ba_man_table_section").show();

	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#select_filter_bamanager").hide();
	$(".important_section_ps").hide();
	$("#pmo_imp").hide();
	$("#task_content_baproj").hide();
	$("#task_content_devproj").show();

	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$(".dev_manager_tab").show();
	$(".ba_manager_tab").hide();
	$("#pm_tab_div").hide();
	$(".ba_name_prot").show();
	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$("#ba_table_view").show();
	$("#Ba_man_table_section").show();
	$("#change_request_dev").hide();

	$("#port_table_view").hide();

	$("#change_request_div").hide();
	$("#change_req_btn").hide();

	$("#pm_res_table").hide();

	$(".important_section").hide();
	$("#task_manage").hide();
	$(".prot_ali_items").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_BaManger_Tab").hide();
	$("#bt_dev_tasks").show();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").show();
	$("#prot_BA_view").hide();
	doRestoreBaManagerColumns();
	hideProjData();
	hide_all_details();
	task_hide_details();
});
$("#proj_dm_id").on("click", function () {
	$(".priority_ba_tab").hide();
	$(".bapm_ba_tab").hide();
	$(".priority_dev_tab").show();
	$(".developer_dev_tab").show();
	$(".stage_signoff_ba_dev_tab").show();

	$("#tab7").get(0).click();
	$("#task_BAtab7").get(0).click();
	$("#port_quarter_view").hide();
	$(".pro_hd_tab_chg").hide();
	$(".pro_hd_tab").show();
	$("#all_btpmo_taks").hide();
	$("#task_Assenged_pending").show();

	$("#ba_pending_tb").hide();
	$("#select_filter_bamanager").hide();
	$(".important_section_ps").hide();
	$("#pmo_imp").hide();
	$("#task_content_baproj").hide();
	$("#task_content_devproj").show();

	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$(".dev_manager_tab").show();
	$(".ba_manager_tab").hide();
	$("#pm_tab_div").hide();
	$(".ba_name_prot").show();
	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$("#ba_table_view").show();
	$("#Ba_man_table_section").show();
	$("#change_request_dev").hide();

	$("#port_table_view").hide();

	$("#change_request_div").hide();
	$("#change_req_btn").hide();

	$("#pm_res_table").hide();

	$(".important_section").hide();
	$("#task_manage").hide();
	$(".prot_ali_items").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_BaManger_Tab").hide();
	$("#bt_dev_tasks").show();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").show();
	$("#prot_BA_view").hide();
	doRestoreBaManagerColumns();
	hideProjData();
	hide_all_details();
	task_hide_details();
});
$("#cr_batab_tab7").on("click", function () {
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$(".BaAssigned_cr").show();
});
$("#cr_ba_tab8").on("click", function () {
	$("#task_cont_changereq").hide();
	$("#task_batab_changereq").show();
	$(".pendingass_cr").hide();
	$(".assinged_cr").hide();
	$(".nexkweek_cr").hide();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$(".BApending_cr").show();

	$(".BaNextweek_cr").hide();
});
$("#cr_ba_tab9").on("click", function () {
	$("#task_cont_changereq").hide();
	$("#task_batab_changereq").show();
	$(".pendingass_cr").hide();
	$(".assinged_cr").hide();
	$(".nexkweek_cr").hide();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").show();
	$(".BaNextweek_cr").hide();
	$(".BApending_cr").hide();

	$(".BaNextweek_cr").hide();
});
$("#cr_ba_tab10").on("click", function () {
	$("#task_cont_changereq").hide();
	$("#task_batab_changereq").show();
	$(".pendingass_cr").hide();
	$(".assinged_cr").hide();
	$(".nexkweek_cr").hide();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$(".BApending_cr").show();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").show();
});
$("#cr_ba_tab6").on("click", function () {
	$("#cr_batab_tab7").get(0).click();

	$("#change_req_btn").hide();
	$("#task_cont_changereq").hide();

	$("#task_batab_changereq").show();
	$(".pendingass_cr").hide();
	$(".assinged_cr").hide();
	$(".nexkweek_cr").hide();
	$(".BaAssigned_cr").show();

	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
});
$("#cr_ba_tab5").on("click", function () {
	$("#task_batab_changereq").hide();
	$("#task_cont_changereq").show();
	$("#select_filter_bamanager").hide();
	$(".assinged_cr").hide();
	$(".pendingass_cr").show();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$("#filter_cr_batab").hide();
	$(".nexkweek_cr").hide();
});
$("#chn_rq_tab").on("click", function () {
	$("#tab4").get(0).click();
	$("#cr_ba_tab5").get(0).click();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#change_request_dev").hide();
	$("#task_content_devproj").hide();
	$(".pro_hd_tab_chg").show();
	$(".pro_hd_tab").hide();
	$(".task_Assenged_pending").hide();
	$("#task_batab_changereq").hide();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$("#port_quarter_view").hide();

	$("#select_filter_bamanager").hide();
	$(".important_section_ps").hide();
	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$(".pendingass_dev_cr").hide();
	$("#pmo_imp").hide();
	$("#change_request_div").show();
	$("#task_mainsub_changereq").show();

	$("#pm_tab_div").hide();
	$(".ba_name_prot").hide();
	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$(".assinged_cr").hide();
	$(".pendingass_cr").show();
	$(".nexkweek_cr").hide();

	$("#ba_table_view").show();
	$("#Ba_man_table_section").hide();
	$("#task_content_baproj").hide();
	$("#task_cont_changereq").show();

	$("#change_req_btn").show();

	$("#port_table_view").hide();
	$("#pm_res_table").hide();
	$(".important_section").hide();
	$("#task_manage").hide();
	55;
	$(".prot_ali_items").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_BaManger_Tab").hide();
	$("#bt_dev_tasks").show();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").show();
	$("#prot_BA_view").hide();
	doRestoreBaManagerColumns();
	hideProjData();
	hide_all_details();
	task_hide_details();
});
$("#chn_dm_tab").on("click", function () {
	$("#change_req_btn").hide();
	$("#tab7").get(0).click();
	$("#cr_dev_tab1").get(0).click();
	$("#task_content_devproj").hide();
	$("#port_quarter_view").hide();
	$(".pro_hd_tab_chg").show();
	$(".pro_hd_tab").hide();
	$("#all_btpmo_taks").hide();
	$("#ba_pending_tb").hide();
	$("#select_filter_bamanager").hide();
	$(".important_section_ps").hide();
	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$("#task_dev_changereq").show();
	$("#change_req_dev").show();
	$("#change_request_div").hide();
	$(".nexkweek_cr").hide();
	$("#pmo_imp").hide();
	$("#change_request_dev").show();
	$("#pm_tab_div").hide();
	$(".ba_name_prot").hide();
	$("#port_dev_view").hide();
	$(".imp_bamanager").show();
	$(".assinged_cr").hide();
	$(".pendingass_dev_cr").show();
	$(".pendingass_cr").hide();
	$("#ba_table_view").show();
	$("#Ba_man_table_section").hide();
	$(".task_Assenged_pending").hide();
	$("#task_content_baproj").hide();
	$("#task_cont_changereq").show();

	$("#port_table_view").hide();
	$("#pm_res_table").hide();
	$(".important_section").hide();
	$("#task_manage").hide();
	55;
	$(".prot_ali_items").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_BaManger_Tab").hide();
	$("#bt_dev_tasks").show();
	$("#portfolio_sec_tab").hide();
	$("#ba_manag_view").show();
	$("#prot_BA_view").hide();
	doRestoreBaManagerColumns();
	hideProjData();
	hide_all_details();
	task_hide_details();
});
$("#cr_ba_tab2").on("click", function () {
	$(".assinged_cr").show();
	$(".pendingass_cr").hide();
	$("#filter_cr_batab").show();
	$(".BaAssigned_cr").hide();

	$(".nexkweek_cr").hide();
});
$("#cr_ba_tab1").on("click", function () {
	$(".assinged_cr").hide();
	$(".pendingass_cr").show();
	$(".BaAssigned_cr").hide();
	$(".BApending_cr").hide();
	$(".BaCurrentweek_cr").hide();
	$(".BaNextweek_cr").hide();
	$("#filter_cr_batab").hide();
	$(".nexkweek_cr").hide();
});
$("#cr_dev_tab2").on("click", function () {
	$(".assinged_cr").hide();
	$(".pendingass_cr").hide();
	$(".pendingass_dev_cr").hide();

	$(".assinged_dev_cr").show();

	$(".nexkweek_cr").hide();
});
$("#cr_dev_tab1").on("click", function () {
	$(".assinged_cr").hide();
	$(".pendingass_cr").hide();
	$(".pendingass_dev_cr").show();

	$(".assinged_dev_cr").hide();
	$(".nexkweek_cr").hide();
});
$("#cr_ba_tab3").on("click", function () {
	$(".assinged_cr").hide();
	$(".pendingass_cr").hide();
	$(".pendingass_dev_cr").hide();
	$("#filter_cr_batab").hide();
	$(".BaAssigned_cr").hide();

	$(".assinged_dev_cr").hide();
	$(".nexkweek_cr").show();
});

$(document).on("change", "#select_ba_filt", function () {
	var selectedValue = $(this).val();

	if (selectedValue == "3") {
		// Next Week
		$(".assinged_cr").hide();
		$(".pendingass_cr").hide();
		$(".pendingass_dev_cr").hide();
		$("#filter_cr_batab").hide();
		$(".BaAssigned_cr").hide();
		$(".assinged_dev_cr").hide();
		$(".nexkweek_cr").show();
		$("#change_req_btn").hide();
	} else if (selectedValue == "2") {
		// Current Week
		$(".assinged_cr").show();
		$(".pendingass_cr").hide();
		$("#filter_cr_batab").show();
		$(".BaAssigned_cr").hide();
		$(".nexkweek_cr").hide();
		$("#change_req_btn").hide();
	} else if (selectedValue == "1") {
		// All
		$(".assinged_cr").hide();
		$(".pendingass_cr").show();
		$("#change_req_btn").show();

		$(".BaAssigned_cr").hide();
		$(".BApending_cr").hide();
		$(".BaCurrentweek_cr").hide();
		$(".BaNextweek_cr").hide();
		$("#filter_cr_batab").hide();
		$(".nexkweek_cr").hide();
	}
});

// $('#tab7').on('click', function () {
//     $('#task_manage').hide();
//     $('.prot_ali_items').hide();
//     $('#pm_tab_div').hide();
//     $('#port_dev_view').hide();
//     $('#pm_res_table').hide();
//     $('#all_btpmo_taks').hide();
//     $('#ba_pending_tb').hide();
//     $('#ba_pending').hide();
//     $('.important_section_ps').hide();
//     $('#pmo_imp').hide();

//     $('#proj_summary_tbl').hide();
//     $('.hide_default_Projects_Tab').hide();
//     $('#bt_dev_tasks').show();
//     $('#portfolio_sec_tab').hide();
//     $('#ba_manag_view').show();
//     $('#prot_BA_view').hide();
//     hideProjData()
//     hide_all_details();
//     task_hide_details();
// })

$("#tab5").on("click", function () {
	$("#task_manage").hide();
	$("#proj_summary_tbl").hide();
	$(".hide_default_portfolio_Tab").hide();
	$("#ba_pending_tb").hide();
	$("#ba_pending").hide();
	$(".important_section_ps").hide();
	$("#change_req_tbl").hide();
	$("#task_content_changereq").hide();
	$("#dashboard_filter").hide();
	$("#port_quarter_view").hide();
	$("#pmo_imp").hide();
	$("#portfolio_sec_tab").show();
	$(".prot_ali_items").hide();
	$("#ba_manag_view").hide();
	$("#port_BA_type_filter").hide();
	doRestorePortfolioColumns();
	$("#port_table_view").show();
	$("#port_proj_name_filter").hide();
	$("#pm_tab_div").hide();
	$("#port_dev_view").hide();
	$(".important_section").hide();
	$(".imp_bamanager").hide();

	$("#all_btpmo_taks").hide();

	$("#pm_res_table").hide();

	$("#port_proj_type_filter").show();
	$("#bt_dev_tasks").hide();
	$("#proj_tsk_manage").hide();
	$("#prot_BA_view").hide();

	$("#btpmo_table").show();

	$("#pagination_container").show();
	$("#port_tab_table").show();

	$("#port_mypro_tab1").get(0).click();

	hide_all_details();
	task_hide_details();
});
$(document)
	.find("[id^='update_btn_pmo']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(`.priority_one_dropdown_${id}`).show();
		$(`.priority_one_pmo_${id}`).hide();

		$(`#save_btn_pmo_${id}`).show();
		$(`#update_btn_pmo_${id}`).hide();
	});

$(document)
	.find("[id^='save_btn_pmo']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(`.priority_one_dropdown_${id}`).hide();
		$(`.priority_one_pmo_${id}`).show();

		$(`#save_btn_pmo_${id}`).hide();
		$(`#update_btn_pmo_${id}`).show();
	});

$(document)
	.find("[id^='revise_tab_btn_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`#float_det_tab_${id}`).show();

		var blockarray = document.querySelectorAll(`.rev_date_${id}`);
		for (var i = 0; i < blockarray.length; i++) {
			blockarray[i].classList.add("imp");
		}
		$(document).find(`#save_tab_bt_${id}`).show();
		$(document).find(`#revise_tab_btn_${id}`).hide();
	});
$(document)
	.find("[id^='save_tab_bt_']")
	.on("click", function () {
		var temp_id = this.id;
		var splitArray = temp_id.split("_");
		var id = splitArray[splitArray.length - 1];

		$(document).find(`#float_det_tab_${id}`).hide();

		var blockarray = document.querySelectorAll(`.rev_date_${id}`);
		for (var i = 0; i < blockarray.length; i++) {
			blockarray[i].classList.remove("imp");
		}
		$(document).find(`#save_tab_bt_${id}`).hide();
		$(document).find(`#revise_tab_btn_${id}`).show();
	});

$("#save_revise_date").on("click", function () {
	$("#folat_det_tab").hide();
});

$("#end_date_btn").on("click", function () {
	$("#end_btn").show();
	$("#start_btn").hide();
});
$("#start_date_btn").on("click", function () {
	$("#end_btn").hide();
	$("#start_btn").show();
});

$("#proj_task_tab4").on("click", function () {
	$(".inprogress_proj").hide();
	$(".action_need_proj").hide();
	$(".action_need_proj_2").hide();
	$(".on_hold_proj").hide();
	$(".pending_proj").hide();
	$(".not_start_proj").hide();
	$(".e_staff_proj").hide();
	$(".pending_proj").hide();
	$(".delayed_proj").hide();
	$(".action_need_proj_3").hide();
	$(".on_hold_proj_2").show();

	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});

$("#proj_task_tab5").on("click", function () {
	$(".inprogress_proj").hide();
	$(".action_need_proj").hide();
	$(".action_need_proj_2").hide();
	$(".on_hold_proj").hide();
	$(".pending_proj").hide();
	$(".pending_proj").show();
	$(".not_start_proj").hide();
	$(".e_staff_proj").hide();
	$(".delayed_proj").hide();
	$(".action_need_proj_3").hide();
	$(".on_hold_proj_2").hide();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#proj_task_tab6").on("click", function () {
	$(".inprogress_proj").hide();
	$(".action_need_proj").hide();
	$(".action_need_proj_2").hide();
	$("#port_dev_view").hide();

	$(".on_hold_proj").hide();
	$(".pending_proj").hide();
	$(".pending_proj").hide();
	$(".not_start_proj").hide();
	$(".e_staff_proj").hide();
	$(".delayed_proj").hide();
	$(".action_need_proj_3").show();
	$(".on_hold_proj_2").hide();
	hideProjData();
	$(".fa-minus").each(function () {
		$(this).removeClass("fa-minus").addClass("fa-plus");
	});
});
$("#dev_section").on("click", function () {
	$("#port_tab_table").hide();
	$("#port_dev_view").show();
	$("#port_table_view").hide();
	$("#task_tbl").hide();

	$(".ba_name_prot").show();
	$("#task_proj_filter").hide();
	$("#task_content_proj").hide();
	$("#prot_BA_view").show();

	$("pagination_container").hide();
	$(".prot_ali_items").hide();
	$(".proj_task_tabwrap").show();
	$("#port_proj_type_filter").hide();
	$("#port_proj_name_filter").hide();

	$("#port_BA_type_filter").hihde();
});
$("#proj_taskpri_tab3").on("change", function () {
	document.getElementById("all_btpmo_taks").style.display = "block";
	$(".e-procurrement-proj").hide();
	$("#pmo_imp").hide();
	$(".portfolio_sec_tab").hide();
	$("#btpmo_table").hide();
	$(".search_icon_grp").hide();
	$(".task_serch_box").show();
	$(".proj_task_inner_filt").show();

	$(".port_table_view").hide();
	$("#port_BA_type_filter").hide();
	$("#prot_BA_view").hide();
	$("pagination_container").hide();
	$(".prot_ali_items").hide();
});
