import {Directive} from '@angular/core';
import {GameMode} from '../typings';
import {BaseIfDirective} from './base-if.directive';

/**
 * A custom structural directive to show an element if the game mode is set to host.
 */
@Directive({
  selector: '[appIfHost]'
})
export class IfHostDirective extends BaseIfDirective {
  desiredMode: GameMode = 'host';
}
