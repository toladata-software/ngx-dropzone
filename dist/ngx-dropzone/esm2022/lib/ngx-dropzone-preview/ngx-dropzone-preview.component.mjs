import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '../helpers';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "./ngx-dropzone-remove-badge/ngx-dropzone-remove-badge.component";
var KEY_CODE;
(function (KEY_CODE) {
    KEY_CODE[KEY_CODE["BACKSPACE"] = 8] = "BACKSPACE";
    KEY_CODE[KEY_CODE["DELETE"] = 46] = "DELETE";
})(KEY_CODE || (KEY_CODE = {}));
export class NgxDropzonePreviewComponent {
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
	`, isInline: true, styles: [":host{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host:hover,:host:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host ::ng-deep ngx-dropzone-label{overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRyb3B6b25lL3NyYy9saWIvbmd4LWRyb3B6b25lLXByZXZpZXcvbmd4LWRyb3B6b25lLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkQsT0FBTyxFQUFhLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7OztBQUVwRSxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDWixpREFBYSxDQUFBO0lBQ2IsNENBQVcsQ0FBQTtBQUNaLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FBV0QsTUFBTSxPQUFPLDJCQUEyQjtJQUV2QyxZQUNXLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFrQnhCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFN0Isa0RBQWtEO1FBQy9CLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBa0N0RCx5REFBeUQ7UUFDaEMsYUFBUSxHQUFHLENBQUMsQ0FBQztJQXZEbEMsQ0FBQztJQUlMLDJCQUEyQjtJQUMzQixJQUNJLElBQUksQ0FBQyxLQUFXLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQUksSUFBSSxLQUFXLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFdkMsc0NBQXNDO0lBQ3RDLElBQ0ksU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFPRCxRQUFRLENBQUMsS0FBb0I7UUFDNUIsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsS0FBSyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ3hCLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxNQUFNO1lBQ1A7Z0JBQ0MsTUFBTTtRQUNSLENBQUM7SUFDRixDQUFDO0lBRUQsOEVBQThFO0lBQzlFLElBQ0ksU0FBUztRQUNaLE1BQU0sTUFBTSxHQUFHOzs7Ozs7Ozs7Ozs7R0FZZCxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLRCxrREFBa0Q7SUFDbEQsT0FBTyxDQUFDLEtBQUs7UUFDWixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHlEQUF5RDtJQUN6RCxNQUFNO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDRixDQUFDO0lBRVMsS0FBSyxDQUFDLFFBQVE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBdUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUVoQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixPQUFPLE1BQU0sQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1lBQzFGLENBQUM7WUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7OEdBN0ZXLDJCQUEyQjtrR0FBM0IsMkJBQTJCLDZRQVA3Qjs7OztFQUlUOzsyRkFHVywyQkFBMkI7a0JBVHZDLFNBQVM7K0JBQ0Msc0JBQXNCLFlBQ3RCOzs7O0VBSVQ7aUZBYUcsSUFBSTtzQkFEUCxLQUFLO2dCQU1GLFNBQVM7c0JBRFosS0FBSztnQkFVYSxPQUFPO3NCQUF6QixNQUFNO2dCQUdQLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBYzdCLFNBQVM7c0JBRFosV0FBVzt1QkFBQyxPQUFPO2dCQW9CSyxRQUFRO3NCQUFoQyxXQUFXO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBTYWZlU3R5bGUsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5lbnVtIEtFWV9DT0RFIHtcblx0QkFDS1NQQUNFID0gOCxcblx0REVMRVRFID0gNDZcbn1cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LWRyb3B6b25lLXByZXZpZXcnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxuZy1jb250ZW50IHNlbGVjdD1cIm5neC1kcm9wem9uZS1sYWJlbFwiPjwvbmctY29udGVudD5cblx0XHQ8bmd4LWRyb3B6b25lLXJlbW92ZS1iYWRnZSAqbmdJZj1cInJlbW92YWJsZVwiIChjbGljayk9XCJfcmVtb3ZlKCRldmVudClcIj5cblx0XHQ8L25neC1kcm9wem9uZS1yZW1vdmUtYmFkZ2U+XG5cdGAsXG5cdHN0eWxlVXJsczogWycuL25neC1kcm9wem9uZS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4RHJvcHpvbmVQcmV2aWV3Q29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcm90ZWN0ZWQgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcblx0KSB7IH1cblxuXHRwcm90ZWN0ZWQgX2ZpbGU6IEZpbGU7XG5cblx0LyoqIFRoZSBmaWxlIHRvIHByZXZpZXcuICovXG5cdEBJbnB1dCgpXG5cdHNldCBmaWxlKHZhbHVlOiBGaWxlKSB7IHRoaXMuX2ZpbGUgPSB2YWx1ZTsgfVxuXHRnZXQgZmlsZSgpOiBGaWxlIHsgcmV0dXJuIHRoaXMuX2ZpbGU7IH1cblxuXHQvKiogQWxsb3cgdGhlIHVzZXIgdG8gcmVtb3ZlIGZpbGVzLiAqL1xuXHRASW5wdXQoKVxuXHRnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9yZW1vdmFibGU7XG5cdH1cblx0c2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW1vdmFibGUgPSBmYWxzZTtcblxuXHQvKiogRW1pdHRlZCB3aGVuIHRoZSBlbGVtZW50IHNob3VsZCBiZSByZW1vdmVkLiAqL1xuXHRAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZT4oKTtcblxuXHRASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG5cdGtleUV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIEtFWV9DT0RFLkJBQ0tTUEFDRTpcblx0XHRcdGNhc2UgS0VZX0NPREUuREVMRVRFOlxuXHRcdFx0XHR0aGlzLnJlbW92ZSgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBXZSB1c2UgdGhlIEhvc3RCaW5kaW5nIHRvIHBhc3MgdGhlc2UgY29tbW9uIHN0eWxlcyB0byBjaGlsZCBjb21wb25lbnRzLiAqL1xuXHRASG9zdEJpbmRpbmcoJ3N0eWxlJylcblx0Z2V0IGhvc3RTdHlsZSgpOiBTYWZlU3R5bGUge1xuXHRcdGNvbnN0IHN0eWxlcyA9IGBcblx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRoZWlnaHQ6IDE0MHB4O1xuXHRcdFx0bWluLWhlaWdodDogMTQwcHg7XG5cdFx0XHRtaW4td2lkdGg6IDE4MHB4O1xuXHRcdFx0bWF4LXdpZHRoOiAxODBweDtcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRcdHBhZGRpbmc6IDAgMjBweDtcblx0XHRcdG1hcmdpbjogMTBweDtcblx0XHRcdGJvcmRlci1yYWRpdXM6IDVweDtcblx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRgO1xuXG5cdFx0cmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShzdHlsZXMpO1xuXHR9XG5cblx0LyoqIE1ha2UgdGhlIHByZXZpZXcgaXRlbSBmb2N1c2FibGUgdXNpbmcgdGhlIHRhYiBrZXkuICovXG5cdEBIb3N0QmluZGluZygndGFiaW5kZXgnKSB0YWJJbmRleCA9IDA7XG5cblx0LyoqIFJlbW92ZSBtZXRob2QgdG8gYmUgdXNlZCBmcm9tIHRoZSB0ZW1wbGF0ZS4gKi9cblx0X3JlbW92ZShldmVudCkge1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucmVtb3ZlKCk7XG5cdH1cblxuXHQvKiogUmVtb3ZlIHRoZSBwcmV2aWV3IGl0ZW0gKHVzZSBmcm9tIGNvbXBvbmVudCBjb2RlKS4gKi9cblx0cmVtb3ZlKCkge1xuXHRcdGlmICh0aGlzLl9yZW1vdmFibGUpIHtcblx0XHRcdHRoaXMucmVtb3ZlZC5uZXh0KHRoaXMuZmlsZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIGFzeW5jIHJlYWRGaWxlKCk6IFByb21pc2U8c3RyaW5nIHwgQXJyYXlCdWZmZXI+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nIHwgQXJyYXlCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cblx0XHRcdHJlYWRlci5vbmxvYWQgPSBlID0+IHtcblx0XHRcdFx0cmVzb2x2ZSgoZS50YXJnZXQgYXMgRmlsZVJlYWRlcikucmVzdWx0KTtcblx0XHRcdH07XG5cblx0XHRcdHJlYWRlci5vbmVycm9yID0gZSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYEZpbGVSZWFkZXIgZmFpbGVkIG9uIGZpbGUgJHt0aGlzLmZpbGUubmFtZX0uYCk7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH07XG5cblx0XHRcdGlmICghdGhpcy5maWxlKSB7XG5cdFx0XHRcdHJldHVybiByZWplY3QoJ05vIGZpbGUgdG8gcmVhZC4gUGxlYXNlIHByb3ZpZGUgYSBmaWxlIHVzaW5nIHRoZSBbZmlsZV0gSW5wdXQgcHJvcGVydHkuJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKHRoaXMuZmlsZSk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==