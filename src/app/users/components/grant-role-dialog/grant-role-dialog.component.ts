import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { grantRoleDialogTranslations } from './grant-role-dialog.strings';

@Component({
    selector: 'iqs-grant-role-dialog',
    templateUrl: './grant-role-dialog.component.html',
    styleUrls: ['./grant-role-dialog.component.scss']
})
export class GrantRoleDialogComponent implements OnInit, OnDestroy {
    private subs: Subscription;

    public loading$: BehaviorSubject<boolean>;
    public form: FormGroup;
    public error: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<GrantRoleDialogComponent>,
        public snackBar: MatSnackBar,
        private translate: TranslateService
    ) {
        this.loading$ = new BehaviorSubject<boolean>(false);
        this.translate.setTranslation('en', grantRoleDialogTranslations.en, true);
        this.translate.setTranslation('ru', grantRoleDialogTranslations.ru, true);

        this.form = this.fb.group({
            newRole: ['', [Validators.required]]
        }, {});
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
        this.dialogRef.close(this.form.get("newRole").value)
    }

}
