import { Component, Input } from '@angular/core';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "../ngx-dropzone-remove-badge/ngx-dropzone-remove-badge.component";
export class NgxDropzoneImagePreviewComponent extends NgxDropzonePreviewComponent {
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
	`, isInline: true, styles: [":host{min-width:unset!important;max-width:unset!important;padding:0!important}:host:hover img,:host:focus img{opacity:.7}:host:hover ngx-dropzone-remove-badge,:host:focus ngx-dropzone-remove-badge{opacity:1}:host ngx-dropzone-remove-badge{opacity:0}:host img{max-height:100%;border-radius:5px;opacity:.8}:host ::ng-deep ngx-dropzone-label{position:absolute;overflow-wrap:break-word}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NgxDropzoneRemoveBadgeComponent, selector: "ngx-dropzone-remove-badge" }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLWltYWdlLXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRyb3B6b25lL3NyYy9saWIvbmd4LWRyb3B6b25lLXByZXZpZXcvbmd4LWRyb3B6b25lLWltYWdlLXByZXZpZXcvbmd4LWRyb3B6b25lLWltYWdlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXVCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBa0JwRSxNQUFNLE9BQU8sZ0NBQWlDLFNBQVEsMkJBQTJCO0lBRS9FLFlBQ0UsU0FBdUI7UUFFdkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBV25CLDZCQUE2QjtRQUM3QixzQkFBaUIsR0FBRyx3OUNBQXc5QyxDQUFDO1FBQzcrQyxhQUFRLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQVo5RSxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLElBQ0ksSUFBSSxDQUFDLEtBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLElBQUksS0FBVyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBTXZDLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDOzhHQTVCVSxnQ0FBZ0M7a0dBQWhDLGdDQUFnQywrRUFQaEM7WUFDVDtnQkFDRSxPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxXQUFXLEVBQUUsZ0NBQWdDO2FBQzlDO1NBQ0YsaURBWlM7Ozs7O0VBS1Y7OzJGQVNXLGdDQUFnQztrQkFoQjVDLFNBQVM7K0JBQ0UsNEJBQTRCLFlBQzVCOzs7OztFQUtWLGFBRVc7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsV0FBVyxrQ0FBa0M7eUJBQzlDO3FCQUNGO2lGQVlHLElBQUk7c0JBRFAsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4uL25neC1kcm9wem9uZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJvcHpvbmUtaW1hZ2UtcHJldmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGltZyBbc3JjXT1cImltYWdlU3JjXCIgLz5cblx0XHQ8bmctY29udGVudCBzZWxlY3Q9XCJuZ3gtZHJvcHpvbmUtbGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5neC1kcm9wem9uZS1yZW1vdmUtYmFkZ2UgKm5nSWY9XCJyZW1vdmFibGVcIiAoY2xpY2spPVwiX3JlbW92ZSgkZXZlbnQpXCI+XG4gICAgPC9uZ3gtZHJvcHpvbmUtcmVtb3ZlLWJhZGdlPlxuXHRgLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZHJvcHpvbmUtaW1hZ2UtcHJldmlldy5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOZ3hEcm9wem9uZVByZXZpZXdDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogTmd4RHJvcHpvbmVJbWFnZVByZXZpZXdDb21wb25lbnRcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RHJvcHpvbmVJbWFnZVByZXZpZXdDb21wb25lbnQgZXh0ZW5kcyBOZ3hEcm9wem9uZVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHN1cGVyKHNhbml0aXplcik7XG4gIH1cblxuICAvKiogVGhlIGZpbGUgdG8gcHJldmlldy4gKi9cbiAgQElucHV0KClcbiAgc2V0IGZpbGUodmFsdWU6IEZpbGUpIHtcbiAgICB0aGlzLl9maWxlID0gdmFsdWU7XG4gICAgdGhpcy5yZW5kZXJJbWFnZSgpO1xuICB9XG4gIGdldCBmaWxlKCk6IEZpbGUgeyByZXR1cm4gdGhpcy5fZmlsZTsgfVxuXG4gIC8qKiBUaGUgaW1hZ2UgZGF0YSBzb3VyY2UuICovXG4gIGRlZmF1bHRJbWdMb2FkaW5nID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWRYUm1MVGdpUHo0S1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGh0Ykc1ek9uaHNhVzVyUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMM2hzYVc1cklpQnpkSGxzWlQwaWJXRnlaMmx1T2lCaGRYUnZPeUJpWVdOclozSnZkVzVrT2lCeVoySW9NalF4TENBeU5ESXNJREkwTXlrZ2JtOXVaU0J5WlhCbFlYUWdjMk55YjJ4c0lEQWxJREFsT3lCa2FYTndiR0Y1T2lCaWJHOWphenNnYzJoaGNHVXRjbVZ1WkdWeWFXNW5PaUJoZFhSdk95SWdkMmxrZEdnOUlqSXlOSEI0SWlCb1pXbG5hSFE5SWpJeU5IQjRJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJZ2NISmxjMlZ5ZG1WQmMzQmxZM1JTWVhScGJ6MGllRTFwWkZsTmFXUWlQZ284WTJseVkyeGxJR040UFNJMU1DSWdZM2s5SWpVd0lpQnlQU0l4TkNJZ2MzUnliMnRsTFhkcFpIUm9QU0l6SWlCemRISnZhMlU5SWlNNE5XRXlZallpSUhOMGNtOXJaUzFrWVhOb1lYSnlZWGs5SWpJeExqazVNVEUwT0RVM05URXlPRFUxTWlBeU1TNDVPVEV4TkRnMU56VXhNamcxTlRJaUlHWnBiR3c5SW01dmJtVWlJSE4wY205clpTMXNhVzVsWTJGd1BTSnliM1Z1WkNJK0NpQWdQR0Z1YVcxaGRHVlVjbUZ1YzJadmNtMGdZWFIwY21saWRYUmxUbUZ0WlQwaWRISmhibk5tYjNKdElpQjBlWEJsUFNKeWIzUmhkR1VpSUdSMWNqMGlNUzR4TmpJM09UQTJPVGMyTnpRME1UZzBjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlJR3RsZVZScGJXVnpQU0l3T3pFaUlIWmhiSFZsY3owaU1DQTFNQ0ExTURzek5qQWdOVEFnTlRBaVBqd3ZZVzVwYldGMFpWUnlZVzV6Wm05eWJUNEtQQzlqYVhKamJHVStDanhqYVhKamJHVWdZM2c5SWpVd0lpQmplVDBpTlRBaUlISTlJakV3SWlCemRISnZhMlV0ZDJsa2RHZzlJak1pSUhOMGNtOXJaVDBpSTJKaVkyVmtaQ0lnYzNSeWIydGxMV1JoYzJoaGNuSmhlVDBpTVRVdU56QTNPVFl6TWpZM09UUTRPVFkySURFMUxqY3dOemsyTXpJMk56azBPRGsyTmlJZ2MzUnliMnRsTFdSaGMyaHZabVp6WlhROUlqRTFMamN3TnprMk16STJOemswT0RrMk5pSWdabWxzYkQwaWJtOXVaU0lnYzNSeWIydGxMV3hwYm1WallYQTlJbkp2ZFc1a0lqNEtJQ0E4WVc1cGJXRjBaVlJ5WVc1elptOXliU0JoZEhSeWFXSjFkR1ZPWVcxbFBTSjBjbUZ1YzJadmNtMGlJSFI1Y0dVOUluSnZkR0YwWlNJZ1pIVnlQU0l4TGpFMk1qYzVNRFk1TnpZM05EUXhPRFJ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0lnYTJWNVZHbHRaWE05SWpBN01TSWdkbUZzZFdWelBTSXdJRFV3SURVd095MHpOakFnTlRBZ05UQWlQand2WVc1cGJXRjBaVlJ5WVc1elptOXliVDRLUEM5amFYSmpiR1UrQ2p3aExTMGdXMnhrYVc5ZElHZGxibVZ5WVhSbFpDQmllU0JvZEhSd2N6b3ZMMnh2WVdScGJtY3VhVzh2SUMwdFBqd3ZjM1puUGc9PSc7XG4gIGltYWdlU3JjOiBhbnkgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHRoaXMuZGVmYXVsdEltZ0xvYWRpbmcpO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVuZGVySW1hZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVySW1hZ2UoKSB7XG4gICAgdGhpcy5yZWFkRmlsZSgpXG4gICAgICAudGhlbihpbWcgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmltYWdlU3JjID0gaW1nKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgfVxufVxuIl19