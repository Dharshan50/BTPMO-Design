var originalOrder = {};
var lstOrder = [];

$(document).ready(function () {
    date_picker();
    hide_all_details();
    $('#top_div').hide();
    // $('#project_charter_data').hide();
    // $('#function_req').hide();
    // $('#function_req_2').hide();
    // $('#project_charter_data_2').hide();
    $('#tab1').get(0).click();
    $('#proj_tsk_manage').hide();
    $('#prj_tsk_assign').hide();
    $('#proj_stage_task').hide();
    $('#create_proj_form').hide();

    // $('#project_charter_data_3').hide();   
    // $('#project_charter_data_4').hide();
    // $('#project_charter_data_5').hide();
    // $('#function_req_3').hide();
    hideProjData()
    $(document).find("[class^='EditField_']").hide();
    sortElements();
})

$(document).on('change', '.order_select', function () {
    var $selectedOption = $(this).find('option:selected');
    var newOrder = $selectedOption.val();
    var $parentCard = $(this).closest('.card_main_box');
    $parentCard.attr("data-order", newOrder);
    sortElements();
});

$(document).find(".droppable").droppable({
    accept: ".card_main_box", // Only accept draggable elements
    drop: function (event, ui) {
        // var $droppable = $(this);
        var $draggable = ui.draggable;
        var $droppable = $draggable.parent();
        // Remove the original draggable element
        $draggable.remove();
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
            // originalOrder[$($items[i]).attr('id')] = i + 1; // Track the original order
            if ($($items[i]).attr('id') !== undefined && $($items[i]).attr('id') !== null)
                lstOrder.push($($items[i]).attr('id'))
        }

        var droppableId = $droppable.attr('name');
        originalOrder[droppableId] = lstOrder;

        // Reinitialize draggable elements after a slight delay
        setTimeout(initializeDraggable, 200);
        console.log(originalOrder)
    }
});

function sortElements() {
    var $droppable = $(".droppable");
    var $elements = $droppable.find(".card_main_box");

    $elements.sort(function (a, b) {
        return parseInt($(a).attr("data-order")) - parseInt($(b).attr("data-order"));
    });

    $droppable.empty().append($elements);
}

function initializeDraggable() {
    $(document).find(".card_main_box").draggable({
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
}


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
}


$('#tab1').on('click', function () {
    $('#proj_summary_tbl').show();
    $('#pagination_container').show();
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
        // sortElements();
        initializeDraggable();
    }
    else {
        $('#proj_stage_task').hide();
    }

    $(document).find("[class^='LabelField_']").show();
    $(document).find("[class^='EditField_']").hide();
})

$("[id^='EditRecord_']").on('click', function () {
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
        $('#create_proj_form').show();
        $('.proj_name_text_box').show();
        $('.proj_name_slct').hide();
        $('#buttons').show();
        $('#proj_currentstage').prop('disabled', false);
        $('#proj_status').prop('disabled', false);
        $('#proj_ragstatus').prop('disabled', false);
        $('#proj_currentstage').val('0');
        $('#proj_status').val('0');
        $('#proj_ragstatus').val('0');
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
})
$('#tab3').on('click', function () {
    $('#task_manage').show();
    task_hide_details();
    $('#proj_summary_tbl').hide();
    $('#pagination_container').show();
    $('#task_tab1').get(0).click();
    hideProjData();
})
$('#task_tab1').on('click', function () {
    $('.action_needed_row').hide();
    $('#proj_tsk_data_1').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').show();
    hideProjData();
})
$('#task_tab2').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    hideProjData();
})
$('#task_tab3').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    hideProjData();
})
$('#task_tab4').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    hideProjData();
})
$('#task_tab6').on('click', function () {
    $('.action_needed_row').hide();
    $('.action_requested_row').show();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_1').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    hideProjData();
})
$('#task_tab5').on('click', function () {
    $('.action_needed_row').show();
    $('.action_requested_row').hide();
    $('#proj_tsk_data_3').hide();
    $('#proj_tsk_data_10').hide();
    $('#todo_task').hide();
    hideProjData();
})

$('#tab2').on('click', function () {
    $('#task_manage').hide();
    task_hide_details();
    $('#proj_summary_tbl').hide();
    $('#pagination_container').show();
    $('#proj_tsk_manage').show();
    $('#proj_task_tab1').get(0).click();
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
// $('#view_tsk_data').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data').removeClass('fa-minus');
//         $('#view_tsk_data').addClass('fa-plus');
//         $('#view_tsk_data').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#project_charter_data').hide();
//     } else {
//         $('#view_tsk_data').removeClass('fa-plus');
//         $('#view_tsk_data').addClass('fa-minus');
//         $('#view_tsk_data').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#project_charter_data').show();
//     }

// })
// $('#view_tsk_data_2').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_2').removeClass('fa-minus');
//         $('#view_tsk_data_2').addClass('fa-plus');
//         $('#view_tsk_data_2').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#function_req').hide();
//     } else {
//         $('#view_tsk_data_2').removeClass('fa-plus');
//         $('#view_tsk_data_2').addClass('fa-minus');
//         $('#view_tsk_data_2').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#function_req').show();
//     }
// })


// $('#view_tsk_data_3').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_3').removeClass('fa-minus');
//         $('#view_tsk_data_3').addClass('fa-plus');
//         $('#view_tsk_data_3').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#project_charter_data_2').hide();
//     } else {
//         $('#view_tsk_data_3').removeClass('fa-plus');
//         $('#view_tsk_data_3').addClass('fa-minus');
//         $('#view_tsk_data_3').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#project_charter_data_2').show();
//     }

// })
// $('#view_tsk_data_4').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_4').removeClass('fa-minus');
//         $('#view_tsk_data_4').addClass('fa-plus');
//         $('#view_tsk_data_4').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#function_req_2').hide();
//     } else {
//         $('#view_tsk_data_4').removeClass('fa-plus');
//         $('#view_tsk_data_4').addClass('fa-minus');
//         $('#view_tsk_data_4').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#function_req_2').show();
//     }

// })
// $('#view_tsk_data_5').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_5').removeClass('fa-minus');
//         $('#view_tsk_data_5').addClass('fa-plus');
//         $('#view_tsk_data_5').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#project_charter_data_3').hide();
//     } else {
//         $('#view_tsk_data_5').removeClass('fa-plus');
//         $('#view_tsk_data_5').addClass('fa-minus');
//         $('#view_tsk_data_5').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#project_charter_data_3').show();
//     }

// })
// $('#view_tsk_data_6').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_6').removeClass('fa-minus');
//         $('#view_tsk_data_6').addClass('fa-plus');
//         $('#view_tsk_data_6').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#function_req_3').hide();
//     } else {
//         $('#view_tsk_data_6').removeClass('fa-plus');
//         $('#view_tsk_data_6').addClass('fa-minus');
//         $('#view_tsk_data_6').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#function_req_3').show();
//     }

// })
// $('#view_tsk_data_7').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_7').removeClass('fa-minus');
//         $('#view_tsk_data_7').addClass('fa-plus');
//         $('#view_tsk_data_7').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#project_charter_data_4').hide();
//     } else {
//         $('#view_tsk_data_7').removeClass('fa-plus');
//         $('#view_tsk_data_7').addClass('fa-minus');
//         $('#view_tsk_data_7').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#project_charter_data_4').show();
//     }

// })
// $('#view_tsk_data_8').on('click',function(){
//     console.log(click);
//     click++;
//     console.log(click);
//     if (click % 2 == 0) {
//         $('#view_tsk_data_8').removeClass('fa-minus');
//         $('#view_tsk_data_8').addClass('fa-plus');
//         $('#view_tsk_data_8').css({'transition' : '0.2s' , 'transform' : 'rotate(0deg)'})
//         $('#project_charter_data_5').hide();
//     } else {
//         $('#view_tsk_data_8').removeClass('fa-plus');
//         $('#view_tsk_data_8').addClass('fa-minus');
//         $('#view_tsk_data_8').css({'transition' : '0.2s' , 'transform' : 'rotate(180deg)'})
//         $('#project_charter_data_5').show();
//     }

// })



function hideProjData() {
    var lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    for (var i = 0; i <= lst.length; i++) {
        $(`#proj_tsk_data_${lst[i]}`).hide();
        $(`.card_button_${lst[i]}`).hide();
    }
}
var open_id = "";

$(document).on('click', `[id^='view_tsk_data_']`, function () {
    // alert('hi');
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

var arrow_id = "";

$(document).on('click', `[id^='card_arrow_']`, function () {
    //alert(1);
    var temp_id = this.id;
    var splitArray = temp_id.split('_');
    var id = splitArray[splitArray.length - 1];
    console.log(id);
    if (arrow_id !== id) {
        //alert(2);
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
        // $('#top_div').css({'z-index':'1'});
    }
}


$('#proj_task_tab1').on('click', function () {
    $('.inprogress_proj').show();
    $('.action_need_proj').hide();
    $('.on_hold_proj').hide();
    $('.pending_proj').hide();
    $('.not_start_proj').show();
    $('.delayed_proj').hide();
    $('.action_need_proj_2').hide();
    $('.action_need_proj_3').hide();
    $('.on_hold_proj_2').hide()
    hideProjData();
    $('.e_staff_proj').show();
    $(".fa-minus").each(function() {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})
$('.dw_content_data').on('click', function () {
    $('#tab3').get(0).click(0);
    $('#view_tsk_data_2').trigger('click');
    $('#card_bdy_4').css({ 'border': '2px solid red' });
    setTimeout(() => {
        $('#card_bdy_4').css({ 'border': 'none' });
    }, 3000);
})

$('#proj_task_tab2').on('click', function () {
    $('.inprogress_proj').hide();
    $('.action_need_proj').show();
    $('.on_hold_proj').show();
    $('.pending_proj').hide();
    $('.pending_proj').hide();
    $('.not_start_proj').hide();
    $('.e_staff_proj').hide();
    $('.action_need_proj_2').hide();
    $('.delayed_proj').show();
    $('.action_need_proj_3').hide();
    $('.on_hold_proj_2').hide()
    hideProjData();
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
    hideProjData();
    $(".fa-minus").each(function() {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
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
    $(".fa-minus").each(function() {
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
    $(".fa-minus").each(function() {
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
    $(".fa-minus").each(function() {
        $(this).removeClass('fa-minus').addClass('fa-plus');
    });
})
