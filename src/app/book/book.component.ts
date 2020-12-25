import { Component, OnInit } from '@angular/core';
import { BookDialogComponent } from '../dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { Book } from './book.model';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(public bookService: BookService, public dialog: MatDialog, private afAuth: AngularFireAuth, private router: Router) { }

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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        var splitTags = result.tags.split(" ");
        this.bookService.createBook({ title: result.title, author: result.author, tags: splitTags });
      }
    });
  }

  onClickDelete(bookTitle: string): void {
    this.bookService.deleteBook(bookTitle);
    this.subscription = this.bookService.getUserBooks().subscribe(books => (this.books = books));
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
