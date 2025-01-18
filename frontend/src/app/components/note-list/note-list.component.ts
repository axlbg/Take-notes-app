import { Component, EventEmitter, Output } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  @Output() noteSelected = new EventEmitter<Note>();

  notes: Note[] = [];
  archivedSelected: boolean = false;

  constructor(private noteService: NoteService) {
    this.noteService.notes$.subscribe((data) => {
      this.notes = data;
    });
    this.fetchNotes();
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
