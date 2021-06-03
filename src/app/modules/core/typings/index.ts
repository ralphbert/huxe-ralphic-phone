export type PlayerId = string | null;
export type GameId = string | null;
export type GameExistence = 'loading' | 'existing' | 'not-existing';
export type GameStage = null | 'lobby' | 'game' | 'results';
export type GameMode = 'host' | 'client' | null;
export type GameOperation = 'drawing' | 'sentence';
export type GameRoundState = 'starting' | 'running' | 'ending' | 'loading';

export interface Player extends PlayerSettings {
  id: PlayerId;
}

export interface PlayerSettings {
  name: string;
  avatar: string;
}

export interface GameData {
  id: GameId;
  created: Date;
  stage: GameStage;
  hostPlayerId: PlayerId;
}
