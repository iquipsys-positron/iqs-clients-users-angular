import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { grantRoleDialogTranslations } from './edit-email-dialog.strings';

import { UsersDataService } from '../../services/users.data.service';

import { EmailSettings } from '../../models/EmailSettings';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'iqs-edit-email-dialog',
    templateUrl: './edit-email-dialog.component.html',
    styleUrls: ['./edit-email-dialog.component.scss']
})
export class EditEmailDialogComponent implements OnInit, OnDestroy {
    private EMAIL_PATTERN = "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;";
    private LANGUAGE_PATTERN = "en$|^ru";
    private subs: Subscription;

    public loading$: BehaviorSubject<boolean>;
    public form: FormGroup;
    public error: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditEmailDialogComponent>,
        public snackBar: MatSnackBar,
        private translate: TranslateService,
        private usersData: UsersDataService,
        @Inject(MAT_DIALOG_DATA) public data: {
            emailSettings: EmailSettings,
            // usersService: UsersService
        }
    ) {
        this.loading$ = new BehaviorSubject<boolean>(false);
        this.translate.setTranslation('en', grantRoleDialogTranslations.en, true);
        this.translate.setTranslation('ru', grantRoleDialogTranslations.ru, true);

        this.form = this.fb.group({
            email: [this.data.emailSettings.email, [Validators.required]],
            language: [this.data.emailSettings.language, [Validators.required, Validators.pattern(this.LANGUAGE_PATTERN)]],
            verified: [this.data.emailSettings.verified, []]
        }, {});
        this.subs = new Subscription();
    }

    ngOnInit() {}

    ngOnDestroy() { this.subs.unsubscribe(); }

    public hasError(field: string, error: string) {
        return this.form.get(field).getError(error) && this.form.get(field).touched;
    }

    public onCancel(): void {
        this.dialogRef.close(null);
    }

    public onSubmit(): void {
        // this.loading$.next(true);
        // this.error = null;
        let newEmailSettings = this.data.emailSettings;
        newEmailSettings.email = this.form.get("email").value;
        newEmailSettings.language = this.form.get("language").value;
        newEmailSettings.verified = this.form.get("verified").value;

        this.dialogRef.close(newEmailSettings);

        // this.data.usersService.editEmailSettings(newEmailSettings);

        // this.subs.add(this.usersData.setEmailSettings(newEmailSettings).subscribe(user => {
        //     this.snackBar.open(
        //         this.translate.instant('EDIT_EMAIL_SUCCESS'),
        //         this.translate.instant('OK'),
        //         {
        //             horizontalPosition: 'left',
        //             verticalPosition: 'bottom',
        //             duration: 2000
        //         }
        //     );
        //     this.loading$.next(false);
        //     this.dialogRef.close();
        // }, (error) => {
        //     this.loading$.next(false);
        //     this.error = error;
        // }));
    }

}
