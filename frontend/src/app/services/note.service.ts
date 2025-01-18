import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Note {
  id?: number;
  title: string;
  content: string;
  archived: boolean;
  category?: number[];
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}
  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/active`);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/archived`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(id: number, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  archiveNote(id: number): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}/${id}/archive`, {});
  }

  // Asignar categorías a una nota
  addCategoriesToNote(noteId: number, categoryIds: number[]): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${noteId}/categories`, {
      categories: categoryIds,
    });
  }

  // Filtrar notas por categoría
  getNotesByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/category/${categoryId}`);
  }
}
