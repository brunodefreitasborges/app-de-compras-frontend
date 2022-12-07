import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
})
export class AddListDialogComponent implements OnInit {
  dialogForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddListDialogComponent>) {}

  ngOnInit(): void {
    this.dialogForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.dialogForm.get('name')!;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.dialogForm.invalid) {
      return;
    }
    this.dialogRef.close(this.dialogForm.value.name);
  }
}
