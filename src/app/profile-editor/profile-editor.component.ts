import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control(''),
    ])

  });

  
  hero = {
    name: "abc",
    alterEgo: "aE",
    power: 5
  };

  heroForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initiateHeroForm();
  }

  initiateHeroForm() {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        this.forbiddenNameValidator(/bob/i)
      ]),
      alterEgo: new FormControl(this.hero.alterEgo),
      power: new FormControl(this.hero.power, [
        Validators.required
      ])
    });
  }
  
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    }
  }

  identityRevealedValidator(control: FormGroup): ValidationErrors | null {
    const name = control.get("name");
    const  alterEgo = control.get("alterEgo");

    return name && alterEgo && name.value === alterEgo.value ? {'identityRevealed': true} : null;
  }

  gen<T>(arg: T): T {
    return arg;
  }

  get name() {
    console.log(this.heroForm);
    return this.heroForm.get('name');
  }

  get power() {
    return this.heroForm.get('power');
  }
  onSubmit() {
    console.log("profileForm: ", this.profileForm);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }


  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
