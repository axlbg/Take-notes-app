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
  note: Note = {
    title: '',
    content: '',
    isArchived: false,
    category: undefined,
  };

  categories: Category[] = [];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.resetForm();
    });
  }

  saveNote(): void {
    this.noteService.createNote(this.note).subscribe(() => {
      console.log(this.note);
      this.resetForm();
    });
  }

  resetForm(): void {
    this.note = {
      title: '',
      content: '',
      isArchived: false,
      category: this.categories[0],
    };
  }
}
