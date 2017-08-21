import angular from 'angular';

import AuthCtrl from './auth.controller';

export const AuthModule = angular
  .module('auth', [])
  .controller('AuthCtrl', AuthCtrl)
  .name;
