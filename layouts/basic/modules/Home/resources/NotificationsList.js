/* {[The file is published on the basis of YetiForce Public License that can be found in the following directory: licenses/License.html]} */
jQuery.Class("Home_NotificationsList_Js", {
	setAsMarked: function (id) {
		var thisInstance = this;
		var params = {
			module: app.getModuleName(),
			action: 'Notification',
			mode: 'setMark',
			id: id
		}
		AppConnector.request(params).then(function (data) {
			var row = $('.noticeRow[data-id="' + id + '"]');
			Vtiger_Helper_Js.showPnotify({
				title: app.vtranslate('JS_MESSAGE'),
				text: app.vtranslate('JS_MARKED_AS_READ'),
				type: 'info'
			});
			if (data.result == 'hide') {
				row.fadeOut(300, function () {
					row.remove();
					thisInstance.checkHiddenBlock();
				});
			}
			var badge = $(".notificationsNotice .badge");
			var number = parseInt(badge.text()) - 1;
			if (number > 0) {
				badge.text(number);
			} else {
				badge.text('');
			}
		});
	},
	checkHiddenBlock: function () {
		var thisInstance = this;
		$(".notificationEntries").each(function (index) {
			var block = $(this);
			if (block.find(".noticeRow").length == 0) {
				block.closest('.panel').hide();
			}
		});
	},
}, {
	jstreeInstance: false,
	registerButtons: function () {
		var thisInstance = this;
		$('.notificationConf').on('click', function () {
			var progress = jQuery.progressIndicator();
			var url = 'index.php?module=' + app.getModuleName() + '&view=NotificationConfig';
			app.showModalWindow(null, url, function (container) {
				progress.progressIndicator({'mode': 'hide'});
				thisInstance.registerEventForModal(container);
			});
		});
		this.registerNotifications();
	},
	registerEventForModal: function (container) {
		app.showBtnSwitch(container.find('.switchBtn'));
		app.showPopoverElementView(container.find('.infoPopover'));
		container.on('switchChange.bootstrapSwitch', '.sendNotificationsSwitch', function (e, state) {
			if (state) {
				container.find('.schedule').removeClass('hide');
			} else {
				container.find('.schedule').addClass('hide');
			}
		});
		container.find('[name="saveButton"]').on('click', function () {
			var selectedModules = [];
			container.find('.watchingModule').each(function () {
				var currentTarget = $(this);
				if (currentTarget.is(':checked')) {
					selectedModules.push(currentTarget.data('nameModule'));
				}
			});
			var params = {
				module: app.getModuleName(),
				action: 'Notification',
				mode: 'saveWatchingModules',
				selctedModules: selectedModules,
				sendNotifications: container.find('.sendNotificationsSwitch').prop('checked') ? 1 : 0,
				frequency: container.find('select[name="frequency"]').val()
			};
			var progress = jQuery.progressIndicator();
			AppConnector.request(params).then(function (data) {
				progress.progressIndicator({'mode': 'hide'});
				app.hideModalWindow();
			});
		});
		container.find('.selectAllModules').on('click', function () {
			if ($(this).is(':checked')) {
				var value = true;
			} else {
				var value = false;
			}
			container.find('.watchingModule').each(function () {
				$(this).prop("checked", value);
			});
		});
	},
	registerNotifications: function () {
		var thisInstance = this;
		$(".notificationsNotice .sendNotification").click(function (e) {
			var modalWindowParams = {
				url: 'index.php?module=Home&view=CreateNotificationModal',
				id: 'CreateNotificationModal',
				cb: function (container) {
					var form, text, link, htmlLink;
					text = container.find('#notificationMessage');
					form = container.find('form');
					container.find('#notificationTitle').val(app.getPageTitle());
					link = $("<a/>", {
						name: "link",
						href: window.location.href,
						text: app.vtranslate('JS_NOTIFICATION_LINK')
					});
					htmlLink = $('<div>').append(link.clone()).html();
					text.val('<br/><hr/>' + htmlLink);
					var ckEditorInstance = new Vtiger_CkEditor_Js();
					ckEditorInstance.loadCkEditor(text);
					container.find(".externalMail").click(function (e) {
						if (form.validationEngine('validate')) {
							var editor = CKEDITOR.instances.notificationMessage;
							var text = $('<div>' + editor.getData() + '</div>');
							text.find("a[href]").each(function (i, el) {
								var href = $(this);
								href.text(href.attr('href'));
							});
							var emails = [];
							container.find("#notificationUsers option:selected").each(function (index) {
								emails.push($(this).data('mail'))
							});
							$(this).attr('href', 'mailto:' + emails.join() + '?subject=' + encodeURIComponent(container.find("#notificationTitle").val()) + '&body=' + encodeURIComponent(text.text()))
							app.hideModalWindow(container, 'CreateNotificationModal');
						} else {
							e.preventDefault();
						}
					});
					container.find('[type="submit"]').click(function (e) {
						var element = $(this);
						form.find('[name="mode"]').val(element.data('mode'));
					});
					form.submit(function (e) {
						if (form.validationEngine('validate')) {
							app.hideModalWindow(container, 'CreateNotificationModal');
						}
					});
				},
			}
			app.showModalWindow(modalWindowParams);
		})
	},
	loadNotification: function (types) {
		var thisInstance = this;
		var params = {
			module: app.getModuleName(),
			view: app.getViewName(),
			types: types,
		};
		var progress = jQuery.progressIndicator();
		AppConnector.request(params).then(function (data) {
			$('.notificationContainer').html(data);
			progress.progressIndicator({'mode': 'hide'});
			app.registerDataTables($('.notificationTable'));
		});
	},
	registerJstreeEvents: function () {
		var thisInstance = this;
		var selectedTypes = app.moduleCacheGet('selectedTypesNotifications');
		selectedTypes = JSON.parse(selectedTypes);
		thisInstance.jstreeInstance.on('loaded.jstree', function (event, data) {
			if(selectedTypes == null){
				thisInstance.jstreeInstance.jstree('select_all');
			} else {
				data.instance.select_node(selectedTypes);
			}
			thisInstance.jstreeInstance.on('changed.jstree', function (e, data) {
				var selectedElements = thisInstance.jstreeInstance.jstree("get_selected", true);
				var selectedIds = [];
				var selectedOriginalIds = [];
				$.each(selectedElements, function () {
					selectedIds.push(this.original.record_id);
					selectedOriginalIds.push(this.id);
				});
				app.moduleCacheSet('selectedTypesNotifications', JSON.stringify(selectedOriginalIds));
				thisInstance.loadNotification(selectedIds);
			});
		});
	},
	registerJstree: function () {
		var container = $('.siteBarContent ');
		var data = container.find('[name="notificationTypes"]').val();
		this.jstreeInstance = container.find('#jstreeContainer');
		this.jstreeInstance.jstree({
			core: {
				data: JSON.parse(data),
				themes: {
					name: 'proton',
					responsive: true
				}
			},
			plugins: ['checkbox']
		});
		this.registerJstreeEvents();
	},
	registerEvents: function () {
		this.registerButtons();
		this.registerJstree();
		app.registerDataTables($('.notificationTable'));
	}
});
