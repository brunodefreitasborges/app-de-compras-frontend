import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  dialogForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogForm = new FormGroup({
      category: new FormControl(this.data.category, [Validators.required]),
      product: new FormControl(this.data.product, [Validators.required]),
      quantity: new FormControl(this.data.quantity, [Validators.required]),
      price: new FormControl(this.data.price),
    })
  }

  get category() {
    return this.dialogForm.get('category')!;
  }

  get product() {
    return this.dialogForm.get('product')!;
  }

  get quantity() {
    return this.dialogForm.get('quantity')!;
  }

  get price() {
    return this.dialogForm.get('price')!;
  }

  cancel(): void {
  
    this.dialogRef.close();
  }

  submit() {
    if(this.dialogForm.invalid) {
      return;
    }
    let result: Object = {
      flag: this.data.flag,
      data : {
        id: this.data.id,
        category: this.dialogForm.value.category,
        product: this.dialogForm.value.product,
        quantity: this.dialogForm.value.quantity,
        price: this.dialogForm.value.price,
        checked: this.data.checked
      }
    }
    this.dialogRef.close(result);
  }

}
