import {ChangeDetectorRef, Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GameMode} from '../typings';
import {Select} from '@ngxs/store';
import {GameState} from '../../../store/game.state';

/**
 * A custom structural directive to show or hide a certain element depending on the desired game mode.
 * This is a base class to prevent code duplications.
 */
@Directive()
export abstract class BaseIfDirective implements OnInit {
  @Select(GameState.mode)
  protected mode$: Observable<GameMode>;
  protected hasView: boolean = null;
  protected desiredMode: GameMode = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.mode$.pipe(
      tap(mode => {
        const shouldShow = mode === this.desiredMode;

        if (shouldShow && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!shouldShow && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }

        this.changeDetectorRef.markForCheck();
      }),
    ).subscribe();
  }
}
