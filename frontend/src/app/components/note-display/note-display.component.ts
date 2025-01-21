import { Component, Input } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { Category, CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-display',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note-display.component.html',
  styleUrl: './note-display.component.css',
})
export class NoteDisplayComponent {
  @Input() note!: Note;
  display: boolean = true;
  edit: boolean = false;

  categories: Category[] = [];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  changeArchiveStatusNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      this.noteService.refreshNotes(!this.note.isArchived);
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.noteService.refreshNotes(!this.note.isArchived);
    });
    this.note.id = 0; // hide component
  }

  saveNote(): void {
    if (this.edit) {
      const id = this.note.id;
      if (id != undefined) {
        let note: Note = {
          title: this.note.title,
          content: this.note.content,
          isArchived: this.note.isArchived,
          category: this.note.category,
        };
        this.noteService.updateNote(id, note).subscribe(() => {
          this.noteService.refreshNotes(!note.isArchived);
        });
      }
    }
    alert('Saved successfully.');
    this.edit = false;
  }

  clickEdit(): void {
    this.edit = !this.edit;
  }
}
