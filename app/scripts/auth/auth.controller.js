export default class AuthCtrl {
  constructor ($http) {
    this.$http = $http;
    this.message = 'welcome, please sign in!';
  }

  signIn () {
    $http.get('https://api.reddit.com/').then(r => console.log(r));
    console.log('signing in');
  }
}
