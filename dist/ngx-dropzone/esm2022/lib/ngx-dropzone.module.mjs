import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneLabelDirective } from './ngx-dropzone-label.directive';
import { NgxDropzonePreviewComponent } from './ngx-dropzone-preview/ngx-dropzone-preview.component';
import { NgxDropzoneComponent } from './ngx-dropzone/ngx-dropzone.component';
import { NgxDropzoneImagePreviewComponent } from './ngx-dropzone-preview/ngx-dropzone-image-preview/ngx-dropzone-image-preview.component';
import { NgxDropzoneRemoveBadgeComponent } from './ngx-dropzone-preview/ngx-dropzone-remove-badge/ngx-dropzone-remove-badge.component';
import { NgxDropzoneVideoPreviewComponent } from './ngx-dropzone-preview/ngx-dropzone-video-preview/ngx-dropzone-video-preview.component';
import * as i0 from "@angular/core";
export class NgxDropzoneModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kcm9wem9uZS9zcmMvbGliL25neC1kcm9wem9uZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sd0ZBQXdGLENBQUM7QUFDMUksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0ZBQXNGLENBQUM7QUFDdkksT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sd0ZBQXdGLENBQUM7O0FBdUIxSSxNQUFNLE9BQU8saUJBQWlCOzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFoQjVCLG9CQUFvQjtZQUNwQix5QkFBeUI7WUFDekIsMkJBQTJCO1lBQzNCLGdDQUFnQztZQUNoQywrQkFBK0I7WUFDL0IsZ0NBQWdDLGFBUmhDLFlBQVksYUFXWixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLDJCQUEyQjtZQUMzQixnQ0FBZ0M7WUFDaEMsK0JBQStCO1lBQy9CLGdDQUFnQzsrR0FHckIsaUJBQWlCLFlBbkI1QixZQUFZOzsyRkFtQkQsaUJBQWlCO2tCQXJCN0IsUUFBUTttQkFBQztvQkFDVCxPQUFPLEVBQUU7d0JBQ1IsWUFBWTtxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ2Isb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsZ0NBQWdDO3dCQUNoQywrQkFBK0I7d0JBQy9CLGdDQUFnQztxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNSLG9CQUFvQjt3QkFDcEIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLGdDQUFnQzt3QkFDaEMsK0JBQStCO3dCQUMvQixnQ0FBZ0M7cUJBQ2hDO2lCQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZUxhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtZHJvcHpvbmUtbGFiZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neERyb3B6b25lUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vbmd4LWRyb3B6b25lLXByZXZpZXcvbmd4LWRyb3B6b25lLXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5neERyb3B6b25lQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZHJvcHpvbmUvbmd4LWRyb3B6b25lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZUltYWdlUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vbmd4LWRyb3B6b25lLXByZXZpZXcvbmd4LWRyb3B6b25lLWltYWdlLXByZXZpZXcvbmd4LWRyb3B6b25lLWltYWdlLXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5neERyb3B6b25lUmVtb3ZlQmFkZ2VDb21wb25lbnQgfSBmcm9tICcuL25neC1kcm9wem9uZS1wcmV2aWV3L25neC1kcm9wem9uZS1yZW1vdmUtYmFkZ2Uvbmd4LWRyb3B6b25lLXJlbW92ZS1iYWRnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4RHJvcHpvbmVWaWRlb1ByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL25neC1kcm9wem9uZS1wcmV2aWV3L25neC1kcm9wem9uZS12aWRlby1wcmV2aWV3L25neC1kcm9wem9uZS12aWRlby1wcmV2aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtcblx0XHRDb21tb25Nb2R1bGVcblx0XSxcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0Tmd4RHJvcHpvbmVDb21wb25lbnQsXG5cdFx0Tmd4RHJvcHpvbmVMYWJlbERpcmVjdGl2ZSxcblx0XHROZ3hEcm9wem9uZVByZXZpZXdDb21wb25lbnQsXG5cdFx0Tmd4RHJvcHpvbmVJbWFnZVByZXZpZXdDb21wb25lbnQsXG5cdFx0Tmd4RHJvcHpvbmVSZW1vdmVCYWRnZUNvbXBvbmVudCxcblx0XHROZ3hEcm9wem9uZVZpZGVvUHJldmlld0NvbXBvbmVudCxcblx0XSxcblx0ZXhwb3J0czogW1xuXHRcdE5neERyb3B6b25lQ29tcG9uZW50LFxuXHRcdE5neERyb3B6b25lTGFiZWxEaXJlY3RpdmUsXG5cdFx0Tmd4RHJvcHpvbmVQcmV2aWV3Q29tcG9uZW50LFxuXHRcdE5neERyb3B6b25lSW1hZ2VQcmV2aWV3Q29tcG9uZW50LFxuXHRcdE5neERyb3B6b25lUmVtb3ZlQmFkZ2VDb21wb25lbnQsXG5cdFx0Tmd4RHJvcHpvbmVWaWRlb1ByZXZpZXdDb21wb25lbnQsXG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RHJvcHpvbmVNb2R1bGUgeyB9XG4iXX0=