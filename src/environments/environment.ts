// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBmm3dVk57cIE386P2In7MTLsSZ9y_6Qu8',
    authDomain: 'saladejuegos-app.web.app',
    databaseURL: 'gs://saladejuegos-app.appspot.com',
    projectId: 'saladejuegos-app',
    storageBucket: '',
    messagingSenderId: '718871633595'
  }
};

// <script src="/__/firebase/7.21.1/firebase-app.js"></script>

// <script src="/__/firebase/7.21.1/firebase-analytics.js"></script>

// <script src="/__/firebase/init.js"></script>

// npm install -g firebase-tools
