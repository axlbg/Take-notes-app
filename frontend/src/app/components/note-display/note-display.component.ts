import { Component, Input } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-display',
  standalone: true,
  imports: [],
  templateUrl: './note-display.component.html',
  styleUrl: './note-display.component.css',
})
export class NoteDisplayComponent {
  @Input() note!: Note;
  display: boolean = true;

  constructor(private noteService: NoteService) {}

  changeArchiveStatusNote(id: number): void {
    this.noteService.archiveNote(id).subscribe(() => {
      this.noteService.refreshNotes(!this.note.isArchived);
    });
    this.note.id = -1; // hide component
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.noteService.refreshNotes(!this.note.isArchived);
    });
    this.note.id = -1; // hide component
  }

  saveNote() {
    this.note.id = -1; // hide component
  }
}
