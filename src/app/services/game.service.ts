import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
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

  hostGame(playerId: PlayerId): Observable<GameId> {
    const operation = this.firestore.collection<Partial<GameData>>('games').add({
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
    return from(this.firestore
      .collection('games')
      .doc(gameId)
      .collection<PlayerSettings>('players')
      .doc(playerId)
      .set({
        name: '',
        avatar: 'avatar-' + randomAvatarNumber(),
      }));
  }

  getGameDoc(gameId: GameId): Observable<AngularFirestoreDocument<GameData>> {
    const gameDoc = this.firestore.collection('games').doc<GameData>(gameId);
    return of(gameDoc);
  }

  endGame(gameId: GameId): Observable<void> {
    return this.getGameDoc(gameId).pipe(
      switchMap(gameDoc => gameDoc.delete()),
      catchError(e => {
        // TODO: ignoring delete error for now. error should be handled properly
        console.log('error', e);
        return of(null);
      }),
    );
  }

  gameExists(gameId: GameId): Observable<boolean> {
    if (gameId) {
      return this.firestore.collection('games').doc(gameId).get().pipe(map(ref => ref.exists));
    }

    return of(false);
  }

  customizePlayer(gameId: GameId, playerId: PlayerId, options: PlayerSettings): Observable<void> {
    return from(this.firestore.collection('games').doc(gameId).collection<Partial<Player>>('players').doc(playerId).set({
      name: options.name,
      avatar: options.avatar,
      ready: options.ready || false,
    }, {merge: true}));
  }
}
