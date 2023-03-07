import {SafeUrl} from "@angular/platform-browser";

export interface FileHundel {
  file: File;
  url?: SafeUrl | null;
}
