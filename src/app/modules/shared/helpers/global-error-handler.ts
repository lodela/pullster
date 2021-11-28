import { Injectable, ErrorHandler } from "@angular/core";
import { ActionResponse } from '../../../models/shared/action-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(private snackBar: MatSnackBar) {
        super();
    }

    handleError(error: any) {
        this.snackBar.open('An unexpected error has occurred', 'Ok', {
          duration: 4000,
        });
    }

    handleFriendlyError(error: ActionResponse) {
        this.snackBar.open(error.friendlyMessage, 'Ok', {
          duration: 4000,
        });
    }
}
