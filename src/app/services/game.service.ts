import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import {GameData, GameId, GameMode, PlayerId} from '../modules/core/typings';
import {AngularFirestoreDocument} from '@angular/fire/firestore/document/document';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private firestore: AngularFirestore) {
  }

  hostGame(playerId: PlayerId): Observable<GameId> {
    const operation = this.firestore.collection<GameData>('games').add({
      created: new Date(),
      stage: 'lobby',
      hostPlayerId: playerId,
    });

    return from(operation).pipe(
      map(ref => ref.id),
    );
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

  registerPlayer(gameId: GameId, type: GameMode): Observable<string> {
    const operation = this.firestore.collection('games').doc(gameId).collection('players').add({
      type,
    });

    return from(operation).pipe(map(ref => ref.id));
  }

  onPlayerChanges(gameId: GameId): Observable<firebase.firestore.DocumentData[]> {
    if (!gameId) {
      throw Error('no game id given');
    }
    return this.firestore.collection('games').doc(gameId).collection('players').valueChanges();
  }

  setUsername(gameId: GameId, playerId: string, username: string): Observable<void> {
    return from(this.firestore.collection('games').doc(gameId).collection('players').doc(playerId).set({
      name: username,
    }, {merge: true}));
  }
}
