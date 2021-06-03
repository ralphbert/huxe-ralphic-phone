import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {GameData, GameId, Player, PlayerId, PlayerSettings} from '../modules/core/typings';
import {AngularFirestoreDocument} from '@angular/fire/firestore/document/document';

function randomAvatarNumber(): number {
  return Math.ceil(Math.random() * 9);
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private firestore: AngularFirestore) {
  }

  private getGames(): AngularFirestoreCollection<Partial<GameData>> {
    return this.firestore.collection<Partial<GameData>>('games');
  }

  private getGame(gameId: GameId): AngularFirestoreDocument<Partial<GameData>> {
    return this.getGames().doc(gameId);
  }

  private getPlayers(gameId: GameId): AngularFirestoreCollection<Partial<Player>> {
    return this.getGame(gameId).collection<Partial<Player>>('players');
  }

  private getPlayer(gameId: GameId, playerId: PlayerId): AngularFirestoreDocument<Partial<Player>> {
    return this.getPlayers(gameId).doc<Partial<Player>>(playerId);
  }

  hostGame(playerId: PlayerId): Observable<GameId> {
    const operation = this.getGames().add({
      created: new Date(),
      stage: 'lobby',
      hostPlayerId: playerId,
    });

    return from(operation).pipe(
      map(ref => ref.id),
      switchMap((id: string) => {
        return this.joinGame(id, playerId).pipe(map(() => id));
      }),
    );
  }

  joinGame(gameId: GameId, playerId: PlayerId): Observable<void> {
    console.log('joinGame.gameId', gameId);
    console.log('joinGame.playerId', playerId);

    return this.gameExists(gameId).pipe(
      switchMap(exists => {
        if (exists) {
          return this.getPlayer(gameId, playerId).set({
            name: '',
            avatar: 'avatar-' + randomAvatarNumber(),
          });
        }

        return throwError(new Error('game does not exist'));
      }),
    );
  }

  leaveGame(gameId: GameId, playerId: PlayerId): Observable<void> {
    return this.gameExists(gameId).pipe(
      switchMap(exists => {
        if (exists) {
          return this.getPlayers(gameId).doc(playerId).delete();
        }

        return of(null);
      }),
    );
  }

  getGameDoc(gameId: GameId): Observable<AngularFirestoreDocument<Partial<GameData>>> {
    return of(this.getGame(gameId));
  }

  endGame(gameId: GameId): Observable<void> {
    const deletePlayers = this.getGameDoc(gameId).pipe(
      switchMap(gameDoc => {
        return gameDoc.collection<Player>('players').get().pipe(
          switchMap(snapshot => {
            return snapshot.docs.map(doc => {
              return doc.ref.delete();
            });
          }),
        );
      }),
    );

    return this.getGameDoc(gameId).pipe(
      switchMap(gameDoc => deletePlayers.pipe(map(() => gameDoc))),
      switchMap(gameDoc => gameDoc.delete()),
      catchError(e => {
        // TODO: ignoring delete error for now. error should be handled properly
        console.log('error', e);
        return of(null);
      }),
    );
  }

  gameExists(gameId: GameId): Observable<boolean> {
    console.log('gameExists', gameId);

    if (gameId) {
      return this.getGame(gameId).get().pipe(map(ref => {
        console.log('ref', ref);
        return ref.exists;
      })).pipe(
        tap(response => {
          console.log('gameExists', gameId, response);
        }),
      );
    }

    return of(false);
  }

  customizePlayer(gameId: GameId, playerId: PlayerId, options: Partial<PlayerSettings>): Observable<void> {
    return from(this.getPlayer(gameId, playerId).set({
      name: options.name || undefined,
      avatar: options.avatar || undefined,
    }, {merge: true}));
  }

  startGame(gameId: GameId): Observable<any> {
    return from(this.getGame(gameId).set({
      stage: 'game',
    }, {merge: true}));
  }
}
