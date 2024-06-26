import { Component } from '@angular/core';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "../ngx-dropzone-remove-badge/ngx-dropzone-remove-badge.component";
export class NgxDropzoneVideoPreviewComponent extends NgxDropzonePreviewComponent {
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
	`, isInline: true, styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover video,:host:focus video{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host video{max-height:100%;border-radius:5px}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLXZpZGVvLXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRyb3B6b25lL3NyYy9saWIvbmd4LWRyb3B6b25lLXByZXZpZXcvbmd4LWRyb3B6b25lLXZpZGVvLXByZXZpZXcvbmd4LWRyb3B6b25lLXZpZGVvLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQVcsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFvQmxFLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSwyQkFBMkI7SUFFL0UsWUFDRSxTQUF1QjtRQUV2QixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1lBQ3pGLE9BQU87UUFDVCxDQUFDO1FBRUQ7OztZQUdJO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELFdBQVc7UUFDVCxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDOzhHQTdCVSxnQ0FBZ0M7a0dBQWhDLGdDQUFnQyxxREFQaEM7WUFDVDtnQkFDRSxPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxXQUFXLEVBQUUsZ0NBQWdDO2FBQzlDO1NBQ0YsaURBZFM7Ozs7Ozs7RUFPVjs7MkZBU1csZ0NBQWdDO2tCQWxCNUMsU0FBUzsrQkFDRSw0QkFBNEIsWUFDNUI7Ozs7Ozs7RUFPVixhQUVXO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLFdBQVcsa0NBQWtDO3lCQUM5QztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4uL25neC1kcm9wem9uZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRyb3B6b25lLXZpZGVvLXByZXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx2aWRlbyAqbmdJZj1cInNhbml0aXplZFZpZGVvU3JjXCIgY29udHJvbHMgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgPHNvdXJjZSBbc3JjXT1cInNhbml0aXplZFZpZGVvU3JjXCIgLz5cbiAgICA8L3ZpZGVvPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5neC1kcm9wem9uZS1sYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bmd4LWRyb3B6b25lLXJlbW92ZS1iYWRnZSAqbmdJZj1cInJlbW92YWJsZVwiIChjbGljayk9XCJfcmVtb3ZlKCRldmVudClcIj5cbiAgICA8L25neC1kcm9wem9uZS1yZW1vdmUtYmFkZ2U+XG5cdGAsXG4gIHN0eWxlVXJsczogWycuL25neC1kcm9wem9uZS12aWRlby1wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBOZ3hEcm9wem9uZVZpZGVvUHJldmlld0NvbXBvbmVudFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEcm9wem9uZVZpZGVvUHJldmlld0NvbXBvbmVudCBleHRlbmRzIE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICApIHtcbiAgICBzdXBlcihzYW5pdGl6ZXIpO1xuICB9XG5cbiAgLyoqIFRoZSB2aWRlbyBkYXRhIHNvdXJjZS4gKi9cbiAgc2FuaXRpemVkVmlkZW9TcmM6IFNhZmVVcmw7XG5cbiAgcHJpdmF0ZSB2aWRlb1NyYzogc3RyaW5nO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5maWxlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdObyBmaWxlIHRvIHJlYWQuIFBsZWFzZSBwcm92aWRlIGEgZmlsZSB1c2luZyB0aGUgW2ZpbGVdIElucHV0IHByb3BlcnR5LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIHNhbml0aXplIHRoZSBVUkwgaGVyZSB0byBlbmFibGUgdGhlIHByZXZpZXcuXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGNvdWxkIGNhdXNlIHNlY3VyaXR5IGlzc3VlcyFcbiAgICAgKiovXG4gICAgdGhpcy52aWRlb1NyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5maWxlKTtcbiAgICB0aGlzLnNhbml0aXplZFZpZGVvU3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh0aGlzLnZpZGVvU3JjKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy52aWRlb1NyYyk7XG4gIH1cbn1cbiJdfQ==