import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormItemsComponent } from './forms/form-items/form-items.component';
import { FormListsComponent } from './forms/form-lists/form-lists.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { FormUsersComponent } from './forms/form-users/form-users.component';
import { FormEventsComponent } from './forms/form-events/form-events.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';




@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    NopageComponent,
    FooterComponent,
    DeleteDialogComponent,
    FormListsComponent,
    FormItemsComponent,
    FormUsersComponent,
    FormEventsComponent

  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatSlideToggleModule,
    NgxMatMomentModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,





  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    NopageComponent,
    FooterComponent,
    DeleteDialogComponent
  ]
})
export class SharedModule { }
