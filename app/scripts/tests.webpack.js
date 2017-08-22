import 'angular';
import 'angular-mocks/angular-mocks';

const testsContext = require.context('.', true, /.test/);

testsContext.keys().forEach(testsContext);
