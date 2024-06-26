import { EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NgxDropzonePreviewComponent {
    protected sanitizer: DomSanitizer;
    constructor(sanitizer: DomSanitizer);
    protected _file: File;
    /** The file to preview. */
    set file(value: File);
    get file(): File;
    /** Allow the user to remove files. */
    get removable(): boolean;
    set removable(value: boolean);
    protected _removable: boolean;
    /** Emitted when the element should be removed. */
    readonly removed: EventEmitter<File>;
    keyEvent(event: KeyboardEvent): void;
    /** We use the HostBinding to pass these common styles to child components. */
    get hostStyle(): SafeStyle;
    /** Make the preview item focusable using the tab key. */
    tabIndex: number;
    /** Remove method to be used from the template. */
    _remove(event: any): void;
    /** Remove the preview item (use from component code). */
    remove(): void;
    protected readFile(): Promise<string | ArrayBuffer>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDropzonePreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxDropzonePreviewComponent, "ngx-dropzone-preview", never, { "file": { "alias": "file"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; }, { "removed": "removed"; }, never, ["ngx-dropzone-label"], false, never>;
}
