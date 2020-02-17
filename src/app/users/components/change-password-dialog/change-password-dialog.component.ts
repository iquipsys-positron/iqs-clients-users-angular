import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UsersDataService } from '../../services/users.data.service';
import { Subscription, BehaviorSubject } from 'rxjs';

import { changePasswordDialogTranslations } from './change-password-dialog.strings';

class PasswordValidator {
    static DoNotMatchPasswords(control: AbstractControl) {
        const oldPassword = control.get('old').value;
        const newPassword = control.get('new').value;
        if (oldPassword === newPassword) {
            control.get('new').setErrors({ same: true });
        } else {
            return null;
        }
    }
}

@Component({
    selector: 'mst-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit, OnDestroy {
    private PASSWORD_PATTERN = /^\w{3,}$/;
    private subs: Subscription;

    public loading$: BehaviorSubject<boolean>;
    public form: FormGroup;
    public error: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
        public snackBar: MatSnackBar,
        private translate: TranslateService,
        private usersData: UsersDataService,
        @Inject(MAT_DIALOG_DATA) public data: {
            // user: User
            userId: string
        }
    ) {
        this.loading$ = new BehaviorSubject<boolean>(false);
        this.translate.setTranslation('en', changePasswordDialogTranslations.en, true);
        this.translate.setTranslation('ru', changePasswordDialogTranslations.ru, true);

        this.form = this.fb.group({
            old: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
            new: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]]
        }, {
                validator: PasswordValidator.DoNotMatchPasswords
            });
        this.subs = new Subscription();
    }

    ngOnInit() { }

    ngOnDestroy() { this.subs.unsubscribe(); }

    public hasError(field: string, error: string) {
        return this.form.get(field).getError(error) && this.form.get(field).touched;
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onSubmit(): void {
        this.loading$.next(true);
        this.error = null;
        this.subs.add(this.usersData.changePassword(
            this.data.userId,
            this.form.get('old').value,
            this.form.get('new').value
        ).subscribe(user => {
            this.snackBar.open(
                this.translate.instant('CHANGE_PASSWORD_SUCCESS'),
                this.translate.instant('OK'),
                {
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    duration: 2000
                }
            );
            this.loading$.next(false);
            this.dialogRef.close();
        }, (error) => {
            this.loading$.next(false);
            this.error = error;
        }));
    }

}
