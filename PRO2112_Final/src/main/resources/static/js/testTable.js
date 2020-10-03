'use strict'
//Import caching module for Datatables
import {
	pipeline,
	clearPipeline
} from '/js/dataTables_pipeline.js';

angular.module('testapp', [])
	.controller('TestControl', TestControl);

function TestControl($scope) {
	var tableID = "#myTable";
	var table = {};
	var tableOverlay = $(`${tableID}_loading`);
	//Keep track of selected rows
	var selected = [];
	try {
	//Define caching module
	$.fn.dataTable.pipeline = pipeline;
	$.fn.dataTable.Api.register('clearPipeline()', clearPipeline);

	$.LoadingOverlaySetup({
		zIndex: 15,
		progress: true
	});

	$(document).on('preInit.dt', function(e, settings) {
		if ($(e.target).attr("id") == $(tableID).attr("id")) {
			tableOverlay.LoadingOverlay('show', {
				text: "",
				progress: true
			});
		}
	});

	table = $(tableID).DataTable({
		"dom": "<'clearfix'<'float-left'l><'float-right'B>>tr<'clearfix'<'float-left'i><'float-right'p>>",
		"buttons": [
			{
				name: "addBtn",
				attr: {
					name: "addBtn"
				},
				className: 'btn-primary',
				titleAttr: function(dt) {
					return dt.i18n("buttons.addBtn");
				},
				text: function(dt) {
					return '<i class="fas fa-user-plus"></i> ' + dt.i18n("buttons.addBtn");
				},
				action: function(e, dt, node, config) {
					initAdd(table);
				},
				init: function(api, node, config) {
					$(node).removeClass('btn-secondary')
				}
			},
			{
				name: "deselectAll",
				attr: {
					name: "deselectAll"
				},
				className: "btn-danger disabled",
				titleAttr: function(dt) {
					return dt.i18n("buttons.selectNone");
				},
				text: function(dt) {
					return '<i class="fas fa-times"></i> ' + dt.i18n("buttons.selectNone");
				},
				init: function(api, node, config) {
					$(node).removeClass('btn-secondary')
				},
				action: function(e, dt, node, config) {
					table.rows({selected:true}).deselect();
					selected = [];
					$('.select-info .select-item:first-child', `${tableID}_info`).text(table.i18n('select.rows.0'));
					this.disable();
					table.button('deleteSelected:name').disable();
					return false;
				}
			},
			{
				name: "deleteSelected",
				attr: {
					name: "deleteSelected"
				},
				className: "btn-danger disabled",
				titleAttr: function(dt) {
					return dt.i18n("buttons.deleteSelected");
				},
				text: function(dt) {
					return '<i class="far fa-trash-alt"></i> ' + dt.i18n("buttons.deleteSelected");
				},
				init: function(api, node, config) {
					$(node).removeClass('btn-secondary');
				},
				action: function(e, dt, node, config) {
					initDeleteSelected(table, selected);
					return false;
				}
			},
			{
				extend: 'pdf',
				text: 'PDF',
				filename: moment().format('DD_MM_YYYY-HH_mm_ss') + "__testTable",
				title: "Generated testTable on " + moment().format('DD/MM/YYYY-HH:mm:ss')
			}
		],
		"language": language("vi-VN"),
		"processing": false,
		"searching": true,
		"pagingType": "full_numbers",
		"autoWidth": false,
		"serverSide": true,
		"orderCellsTop": true,
		"select": {
			style: 'multi',
			selector: 'td:not(:last-child)'
		},
		"responsive": true,
		//"rowId": "id",
		"fixedHeader": {
			"header": true,
			"footer": false,
			"headerOffset": $('nav').outerHeight()
		},
		"ajax": $.fn.dataTable.pipeline != null ? $.fn.dataTable.pipeline({
			"url": '/DataTablesInput',
			"method": "POST",
			"pages": 5, // number of pages to cache
			"overlayElement": tableOverlay
		}) : {
				"url": '/DataTablesInput',
				"method": "POST",
				"contentType": "application/json",
				"dataType": "json",
				"cache": false,
				"headers": {
					"accept": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
				beforeSend: function(xhr) {
					var CSRFtoken = $("meta[name='_csrf']").attr("content");
					var CSRFheader = $("meta[name='_csrf_header']").attr("content");

					if (CSRFheader != null && CSRFtoken != null)
						xhr.setRequestHeader(CSRFheader, CSRFtoken);
				}
			},
		"columns": columns(),
		"drawCallback": function(settings) {
			
		},
		"rowCallback": function(row, data) {
			if ($.inArray(data, selected) !== -1) {
				table.rows($(row)).select();
			}

			/*$(row).find("td:last-child").find(".viewBtn").each(function() {
				$(this).on('click', function() {
					
					return false;
				});
			});*/

			$(row).find("td:last-child").find(".editBtn").each(function() {
				$(this).on('click', function() {
					initEdit(table, data);
					return false;
				});
			});

			$(row).find("td:last-child").find(".deleteBtn").each(function() {
				$(this).on('click', function() {
					initDelete(table, data);
					return false;
				});
			});
		},
		"initComplete": function(settings, json) {
			//Adjust info and pagination on mobile phones
			$(window).resize(function() {
				if($( window ).width() <= 767) {
					$(`${tableID}_wrapper div:last-child`).addClass('row');
					$(`${tableID}_wrapper div:last-child`).find('div:first-child').removeClass('float-left').addClass('col align-self-center justify-content-center');
					$(`${tableID}_wrapper div:last-child`).find('div:last-child').removeClass('float-right').addClass('col align-self-center justify-content-center');
				} else {
					$(`${tableID}_wrapper div:last-child`).removeClass('row');
					$(`${tableID}_wrapper div:last-child`).find('div:first-child').addClass('float-left').removeClass('col align-self-center justify-content-center');
					$(`${tableID}_wrapper div:last-child`).find('div:last-child').addClass('float-right').removeClass('col align-self-center justify-content-center');
				}
			});
			
			if($( window ).width() <= 767) {
				$(`${tableID}_wrapper div:last-child`).addClass('row');
				$(`${tableID}_wrapper div:last-child`).find('div:first-child').removeClass('float-left').addClass('col align-self-center justify-content-center');
				$(`${tableID}_wrapper div:last-child`).find('div:last-child').removeClass('float-right').addClass('col align-self-center justify-content-center');
			} else {
				$(`${tableID}_wrapper div:last-child`).removeClass('row');
				$(`${tableID}_wrapper div:last-child`).find('div:first-child').addClass('float-left').removeClass('col align-self-center justify-content-center');
				$(`${tableID}_wrapper div:last-child`).find('div:last-child').addClass('float-right').removeClass('col align-self-center justify-content-center');
			}
			//Create "search by table" help tooltip
		/*	$('.dataTables_filter input[type="search"]').off().keyup(function(e) { //Search when enter
				    var searchVal = $(this).val().trim();

					if (e.keyCode == 13) {
						if (column.search().trim() !== searchVal) {
							column.search(searchVal).draw();
						}
					}
					
					return false;
				}).blur(function(e) { //Clear when empty
				    var searchVal = $(this).val().trim();
				
					if (!searchVal) {
						if (column.search().trim() !== searchVal) {
							column.search(searchVal).draw();
						}
					}
					
					return false;
				}).tooltip({
					title: table.i18n("searchTooltip")
				});  */

			//Clone header for search fields
			var searchRow = $('<tr></tr>').appendTo($(table.table().header()));
			$(table.table().header()).find('tr:eq(0) th:last-child').css('text-align', 'center').css('vertical-align', 'middle').attr('rowspan', 2);
			//$(this.api().columns("th:last-child")).css('text-align', 'center').css('vertical-align', 'middle').attr('rowspan', 2);
			this.api().columns(":not(:last-child)").every(function() {
				var column = this;
				//Add search fields' inputs along with its search events
				var searchBox = $(`<th class="text-center"><div class="form-group"><input type="text" class="form-control"/></div></th>`)
				.appendTo(searchRow).find("input").keyup(function(e) { //Search when enter
				    var searchVal = $(this).val().trim();

					if (e.keyCode == 13) {
						if (column.search().trim() !== searchVal) {
							column.search(searchVal).draw();
						}
					}
					
					return false;
				}).blur(function(e) { //Clear when empty
				    var searchVal = $(this).val().trim();
				
					if (!searchVal) {
						if (column.search().trim() !== searchVal) {
							column.search(searchVal).draw();
						}
					}
					
					return false;
				}).tooltip({
					title: table.i18n("searchTooltip")
				});
			});

			$(".dt-buttons button[name= 'deselectAll']", `${tableID}_wrapper`).on("click", function() {
				
				
			});

			
			//Hide loading indicator after initComplete
			tableOverlay.LoadingOverlay('hide', true);
		}
	}).on('processing.dt', function(e, settings, processing) {
		if (processing) {
			$('select', `${tableID}_length`).attr('disabled', true);
			//$(table.table().body()).LoadingOverlay('show');
			tableOverlay.LoadingOverlay('show', {
				text: "",
				progress: true
			});
		} else {
			$('select', `${tableID}_length`).attr('disabled', false);
			//$(table.table().body()).LoadingOverlay('hide', true);
			tableOverlay.LoadingOverlay('hide', true);
		}

		if (selected.length > 0)
			$(".select-info .select-item:first", `${tableID}_info`).text(table.i18n('select.rows', table.i18n('select.rows._'), selected.length));
		return false;
	}).on('select', function(e, dt, type, indexes) {
		if (type === "row") {
			var rowsData = table.rows(indexes).data();
			
			$.each(rowsData, function(index, value) {
				var inArray = $.inArray(value, selected);

				if (inArray === -1) {
					selected.push(value);
				}
			});

			$(".select-info .select-item:first", `${tableID}_info`).text(table.i18n('select.rows', table.i18n('select.rows._'), selected.length));
			table.button('deleteSelected:name').enable();
			table.button('deselectAll:name').enable();
		}
		
		return false;
	}).on('deselect', function(e, dt, type, indexes) {
		if (type === "row") {
			var rowsData = table.rows(indexes).data();
			
			$.each(rowsData, function(index, value) {
				var inArray = $.inArray(value, selected);

				if (inArray !== -1) {
					selected.splice(inArray, 1);
				}
			});

			if (selected.length > 0) {
				$(".select-info .select-item:first", `${tableID}_info`).text(table.i18n('select.rows', table.i18n('select.rows._'), selected.length));
				table.button('deleteSelected:name').enable();
				table.button('deselectAll:name').enable();
			} else {
				table.button('deleteSelected:name').disable();
				table.button('deselectAll:name').disable();
				$(".select-info .select-item:first", `${tableID}_info`).text(table.i18n('select.rows.0'));
			}
		}
		return false;
	});
	} catch (err) {
		console.log(err);
		$(`${tableID}_loading`).LoadingOverlay('hide', true);
	}
}





//Modals
function initEdit(table, data) {
	var cloneContainer = $('#cloneContainer');
	var editModal = $('#editModal').clone().appendTo(cloneContainer);
	var modalBackdrop = $(".modal-backdrop").not('.fade');
	
	cloneContainer.empty();

	editModal.find('input[name="id"]').val(data["id"]);
	editModal.find('input[name="name"]').val(data["name"]);
	editModal.find('input[name="logo"]').val(data["logo"]);

	editModal.find('#editForm').submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($(this)[0].checkValidity() === false) {
			//Failed
			$(this).addClass('was-validated');
		} else {
			//Disable buttons
			$(this).find('button').attr('disabled', true);
			//Add loading indicator
			$(this).find('button[type="submit"]').empty().append("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='false'></span>");
			//Validated Successfully
			$(this).addClass('was-validated');
			//Disable close ('x') button
			$(this).parent().parent().find('button[aria-label="Close"]').attr('disabled', true);
			
			var form = $(this);
			var url = form.attr('action');
			var CSRFtoken = $("meta[name='_csrf']").attr("content");
			var CSRFheader = $("meta[name='_csrf_header']").attr("content");

			//Submit data to server and wait for response
			$.ajax({
				type: "PUT",
				url: url,
				data: form.serialize(),
				"headers": {
					"Access-Control-Allow-Origin": "*"
				},
				beforeSend: function(xhr) {
					if (CSRFheader != null && CSRFtoken != null)
						xhr.setRequestHeader(CSRFheader, CSRFtoken);
				},
				success: function(response) {
					editModal.modal('hide');

					table.clearPipeline().ajax.reload(null, false);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					editModal.modal('hide');

					table.clearPipeline().ajax.reload(null, false);
				}
			});
		}
		return false;
	});

	editModal.on('shown.bs.modal', function() {
		modalBackdrop.remove();
	});

	editModal.on('hide.bs.modal', function() {
		modalBackdrop.remove();
		editModal.off();
	});

	editModal.on('hidden.bs.modal', function() {
		cloneContainer.empty();
	});

	editModal.modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
}

function initAdd(table) {
	var cloneContainer = $('#cloneContainer');
	var addModal = $('#addModal').clone().appendTo(cloneContainer);
	var modalBackdrop = $(".modal-backdrop").not('.fade');
	
	cloneContainer.empty();

	addModal.find('#addForm').submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($(this)[0].checkValidity() === false) {
			$(this).addClass('was-validated');
		} else {
			$(this).find('button').attr('disabled', true);
			$(this).find('button[type="submit"]').empty().append("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='false'></span>");
			$(this).addClass('was-validated');
			$(this).parent().parent().find('button[aria-label="Close"]').attr('disabled', true);
			
			var form = $(this);
			var url = form.attr('action');
			var CSRFtoken = $("meta[name='_csrf']").attr("content");
			var CSRFheader = $("meta[name='_csrf_header']").attr("content");

			$.ajax({
				type: "POST",
				url: url,
				data: form.serialize(),
				"headers": {
					"Access-Control-Allow-Origin": "*"
				},
				beforeSend: function(xhr) {
					if (CSRFheader != null && CSRFtoken != null)
						xhr.setRequestHeader(CSRFheader, CSRFtoken);
				},
				success: function(response) {
					addModal.modal('hide');

					table.clearPipeline().ajax.reload(null, false);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					addModal.modal('hide');

					table.clearPipeline().ajax.reload(null, false);
				}
			});
		}
		return false;
	});

	addModal.on('shown.bs.modal', function() {
		modalBackdrop.remove();
	});

	addModal.on('hide.bs.modal', function() {
		modalBackdrop.remove();
		addModal.off();
	});

	addModal.on('hidden.bs.modal', function() {
		cloneContainer.empty();
	});

	addModal.modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
}

function initDelete(table, data) {
	var cloneContainer = $('#cloneContainer');
	var deleteModal = $('#deleteModal').clone().appendTo(cloneContainer);
	var modalBackdrop = $(".modal-backdrop").not('.fade');
	
	cloneContainer.empty();

	deleteModal.find('input[name="id"]').val(data["id"]);
	deleteModal.find('h4').append(`<p>Bạn có đồng ý xóa dữ liệu của id '${data["id"]}'?</p>`);

	deleteModal.find('#deleteForm').submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		$(this).find('button').attr('disabled', true);
		$(this).find('button[type="submit"]').empty().append("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='false'></span>");
		$(this).addClass('was-validated');
		$(this).parent().parent().find('button[aria-label="Close"]').attr('disabled', true);

		var form = $(this);
		var url = form.attr('action');
		var CSRFtoken = $("meta[name='_csrf']").attr("content");
		var CSRFheader = $("meta[name='_csrf_header']").attr("content");

		$.ajax({
			type: "DELETE",
			url: url,
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(data),
			"headers": {
				"Access-Control-Allow-Origin": "*"
			},
			beforeSend: function(xhr) {
				if (CSRFheader != null && CSRFtoken != null)
					xhr.setRequestHeader(CSRFheader, CSRFtoken);
			},
			success: function(response) {
				deleteModal.modal('hide');

				table.clearPipeline().ajax.reload();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				deleteModal.modal('hide');

				table.clearPipeline().ajax.reload();
			}
		});

		return false;
	});

	deleteModal.on('shown.bs.modal', function() {
		modalBackdrop.remove();
	});

	deleteModal.on('hide.bs.modal', function() {
		modalBackdrop.remove();
		deleteModal.off();
	});

	deleteModal.on('hidden.bs.modal', function() {
		$('.cloneContainer').empty();
	});

	deleteModal.modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
}

function initDeleteSelected(table, selected) {
	var cloneContainer = $('#cloneContainer');
	var bulkDeleteModal = $('#bulkDeleteModal').clone().appendTo(cloneContainer);
	var modalBackdrop = $(".modal-backdrop").not('.fade');
	
	cloneContainer.empty();
	
	var selectMessage = "";
	
	for(var i=0; i<selected.length; i++) {
		selectMessage += selected[i].name + "<br />";
	}

	bulkDeleteModal.find('h4').append(`Bạn có đồng ý xóa các môn sau: `).after(`<p>${selectMessage}</p>`);

	bulkDeleteModal.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		if (selected.length > 0) {
			
			$(this).find('button').attr('disabled', true);
			$(this).find('button[type="submit"]').empty().append("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='false'></span>");
			$(this).addClass('was-validated');
			$(this).parent().parent().find('button[aria-label="Close"]').attr('disabled', true);

			var form = $(this);
			var url = form.attr('action');
			var CSRFtoken = $("meta[name='_csrf']").attr("content");
			var CSRFheader = $("meta[name='_csrf_header']").attr("content");
			
			$.ajax({
				type: "DELETE",
				url: url,
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(selected),
				"headers": {
					"Access-Control-Allow-Origin": "*"
				},
				beforeSend: function(xhr) {
					if (CSRFheader != null && CSRFtoken != null)
						xhr.setRequestHeader(CSRFheader, CSRFtoken);
				},
				success: function(response) {
					bulkDeleteModal.modal('hide');
					
					table.button( 'deselectAll:name' ).trigger();
					
					table.clearPipeline().ajax.reload();
				},
				error: function(xhr, ajaxOptions, thrownError) {
					bulkDeleteModal.modal('hide');

					table.clearPipeline().ajax.reload();
				}
			});
		} else {
			alert("No row selected!");
		}
		return false;
	});

	bulkDeleteModal.on('shown.bs.modal', function() {
		modalBackdrop.remove();
	});

	bulkDeleteModal.on('hide.bs.modal', function() {
		modalBackdrop.remove();
		bulkDeleteModal.off();
	});

	bulkDeleteModal.on('hidden.bs.modal', function() {
		$('.cloneContainer').empty();
	});

	bulkDeleteModal.modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
}

function columns() {
	return [{
		"data": "id",
		"name": "id",
		"className": "text-center",
		"title": "ID",
		render: $.fn.dataTable.render.text()
	},
	{
		"data": "name",
		"name": "name",
		"className": "text-center",
		"title": "Name",
		render: $.fn.dataTable.render.text()
	},
	{
		"data": "logo",
		"name": "logo",
		"className": "text-center",
		"title": "Logo",
		render: $.fn.dataTable.render.text()
	},
	{
		"data": null,
		"name": null,
		"title": "Action",
		"className": "text-center",
		"orderable": false,
		"searchable": false,
		"defaultContent": '<button type="button" class="btn btn-primary viewBtn mr-2"><i class="fas fa-eye"></i></button>' +
			'<button type="button" class="btn btn-info editBtn mr-2"><i class="fas fa-edit"></i></button>' +
			'<button type="button" class="btn btn-danger deleteBtn"><i class="far fa-trash-alt"></i></button>'
	}
	];
}

function language(lang) {
	if (lang === "vi-VN") {
		return {
			"decimal": ".",
			"emptyTable": "Bảng hiện không có dữ liệu",
			"info": "Hiển thị _START_ đến _END_ mục trong tổng số _TOTAL_ mục",
			"infoEmpty": "Bảng hiện không có dữ liệu",
			"infoFiltered": "(Đã lọc trong tổng số _MAX_ mục)",
			"infoPostFix": "",
			"thousands": ",",
			"lengthMenu": "Hiện _MENU_ mục",
			"loadingRecords": "<div class='spinner-border text-primary' role='status'></div>",
			"processing": "<div class='spinner-border text-primary' role='status'></div>",
			"search": "Tìm kiếm:",
			"zeroRecords": "Không có kết quả mà bạn cần tìm",
			"paginate": {
				"first": "Đầu",
				"last": "Cuối",
				"next": "Tiếp",
				"previous": "Trước"
			},
			"aria": {
				"sortAscending": ": Sắp xếp cột theo thứ tự tăng dần",
				"sortDescending": ": Sắp xếp cột theo thứ tự giảm dần"
			},
			"buttons": {
				'selectNone': "Bỏ chọn tất cả",
				'addBtn': "Thêm",
				'deleteSelected': "Xóa các mục đã chọn"
			},
			select: {
				rows: {
					_: "%d mục đã được chọn",
					0: "Chưa mục nào được chọn"
				}
			},
			searchTooltip: "Nhấn ENTER để tìm kiếm. Bỏ trống ô và click chuột ra ngoài để bỏ tìm kiếm"
		};
	} else if (lang === "en-US") {
		return {
			"decimal": "",
			"emptyTable": "No data available in table",
			"info": "Showing _START_ to _END_ of _TOTAL_ entries",
			"infoEmpty": "Showing 0 to 0 of 0 entries",
			"infoFiltered": "(filtered from _MAX_ total entries)",
			"infoPostFix": "",
			"thousands": ",",
			"lengthMenu": "Show _MENU_ entries",
			"loadingRecords": "<div class='spinner-border text-primary' role='status'></div>",
			"processing": "<div class='spinner-border text-primary' role='status'></div>",
			"search": "Search:",
			"zeroRecords": "No matching records found",
			"paginate": {
				"first": "First",
				"last": "Last",
				"next": "Next",
				"previous": "Previous"
			},
			"aria": {
				"sortAscending": ": activate to sort column ascending",
				"sortDescending": ": activate to sort column descending"
			},
			"buttons": {
				'selectNone': "Deselect all",
				'addBtn': 'Add',
				'deleteSelected': "Delete selected entry"
			},
			select: {
				rows: {
					_: "%d entries selected",
					0: "No entry selected",
					1: "1 entry selected"
				}
			},
			searchTooltip: "Press ENTER to search. Leave input empty and click outside to cancel search"
		};
	}

}