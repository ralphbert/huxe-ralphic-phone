import {GameData, GameId, Player, PlayerId, PlayerSettings} from '../modules/core/typings';
import firebase from 'firebase';

const prefix = '[Game]';

export class HostGame {
  static readonly type = `${prefix} HostGame`;
}

export class EndGame {
  static readonly type = `${prefix} EndGame`;
}

export class JoinGame {
  static readonly type = `${prefix} JoinGame`;

  constructor(public playerId: PlayerId, public gameId: GameId) {
  }
}

export class CustomizePlayer {
  static readonly type = `${prefix} CustomizePlayer`;

  constructor(public playerSettings: PlayerSettings) {
  }
}

export class SetGameData {
  static readonly type = `${prefix} SetGameData`;

  constructor(public gameData: GameData | null) {
  }
}

export class SetPlayersData {
  static readonly type = `${prefix} SetPlayersData`;

  constructor(public player: Player[] | null) {
  }
}

export class SetUser {
  static readonly type = `${prefix} SetUser`;

  constructor(public user: firebase.User | null) {
  }
}


export class SetGameId {
  static readonly type = `${prefix} SetGameId`;

  constructor(public gameId: GameId) {
  }
}

