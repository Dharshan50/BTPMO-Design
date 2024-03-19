var originalOrder = {};
var lstOrder = [];

$(document).ready(function () {
    date_picker();
    hide_all_details();
    $('#top_div').hide();
    $('#dev_break_tbl').hide();
    // $('#project_charter_data').hide();
    // $('#function_req').hide();
    // $('#function_req_2').hide();
    // $('#project_charter_data_2').hide();
    $('#tab1').get(0).click();

    $('#proj_tsk_manage').hide();
    $('#prj_tsk_assign').hide();
    $('#proj_stage_task').hide();
    $('#create_proj_form').hide();

    //diwakar
    $("[id^='Close_Pending_']").hide()
    $("[id^='Close_Assigned_']").hide()
    $("[id^='Form_Template_']").hide()
    //diwakar

    // $('#project_charter_data_3').hide();   
    // $('#project_charter_data_4').hide();
    // $('#project_charter_data_5').hide();
    // $('#function_req_3').hide();
    hideProjData()
    $(document).find("[class^='EditField_']").hide();
    //$(document).find("[class^='card_button_']").hide();
    $(document).find("[id^='edit_revenddate_']").hide();
    $(document).find("[id^='edit_revstrdate_']").hide();
    $(document).find("[id^='edit_enddate_']").hide();
    $(document).find("[id^='edit_strdate_']").hide();
    $(document).find("[id^='edit_revendrevdate_']").hide();
    $(document).find("[id^='edit_revstrrevdate_']").hide();
    $(document).find("[id^='edit_endrevdate_']").hide();
    $(document).find("[id^='edit_strrevdate_']").hide();

    sortElements();
})

$(document).find("[id^='Expand_Pending_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $("[class^='pending_Assignment_View_']").hide();
    $("[id^='Expand_Pending_']").show();
    $("[id^='Close_Pending_']").hide();
    $(document).find(`.pending_Assignment_View_${id}`).show()
    $(document).find(`#Close_Pending_${id}`).show()
    $(document).find(`#Expand_Pending_${id}`).hide()
    initializeDraggable()
})

$(document).find("[id^='Close_Pending_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $(document).find(`.pending_Assignment_View_${id}`).hide()
    $(document).find(`#Expand_Pending_${id}`).show()
    $(document).find(`#Close_Pending_${id}`).hide()
})

$(document).find("[id^='Expand_Assigned_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $("[class^='Assigned_Record_View_']").hide();
    $("[id^='Close_Assigned_']").hide();
    $("[id^='Expand_Assigned_']").show();
    $(document).find(`.Assigned_Record_View_${id}`).show()
    $(document).find(`#Close_Assigned_${id}`).show()
    $(document).find(`#Expand_Assigned_${id}`).hide()
    initializeDraggable()
})

$(document).find("[id^='Close_Assigned_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $(document).find(`.Assigned_Record_View_${id}`).hide()
    $(document).find(`#Expand_Assigned_${id}`).show()
    $(document).find(`#Close_Assigned_${id}`).hide()
})


$(document).on('change', '.order_select', function () {
    var $selectedOption = $(this).find('option:selected');
    var newOrder = $selectedOption.val();
    var $parentCard = $(this).closest('.card_main_box');
    $parentCard.attr("data-order", newOrder);
    sortElements();
});

function initializeDraggable() {
    $(".card_main_box").each(function () {
        $(this).find(".move").on("mousedown", function (e) {
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
                        bottom: parent.offset().top + parent.height() - $(this).outerHeight(),
                        right: parent.offset().left + parent.width() - $(this).outerWidth()
                    };
                    ui.position.top = Math.min(Math.max(ui.position.top, containment.top), containment.bottom);
                    ui.position.left = Math.min(Math.max(ui.position.left, containment.left), containment.right);
                }
            });
        });
    });
}
$(document).find(".droppable").droppable({
    accept: ".card_main_box", // Only accept draggable elements
    over: function (event, ui) {
        // Remove hover class from all items
        $(".card_main_box").removeClass("hover");

        // Find the index of the dragged item
        var draggedIndex = $(ui.helper).index();

        // Add hover class to the item directly below the dragged item
        var $hoveredItem = $(this).children('.card_main_box').eq(draggedIndex + 1);
        $hoveredItem.addClass("hover");

        // Apply custom styles to the hovered item
        $hoveredItem.css({
            "opacity": "0", // Set opacity to 0
            "border": "2px solid red" // Apply a red border
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
        var hoveredIndex = $(this).children('.hover').index();

        // Reset styles of the hovered item
        // $(this).children('.card_main_box').eq(hoveredIndex).css({
        //     "opacity": "", // Reset opacity
        //     "border": "" // Reset border
        //     // Reset any other styles you applied
        // });

        lstOrder = [];
        // Find the position where the item is dropped
        var $nextItem = $droppable.find(".card_main_box").filter(function () {
            return $(this).offset().top > ui.offset.top;
        }).first();

        // If no next item, append to the end
        if ($nextItem.length === 0) {
            $droppable.append($draggable);
        } else {
            $draggable.insertBefore($nextItem);
        }

        // Update the order of items
        var $items = $droppable.find('.card_main_box');
        for (var i = 0; i < $items.length; i++) {
            $($items[i]).attr('data-order', i + 1);
            if ($($items[i]).attr('id') !== undefined && $($items[i]).attr('id') !== null)
                lstOrder.push($($items[i]).attr('id'))
        }

        var droppableId = $droppable.attr('name');
        originalOrder[droppableId] = lstOrder;

        setTimeout(initializeDraggable, 200);
    }
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
    $('#upd_reviseend_date').datepicker();
    $('#upd_reviseselect_date').datepicker();
    $('#task_closuredate').datepicker();
    $('#task_revisedenddate').datepicker();
    // $('#task_revisemandays').datepicker();
    $('#task_revisedstartdate').datepicker();
    $('#task_enddate').datepicker();
    $('#proj_reviselive').datepicker();
    $('#proj_targlive').datepicker();
    $('#proj_deadline').datepicker();
    $('#task_startdate').datepicker();
}

function hide_all_details() {
    $('#task_manage').hide();
    $('#task_content').hide();
    $('#proj_content').hide();
    $('#update_task').hide();
    $('#view_proj').hide();
    $('#buttons').hide();
    $('#upd_userlog_cmts').hide();
    $('#proj_tsk_manage').hide();
    $('#prj_tsk_assign').hide();
    $('#proj_stage_task').hide();
    $('#create_proj_form').hide();
    $('#project_charter_data_3').hide();
    $('#function_req_3').hide();
    $('#project_charter_data_4').hide();
    $('#project_charter_data_5').hide();
    //$('#bt_dev_tasks').hide();
    hideProjData();
}

function task_hide_details() {
    $('#task_content').hide();
    $('#proj_content').hide();
    $('#update_task').hide();
    $('#view_proj').hide();
    $('#buttons').hide();
    $('#upd_userlog_cmts').hide();
    $('#proj_tsk_manage').hide();
    $('#prj_tsk_assign').hide();
    $('#proj_stage_task').hide();
    $('#create_proj_form').hide();
    $('#project_charter_data_3').hide();
    $('#function_req_3').hide();
    $('#project_charter_data_4').hide();
    $('#project_charter_data_5').hide();
    hideProjData();
    //$('#bt_dev_tasks').hide();
}




$('#tab1').on('click', function () {
    $('#proj_summary_tbl').show();
    $('#pagination_container').show();
    $('#bt_dev_tasks').hide();
    $('#portfolio_sec_tab').hide();
    $('#prot_BA_view').hide();
    hide_all_details();
})
$('#assign_tsk').on('click', function () {
    $('#slct_proj_drop').val("");
    $('#proj_tsk_manage').hide();
    $('#prj_tsk_assign').show();
    $('#pagination_container').hide();
})
$('#prj_tsk_rtrn').on('click', function () {
    $('#tab2').get(0).click();
    $('#proj_tsk_manage').show();
    $('#prj_tsk_assign').hide();
    $('#pagination_container').show();
})

$('#slct_proj_drop').on('change', function () {
    var val = $('#slct_proj_drop').val();
    if (val != "") {
        $('#proj_stage_task').show();
        initializeDraggable();
    }
    else {
        $('#proj_stage_task').hide();
    }
    $(document).find("[id^='Form_Template_']").hide();
    $(document).find("[class^='LabelField_']").show();
    $(document).find("[class^='EditField_']").hide();
})

$(document).find("[id^='AddBatch_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    var type = Number($(document).find(`#batch_type_${id}`).val());
    alert(type)
    if (type === 0) {
        $(document).find(`#Form_Template_${id}`).hide()
        $(document).find(`#Record_Template_${id}`).show()
        $(document).find(`.card_button_${id}`).hide();
    }
    else {
        $(document).find(`#Form_Template_${id}`).show()
        $(document).find(`#Record_Template_${id}`).hide()
        $(document).find(`.card_button_${id}`).show();
    }
})

$(document).find("[id^='close_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $(document).find(`#Form_Template_${id}`).hide()
    $(document).find(`#Record_Template_${id}`).show()
    $(document).find(`.card_button`).hide();
})

$(document).find("[id^='EditRecord_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`.LabelField_${id}`).hide();
    $(document).find(`.EditField_${id}`).show();
    // $(document).find("[id^='Save_']").show();
    // $(document).find("[id^='Cancel_']").show();
    $(document).find(`.card_button_${id}`).show();
    var current_style = $(`#card_bdy_${id}`).css('max-height')
    if (current_style === "145px") {
        $(`#card_bdy_${id}`).css({ 'max-height': '145px', 'transition': 'max-height:0.8s' });
    }
    $(`#card_bdy_${id}`).css({ 'max-height': '1000px', 'transition': 'max-height:0.8s' });
    $(this).hide()
})

$("[id^='upd_time_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#label_strdate_${id}`).hide();
    $(document).find(`#label_enddate_${id}`).hide();
    $(document).find(`#label_revstrdate_${id}`).hide();
    $(document).find(`#label_revenddate_${id}`).hide();
    $(document).find(`#edit_strdate_${id}`).show();
    $(document).find(`#edit_enddate_${id}`).show();
    $(document).find(`#edit_revstrdate_${id}`).show();
    $(document).find(`#edit_revenddate_${id}`).show();
    $(`#upd_time_${id}`).hide();
    $(`#save_time_${id}`).show();
})

$("[id^='Update_revis_']").on('click', function(){

    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#rev_str_${id}`).hide();
    $(document).find(`#rev_end_${id}`).hide();
    $(document).find(`#edit_revstrport_${id}`).show();
    $(document).find(`#edit_revendport_${id}`).show();
    $(`#Update_revis_${id}`).hide();
    $(`#save_revis_${id}`).show();
})

$("[id^='save_revis_']").on('click', function(){
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#rev_str_${id}`).show();
    $(document).find(`#rev_end_${id}`).show();
    $(document).find(`#edit_revstrport_${id}`).hide();
    $(document).find(`#edit_revendport_${id}`).hide();
    $(`#Update_revis_${id}`).show();
    $(`#save_revis_${id}`).hide();
})

$("[id^='upd_revtime_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#label_revstrrevdate_${id}`).hide();
    $(document).find(`#label_revendrevdate_${id}`).hide();
    $(document).find(`#edit_revstrrevdate_${id}`).show();
    $(document).find(`#edit_revendrevdate_${id}`).show();
    $(`#upd_revtime_${id}`).hide();
    $(`#save_revtime_${id}`).show();
})
$("[id^='save_time_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#label_strdate_${id}`).show();
    $(document).find(`#label_enddate_${id}`).show();
    $(document).find(`#label_revstrdate_${id}`).show();
    $(document).find(`#label_revenddate_${id}`).show();
    $(document).find(`#edit_strdate_${id}`).hide();
    $(document).find(`#edit_enddate_${id}`).hide();
    $(document).find(`#edit_revstrdate_${id}`).hide();
    $(document).find(`#edit_revenddate_${id}`).hide();
    $(`#upd_time_${id}`).show();
    $(`#save_time_${id}`).hide();
})
$("[id^='save_revtime_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id)
    $(document).find(`#label_revstrrevdate_${id}`).show();
    $(document).find(`#label_revendrevdate_${id}`).show();
    $(document).find(`#edit_revstrrevdate_${id}`).hide();
    $(document).find(`#edit_revendrevdate_${id}`).hide();
    $(`#upd_revtime_${id}`).show();
    $(`#save_revtime_${id}`).hide();
})




$("[id^='Save_Rec_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $(document).find(`.LabelField_${id}`).show();
    $(document).find(`.EditField_${id}`).hide();
    $(document).find(`#EditRecord_${id}`).show();
    var current_style = $(`#card_bdy_${id}`).css('max-height')
    if (current_style === "145px") {
        $(`#card_bdy_${id}`).css({ 'max-height': '145px', 'transition': 'max-height:0.8s' });
    }
    $(`#card_arrow_${id}`).trigger('click');
    // $(document).find("[id^='Cancel_']").hide(); 
    $(document).find(`.card_button_${id}`).hide();
})

$("[id^='Cancel_Rec_']").on('click', function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    $(document).find(`.LabelField_${id}`).show();
    $(document).find(`.EditField_${id}`).hide();
    $(document).find(`#EditRecord_${id}`).show();
    var current_style = $(`#card_bdy_${id}`).css('max-height')
    if (current_style === "145px") {
        $(`#card_bdy_${id}`).css({ 'max-height': '145px', 'transition': 'max-height:0.8s' });
    }
    $(`#card_arrow_${id}`).trigger('click');
    // $(document).find("[id^='Save_']").hide();
    $(document).find(`.card_button_${id}`).hide();
    // $(this).hide()
})

$('#proj_type').on('change', function () {
    var val = $('#proj_type').val();
    if (val == 1) {
        $('#create_proj_form').show();
        $('.proj_name_text_box').hide();
        $('.proj_name_slct').show();
        $('#buttons').show();
        $('#proj_currentstage').prop('disabled', true);
        $('#proj_status').prop('disabled', true);
        $('#proj_ragstatus').prop('disabled', true);
        $('#proj_currentstage').val('1');
        $('#proj_status').val('1');
        $('#proj_ragstatus').val('1');

    }
    else if (val == 2) {
        $('#file-upload-container').show();
        $('.form-label label_txt_chng').hide();
        $('#proj_type').hide();
        $('#Project_heading').hide();
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
    else if (val == 0) {
        $('#create_proj_form').hide();
        $('#buttons').hide();

    }
})

$('#create_proj').on('click', function () {
    $('#proj_type').val(0);
    $('#cancel_btn').attr('data-bs-action', '');
    $('#retrn_task_page').attr('data-bs-action', '');
    $('#proj_summary_tbl').hide();
    // $('#tab_content_bt').hide();
    $('#pagination_container').hide();
    //$('#rqst_cntnt').show();
    $('#proj_content').show();
    $('#buttons').hide();
    $('#file-upload-container').hide();
})
$('#tab3').on('click', function () {
    $('#task_manage').show();
    task_hide_details();
    $('#proj_summary_tbl').hide();
    $('#pagination_container').show();
    $('#task_tab1').get(0).click();
    $('#bt_dev_tasks').hide();
    $('#portfolio_sec_tab').hide();
    $('#prot_BA_view').hide();
    hideProjData();
})

$("[id^='task_tab']").on('click', function () {
    $('.E_Procurement_Table').show();
    $('.E_Staff_Table').hide();
    // if (this.id === 'task_tab5') {
    //     $('.E_Procurement_Table').hide();
    //     $('.E_Staff_Table').hide();
    // }
})

$('#task_tab1').on('click', function () {
    $('.action_needed_row').hide();
    $('#proj_tsk_data_1').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').show();
    $('.development_row').show();
    $('.All_tasks').show();
    hideProjData();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
})
$('#task_tab2').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    $('.development_row').show();
    $('.All_tasks').show();
    hideProjData();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
})
$('#task_tab3').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    $('.development_row').show();
    $('.All_tasks').show();
    hideProjData();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
})
$('#task_tab4').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    $('.development_row').hide();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
    $('.All_tasks').hide();
    $('.delayed').show();
    hideProjData();
})

$('#task_tab5').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    $('.development_row').hide();
    $('.All_tasks').hide();
    $('.needs_help').show();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
    hideProjData();
})

$('#task_tab6').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    $('.development_row').show();
    $('.All_tasks').show();
    hideProjData();
    $(".fa-angle-down").each(function () {
        $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
    });
})

$('#tab2').on('click', function () {
    $('#task_manage').hide();
    task_hide_details();
    $('#proj_summary_tbl').hide();
    $('#pagination_container').show();
    $('#proj_tsk_manage').show();
    $('#proj_task_tab1').get(0).click();
    $('#bt_dev_tasks').hide();
    $('#portfolio_sec_tab').hide();
    $('#prot_BA_view').hide();
    hideProjData();
})
$('.retrn_main_page').on('click', function () {
    closeContent();
})
$('#cancel_btn').on('click', function () {
    var action = $(this).data('bs-action');
    if (action == "rtrnupd_proj") {
        $('#view_proj').show();
        $('#upd_userlog_cmts').show();
        $('#update_task').hide();
        $('#task_manage').hide();
        $('#task_content').hide();
        $('#buttons').hide();
        $(this).data('bs-action', '');
        $('#retrn_task_page').data('bs-action', '');
    }
    else if (action == "rtrntask_page") {
        $('#upd_userlog_cmts').hide();
        $('#task_manage').show();
        $('#pagination_container').show();
        $('#task_content').hide();
        $('#buttons').hide();
        $(this).data('bs-action', 'normal');
        $('#retrn_task_page').data('bs-action', '');
    }
    else {
        closeContent();
    }
})
function closeContent() {
    $('#tab1').get(0).click();
    $('#task_content').hide();
    $('#proj_content').hide();
    $('#update_task').hide();
    $('#view_proj').hide();
    $('#buttons').hide();
    $('#upd_userlog_cmts').hide();
    $('#file-upload-container').hide();
}

$('.view_proj_data').on('click', function () {
    //$('#rqst_cntnt').show();
    $('#view_proj').show();
    $('#proj_summary_tbl').hide();
    $('#pagination_container').hide();
    $('#upd_userlog_cmts').show();
})

$('.updt_proj').on('click', function () {
    $('#view_proj').hide();
    $('#upd_userlog_cmts').hide();
    $('#update_task').show();
    $('#upd_userlog_cmts').show();
    $('#task_manage').hide();
    $('#pagination_container').hide();

})

$('#crt_tsk').on('click', function () {
    DoShowCreateTask();

})

$('#retrn_task').on('click', function () {
    $('#view_proj').show();
    $('#upd_userlog_cmts').show();
    $('#update_task').hide();
    $('#task_manage').hide();
    $('#task_content').hide();
    $('#buttons').hide();
})
$('#retrn_task_page').on('click', function () {
    var action = $(this).data('bs-action');
    console.log(action);
    if (action == "rtrnupd_proj") {
        $('#view_proj').show();
        $('#upd_userlog_cmts').show();
        $('#update_task').hide();
        $('#task_manage').hide();
        $('#task_content').hide();
        $('#buttons').hide();

        // Remove the data-bs-action attribute
        $(this).data('bs-action', '');
        $('#cancel_btn').data('bs-action', '');
    } else if (action == "rtrntask_page") {
        $('#upd_userlog_cmts').hide();
        $('#task_manage').show();
        $('#pagination_container').show();
        $('#task_content').hide();
        $('#buttons').hide();

        // Remove the data-bs-action attribute
        $(this).data('bs-action', '');
        $('#cancel_btn').data('bs-action', '');
    }
});

$('.view_task_btn').on('click', function () {
    $('#task_manage').hide();
    $('#pagination_container').hide();
    $('#buttons').show();
    $('#task_content').show();
    $('#retrn_task_page').data('bs-action', 'rtrntask_page');
    $('#cancel_btn').data('bs-action', 'rtrntask_page');
})

function DoShowCreateTask() {
    $('#view_proj').hide();
    $('#upd_userlog_cmts').hide();
    $('#task_content').show();
    $('#buttons').show();
    $('#retrn_task_page').data('bs-action', 'rtrnupd_proj');
    $('#cancel_btn').data('bs-action', 'rtrnupd_proj');
}

var click = 0;

function hideProjData() {
    var lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    for (var i = 0; i <= lst.length; i++) {
        $(`#proj_tsk_data_${lst[i]}`).hide();
         $(`.card_button_${lst[i]}`).hide();
        $(`#assign_tsk_data_${lst[i]}`).hide();
        $(`#save_time_${lst[i]}`).hide();
        $(`#port_delay_tab_${lst[i]}`).hide();
        $(`#edit_revstrport_${lst[i]}`).hide();
        $(`#edit_revendport_${lst[i]}`).hide();
        $(`#save_revis_${lst[i]}`).hide();

        $(`#save_revtime_${lst[i]}`).hide();
    }
}

var open_id = "";
$(document).on('click', `[id^='view_tsk_data_']`, function () {
    var temp_id = this.id;
    var splitarr = temp_id.split('_');
    var id = splitarr[splitarr.length - 1];
    console.log(id);
    if (open_id != id) {
        $(`#view_tsk_data_${id}`).removeClass('fa-plus');
        $(`#view_tsk_data_${id}`).addClass('fa-minus');
        $(`#view_tsk_data_${id}`).css({ 'transition': '0.2s', 'transform': 'rotate(180deg)' });
        open_id = id;
        console.log(open_id);
        $(`#proj_tsk_data_${id}`).show();
    }
    else {
        $(`#view_tsk_data_${id}`).removeClass('fa-minus');
        $(`#view_tsk_data_${id}`).addClass('fa-plus');
        $(`#view_tsk_data_${id}`).css({ 'transition': '0.2s', 'transform': 'rotate(0deg)' });
        $(`#proj_tsk_data_${id}`).hide();
        open_id = "";
    }
})

var open_id_dev_tsk = "";
$(document).on('click',`[id^='view_assign_tsk_']`,function(){
    var temp_id = this.id;
    var splitarr = temp_id.split('_');
    var id = splitarr[splitarr.length-1];
    if(open_id_dev_tsk != id){
        $(`#view_assign_tsk_${id}`).removeClass('fa-angle-up');
        $(`#view_assign_tsk_${id}`).addClass('fa-angle-down');
        $(`#view_assign_tsk_${id}`).css({ 'transition': '0.2s' });
        open_id_dev_tsk = id;
        //console.log(open_id);
        $(`#assign_tsk_data_${id}`).show();
        $('#dev_break_tbl').hide();
        $(`#assign_tsk_data_${id}`).css({ 'transition': '0.2s'});

    }
    else {
        $(`#view_assign_tsk_${id}`).removeClass('fa-angle-down');
        $(`#view_assign_tsk_${id}`).addClass('fa-angle-up');
        $(`#view_assign_tsk_${id}`).css({ 'transition': '0.2s'});
        $(`#assign_tsk_data_${id}`).hide();
        $('#dev_break_tbl').hide();
        $(`#assign_tsk_data_${id}`).css({ 'transition': '0.2s'});
        open_id_dev_tsk = "";
    }
})

var open_id_port_tsk = "";
$(document).on('click',`[id^='delay_dropdwn_']`,function(){
    var temp_id = this.id;
    var splitarr = temp_id.split('_');
    var id = splitarr[splitarr.length-1];
    if(open_id_port_tsk != id){
        $(`#delay_dropdwn_${id}`).css({ 'transition': '0.2s', 'transform': 'rotate(180deg)' });
        open_id_port_tsk = id;
        //console.log(open_id);
        $(`#port_delay_tab_${id}`).show();
        $(`#port_delay_tab_${id}`).css({ 'transition': '0.2s'});

    }
    else {
        $(`#delay_dropdwn_${id}`).css({ 'transition': '0.2s', 'transform': 'rotate(0deg)' });
        $(`#port_delay_tab_${id}`).hide();
        $(`#port_delay_tab_${id}`).css({ 'transition': '0.2s'});
        open_id_port_tsk = "";
    }
})


var arrow_id = "";

$(document).on('click', `[id^='card_arrow_']`, function () {
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id);
    if (arrow_id !== id) {
        $('#card_arrow_' + id).removeClass('fa-arrow-circle-down')
        arrow_id = id;
        console.log(arrow_id)
        $(`#card_bdy_${id}`).css({ 'max-height': '1000px', 'transition': 'max-height:0.8s' });
        $('#card_arrow_' + id).addClass('fa-arrow-circle-up')
    }
    else {
        $('#card_arrow_' + id).removeClass('fa-arrow-circle-UP')
        $(`#card_bdy_${id}`).css({ 'max-height': '145px', 'transition': 'max-height:0.8s' });
        $('#card_arrow_' + id).addClass('fa-arrow-circle-down')
        arrow_id = "";
    }
})

$('#save_modal').on('click',function(){
    $('#dev_breakdown_data').modal('hide');
    $('#dev_break_tbl').show();
    $('#card_arrow_81').trigger('click');
})

$('#bell').on('click', function () {
    bell();
})

function bell() {
    var bell = document.getElementById('top_div');
    if (bell.classList.contains('fadeInDown')) {
        bell.classList.remove('fadeInDown');
        bell.classList.add('fadeInup');
        $('#top_div').hide();
    } else {
        $('#top_div').show();
        bell.classList.remove('fadeInup');
        bell.classList.add('fadeInDown');
    }
}

$('#proj_task_tab1').on('click', function () {
    $('.pending_Assignment_Record').show();
    $(".Assigned_Record").hide();
    $("[class^='pending_Assignment_View_']").hide();
    $("[class^='Assigned_Record_View_']").hide();
    $("[id^='Expand_Pending_']").show();
    $("[id^='Close_Pending_']").hide();
    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})

$(document).on('click' ,'#port_task_tab2' , function(){
    $('#port_table_view').hide();
    $('#prot_BA_view').show();

})

$(document).on('click' ,'#port_task_tab1' , function(){
    $('#port_table_view').show();
    $('#prot_BA_view').hide();
})




$('.dw_content_data').on('click', function () {
    $('#tab3').get(0).click(0);
    $('#view_tsk_data_2').trigger('click');
    $('#card_bdy_4').css({ 'border': '2px solid red' });
    setTimeout(() => {
        $('#card_bdy_4').css({ 'border': 'none' });
    }, 3000);
    $('html, body').animate({
        scrollTop: $('#card_bdy_4').offset().top
    }, 100);
    $('#top_div').hide();
})

$('#proj_task_tab2').on('click', function () {
    $(".Assigned_Record").show();
    $('.pending_Assignment_Record').hide();
    $("[class^='Assigned_Record_View_']").hide();
    $("[class^='pending_Assignment_View_']").hide();
    $("[id^='Close_Assigned_']").hide();
    $("[id^='Expand_Assigned_']").show();

    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})

$('#proj_task_tab3').on('click', function () {
    $('.inprogress_proj').hide();
    $('.action_need_proj').hide();
    $('.action_need_proj_2').show();
    $('.on_hold_proj').hide();
    $('.pending_proj').hide();
    $('.not_start_proj').hide();
    $('.e_staff_proj').hide();
    $('.pending_proj').hide();
    $('.delayed_proj').hide();
    $('.action_need_proj_3').hide();
    $('.on_hold_proj_2').hide()
    $('.pending_Assignment_Record').hide()

    hideProjData();
    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})


$('#tab4').on('click',function(){
    $('#task_manage').hide();
    $('#proj_summary_tbl').hide();
    $('#bt_dev_tasks').show();
    $('#portfolio_sec_tab').hide();
    $('#prot_BA_view').hide();
    hide_all_details();
    task_hide_details();
})


$('#tab5').on('click', function(){
    $('#task_manage').hide();
    $('#proj_summary_tbl').hide();
    $('#bt_dev_tasks').hide();
    $('#portfolio_sec_tab').show();
    $('#port_task_tab1').get(0).click();
    $('#port_mypro_tab1').get(0).click();
    hide_all_details();
    task_hide_details();
})

$('#proj_task_tab4').on('click', function () {
    $('.inprogress_proj').hide();
    $('.action_need_proj').hide();
    $('.action_need_proj_2').hide();
    $('.on_hold_proj').hide();
    $('.pending_proj').hide();
    $('.not_start_proj').hide();
    $('.e_staff_proj').hide();
    $('.pending_proj').hide();
    $('.delayed_proj').hide();
    $('.action_need_proj_3').hide();
    $('.on_hold_proj_2').show();


    hideProjData();
    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})

$('#proj_task_tab5').on('click', function () {
    $('.inprogress_proj').hide();
    $('.action_need_proj').hide();
    $('.action_need_proj_2').hide();
    $('.on_hold_proj').hide();
    $('.pending_proj').hide();
    $('.pending_proj').show();
    $('.not_start_proj').hide();
    $('.e_staff_proj').hide();
    $('.delayed_proj').hide();
    $('.action_need_proj_3').hide();
    $('.on_hold_proj_2').hide()
    hideProjData();
    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})
$('#proj_task_tab6').on('click', function () {
    $('.inprogress_proj').hide();
    $('.action_need_proj').hide();
    $('.action_need_proj_2').hide();
    $('.on_hold_proj').hide();
    $('.pending_proj').hide();
    $('.pending_proj').hide();
    $('.not_start_proj').hide();
    $('.e_staff_proj').hide();
    $('.delayed_proj').hide();
    $('.action_need_proj_3').show();
    $('.on_hold_proj_2').hide()
    hideProjData();
    $(".fa-minus").each(function () {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})
