import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit, ContentChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { findIndex, debounce } from 'lodash';
import { PipMediaService, PipScrollableComponent } from 'pip-webui2-layouts';

import { ViewState, User } from '../../models';
import { from, fromEvent, Subscription } from 'rxjs';
import { PipSelectedComponent } from 'pip-webui2-behaviors';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'users-list',
    templateUrl: 'users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private subs: Subscription;
    public index: number;
    public withouAttachedObjectLabel: string;

    @Input() loading = false;
    @Input() state: string = null;
    @Input() users: User[];
    @Input() selectId: string;
    @Input() emptyStateActions: any;

    @Input() progressText = 'Loading users';
    @Input() newUserText = 'New user';
    @Input() newusersubText = 'New user model';
    @Input() progressImageUrl = './assets/progress.svg';
    @Input() emptyImageUrl = './assets/empty.svg';
    @Input() emptyText = 'users not found';
    @Input() emptySubText = '';
    @Input() emptyListUrl = './assets/menu-empty.svg';

    @Output() selectChange = new EventEmitter();
    @Output() add = new EventEmitter();
    @Output() loadMore = new EventEmitter();
    @Output() filterUsers = new EventEmitter();

    public UserColor = '#004d40';
    public search = '';

    public constructor(
        public media: PipMediaService,
        private translate: TranslateService,
        private elRef: ElementRef
    ) {
        this.subs = new Subscription();
        this.withouAttachedObjectLabel = this.translate.instant('USER_LIST_WITHOUT_OBJECT_LABEL');
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }

    public ngAfterViewInit() {
        this.subs.add(fromEvent((<HTMLElement>this.elRef.nativeElement).querySelector(".scroll-container"), "scroll").subscribe((e: any) => {
            const tableViewHeight = e.target.offsetHeight // viewport: ~500px
            const tableScrollHeight = e.target.scrollHeight // length of all table
            const scrollLocation = e.target.scrollTop; // how far user scrolled

            // If the user has scrolled within 200px of the bottom, add more data
            const buffer = 200;
            const limit = tableScrollHeight - tableViewHeight - buffer;
            if (scrollLocation > limit) {
                this.loadMore.emit();
            }
        }));
    }

    public ngOnChanges(change: SimpleChanges) {
        if (this.loading) return;

        if (change.selectId && change.selectId.currentValue !== change.selectId.previousValue) {
            this.index = findIndex(this.users, { id: this.selectId });
        }
    }

    public onSelect(event) {
        if (event) this.selectChange.emit(this.users[event.index].id)
    }

    public select(id: string): void {
        if (this.state === ViewState.Edit) this.selectChange.emit(id);
    }

    public addUser() {
        this.add.emit();
    }

    public filterUsersList = debounce(() => {
        this.filterUsers.emit(this.search);
    }, 600);
}
