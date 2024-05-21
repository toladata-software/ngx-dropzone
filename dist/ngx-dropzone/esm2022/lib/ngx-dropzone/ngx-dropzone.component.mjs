import { Component, EventEmitter, Output, Input, ViewChild, ContentChildren, QueryList, HostBinding, HostListener, Self, ElementRef } from '@angular/core';
import { NgxDropzoneService } from '../ngx-dropzone.service';
import { coerceBooleanProperty, coerceNumberProperty } from '../helpers';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview/ngx-dropzone-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "../ngx-dropzone.service";
import * as i2 from "@angular/common";
export class NgxDropzoneComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneComponent, deps: [{ token: i1.NgxDropzoneService, self: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.9", type: NgxDropzoneComponent, selector: "ngx-dropzone, [ngx-dropzone]", inputs: { accept: "accept", disabled: "disabled", multiple: "multiple", maxFileSize: "maxFileSize", expandable: "expandable", disableClick: "disableClick", processDirectoryDrop: "processDirectoryDrop", id: "id", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], ariaDescribedBy: ["aria-describedby", "ariaDescribedBy"] }, outputs: { change: "change" }, host: { listeners: { "click": "_onClick()", "dragover": "_onDragOver($event)", "dragleave": "_onDragLeave()", "drop": "_onDrop($event)" }, properties: { "class.ngx-dz-disabled": "this.disabled", "class.expandable": "this.expandable", "class.unclickable": "this.disableClick", "class.ngx-dz-hovered": "this._isHovered" } }, providers: [NgxDropzoneService], queries: [{ propertyName: "_previewChildren", predicate: NgxDropzonePreviewComponent, descendants: true }], viewQueries: [{ propertyName: "_fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }], ngImport: i0, template: "<input #fileInput type=\"file\" [id]=\"id\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\"\n  (change)=\"_onFilesSelected($event)\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\"\n  [attr.aria-describedby]=\"ariaDescribedBy\">\n<ng-content select=\"ngx-dropzone-label\" *ngIf=\"!_hasPreviews\"></ng-content>\n<ng-content select=\"ngx-dropzone-preview\"></ng-content>\n<ng-content></ng-content>\n", styles: [":host{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}:host.ngx-dz-hovered{border-style:solid}:host.ngx-dz-disabled{opacity:.5;cursor:no-drop;pointer-events:none}:host.expandable{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}:host.unclickable{cursor:default}:host ::ng-deep ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}:host input{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host input:focus+::ng-deep ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.9", ngImport: i0, type: NgxDropzoneComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dropzone, [ngx-dropzone]', providers: [NgxDropzoneService], template: "<input #fileInput type=\"file\" [id]=\"id\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\"\n  (change)=\"_onFilesSelected($event)\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\"\n  [attr.aria-describedby]=\"ariaDescribedBy\">\n<ng-content select=\"ngx-dropzone-label\" *ngIf=\"!_hasPreviews\"></ng-content>\n<ng-content select=\"ngx-dropzone-preview\"></ng-content>\n<ng-content></ng-content>\n", styles: [":host{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}:host.ngx-dz-hovered{border-style:solid}:host.ngx-dz-disabled{opacity:.5;cursor:no-drop;pointer-events:none}:host.expandable{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}:host.unclickable{cursor:default}:host ::ng-deep ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}:host input{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}:host input:focus+::ng-deep ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}\n"] }]
        }], ctorParameters: () => [{ type: i1.NgxDropzoneService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kcm9wem9uZS9zcmMvbGliL25neC1kcm9wem9uZS9uZ3gtZHJvcHpvbmUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRyb3B6b25lL3NyYy9saWIvbmd4LWRyb3B6b25lL25neC1kcm9wem9uZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQUMsa0JBQWtCLEVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0RBQXdELENBQUM7Ozs7QUFjckcsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNrQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQWM3QyxxREFBcUQ7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUEwQixDQUFDO1FBRXZFLG9EQUFvRDtRQUMzQyxXQUFNLEdBQUcsR0FBRyxDQUFDO1FBZWQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVVsQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBVWpCLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBV2pDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBVzdCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBVXRCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQVN0QyxlQUFVLEdBQUcsS0FBSyxD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TTtzQkFBZCxLQUFLO2dCQUtGLFFBQVE7c0JBRlgsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyx1QkFBdUI7Z0JBZWhDLFFBQVE7c0JBRFgsS0FBSztnQkFXRixXQUFXO3NCQURkLEtBQUs7Z0JBWUYsVUFBVTtzQkFGYixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLGtCQUFrQjtnQkFZM0IsWUFBWTtzQkFGZixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFXNUIsb0JBQW9CO3NCQUR2QixLQUFLO2dCQVVHLEVBQUU7c0JBQVYsS0FBSztnQkFDZSxTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ08sY0FBYztzQkFBdkMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBQ0csZUFBZTtzQkFBekMsS0FBSzt1QkFBQyxrQkFBa0I7Z0JBR3pCLFVBQVU7c0JBRFQsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBS25DLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxPQUFPO2dCQVFyQixXQUFXO3NCQURWLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVdwQyxZQUFZO3NCQURYLFlBQVk7dUJBQUMsV0FBVztnQkFNekIsT0FBTztzQkFETixZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0LCBWaWV3Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBTZWxmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neERyb3B6b25lU2VydmljZSwgUmVqZWN0ZWRGaWxlfSBmcm9tICcuLi9uZ3gtZHJvcHpvbmUuc2VydmljZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9uZ3gtZHJvcHpvbmUtcHJldmlldy9uZ3gtZHJvcHpvbmUtcHJldmlldy5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neERyb3B6b25lQ2hhbmdlRXZlbnQge1xuICBzb3VyY2U6IE5neERyb3B6b25lQ29tcG9uZW50O1xuICBhZGRlZEZpbGVzOiBGaWxlW107XG4gIHJlamVjdGVkRmlsZXM6IFJlamVjdGVkRmlsZVtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJvcHpvbmUsIFtuZ3gtZHJvcHpvbmVdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1kcm9wem9uZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1kcm9wem9uZS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtOZ3hEcm9wem9uZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5neERyb3B6b25lQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAU2VsZigpIHByaXZhdGUgc2VydmljZTogTmd4RHJvcHpvbmVTZXJ2aWNlXG4gICkge31cblxuICAvKiogQSBsaXN0IG9mIHRoZSBjb250ZW50LXByb2plY3RlZCBwcmV2aWV3IGNoaWxkcmVuLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBfcHJldmlld0NoaWxkcmVuOiBRdWVyeUxpc3Q8Tmd4RHJvcHpvbmVQcmV2aWV3Q29tcG9uZW50PjtcblxuICBnZXQgX2hhc1ByZXZpZXdzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3ByZXZpZXdDaGlsZHJlbi5sZW5ndGg7XG4gIH1cblxuICAvKiogQSB0ZW1wbGF0ZSByZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBmaWxlIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2ZpbGVJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIF9maWxlSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhbnkgZmlsZXMgd2VyZSBhZGRlZCBvciByZWplY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Tmd4RHJvcHpvbmVDaGFuZ2VFdmVudD4oKTtcblxuICAvKiogU2V0IHRoZSBhY2NlcHRlZCBmaWxlIHR5cGVzLiBEZWZhdWx0cyB0byAnKicuICovXG4gIEBJbnB1dCgpIGFjY2VwdCA9ICcqJztcblxuICAvKiogRGlzYWJsZSBhbnkgdXNlciBpbnRlcmFjdGlvbiB3aXRoIHRoZSBjb21wb25lbnQuICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubmd4LWR6LWRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQWxsb3cgdGhlIHNlbGVjdGlvbiBvZiBtdWx0aXBsZSBmaWxlcy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGUgPSB0cnVlO1xuXG4gIC8qKiBTZXQgdGhlIG1heGltdW0gc2l6ZSBhIHNpbmdsZSBmaWxlIG1heSBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4RmlsZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RmlsZVNpemU7XG4gIH1cbiAgc2V0IG1heEZpbGVTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXhGaWxlU2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tYXhGaWxlU2l6ZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIC8qKiBBbGxvdyB0aGUgZHJvcHpvbmUgY29udGFpbmVyIHRvIGV4cGFuZCB2ZXJ0aWNhbGx5LiAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmV4cGFuZGFibGUnKVxuICBnZXQgZXhwYW5kYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kYWJsZTtcbiAgfVxuICBzZXQgZXhwYW5kYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2V4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogT3BlbiB0aGUgZmlsZSBzZWxlY3RvciBvbiBjbGljay4gKi9cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy51bmNsaWNrYWJsZScpXG4gIGdldCBkaXNhYmxlQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVDbGljaztcbiAgfVxuICBzZXQgZGlzYWJsZUNsaWNrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZUNsaWNrID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlQ2xpY2sgPSBmYWxzZTtcblxuICAvKiogQWxsb3cgZHJvcHBpbmcgZGlyZWN0b3JpZXMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwcm9jZXNzRGlyZWN0b3J5RHJvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc0RpcmVjdG9yeURyb3A7XG4gIH1cbiAgc2V0IHByb2Nlc3NEaXJlY3RvcnlEcm9wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcHJvY2Vzc0RpcmVjdG9yeURyb3AgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3Byb2Nlc3NEaXJlY3RvcnlEcm9wID0gZmFsc2U7XG5cbiAgLyoqIEV4cG9zZSB0aGUgaWQsIGFyaWEtbGFiZWwsIGFyaWEtbGFiZWxsZWRieSBhbmQgYXJpYS1kZXNjcmliZWRieSBvZiB0aGUgbmF0aXZlIGZpbGUgaW5wdXQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5LiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkQnk6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5neC1kei1ob3ZlcmVkJylcbiAgX2lzSG92ZXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBTaG93IHRoZSBuYXRpdmUgT1MgZmlsZSBleHBsb3JlciB0byBzZWxlY3QgZmlsZXMuICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgX29uQ2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVDbGljaykge1xuICAgICAgdGhpcy5zaG93RmlsZVNlbGVjdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBfb25EcmFnT3ZlcihldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScpXG4gIF9vbkRyYWdMZWF2ZSgpIHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBfb25Ecm9wKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcblxuICAgIC8vIGlmIHByb2Nlc3NEaXJlY3RvcnlEcm9wIGlzIG5vdCBlbmFibGVkIG9yIHdlYmtpdEdldEFzRW50cnkgaXMgbm90IHN1cHBvcnRlZCB3ZSBoYW5kbGUgdGhlIGRyb3AgYXMgdXN1YWxcbiAgICBpZiAoIXRoaXMucHJvY2Vzc0RpcmVjdG9yeURyb3AgfHwgIURhdGFUcmFuc2Zlckl0ZW0ucHJvdG90eXBlLndlYmtpdEdldEFzRW50cnkpIHtcbiAgICAgIHRoaXMuaGFuZGxlRmlsZURyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcblxuICAgIC8vIGlmIHByb2Nlc3NEaXJlY3RvcnlEcm9wIGlzIGVuYWJsZWQgYW5kIHdlYmtpdEdldEFzRW50cnkgaXMgc3VwcG9ydGVkIHdlIGNhbiBleHRyYWN0IGZpbGVzIGZyb20gYSBkcm9wcGVkIGRpcmVjdG9yeVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wcGVkSXRlbXM6IERhdGFUcmFuc2Zlckl0ZW1bXSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5pdGVtcztcblxuICAgICAgaWYgKGRyb3BwZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlczogRmlsZVtdID0gW107XG4gICAgICAgIGNvbnN0IGRyb3BwZWREaXJlY3RvcmllcyA9IFtdO1xuXG4gICAgICAgIC8vIHNlcGVyYXRlIGRyb3BwZWQgZmlsZXMgZnJvbSBkcm9wcGVkIGRpcmVjdG9yaWVzIGZvciBlYXNpZXIgaGFuZGxpbmdcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wcGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBlbnRyeSA9IGRyb3BwZWRJdGVtc1tpXS53ZWJraXRHZXRBc0VudHJ5KCk7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgICAgZHJvcHBlZEZpbGVzLnB1c2goZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzW2ldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBkcm9wcGVkRGlyZWN0b3JpZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgRGF0YVRyYW5zZmVyXG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlc0xpc3QgPSBuZXcgRGF0YVRyYW5zZmVyKCk7XG4gICAgICAgIGRyb3BwZWRGaWxlcy5mb3JFYWNoKChkcm9wcGVkRmlsZSkgPT4ge1xuICAgICAgICAgIGRyb3BwZWRGaWxlc0xpc3QuaXRlbXMuYWRkKGRyb3BwZWRGaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgbm8gZGlyZWN0b3J5IGlzIGRyb3BwZWQgd2UgYXJlIGRvbmUgYW5kIGNhbiBjYWxsIGhhbmRsZUZpbGVEcm9wXG4gICAgICAgIGlmICghZHJvcHBlZERpcmVjdG9yaWVzLmxlbmd0aCAmJiBkcm9wcGVkRmlsZXNMaXN0Lml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlRmlsZURyb3AoZHJvcHBlZEZpbGVzTGlzdC5maWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBkaXJlY3RvcmllcyBhcmUgZHJvcHBlZCB3ZSBleHRyYWN0IHRoZSBmaWxlcyBmcm9tIHRoZXNlIGRpcmVjdG9yaWVzIG9uZS1ieS1vbmUgYW5kIGFkZCBpdCB0byBkcm9wcGVkRmlsZXNMaXN0XG4gICAgICAgIGlmIChkcm9wcGVkRGlyZWN0b3JpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgZXh0cmFjdEZpbGVzRnJvbURpcmVjdG9yeUNhbGxzID0gW107XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGRyb3BwZWREaXJlY3Rvcnkgb2YgZHJvcHBlZERpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICBleHRyYWN0RmlsZXNGcm9tRGlyZWN0b3J5Q2FsbHMucHVzaCh0aGlzLmV4dHJhY3RGaWxlc0Zyb21EaXJlY3RvcnkoZHJvcHBlZERpcmVjdG9yeSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHdhaXQgZm9yIGFsbCBkaXJlY3RvcmllcyB0byBiZSBwcm9jY2Vzc2VkIHRvIGFkZCB0aGUgZXh0cmFjdGVkIGZpbGVzIGFmdGVyd2FyZHNcbiAgICAgICAgICBQcm9taXNlLmFsbChleHRyYWN0RmlsZXNGcm9tRGlyZWN0b3J5Q2FsbHMpLnRoZW4oKGFsbEV4dHJhY3RlZEZpbGVzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgYWxsRXh0cmFjdGVkRmlsZXMucmVkdWNlKChhLCBiKSA9PiBbLi4uYSwgLi4uYl0pLmZvckVhY2goKGV4dHJhY3RlZEZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgZHJvcHBlZEZpbGVzTGlzdC5pdGVtcy5hZGQoZXh0cmFjdGVkRmlsZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVGaWxlRHJvcChkcm9wcGVkRmlsZXNMaXN0LmZpbGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEZpbGVzRnJvbURpcmVjdG9yeShkaXJlY3RvcnkpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRGaWxlRnJvbUZpbGVFbnRyeShmaWxlRW50cnkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBmaWxlRW50cnkuZmlsZShyZXNvbHZlLCByZWplY3QpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29udmVydGluZyBhIGZpbGVFbnRyeSB0byBhIEZpbGU6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBbXTtcblxuICAgICAgY29uc3QgZGlyUmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuXG4gICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gYmUgYSByZWN1cnNpb24gYmVjYXVzZSBvZiB0aGlzIGlzc3VlOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD01MTQwODdcbiAgICAgIGNvbnN0IHJlYWRFbnRyaWVzID0gKCkgPT4ge1xuICAgICAgICBkaXJSZWFkZXIucmVhZEVudHJpZXMoYXN5bmMoZGlySXRlbXMpID0+IHtcbiAgICAgICAgICBpZiAoIWRpckl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzb2x2ZShmaWxlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFbnRyaWVzID0gZGlySXRlbXMuZmlsdGVyKChkaXJJdGVtKSA9PiBkaXJJdGVtLmlzRmlsZSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZUVudHJ5IG9mIGZpbGVFbnRyaWVzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbGU6IGFueSA9IGF3YWl0IGdldEZpbGVGcm9tRmlsZUVudHJ5KGZpbGVFbnRyeSk7XG4gICAgICAgICAgICAgIGZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlYWRFbnRyaWVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICByZWFkRW50cmllcygpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd0ZpbGVTZWxlY3RvcigpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICh0aGlzLl9maWxlSW5wdXQubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIF9vbkZpbGVzU2VsZWN0ZWQoZXZlbnQpIHtcbiAgICBjb25zdCBmaWxlczogRmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgdGhpcy5oYW5kbGVGaWxlRHJvcChmaWxlcyk7XG5cbiAgICAvLyBSZXNldCB0aGUgbmF0aXZlIGZpbGUgaW5wdXQgZWxlbWVudCB0byBhbGxvdyBzZWxlY3RpbmcgdGhlIHNhbWUgZmlsZSBhZ2FpblxuICAgIHRoaXMuX2ZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG5cbiAgICAvLyBmaXgoIzMyKTogUHJldmVudCB0aGUgZGVmYXVsdCBldmVudCBiZWhhdmlvdXIgd2hpY2ggY2F1c2VkIHRoZSBjaGFuZ2UgZXZlbnQgdG8gZW1pdCB0d2ljZS5cbiAgICB0aGlzLnByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRmlsZURyb3AoZmlsZXM6IEZpbGVMaXN0KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zZXJ2aWNlLnBhcnNlRmlsZUxpc3QoZmlsZXMsIHRoaXMuYWNjZXB0LCB0aGlzLm1heEZpbGVTaXplLCB0aGlzLm11bHRpcGxlKTtcblxuICAgIHRoaXMuY2hhbmdlLm5leHQoe1xuICAgICAgYWRkZWRGaWxlczogcmVzdWx0LmFkZGVkRmlsZXMsXG4gICAgICByZWplY3RlZEZpbGVzOiByZXN1bHQucmVqZWN0ZWRGaWxlcyxcbiAgICAgIHNvdXJjZTogdGhpc1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2ZW50RGVmYXVsdChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIiwiPGlucHV0ICNmaWxlSW5wdXQgdHlwZT1cImZpbGVcIiBbaWRdPVwiaWRcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbYWNjZXB0XT1cImFjY2VwdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIChjaGFuZ2UpPVwiX29uRmlsZXNTZWxlY3RlZCgkZXZlbnQpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkYnlcIlxuICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImFyaWFEZXNjcmliZWRCeVwiPlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibmd4LWRyb3B6b25lLWxhYmVsXCIgKm5nSWY9XCIhX2hhc1ByZXZpZXdzXCI+PC9uZy1jb250ZW50PlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibmd4LWRyb3B6b25lLXByZXZpZXdcIj48L25nLWNvbnRlbnQ+XG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=