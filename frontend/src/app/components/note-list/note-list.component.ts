import { Component, EventEmitter, Output } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule, NgClass } from '@angular/common';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  notes: Note[] = [];
  @Output() noteSelected = new EventEmitter<Note>();

  archivedSelected: boolean = false;

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService
  ) {
    this.noteService.getActiveNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  outNote(note: Note) {
    this.noteSelected.emit(note);
  }

  fetchNotes(): void {
    this.noteService.getActiveNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  fetchArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe((data) => {
      this.notes = data;
    });
  }
}
