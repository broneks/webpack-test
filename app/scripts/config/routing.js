export default function routing ($locationProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('');
  $urlRouterProvider.otherwise('/');
}
