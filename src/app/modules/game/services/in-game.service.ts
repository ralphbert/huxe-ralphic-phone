import { Injectable } from '@angular/core';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class InGameService {

  constructor(private store: Store) { }
}
