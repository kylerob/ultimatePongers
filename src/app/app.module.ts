import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeaderboardComponent } from './home-page/components/leaderboard/leaderboard.component';
import { RecentMatchesComponent } from './home-page/components/recent-matches/recent-matches.component';
import { MatchPlayerDisplayComponent } from './home-page/components/match-player-display/match-player-display.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { AddMatchModalComponent } from './shared/modals/add-match-modal/add-match-modal/add-match-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { SortPlayersByEloPipe } from './shared/pipes/sort-players-by-elo.pipe';
import { AuthService } from './shared/data/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegisterModalComponent } from './shared/modals/register-modal/register-modal.component';
import { PlayerDropdownComponent } from './shared/components/player-dropdown/player-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewMatchAnimationComponent } from './shared/modals/new-match-animation/new-match-animation.component';
import { PlayerProfileComponent } from './shared/components/player-profile/player-profile.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { MatchupCardComponent } from './stats-page/components/matchup-card/matchup-card.component';
import { StatGraphCardComponent } from './stats-page/components/stat-graph-card/stat-graph-card.component';
import {
  AngularFireAnalyticsModule,
  UserTrackingService,
  ScreenTrackingService,
} from '@angular/fire/compat/analytics';
import { DashboardTabComponent } from './stats-page/components/dashboard-tab/dashboard-tab.component';
import { MatchesTabComponent } from './stats-page/components/matches-tab/matches-tab.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatchCardComponent } from './stats-page/components/match-card/match-card.component';
import { MatchHistoryHeaderComponent } from './stats-page/components/match-history-header/match-history-header.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxsModule } from '@ngxs/store';
import { MatchState } from './shared/data/match/match.state';
import { PlayerState } from './shared/data/player/player.state';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LeaderboardComponent,
    RecentMatchesComponent,
    MatchPlayerDisplayComponent,
    FormatDatePipe,
    SortPlayersByEloPipe,
    AddMatchModalComponent,
    PlayerDropdownComponent,
    RegisterModalComponent,
    NewMatchAnimationComponent,
    PlayerProfileComponent,
    StatsPageComponent,
    MatchupCardComponent,
    StatGraphCardComponent,
    DashboardTabComponent,
    MatchesTabComponent,
    MatchCardComponent,
    MatchHistoryHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AngularFireAnalyticsModule,
    FontAwesomeModule,
    YouTubePlayerModule,
    NgxsModule.forRoot([MatchState, PlayerState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [AuthService, UserTrackingService, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
