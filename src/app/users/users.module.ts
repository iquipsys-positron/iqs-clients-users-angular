import { NgModule } from '@angular/core';
import { UsersContainersModule } from './containers/containers.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { UsersReducer } from './store/users.reducer';
import { UsersDataService } from './services/users.data.service';
import { UsersService } from './services/users.service';
import { UsersComponentsModule } from './components/components.module';

@NgModule({
    imports: [
        UsersContainersModule,
        UsersComponentsModule,
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature('users', UsersReducer),
    ],
    providers: [
        UsersService,
        UsersDataService,
    ],
})
export class UsersModule { }

