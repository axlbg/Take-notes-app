import { Category } from 'src/category/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => Category, (category) => category.notes)
  category: Category;
}
