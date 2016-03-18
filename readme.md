# ckeditor-iframeinsulator

> Insulate ckeditor iframes with a contextMenu-friendly div

This plugin works as a simple embed plugin, with a twist: it wraps all iframe embeds with a div tag. This means that even
iframes that hijack the right-click (I'm looking at you, youtube) can have ckeditor contextMenus attached to them. 

**Tip:** This plugin works seamlessly with [ckeditor-metadata](https://github.com/radiovisual/ckeditor-metadata).

## Installation

- Copy the metadata plugin files to your CKEditor's plugin folder:
    ```
    ckeditor/plugins/
    ```
- Add the plugin to the CKEDITOR configuration:  
    ```js
    CKEDITOR.config.extraPlugins = 'iframeinsulator';
    ```
- Ensure that this plugin can create content:  
    ```js
    CKEDITOR.config.allowedContent = true;
    ```
- For best results, disable the default `iframe` plugin:  
    ```js
    CKEDITOR.config.removePlugins = 'iframe';
    ```

## Usage

Once installed, you can use the new Embed Media button in the Insert toolbar

![toolbar screenshot](media/screenshot-toolbar.png)

Or, right-click the "pinstripe" area to access the "Edit Embed" Context Menu. The pinstripes are only shown in the editor 
pane to help you see your iframe area. This is what makes it possible to attach contextMenus to iframes that hijack the right-click,
because the right-click is technically attached to the iframe's insulating div. 

![screenshot](media/screenshot-context.png)

## Notes

This plugin wraps your iframe embeds with a div that looks like this:

```html
<div class="iframe-insulator">
    <iframe>...</iframe>
</div>
```

No styles are attached to the `div.iframe-insulator` outside of the editor, so you are free to style it however you like,
or ignore it all together. 

## License

MIT @ [Michael Wuergler](http://numetriclabs.com)
