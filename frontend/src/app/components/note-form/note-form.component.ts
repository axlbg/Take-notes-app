import { Component } from '@angular/core';
import { NoteService, Note } from '../../services/note.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent {
  note: Note = { title: '', content: '', archived: false };

  constructor(private noteService: NoteService, private router: Router) {}

  saveNote(): void {
    this.noteService.createNote(this.note).subscribe(() => {
      this.router.navigate(['/']); // Redirige a la lista de notas
    });
  }
}
