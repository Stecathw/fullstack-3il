import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MyPaginatorIntl extends MatPaginatorIntl {
  private ITEMS_PER_PAGE!: string;
  private NEXT_PAGE!: string;
  private PREVIOUS_PAGE!: string;

  constructor(private translate: TranslateService) {
    super();

    // Update the labels on language change
    this.translate.onLangChange.subscribe(() => {
      this.initTranslations();
      this.changes.next();
    });

    // Initialize the translations
    this.initTranslations();
  }

  // Initialize the translated labels
  private initTranslations() {
    this.ITEMS_PER_PAGE = this.translate.instant('ITEMS');
    this.NEXT_PAGE = this.translate.instant('NEXT_PAGE');
    this.PREVIOUS_PAGE = this.translate.instant('PREVIOUS_PAGE');

  }

  // Override the properties with translated labels
  override itemsPerPageLabel = this.ITEMS_PER_PAGE;
  override nextPageLabel = this.NEXT_PAGE;
  override previousPageLabel = this.PREVIOUS_PAGE;

}