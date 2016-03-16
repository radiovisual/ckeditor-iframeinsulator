/* eslint-disable no-undef, new-cap  */

CKEDITOR.plugins.add('iframeinsulator', {
	// Important: icon file must match the button name, in lowercase
	icons: 'iframeinsulator',
	init: function (editor) {
		// add the iframe-insulator styles to the editor
		editor.addContentsCss(this.path + 'css/editor.css');

		editor.addCommand('iframeinsulator', new CKEDITOR.dialogCommand('iframeinsulatorDialog'));

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

// IMPORTANT!
// Remember to add your new plugin to your ckeditor configuration with:
// config.extraPlugins = 'iframeinsulator';

// Because we are creating content, we also need:
// config.allowedContent = true;

// Lastly, make sure that the `iframe` plugin is disabled
// CKEDITOR.config.removePlugins = 'iframe,div';

