import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This service contains the filtering logic to be applied to
 * any dropped or selected file. If a file matches all criteria
 * like maximum size or accept type, it will be emitted in the
 * addedFiles array, otherwise in the rejectedFiles array.
 */
export class NgxDropzoneService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZHJvcHpvbmUvc3JjL2xpYi9uZ3gtZHJvcHpvbmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW1CM0M7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBRTlCLGFBQWEsQ0FBQyxLQUFlLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsUUFBaUI7UUFFcEYsTUFBTSxVQUFVLEdBQVcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sYUFBYSxHQUFtQixFQUFFLENBQUM7UUFFekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLFNBQVM7WUFDVixDQUFDO1lBRUQsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxTQUFTO1lBQ1YsQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRCxTQUFTO1lBQ1YsQ0FBQztZQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFxQjtZQUNoQyxVQUFVO1lBQ1YsYUFBYTtTQUNiLENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBVSxFQUFFLE1BQWM7UUFFNUMsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekMsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUU3RCw2Q0FBNkM7WUFDN0MsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBRUQsbURBQW1EO1lBQ25ELE9BQU8sY0FBYyxJQUFJLFFBQVEsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUMxQixDQUFDO0lBRU8sVUFBVSxDQUFDLGFBQTZCLEVBQUUsSUFBVSxFQUFFLE1BQW9CO1FBRWpGLE1BQU0sWUFBWSxHQUFHLElBQW9CLENBQUM7UUFDMUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFN0IsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxDQUFDOzhHQXZFVyxrQkFBa0I7a0hBQWxCLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU2VsZWN0UmVzdWx0IHtcblxuXHQvKiogVGhlIGFkZGVkIGZpbGVzLCBlbWl0dGVkIGluIHRoZSBmaWxlc0FkZGVkIGV2ZW50LiAqL1xuXHRhZGRlZEZpbGVzOiBGaWxlW107XG5cblx0LyoqIFRoZSByZWplY3RlZCBmaWxlcywgZW1pdHRlZCBpbiB0aGUgZmlsZXNSZWplY3RlZCBldmVudC4gKi9cblx0cmVqZWN0ZWRGaWxlczogUmVqZWN0ZWRGaWxlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVqZWN0ZWRGaWxlIGV4dGVuZHMgRmlsZSB7XG5cblx0LyoqIFRoZSByZWFzb24gdGhlIGZpbGUgd2FzIHJlamVjdGVkLiAqL1xuXHRyZWFzb24/OiBSZWplY3RSZWFzb247XG59XG5cbmV4cG9ydCB0eXBlIFJlamVjdFJlYXNvbiA9ICd0eXBlJyB8ICdzaXplJyB8ICdub19tdWx0aXBsZSc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIHRoZSBmaWx0ZXJpbmcgbG9naWMgdG8gYmUgYXBwbGllZCB0b1xuICogYW55IGRyb3BwZWQgb3Igc2VsZWN0ZWQgZmlsZS4gSWYgYSBmaWxlIG1hdGNoZXMgYWxsIGNyaXRlcmlhXG4gKiBsaWtlIG1heGltdW0gc2l6ZSBvciBhY2NlcHQgdHlwZSwgaXQgd2lsbCBiZSBlbWl0dGVkIGluIHRoZVxuICogYWRkZWRGaWxlcyBhcnJheSwgb3RoZXJ3aXNlIGluIHRoZSByZWplY3RlZEZpbGVzIGFycmF5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4RHJvcHpvbmVTZXJ2aWNlIHtcblxuXHRwYXJzZUZpbGVMaXN0KGZpbGVzOiBGaWxlTGlzdCwgYWNjZXB0OiBzdHJpbmcsIG1heEZpbGVTaXplOiBudW1iZXIsIG11bHRpcGxlOiBib29sZWFuKTogRmlsZVNlbGVjdFJlc3VsdCB7XG5cblx0XHRjb25zdCBhZGRlZEZpbGVzOiBGaWxlW10gPSBbXTtcblx0XHRjb25zdCByZWplY3RlZEZpbGVzOiBSZWplY3RlZEZpbGVbXSA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oaSk7XG5cblx0XHRcdGlmICghdGhpcy5pc0FjY2VwdGVkKGZpbGUsIGFjY2VwdCkpIHtcblx0XHRcdFx0dGhpcy5yZWplY3RGaWxlKHJlamVjdGVkRmlsZXMsIGZpbGUsICd0eXBlJyk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gbWF4RmlsZVNpemUpIHtcblx0XHRcdFx0dGhpcy5yZWplY3RGaWxlKHJlamVjdGVkRmlsZXMsIGZpbGUsICdzaXplJyk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW11bHRpcGxlICYmIGFkZGVkRmlsZXMubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0dGhpcy5yZWplY3RGaWxlKHJlamVjdGVkRmlsZXMsIGZpbGUsICdub19tdWx0aXBsZScpO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0YWRkZWRGaWxlcy5wdXNoKGZpbGUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdDogRmlsZVNlbGVjdFJlc3VsdCA9IHtcblx0XHRcdGFkZGVkRmlsZXMsXG5cdFx0XHRyZWplY3RlZEZpbGVzXG5cdFx0fTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRwcml2YXRlIGlzQWNjZXB0ZWQoZmlsZTogRmlsZSwgYWNjZXB0OiBzdHJpbmcpOiBib29sZWFuIHtcblxuXHRcdGlmIChhY2NlcHQgPT09ICcqJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWNjZXB0RmlsZXR5cGVzID0gYWNjZXB0LnNwbGl0KCcsJykubWFwKGl0ID0+IGl0LnRvTG93ZXJDYXNlKCkudHJpbSgpKTtcblx0XHRjb25zdCBmaWxldHlwZSA9IGZpbGUudHlwZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGNvbnN0IGZpbGVuYW1lID0gZmlsZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRjb25zdCBtYXRjaGVkRmlsZVR5cGUgPSBhY2NlcHRGaWxldHlwZXMuZmluZChhY2NlcHRGaWxldHlwZSA9PiB7XG5cblx0XHRcdC8vIGNoZWNrIGZvciB3aWxkY2FyZCBtaW1ldHlwZSAoZS5nLiBpbWFnZS8qKVxuXHRcdFx0aWYgKGFjY2VwdEZpbGV0eXBlLmVuZHNXaXRoKCcvKicpKSB7XG5cdFx0XHRcdHJldHVybiBmaWxldHlwZS5zcGxpdCgnLycpWzBdID09PSBhY2NlcHRGaWxldHlwZS5zcGxpdCgnLycpWzBdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjaGVjayBmb3IgZmlsZSBleHRlbnNpb24gKGUuZy4gLmNzdilcblx0XHRcdGlmIChhY2NlcHRGaWxldHlwZS5zdGFydHNXaXRoKFwiLlwiKSkge1xuXHRcdFx0XHRyZXR1cm4gZmlsZW5hbWUuZW5kc1dpdGgoYWNjZXB0RmlsZXR5cGUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjaGVjayBmb3IgZXhhY3QgbWltZXR5cGUgbWF0Y2ggKGUuZy4gaW1hZ2UvanBlZylcblx0XHRcdHJldHVybiBhY2NlcHRGaWxldHlwZSA9PSBmaWxldHlwZTtcblx0XHR9KTtcblxuXHRcdHJldHVybiAhIW1hdGNoZWRGaWxlVHlwZTtcblx0fVxuXG5cdHByaXZhdGUgcmVqZWN0RmlsZShyZWplY3RlZEZpbGVzOiBSZWplY3RlZEZpbGVbXSwgZmlsZTogRmlsZSwgcmVhc29uOiBSZWplY3RSZWFzb24pIHtcblxuXHRcdGNvbnN0IHJlamVjdGVkRmlsZSA9IGZpbGUgYXMgUmVqZWN0ZWRGaWxlO1xuXHRcdHJlamVjdGVkRmlsZS5yZWFzb24gPSByZWFzb247XG5cblx0XHRyZWplY3RlZEZpbGVzLnB1c2gocmVqZWN0ZWRGaWxlKTtcblx0fVxufVxuIl19