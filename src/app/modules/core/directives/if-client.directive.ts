import {Directive} from '@angular/core';
import {BaseIfDirective} from './base-if.directive';
import {GameMode} from '../typings';

/**
 * A custom structural directive to show an element if the game mode is set to client.
 */
@Directive({
  selector: '[appIfClient]'
})
export class IfClientDirective extends BaseIfDirective {
  desiredMode: GameMode = 'client';
}
