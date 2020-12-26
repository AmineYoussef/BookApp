import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Book } from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  async createBook(data: Book) {
    return this.db.collection('books').add(data);
  }

  deleteBook(bookId: string) {
    return this.db.collection("books").doc(bookId).delete();
  }

  getUserBooks() {
    return this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.collection<Book>('books', ref =>
          ref.where('uid', '==', user.uid)).valueChanges({ idField: 'id' });
      } else
        return [];
    })
    );
  }

  updateBook(bookId: string, data: Book) {
    return this.db.collection('books').doc(bookId).update(data);
  }
}
