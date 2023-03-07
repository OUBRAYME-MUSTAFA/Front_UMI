import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { EtablissementsComponent } from './components/etablissements/etablissements.component';
import { FilieresComponent } from './components/filieres/filieres.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { PlanningExamensComponent } from './components/planning-examens/planning-examens.component';
import { JournalistesComponent } from './components/Journal/journalistes/journalistes.component';
import { ArticlesComponent } from './components/Journal/articles/articles.component';
import { ExamensComponent } from './components/planning-examens/examens/examens.component';
import { DepartementsComponent } from './components/etablissements/departements/departements.component';
import {CheckExistValidatorDirective} from "./directives/CheckExistValidator.directive";
import {NumberValidatorDirective} from "./directives/number-validator.directive";
import {FileCheckValidatorDirective} from "./directives/FileCheckValidator.directive";
import { LaboComponent } from './components/labo/labo.component';
import { AxeComponent } from './components/axe/axe.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { ChercheurComponent } from './components/chercheur/chercheur.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { FormationComponent } from './components/formation/formation.component';
import {jqxWindowModule} from "jqwidgets-ng/jqxwindow";
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EtablissementsComponent,
    FilieresComponent,
    HomeComponent,
    PlanningExamensComponent,
    JournalistesComponent,
    ArticlesComponent,
    ExamensComponent,
    DepartementsComponent,
    CheckExistValidatorDirective,
    NumberValidatorDirective,
    FileCheckValidatorDirective,
    LaboComponent,
    AxeComponent,
    EquipeComponent,
    ChercheurComponent,
    FormationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    jqxWindowModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class AppModule { }
