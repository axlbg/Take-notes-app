import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { isArchived: false },
      relations: ['category'],
    });
  }

  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { isArchived: true },
      relations: ['category'],
    });
  }

  async create(note: Note): Promise<Note> {
    if (note.category && note.category.id) {
      const category = await this.notesRepository.manager.findOne(Category, {
        where: { id: note.category.id },
      });

      if (!category) {
        throw new Error('Category not found');
      }

      note.category = category;
    }

    return this.notesRepository.save(note);
  }

  async update(id: number, note: Note): Promise<void> {
    await this.notesRepository.update(id, note);
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
      relations: ['category'],
    });
  }
}
