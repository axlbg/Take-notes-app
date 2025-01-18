import { Component } from '@angular/core';
import { NoteService, Note } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent {
  note: Note = { title: '', content: '', isArchived: false, category: [] };

  categories: Category[] = [];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  saveNote(): void {
    if (this.note.id) {
      this.noteService.updateNote(this.note.id, this.note).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.noteService.createNote(this.note).subscribe(() => {
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.note = {
      title: '',
      content: '',
      isArchived: false,
      category: [],
    };
  }
}
