import angular from 'angular';

import AuthCtrl from './auth.controller';

export default angular.module('auth', [])
  .controller('AuthCtrl', AuthCtrl)
  .name;
