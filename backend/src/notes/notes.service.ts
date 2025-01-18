import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isArchived: false } });
  }

  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({ where: { isArchived: true } });
  }

  create(note: Note): Promise<Note> {
    return this.notesRepository.save(note);
  }

  update(id: number, note: Note): Promise<Note> {
    return this.notesRepository.save({ ...note, id });
  }

  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async archive(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new Error('Note not found');
    }
    note.isArchived = !note.isArchived;
    return this.notesRepository.save(note);
  }

  filterByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { category: { id: categoryId } },
    });
  }
}
