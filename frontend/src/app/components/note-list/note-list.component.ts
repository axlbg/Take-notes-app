import { Component } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  archiveNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }
}
