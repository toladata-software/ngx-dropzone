import { EventEmitter, QueryList, ElementRef } from '@angular/core';
import { NgxDropzoneService, RejectedFile } from '../ngx-dropzone.service';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview/ngx-dropzone-preview.component';
import * as i0 from "@angular/core";
export interface NgxDropzoneChangeEvent {
    source: NgxDropzoneComponent;
    addedFiles: File[];
    rejectedFiles: RejectedFile[];
}
export declare class NgxDropzoneComponent {
    private service;
    constructor(service: NgxDropzoneService);
    /** A list of the content-projected preview children. */
    _previewChildren: QueryList<NgxDropzonePreviewComponent>;
    get _hasPreviews(): boolean;
    /** A template reference to the native file input element. */
    _fileInput: ElementRef;
    /** Emitted when any files were added or rejected. */
    readonly change: EventEmitter<NgxDropzoneChangeEvent>;
    /** Set the accepted file types. Defaults to '*'. */
    accept: string;
    /** Disable any user interaction with the component. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Allow the selection of multiple files. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Set the maximum size a single file may have. */
    get maxFileSize(): number;
    set maxFileSize(value: number);
    private _maxFileSize;
    /** Allow the dropzone container to expand vertically. */
    get expandable(): boolean;
    set expandable(value: boolean);
    private _expandable;
    /** Open the file selector on click. */
    get disableClick(): boolean;
    set disableClick(value: boolean);
    private _disableClick;
    /** Allow dropping directories. */
    get processDirectoryDrop(): boolean;
    set processDirectoryDrop(value: boolean);
    private _processDirectoryDrop;
    /** Expose the id, aria-label, aria-labelledby and aria-describedby of the native file input for proper accessibility. */
    id: string;
    ariaLabel: string;
    ariaLabelledby: string;
    ariaDescribedBy: string;
    _isHovered: boolean;
    /** Show the native OS file explorer to select files. */
    _onClick(): void;
    _onDragOver(event: any): void;
    _onDragLeave(): void;
    _onDrop(event: any): void;
    private extractFilesFromDirectory;
    showFileSelector(): void;
    _onFilesSelected(event: any): void;
    private handleFileDrop;
    private preventDefault;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDropzoneComponent, [{ self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxDropzoneComponent, "ngx-dropzone, [ngx-dropzone]", never, { "accept": { "alias": "accept"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; "expandable": { "alias": "expandable"; "required": false; }; "disableClick": { "alias": "disableClick"; "required": false; }; "processDirectoryDrop": { "alias": "processDirectoryDrop"; "required": false; }; "id": { "alias": "id"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "ariaLabelledby": { "alias": "aria-labelledby"; "required": false; }; "ariaDescribedBy": { "alias": "aria-describedby"; "required": false; }; }, { "change": "change"; }, ["_previewChildren"], ["ngx-dropzone-label", "ngx-dropzone-preview", "*"], false, never>;
}
