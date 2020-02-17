
import { ReferenceV1 } from "./ReferenceV1"

export class Activity  {
    /* Identification */
    public id: string;

    /* Identification fields */
    public time: Date;
    public type: string;
    public party: ReferenceV1;

    /* References objects (notes, goals, etc.) */
    public ref_item?: ReferenceV1;
    public ref_parents?: ReferenceV1[];
    public ref_party?: ReferenceV1;

    /* Other details like % of progress or new status */
    public details?: any; //StringValueMap;
}