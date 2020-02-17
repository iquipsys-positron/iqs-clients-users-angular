export class User {   
     /* Identification */
    public id: string;
    public login: string;
    public name: string;

    /* Activity tracking */
    public create_time: Date;
    public deleted?: boolean;
    public active: boolean;

    /* User preferences */
    public about: string;
    public time_zone: string;
    public language: string;
    public theme: string;

    /* Custom fields */
    public custom_hdr: any;
    public custom_dat: any;
}