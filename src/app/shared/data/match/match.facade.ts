import { ComponentRef, Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, take } from 'rxjs';
import { NewMatchAnimationComponent } from '../../modals/new-match-animation/new-match-animation.component';
import { Match } from '../../models/match';
import { Player } from '../../models/player';
import { UpdatePlayersForMatchAction } from '../player/player.actions';
import {
  AddMatchAction,
  FetchMachesForPlayerIdAction,
  FetchMatchesAction,
  WatchForNewMatchAction,
} from './match.actions';
import { MatchState } from './match.state';

@Injectable({
  providedIn: 'root',
})
export class MatchFacade {
  newMatchAnimation: ComponentRef<NewMatchAnimationComponent> | undefined;

  @Select(MatchState.getMatches) matches$: Observable<Match[]>;
  @Select(MatchState.getMatchesByPlayerId) matchesByPlayerId$: Observable<{
    [id: string]: Match[];
  }>;
  @Select(MatchState.getNewMatch) newMatch$: Observable<Match>;

  constructor(private store: Store) {
    this.store.dispatch(new WatchForNewMatchAction());
  }

  fetchMatches(): Observable<any> {
    return this.store.dispatch(new FetchMatchesAction());
  }

  fetchMatchesForId(id: string): Observable<any> {
    return this.store.dispatch(new FetchMachesForPlayerIdAction(id));
  }

  addMatch(match: Match): void {
    this.store.dispatch(new UpdatePlayersForMatchAction(match));
    this.store.dispatch(new AddMatchAction(match));
  }

  startNewMatchAnimation(match: Match, winner: Player, loser: Player, viewRef: ViewContainerRef) {
    if (this.newMatchAnimation) {
      viewRef.clear();
      this.newMatchAnimation = undefined;
    }
    this.newMatchAnimation = viewRef.createComponent(NewMatchAnimationComponent);
    this.newMatchAnimation.instance.match = match;
    this.newMatchAnimation.instance.winner = winner;
    this.newMatchAnimation.instance.loser = loser;
    this.newMatchAnimation.instance.closeModal.subscribe(() => {
      viewRef.clear();
      this.newMatchAnimation = undefined;
    });
  }
}
