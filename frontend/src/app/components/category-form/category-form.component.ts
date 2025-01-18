import { Component } from '@angular/core';
import { Category } from '../../services/category.service';
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

  createCategory() {
    console.log('submite');
    this.resetForm();
  }

  resetForm(): void {
    this.category = {
      name: '',
    };
  }
}
