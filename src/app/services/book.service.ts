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
    const user = await this.afAuth.currentUser;
    var currDate = new Date();
    return this.db.collection('books').add({
      title: data.title,
      author: data.author,
      tags: data.tags,
      date: currDate.toISOString(),
      uid: user.uid
    });
  }

  deleteBook(bookTitle: string) {
    return this.db.collection('books').doc(bookTitle).delete;
  }

  getUserBooks() {
    return this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.collection<Book>('books', ref =>
          ref.where('uid', '==', user.uid)).valueChanges({ idfield: 'id' });
      } else
        return [];
    })
    );
  }
}
