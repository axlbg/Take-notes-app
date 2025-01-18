import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  category: Category = {
    name: '',
  };

  constructor(private categoryService: CategoryService) {}

  createCategory() {
    this.categoryService.createCategory(this.category).subscribe(
      (response) => {
        console.log('Category created successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error creating category:', error);
      }
    );
    this.resetForm();
  }

  resetForm(): void {
    this.category = {
      name: '',
    };
  }
}
