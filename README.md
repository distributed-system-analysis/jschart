## About

jschart is a Javascript library that renders SVG charts. This testing environment is comprised of a simple React application to test changes to the jschart node module and ensure native functionality with React. 

## Scaffolding

```bash
├── jschart                  # local node module
│   ├── index.js             # library entry point
│   ├── package.json         
├── public                   
├── src
│   ├── App.css              # test app styling
│   ├── App.js               # App component definition
│   ├── App.test.js          # App component test definition
│   ├── index.js             # entry point 
├── README.md
└── package.json
```

## Installation 

Install Testing Environment Dependencies

```bash
$ npm install
```

Install Local jschart Node Module

```bash
$ npm install --save jschart/
```

This will create a reference to the `jschart/` directory under dependencies in `package.json`:

```
"dependencies": {
  "jschart": "file:jschart"
}
```

Start Development Server

```bash
$ npm start
```

## Publishing Node Module

```bash
$ npm login
$ npm publish
```
