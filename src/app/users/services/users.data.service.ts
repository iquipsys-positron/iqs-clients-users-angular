import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EmailSettings, SmsSettings, User } from '../models';
import { DataPage } from 'iqs-libs-clientshell2-angular';

@Injectable()
export class UsersDataService {
    private accountsUrl = '/api/v1/accounts';
    private emailSettingsUrl = '/api/v1/email_settings';
    private smsSettingsUrl = '/api/v1/sms_settings';
    private rolesUrl = '/api/v1/roles';
    private activitiesUrl = '/api/v1/activities';
    private sessionsUrl = '/api/v1/sessions';
    private passwordsUrl = '/api/v1/passwords';


    public constructor(
        private http: HttpClient,
        private sessionConfig: IqsSessionConfigService
    ) { }

    private handleError(response: Response) {
        const error = response.json();
        return Observable.throw(error);
    }

    public getAccounts(skip: number, filter: string): Observable<DataPage<User>> {
        let url = this.sessionConfig.serverUrl + this.accountsUrl + "?skip=" + skip;

        if (filter.length > 0) {
            url += "&" + filter
        }

        return this.http.get<DataPage<User>>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAccountsWithFilter(skip: number): Observable<DataPage<User>> {
        let url = this.sessionConfig.serverUrl + this.accountsUrl + "?skip=" + skip;

        return this.http.get<DataPage<User>>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public updateAccount(account: User): Observable<any> {
        // put with user id
        let url = this.sessionConfig.serverUrl + this.accountsUrl + "/" + account.id;

        const body: any = account;

        return this.http.put(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public getEmailSettings(userId: string): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.emailSettingsUrl;
        url += "/" + userId;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public getSmsSettings(userId: string): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.smsSettingsUrl;
        url += "/" + userId;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public getRoles(userId: string, skip: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.rolesUrl + "/" + userId + "?skip=" + skip;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }
    
    public getActivities(userId: string, skip: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.activitiesUrl + "/" + userId + "?skip=" + skip;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );
    }

    public getSessions(userId: string, skip: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.sessionsUrl + "/" + userId + "?skip=" + skip;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );
    }

    public grantRole(userId: string, role: string): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.rolesUrl + "/" + userId + "/grant";

        const body: any = [role];

        return this.http.post(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public revokeRole(userId: string, role: string): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.rolesUrl + "/" + userId + "/revoke";

        const body: any = [role];

        return this.http.post(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public setEmailSettings(emailSettings: EmailSettings): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.emailSettingsUrl + "/" + emailSettings.id;

        const body: any = emailSettings;

        return this.http.put(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }
    
    public setSmsSettings(smsSettings: SmsSettings): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.smsSettingsUrl + "/" + smsSettings.id;

        const body: any = smsSettings;

        return this.http.put(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public changePassword(userId: string, oldPW: string, newPW: string): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.passwordsUrl + "/" + userId + "/change";

        const body: any = { old_password: oldPW, new_password: newPW };

        return this.http.post(url, body)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

}
