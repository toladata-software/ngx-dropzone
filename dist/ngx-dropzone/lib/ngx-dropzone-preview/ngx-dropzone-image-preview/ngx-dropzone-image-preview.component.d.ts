import { OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NgxDropzoneImagePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {
    constructor(sanitizer: DomSanitizer);
    /** The file to preview. */
    set file(value: File);
    get file(): File;
    /** The image data source. */
    defaultImgLoading: string;
    imageSrc: any;
    ngOnInit(): void;
    private renderImage;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDropzoneImagePreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxDropzoneImagePreviewComponent, "ngx-dropzone-image-preview", never, { "file": { "alias": "file"; "required": false; }; }, {}, never, ["ngx-dropzone-label"], false, never>;
}
