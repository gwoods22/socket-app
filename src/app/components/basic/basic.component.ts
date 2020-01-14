import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Subscription } from 'rxjs';
import { Document } from 'src/app/models/document';
import { startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, OnDestroy {
  document: String;
  private _docSub: Subscription;
  constructor(private router: Router, private documentService: DocumentService) { }

  ngOnInit() {
    this._docSub = this.documentService.currentBasic.pipe(
      startWith('')
    ).subscribe(document => this.document = document);
    this.documentService.getBasic();
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editBasic(this.document);
  }
}
