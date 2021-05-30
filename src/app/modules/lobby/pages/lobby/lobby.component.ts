import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {SetPlayerName} from '../../../../store/game.actions';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {


  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {

  }

  onValueChange(username: string): void {
    this.store.dispatch(new SetPlayerName(username));
  }
}
