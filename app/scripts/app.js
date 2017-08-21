import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { AuthModule } from './auth/auth.module';

import routing from './config/routing';

import root from './routes/root';
import auth from './routes/auth';


angular
  .module('TestApp', [
    uiRouter,
    AuthModule,
  ])
  .config(routing)
  .config(root)
  .config(auth);
