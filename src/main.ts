import { bootstrapApplication } from '@angular/platform-browser';
import { AutocompleteReactiveFormsDemo } from './app/autocomplete-reactive-forms-demo';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [];

bootstrapApplication(AutocompleteReactiveFormsDemo, {
providers: [provideAnimationsAsync(), provideRouter(routes)],
}).catch((err) => console.error(err));