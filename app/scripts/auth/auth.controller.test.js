import authModule from './auth.module';

describe('AuthCtrl', () => {
  let $controller;

  beforeEach(angular.mock.module(authModule));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should contain a message property that is a capitalized welcome message', () => {
    const ctrl = $controller('AuthCtrl');
    expect(ctrl.message).toEqual('Welcome, please sign in!');
  });
});
