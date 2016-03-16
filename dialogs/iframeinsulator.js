/* eslint-disable no-undef, array-callback-return  */

CKEDITOR.dialog.add('iframeinsulatorDialog', function (editor) {
	// extract attributes from the supplied iframe HTML
	// returns an object with the keys and values.
	function extractAttributes(iframeMarkup) {
		var o = {};

		var elements = $(iframeMarkup);
		var attributes = elements[0].attributes;

		Object.keys(attributes).map(function (key) {
			o[attributes[key].name] = attributes[key].value;
		});

		return o;
	}

	return {
		title: 'Embed Media',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				label: 'Embed Settings',
				elements: [{
					type: 'textarea',
					id: 'embedMarkup',
					label: 'Embed Code',
					validate: CKEDITOR.dialog.validate.notEmpty('Embed cannot be empty.'),
					setup: function (element) {
						var containingElement = element.$.firstElementChild;

						if (containingElement && containingElement.localName === 'iframe') {
							this.setValue(containingElement.outerHTML);
						}
					}
				}]
			}
		],
		onShow: function () {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			this.insertMode = false;

			if (!element || !element.hasClass('iframe-insulator')) {
				element = editor.document.createElement('div');
				this.insertMode = true;
			}

			this.element = element;

			if (this.insertMode === false) {
				this.setupContent(element);
			}
		},
		onOk: function () {
			var dialog = this;
			var element = dialog.element;

			dialog.commitContent(element);

			// the iframe html from embedMarkup
			var embedIframe = CKEDITOR.dom.element.createFromHtml(dialog.getValueOf('tab-basic', 'embedMarkup'));

			if (dialog.insertMode) {
				element.setAttribute('class', 'iframe-insulator');
				embedIframe.appendTo(element);
				editor.insertElement(element);
			} else {
				// just update the embed markup that is currently in the editor
				var currentIframe = element.getFirst();

				// only update if we are working on an iframe
				if (currentIframe && currentIframe.getName() === 'iframe') {
					// get a list of attributes on the current iframe (in the editor)
					var currentAttributes = extractAttributes(currentIframe.getOuterHtml());

					// get a list of attributes on the new iframe (the dialog's embedMarkup)
					var newAttributes = extractAttributes(embedIframe.getOuterHtml());

					// first remove all current attributes
					Object.keys(currentAttributes).map(function (key) {
						currentIframe.removeAttribute(key);
					});

					// now copy the new attributes from embedMarkup to the current embedIframe
					Object.keys(newAttributes).map(function (key) {
						currentIframe.setAttribute(key, newAttributes[key]);
					});
				} else {
					console.log('ignoring non-iframe element:', currentIframe.getName());
				}
			}
		}
	};
});
