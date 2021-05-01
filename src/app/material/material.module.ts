import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Navbar */
import {  MatAutocomplete, MatAutocompleteModule, MatButtonModule, 
          MatCheckboxModule, 
          MatChipsModule, 
          MatDatepickerModule, 
          MatFormFieldModule, 
          MatIconModule, 
          MatInputModule, 
          MatNativeDateModule, 
          MatPaginatorModule, 
          MatProgressSpinnerModule, 
          MatSelectModule, 
          MatTableModule, 
          MatTabsModule, 
          MatToolbarModule } from '@angular/material';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [],
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    /* Para formularios */
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    /* Calendario */
    MatDatepickerModule,
    MatNativeDateModule,
    /* Markdown tabs */
    MatTabsModule,
    /* AutoCompletado */
    MatAutocompleteModule,
    /* Tabla */
    MatTableModule,
    /* Arrastre */
    DragDropModule,
    /* Paginacion */
    MatPaginatorModule,
    /* Progress */
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
