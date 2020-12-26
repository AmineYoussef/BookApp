import { Component, OnInit } from '@angular/core';
import { BookDialogComponent } from '../dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { Book } from './book.model';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class BookComponent implements OnInit {


  constructor(public bookService: BookService, public dialog: MatDialog, private afAuth: AngularFireAuth, private router: Router) {

  }

  user: any;
  books: Book[];
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.bookService.getUserBooks().subscribe(books => (this.books = books));
    console.log(this.books);
  }

  openBookDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log(result)
        var splitTags = result.tags.split(" ");

        const user = await this.afAuth.currentUser;
        var currDate = new Date();
        var addedBook: Book;

        addedBook = result;
        addedBook.date = currDate.toISOString();
        addedBook.uid = user.uid;

        this.bookService.createBook(addedBook);
      }
    });
  }

  openUpdateBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: {
        title: book.title,
        author: book.author,
        tags: book.tags
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log(result)
        var splitTags = result.tags.split(" ");

        const user = await this.afAuth.currentUser;
        var currDate = new Date();
        var addedBook: Book;

        addedBook = result;
        addedBook.date = currDate.toISOString();
        addedBook.uid = user.uid;

        this.bookService.updateBook(book.id, addedBook);
      }
    });
  }

  deleteBook(bookId: string): void {
    console.log("deleting: ", bookId);
    this.bookService.deleteBook(bookId).then();
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  sortByTitle(): Book[] {
    return this.books.sort((a,b) => a.title.localeCompare(b.title));
  }

  sortByAuthor(): Book[] {
    return this.books.sort((a,b) => a.author.localeCompare(b.author));
  }
  
  sortByDate(): Book[] {
    return this.books.sort((a,b) => a.date.localeCompare(b.date));
  }


}
