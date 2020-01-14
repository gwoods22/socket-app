import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  currentBasic = this.socket.fromEvent<String>('basicEvent');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  //Home Functions
  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }
  newDocument() {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }
  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  // Basic Functions
  getBasic() {
    this.socket.emit('getBasic');
  }
  editBasic(document: String) {
    this.socket.emit('editBasic', document);
  }

  private docId = () => ( Math.random().toString(36).substring(7) );
}
