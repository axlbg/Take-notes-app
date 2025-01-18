import { Component, EventEmitter, Output } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  @Output() noteSelected = new EventEmitter<Note>();

  notes: Note[] = [];
  filteredNotes: Note[] = [];
  archivedSelected: boolean = false;
  term: string = '';

  defaultMessageFilter: string = 'Filter by category...';
  categoryFilter: string = this.defaultMessageFilter;
  categories: Category[] = [];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.noteService.notes$.subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.notes;
    });
    this.fetchNotes();

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  outNote(note: Note) {
    this.noteSelected.emit(note);
  }

  fetchNotes(): void {
    this.noteService.getActiveNotes().subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.filterNotesByCategory(this.notes);
    });
  }

  fetchArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.filterNotesByCategory(this.notes);
    });
  }

  filterNotes() {
    const searchTerm = this.term.toLowerCase().trim();
    if (searchTerm) {
      let staticNotes = this.filterNotesByCategory(this.notes);
      this.filteredNotes = staticNotes.filter(
        (note: any) =>
          note.title && note.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredNotes = this.filterNotesByCategory(this.notes);
    }
  }

  filterByCategory() {
    this.filteredNotes = this.filterNotesByCategory(this.notes);
  }

  filterNotesByCategory(notes: Note[]): Note[] {
    const searchTerm = this.categoryFilter;
    if (searchTerm == this.defaultMessageFilter) {
      return notes;
    }

    let filteredNotes: Note[];
    filteredNotes = notes.filter(
      (note: any) => note.category.name == searchTerm
    );
    return filteredNotes;
  }
}
