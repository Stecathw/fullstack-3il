
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-lang-selection',
  templateUrl: './lang-selection.component.html',
  styleUrls: ['./lang-selection.component.css']
})
export class LangSelectionComponent implements OnInit {
  availableLanguages: Language[] = [
    { code: 'fr-FR', label: 'French' },
    { code: 'en-US', label: 'English' },
  ];
  selectedLanguageCode: string = this.availableLanguages[0].code;
  languageForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.languageForm = this.formBuilder.group({
      language: [this.selectedLanguageCode, Validators.required],
    });
  }

  public switchLanguage() {
    this.translateService.use(
      this.languageForm.get('language')?.value 
      || this.availableLanguages[0].code
    );
  }
}
