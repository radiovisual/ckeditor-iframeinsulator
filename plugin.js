/* eslint-disable no-undef, new-cap  */

// Force required settings on your CKEditor environment
// This should normally be done in your own configuration file
CKEDITOR.config.allowedContent = true;
CKEDITOR.title = false;
CKEDITOR.config.enterMode = 2;
CKEDITOR.config.removePlugins = 'iframe,div,stylesheetparser';

// for troubleshooting
console.log('CKEDITOR (iframeinsulator)', CKEDITOR);

CKEDITOR.plugins.add('iframeinsulator', {
	// Important: icon file must match the button name, in lowercase
	icons: 'iframeinsulator',
	init: function (editor) {
		// add the iframe-insulator styles to the editor
		editor.addContentsCss(this.path + 'css/editor.css');

		editor.addCommand('iframeinsulator', new CKEDITOR.dialogCommand('iframeinsulatorDialog', {
			allowedContent: 'div{*}(*); iframe{*}[!width,!height,!src,!frameborder,!allowfullscreen]; object param[*]; a[*]; img[*]'
		}));

		editor.ui.addButton('Iframeinsulator', {
			label: 'Embed Media',
			command: 'iframeinsulator',
			toolbar: 'insert'
		});

		// Tell the editor to load the dialog file when the button is clicked.
		CKEDITOR.dialog.add('iframeinsulatorDialog', this.path + 'dialogs/iframeinsulator.js');

		// load the context menu
		if (editor.contextMenu) {
			// separate your context menu from others by putting it in its own group
			editor.addMenuGroup('iframeinsulatorGroup');
			editor.addMenuItem('iframeinsulatorItem', {
				label: 'Edit Embed',
				icon: this.path + 'icons/iframeinsulator.png',
				command: 'iframeinsulator',
				group: 'iframeinsulatorGroup'
			});

			// add an event listener function that will be called whenever the context menu is fired.
			editor.contextMenu.addListener(function (element) {
				var div = element.getAscendant('div', true);
				if (div && div.hasClass('iframe-insulator')) {
					return {iframeinsulatorItem: CKEDITOR.TRISTATE_OFF};
				}
				return false;
			});
		}
	}
});
