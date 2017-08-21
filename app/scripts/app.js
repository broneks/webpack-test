import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'fonts/streamline-30px-filled-in.eot';
import 'fonts/streamline-30px-filled-in.svg';
import 'fonts/streamline-30px-filled-in.ttf';
import 'fonts/streamline-30px-filled-in.woff';
import 'fonts/streamline-30px.eot';
import 'fonts/streamline-30px.svg';
import 'fonts/streamline-30px.ttf';
import 'fonts/streamline-30px.woff';

import 'styles/main.scss';

import 'images/mountains.png';

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
