import { capitalize } from 'lodash';

export default class AuthCtrl {
  constructor ($http) {
    this.$http = $http;
    this.message = capitalize('welcome, please sign in!');
  }

  signIn () {
    this.$http.get('https://api.reddit.com/').then(r => console.log(r));
    console.log('signing in');
  }
}
