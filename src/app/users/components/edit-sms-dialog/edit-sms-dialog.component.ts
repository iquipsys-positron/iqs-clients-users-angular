import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { grantRoleDialogTranslations } from './edit-sms-dialog.strings';

import { UsersDataService } from '../../services/users.data.service';

import { SmsSettings } from '../../models/SmsSettings';

@Component({
    selector: 'iqs-edit-sms-dialog',
    templateUrl: './edit-sms-dialog.component.html',
    styleUrls: ['./edit-sms-dialog.component.scss']
})
export class EditSmsDialogComponent implements OnInit, OnDestroy {
    private LANGUAGE_PATTERN = "en$|^ru";
    private PHONE_PATTERN = /^\+[0-9]{10,15}$/;
    private subs: Subscription;

    public loading$: BehaviorSubject<boolean>;
    public form: FormGroup;
    public error: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditSmsDialogComponent>,
        public snackBar: MatSnackBar,
        private translate: TranslateService,
        private usersData: UsersDataService,
        @Inject(MAT_DIALOG_DATA) public data: {
            smsSettings: SmsSettings
        }
    ) {
        this.loading$ = new BehaviorSubject<boolean>(false);
        this.translate.setTranslation('en', grantRoleDialogTranslations.en, true);
        this.translate.setTranslation('ru', grantRoleDialogTranslations.ru, true);

        let phone = '';
        let language = '';
        let verified = false;
        if (this.data.smsSettings) {
            phone = this.data.smsSettings.phone ? this.data.smsSettings.phone : '';
            language = this.data.smsSettings.language ? this.data.smsSettings.language : '';
            verified = this.data.smsSettings.verified ? this.data.smsSettings.verified : false;
        }

        this.form = this.fb.group({
            phone: [phone, [Validators.required, Validators.pattern(this.PHONE_PATTERN)]],
            language: [language, [Validators.required, Validators.pattern(this.LANGUAGE_PATTERN)]],
            verified: [verified, []]
        }, {});
        this.subs = new Subscription();
    }

    ngOnInit() { }

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
        // this.subs.add(this.usersData.setSmsSettings(
        //     this.data.smsSettings,
        //     this.form.get("phone").value,
        //     this.form.get("language").value,
        //     this.form.get("verified").value
        // ).subscribe(user => {
        //     this.snackBar.open(
        //         this.translate.instant('EDIT_SMS_SUCCESS'),
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

        let newSmsSettings = this.data.smsSettings;
        newSmsSettings.phone = this.form.get("phone").value;
        newSmsSettings.language = this.form.get("language").value;
        newSmsSettings.verified = this.form.get("verified").value;

        this.dialogRef.close(newSmsSettings);
    }

}
