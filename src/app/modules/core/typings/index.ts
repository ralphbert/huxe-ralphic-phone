export type PlayerId = string | null;
export type GameId = string | null;
export type GameExistence = 'loading' | 'existing' | 'not-existing';
export type GameStage = null | 'lobby' | 'game' | 'results';
export type GameMode = 'host' | 'client' | null;

export interface GameData {
  created: Date;
  stage: GameStage;
  hostPlayerId: PlayerId;
}
