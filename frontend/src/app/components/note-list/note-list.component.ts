import { Component, EventEmitter, Output } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private noteService: NoteService) {
    this.noteService.notes$.subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.notes;
    });
    this.fetchNotes();
  }

  outNote(note: Note) {
    this.noteSelected.emit(note);
  }

  fetchNotes(): void {
    this.noteService.getActiveNotes().subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.notes;
    });
  }

  fetchArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe((data) => {
      this.notes = data;
      this.filteredNotes = this.notes;
    });
  }

  filterNotes() {
    const searchTerm = this.term.toLowerCase().trim();
    if (searchTerm) {
      console.log('log');
      this.filteredNotes = this.notes.filter(
        (note: any) =>
          note.title && note.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredNotes = this.notes;
    }
  }
}
