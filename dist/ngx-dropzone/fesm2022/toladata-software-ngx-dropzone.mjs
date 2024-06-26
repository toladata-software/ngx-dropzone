import * as i0 from '@angular/core';
import { Directive, Component, EventEmitter, Input, Output, HostListener, HostBinding, Injectable, Self, ContentChildren, ViewChild, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/platform-browser';

class NgxDropzoneLabelDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneLabelDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneLabelDirective, selector: "ngx-dropzone-label", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneLabelDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ngx-dropzone-label'
                }]
        }] });

/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * Taken from https://github.com/angular/components/blob/master/src/cdk/coercion/boolean-property.ts
 */
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}
/**
 * Whether the provided value is considered a number.
 * Taken from https://github.com/angular/components/blob/master/src/cdk/coercion/number-property.ts
 */
function coerceNumberProperty(value) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return (!isNaN(parseFloat(value)) && !isNaN(Number(value))) ? Number(value) : null;
}

class NgxDropzoneRemoveBadgeComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneRemoveBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge", ngImport: i0, template: `
    <svg>
      <line x1="0" y1="0" x2="10" y2="10" />
      <line x1="0" y1="10" x2="10" y2="0" />
    </svg>
  `, isInline: true, styles: [":host{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}:host:hover{background:#aeaeae}:host>svg{height:10px;width:10px}:host>svg>line{stroke-width:2px;stroke:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneRemoveBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone-remove-badge', template: `
    <svg>
      <line x1="0" y1="0" x2="10" y2="10" />
      <line x1="0" y1="10" x2="10" y2="0" />
    </svg>
  `, styles: [":host{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}:host:hover{background:#aeaeae}:host>svg{height:10px;width:10px}:host>svg>line{stroke-width:2px;stroke:#fff}\n"] }]
        }] });

var KEY_CODE;
(function (KEY_CODE) {
    KEY_CODE[KEY_CODE["BACKSPACE"] = 8] = "BACKSPACE";
    KEY_CODE[KEY_CODE["DELETE"] = 46] = "DELETE";
})(KEY_CODE || (KEY_CODE = {}));
class NgxDropzonePreviewComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this._removable = false;
        /** Emitted when the element should be removed. */
        this.removed = new EventEmitter();
        /** Make the preview item focusable using the tab key. */
        this.tabIndex = 0;
    }
    /** The file to preview. */
    set file(value) { this._file = value; }
    get file() { return this._file; }
    /** Allow the user to remove files. */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    keyEvent(event) {
        switch (event.keyCode) {
            case KEY_CODE.BACKSPACE:
            case KEY_CODE.DELETE:
                this.remove();
                break;
            default:
                break;
        }
    }
    /** We use the HostBinding to pass these common styles to child components. */
    get hostStyle() {
        const styles = `
			display: flex;
			height: 140px;
			min-height: 140px;
			min-width: 180px;
			max-width: 180px;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
			margin: 10px;
			border-radius: 5px;
			position: relative;
		`;
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /** Remove method to be used from the template. */
    _remove(event) {
        event.stopPropagation();
        this.remove();
    }
    /** Remove the preview item (use from component code). */
    remove() {
        if (this._removable) {
            this.removed.next(this.file);
        }
    }
    async readFile() {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => {
                resolve(e.target.result);
            };
            reader.onerror = e => {
                console.error(`FileReader failed on file ${this.file.name}.`);
                reject(e);
            };
            if (!this.file) {
                return reject('No file to read. Please provide a file using the [file] Input property.');
            }
            reader.readAsDataURL(this.file);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzonePreviewComponent, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzonePreviewComponent, selector: "ngx-dropzone-preview", inputs: { file: "file", removable: "removable" }, outputs: { removed: "removed" }, host: { listeners: { "keyup": "keyEvent($event)" }, properties: { "style": "this.hostStyle", "tabindex": "this.tabIndex" } }, ngImport: i0, template: `
		<ng-content select="ngx-dropzone-label"></ng-content>
		<ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
		</ngx-dropzone-remove-badge>
	`, isInline: true, styles: [":host{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host:hover,:host:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host ::ng-deep ngx-dropzone-label{overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzonePreviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone-preview', template: `
		<ng-content select="ngx-dropzone-label"></ng-content>
		<ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
		</ngx-dropzone-remove-badge>
	`, styles: [":host{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host:hover,:host:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host ::ng-deep ngx-dropzone-label{overflow-wrap:break-word}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { file: [{
                type: Input
            }], removable: [{
                type: Input
            }], removed: [{
                type: Output
            }], keyEvent: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], hostStyle: [{
                type: HostBinding,
                args: ['style']
            }], tabIndex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });

/**
 * This service contains the filtering logic to be applied to
 * any dropped or selected file. If a file matches all criteria
 * like maximum size or accept type, it will be emitted in the
 * addedFiles array, otherwise in the rejectedFiles array.
 */
class NgxDropzoneService {
    parseFileList(files, accept, maxFileSize, multiple) {
        const addedFiles = [];
        const rejectedFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (!this.isAccepted(file, accept)) {
                this.rejectFile(rejectedFiles, file, 'type');
                continue;
            }
            if (maxFileSize && file.size > maxFileSize) {
                this.rejectFile(rejectedFiles, file, 'size');
                continue;
            }
            if (!multiple && addedFiles.length >= 1) {
                this.rejectFile(rejectedFiles, file, 'no_multiple');
                continue;
            }
            addedFiles.push(file);
        }
        const result = {
            addedFiles,
            rejectedFiles
        };
        return result;
    }
    isAccepted(file, accept) {
        if (accept === '*') {
            return true;
        }
        const acceptFiletypes = accept.split(',').map(it => it.toLowerCase().trim());
        const filetype = file.type.toLowerCase();
        const filename = file.name.toLowerCase();
        const matchedFileType = acceptFiletypes.find(acceptFiletype => {
            // check for wildcard mimetype (e.g. image/*)
            if (acceptFiletype.endsWith('/*')) {
                return filetype.split('/')[0] === acceptFiletype.split('/')[0];
            }
            // check for file extension (e.g. .csv)
            if (acceptFiletype.startsWith(".")) {
                return filename.endsWith(acceptFiletype);
            }
            // check for exact mimetype match (e.g. image/jpeg)
            return acceptFiletype == filetype;
        });
        return !!matchedFileType;
    }
    rejectFile(rejectedFiles, file, reason) {
        const rejectedFile = file;
        rejectedFile.reason = reason;
        rejectedFiles.push(rejectedFile);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneService, decorators: [{
            type: Injectable
        }] });

class NgxDropzoneComponent {
    constructor(service) {
        this.service = service;
        /** Emitted when any files were added or rejected. */
        this.change = new EventEmitter();
        /** Set the accepted file types. Defaults to '*'. */
        this.accept = '*';
        this._disabled = false;
        this._multiple = true;
        this._maxFileSize = undefined;
        this._expandable = false;
        this._disableClick = false;
        this._processDirectoryDrop = false;
        this._isHovered = false;
    }
    get _hasPreviews() {
        return !!this._previewChildren.length;
    }
    /** Disable any user interaction with the component. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this._isHovered) {
            this._isHovered = false;
        }
    }
    /** Allow the selection of multiple files. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Set the maximum size a single file may have. */
    get maxFileSize() {
        return this._maxFileSize;
    }
    set maxFileSize(value) {
        this._maxFileSize = coerceNumberProperty(value);
    }
    /** Allow the dropzone container to expand vertically. */
    get expandable() {
        return this._expandable;
    }
    set expandable(value) {
        this._expandable = coerceBooleanProperty(value);
    }
    /** Open the file selector on click. */
    get disableClick() {
        return this._disableClick;
    }
    set disableClick(value) {
        this._disableClick = coerceBooleanProperty(value);
    }
    /** Allow dropping directories. */
    get processDirectoryDrop() {
        return this._processDirectoryDrop;
    }
    set processDirectoryDrop(value) {
        this._processDirectoryDrop = coerceBooleanProperty(value);
    }
    /** Show the native OS file explorer to select files. */
    _onClick() {
        if (!this.disableClick) {
            this.showFileSelector();
        }
    }
    _onDragOver(event) {
        if (this.disabled) {
            return;
        }
        this.preventDefault(event);
        this._isHovered = true;
    }
    _onDragLeave() {
        this._isHovered = false;
    }
    _onDrop(event) {
        if (this.disabled) {
            return;
        }
        this.preventDefault(event);
        this._isHovered = false;
        // if processDirectoryDrop is not enabled or webkitGetAsEntry is not supported we handle the drop as usual
        if (!this.processDirectoryDrop || !DataTransferItem.prototype.webkitGetAsEntry) {
            this.handleFileDrop(event.dataTransfer.files);
            // if processDirectoryDrop is enabled and webkitGetAsEntry is supported we can extract files from a dropped directory
        }
        else {
            const droppedItems = event.dataTransfer.items;
            if (droppedItems.length > 0) {
                const droppedFiles = [];
                const droppedDirectories = [];
                // seperate dropped files from dropped directories for easier handling
                for (let i = 0; i < droppedItems.length; i++) {
                    const entry = droppedItems[i].webkitGetAsEntry();
                    if (entry.isFile) {
                        droppedFiles.push(event.dataTransfer.files[i]);
                    }
                    else if (entry.isDirectory) {
                        droppedDirectories.push(entry);
                    }
                }
                // create a DataTransfer
                const droppedFilesList = new DataTransfer();
                droppedFiles.forEach((droppedFile) => {
                    droppedFilesList.items.add(droppedFile);
                });
                // if no directory is dropped we are done and can call handleFileDrop
                if (!droppedDirectories.length && droppedFilesList.items.length) {
                    this.handleFileDrop(droppedFilesList.files);
                }
                // if directories are dropped we extract the files from these directories one-by-one and add it to droppedFilesList
                if (droppedDirectories.length) {
                    const extractFilesFromDirectoryCalls = [];
                    for (const droppedDirectory of droppedDirectories) {
                        extractFilesFromDirectoryCalls.push(this.extractFilesFromDirectory(droppedDirectory));
                    }
                    // wait for all directories to be proccessed to add the extracted files afterwards
                    Promise.all(extractFilesFromDirectoryCalls).then((allExtractedFiles) => {
                        allExtractedFiles.reduce((a, b) => [...a, ...b]).forEach((extractedFile) => {
                            droppedFilesList.items.add(extractedFile);
                        });
                        this.handleFileDrop(droppedFilesList.files);
                    });
                }
            }
        }
    }
    extractFilesFromDirectory(directory) {
        async function getFileFromFileEntry(fileEntry) {
            try {
                return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
            }
            catch (err) {
                console.log('Error converting a fileEntry to a File: ', err);
            }
        }
        return new Promise((resolve, reject) => {
            const files = [];
            const dirReader = directory.createReader();
            // we need this to be a recursion because of this issue: https://bugs.chromium.org/p/chromium/issues/detail?id=514087
            const readEntries = () => {
                dirReader.readEntries(async (dirItems) => {
                    if (!dirItems.length) {
                        resolve(files);
                    }
                    else {
                        const fileEntries = dirItems.filter((dirItem) => dirItem.isFile);
                        for (const fileEntry of fileEntries) {
                            const file = await getFileFromFileEntry(fileEntry);
                            files.push(file);
                        }
                        readEntries();
                    }
                });
            };
            readEntries();
        });
    }
    showFileSelector() {
        if (!this.disabled) {
            this._fileInput.nativeElement.click();
        }
    }
    _onFilesSelected(event) {
        const files = event.target.files;
        this.handleFileDrop(files);
        // Reset the native file input element to allow selecting the same file again
        this._fileInput.nativeElement.value = '';
        // fix(#32): Prevent the default event behaviour which caused the change event to emit twice.
        this.preventDefault(event);
    }
    handleFileDrop(files) {
        const result = this.service.parseFileList(files, this.accept, this.maxFileSize, this.multiple);
        this.change.next({
            addedFiles: result.addedFiles,
            rejectedFiles: result.rejectedFiles,
            source: this
        });
    }
    preventDefault(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneComponent, deps: [{ token: NgxDropzoneService, self: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneComponent, selector: "ngx-dropzone, [ngx-dropzone]", inputs: { accept: "accept", disabled: "disabled", multiple: "multiple", maxFileSize: "maxFileSize", expandable: "expandable", disableClick: "disableClick", processDirectoryDrop: "processDirectoryDrop", id: "id", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedBy: ["aria-describedby", "ariaDescribedBy"] }, outputs: { change: "change" }, host: { listeners: { "click": "_onClick()", "dragover": "_onDragOver($event)", "dragleave": "_onDragLeave()", "drop": "_onDrop($event)" }, properties: { "class.ngx-dz-disabled": "this.disabled", "class.expandable": "this.expandable", "class.unclickable": "this.disableClick", "class.ngx-dz-hovered": "this._isHovered" } }, providers: [NgxDropzoneService], queries: [{ propertyName: "_previewChildren", predicate: NgxDropzonePreviewComponent, descendants: true }], viewQueries: [{ propertyName: "_fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }], ngImport: i0, template: "<input #fileInput type=\"file\" [id]=\"id\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\"\n  (change)=\"_onFilesSelected($event)\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\"\n  [attr.aria-describedby]=\"ariaDescribedBy\">\n<ng-content select=\"ngx-dropzone-label\" *ngIf=\"!_hasPreviews\"></ng-content>\n<ng-content select=\"ngx-dropzone-preview\"></ng-content>\n<ng-content></ng-content>\n", styles: [":host{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}:host.ngx-dz-hovered{border-style:solid}:host.ngx-dz-disabled{opacity:.5;cursor:no-drop;pointer-events:none}:host.expandable{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}:host.unclickable{cursor:default}:host ::ng-deep ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}:host input{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host input:focus+::ng-deep ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone, [ngx-dropzone]', providers: [NgxDropzoneService], template: "<input #fileInput type=\"file\" [id]=\"id\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\"\n  (change)=\"_onFilesSelected($event)\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\"\n  [attr.aria-describedby]=\"ariaDescribedBy\">\n<ng-content select=\"ngx-dropzone-label\" *ngIf=\"!_hasPreviews\"></ng-content>\n<ng-content select=\"ngx-dropzone-preview\"></ng-content>\n<ng-content></ng-content>\n", styles: [":host{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}:host.ngx-dz-hovered{border-style:solid}:host.ngx-dz-disabled{opacity:.5;cursor:no-drop;pointer-events:none}:host.expandable{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}:host.unclickable{cursor:default}:host ::ng-deep ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}:host input{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host input:focus+::ng-deep ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}\n"] }]
        }], ctorParameters: () => [{ type: NgxDropzoneService, decorators: [{
                    type: Self
                }] }], propDecorators: { _previewChildren: [{
                type: ContentChildren,
                args: [NgxDropzonePreviewComponent, { descendants: true }]
            }], _fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: true }]
            }], change: [{
                type: Output
            }], accept: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.ngx-dz-disabled']
            }], multiple: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], expandable: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.expandable']
            }], disableClick: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.unclickable']
            }], processDirectoryDrop: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], ariaDescribedBy: [{
                type: Input,
                args: ['aria-describedby']
            }], _isHovered: [{
                type: HostBinding,
                args: ['class.ngx-dz-hovered']
            }], _onClick: [{
                type: HostListener,
                args: ['click']
            }], _onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], _onDragLeave: [{
                type: HostListener,
                args: ['dragleave']
            }], _onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });

class NgxDropzoneImagePreviewComponent extends NgxDropzonePreviewComponent {
    constructor(sanitizer) {
        super(sanitizer);
        /** The image data source. */
        this.defaultImgLoading = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiByZ2IoMjQxLCAyNDIsIDI0Mykgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIyNHB4IiBoZWlnaHQ9IjIyNHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2U9IiM4NWEyYjYiIHN0cm9rZS1kYXNoYXJyYXk9IjIxLjk5MTE0ODU3NTEyODU1MiAyMS45OTExNDg1NzUxMjg1NTIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGR1cj0iMS4xNjI3OTA2OTc2NzQ0MTg0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZT0iI2JiY2VkZCIgc3Ryb2tlLWRhc2hhcnJheT0iMTUuNzA3OTYzMjY3OTQ4OTY2IDE1LjcwNzk2MzI2Nzk0ODk2NiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE1LjcwNzk2MzI2Nzk0ODk2NiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxLjE2Mjc5MDY5NzY3NDQxODRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOy0zNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==';
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(this.defaultImgLoading);
    }
    /** The file to preview. */
    set file(value) {
        this._file = value;
        this.renderImage();
    }
    get file() { return this._file; }
    ngOnInit() {
        this.renderImage();
    }
    renderImage() {
        this.readFile()
            .then(img => setTimeout(() => this.imageSrc = img))
            .catch(err => console.error(err));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneImagePreviewComponent, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneImagePreviewComponent, selector: "ngx-dropzone-image-preview", inputs: { file: "file" }, providers: [
            {
                provide: NgxDropzonePreviewComponent,
                useExisting: NgxDropzoneImagePreviewComponent
            }
        ], usesInheritance: true, ngImport: i0, template: `
    <img [src]="imageSrc" />
		<ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`, isInline: true, styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover img,:host:focus img{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host img{max-height:100%;border-radius:5px;opacity:.8}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneImagePreviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone-image-preview', template: `
    <img [src]="imageSrc" />
		<ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`, providers: [
                        {
                            provide: NgxDropzonePreviewComponent,
                            useExisting: NgxDropzoneImagePreviewComponent
                        }
                    ], styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover img,:host:focus img{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host img{max-height:100%;border-radius:5px;opacity:.8}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { file: [{
                type: Input
            }] } });

class NgxDropzoneVideoPreviewComponent extends NgxDropzonePreviewComponent {
    constructor(sanitizer) {
        super(sanitizer);
    }
    ngOnInit() {
        if (!this.file) {
            console.error('No file to read. Please provide a file using the [file] Input property.');
            return;
        }
        /**
         * We sanitize the URL here to enable the preview.
         * Please note that this could cause security issues!
         **/
        this.videoSrc = URL.createObjectURL(this.file);
        this.sanitizedVideoSrc = this.sanitizer.bypassSecurityTrustUrl(this.videoSrc);
    }
    ngOnDestroy() {
        URL.revokeObjectURL(this.videoSrc);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneVideoPreviewComponent, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneVideoPreviewComponent, selector: "ngx-dropzone-video-preview", providers: [
            {
                provide: NgxDropzonePreviewComponent,
                useExisting: NgxDropzoneVideoPreviewComponent
            }
        ], usesInheritance: true, ngImport: i0, template: `
    <video *ngIf="sanitizedVideoSrc" controls (click)="$event.stopPropagation()">
      <source [src]="sanitizedVideoSrc" />
    </video>
    <ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`, isInline: true, styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover video,:host:focus video{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host video{max-height:100%;border-radius:5px}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneVideoPreviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone-video-preview', template: `
    <video *ngIf="sanitizedVideoSrc" controls (click)="$event.stopPropagation()">
      <source [src]="sanitizedVideoSrc" />
    </video>
    <ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`, providers: [
                        {
                            provide: NgxDropzonePreviewComponent,
                            useExisting: NgxDropzoneVideoPreviewComponent
                        }
                    ], styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover video,:host:focus video{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host video{max-height:100%;border-radius:5px}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }] });

class NgxDropzoneModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneModule, declarations: [NgxDropzoneComponent,
            NgxDropzoneLabelDirective,
            NgxDropzonePreviewComponent,
            NgxDropzoneImagePreviewComponent,
            NgxDropzoneRemoveBadgeComponent,
            NgxDropzoneVideoPreviewComponent], imports: [CommonModule], exports: [NgxDropzoneComponent,
            NgxDropzoneLabelDirective,
            NgxDropzonePreviewComponent,
            NgxDropzoneImagePreviewComponent,
            NgxDropzoneRemoveBadgeComponent,
            NgxDropzoneVideoPreviewComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxDropzoneComponent,
                        NgxDropzoneLabelDirective,
                        NgxDropzonePreviewComponent,
                        NgxDropzoneImagePreviewComponent,
                        NgxDropzoneRemoveBadgeComponent,
                        NgxDropzoneVideoPreviewComponent,
                    ],
                    exports: [
                        NgxDropzoneComponent,
                        NgxDropzoneLabelDirective,
                        NgxDropzonePreviewComponent,
                        NgxDropzoneImagePreviewComponent,
                        NgxDropzoneRemoveBadgeComponent,
                        NgxDropzoneVideoPreviewComponent,
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-dropzone
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxDropzoneComponent, NgxDropzoneImagePreviewComponent, NgxDropzoneLabelDirective, NgxDropzoneModule, NgxDropzonePreviewComponent, NgxDropzoneRemoveBadgeComponent, NgxDropzoneVideoPreviewComponent };
//# sourceMappingURL=toladata-software-ngx-dropzone.mjs.map
