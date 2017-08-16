import 'styles/another.scss';

import capitalize from 'lodash/capitalize';

function hello (name = 'dude') {
  console.log(`Hello, ${capitalize(name)}!`);
}

export default hello;
