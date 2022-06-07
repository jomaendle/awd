import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
  });

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSearchSubmit(): void {
    this.searchTextChange.emit(this.searchForm.value);
  }
}
