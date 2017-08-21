import signInTemplateUrl from 'app/sign-in.html';

export default function routes ($stateProvider) {
  $stateProvider
    .state('sign-in', {
      url: '/sign-in',
      views: {
        'main@': {
          templateUrl: signInTemplateUrl,
          controller: 'AuthCtrl as ctrl',
        },
      },
    });
}
