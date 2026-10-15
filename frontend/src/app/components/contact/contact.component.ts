import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormGroup;
  submitted = false;

  /** Infos de contact */



    readonly contacts = [
    {
      icon: '📧',
      label: 'Email',
      value: 'jihandhaoui65@gmail.com',
      url: 'mailto:jihandhaoui65@gmail.com',
      color: '#a78bc8'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'jihan-dhaoui',
      url: 'https://www.linkedin.com/in/jihan-dhaoui-15599b236/',
      color: '#8fa0d8'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'JihanDhaoui6',
      url: 'https://github.com/JihanDhaoui6',
      color: '#c9b6e0'
    }
  ];



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.submitted = true;
    this.form.reset();
    setTimeout(() => (this.submitted = false), 4000);
  }
}