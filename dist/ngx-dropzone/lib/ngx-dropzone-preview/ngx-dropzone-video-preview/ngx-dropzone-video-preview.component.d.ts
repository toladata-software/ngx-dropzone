import { OnInit, OnDestroy } from '@angular/core';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NgxDropzoneVideoPreviewComponent extends NgxDropzonePreviewComponent implements OnInit, OnDestroy {
    constructor(sanitizer: DomSanitizer);
    /** The video data source. */
    sanitizedVideoSrc: SafeUrl;
    private videoSrc;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDropzoneVideoPreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxDropzoneVideoPreviewComponent, "ngx-dropzone-video-preview", never, {}, {}, never, ["ngx-dropzone-label"], false, never>;
}
