import { Component, Input } from '@angular/core';
import { Match } from 'src/app/shared/models/match';
import { Matchup } from 'src/app/shared/models/matchup';
import { Player } from 'src/app/shared/models/player';

@Component({
  selector: 'matches-tab',
  templateUrl: './matches-tab.component.html',
  styleUrls: ['./matches-tab.component.scss'],
})
export class MatchesTabComponent {
  @Input() currentPlayer: Player;
  @Input() players: Player[];
  @Input() matches: Match[];
  @Input() matchups: Matchup[];

  getOpponentForMatch(match: Match) {
    return this.players.find(
      (player) =>
        player.id === (match.winnerId === this.currentPlayer.id ? match.loserId : match.winnerId),
    );
  }
}
