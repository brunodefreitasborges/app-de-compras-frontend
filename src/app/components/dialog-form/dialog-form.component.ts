import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html'
})
export class DialogFormComponent implements OnInit {
  dialogForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogForm = new FormGroup({
      category: new FormControl(this.data.grocery.category, [Validators.required]),
      product: new FormControl(this.data.grocery.product, [Validators.required]),
      quantity: new FormControl(this.data.grocery.quantity, [Validators.required]),
      price: new FormControl(this.data.grocery.price),
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
        category: this.dialogForm.value.category,
        product: this.dialogForm.value.product.trim(),
        quantity: this.dialogForm.value.quantity,
        price: this.dialogForm.value.price,
        checked: this.data.grocery.checked
      }
    }
    this.dialogRef.close(result);
  }

}
