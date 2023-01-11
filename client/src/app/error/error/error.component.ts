import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pluralize } from 'sequelize/types/utils';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
