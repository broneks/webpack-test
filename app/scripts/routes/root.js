import rootTemplateUrl from 'app/view.html';

export default function routes ($stateProvider) {
  $stateProvider
    .state('root', {
      url: '/',
      views: {
        'main@': {
          templateUrl: rootTemplateUrl,
        },
      },
    });
}
