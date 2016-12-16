const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const shortid = require('shortid');

const context = {
  version: shortid.generate(),
};

const layout = path.resolve(__dirname, 'views', 'layouts/main.hbs');
const source = fs.readFileSync(layout, 'utf8');
const indexTo = 'public/index.html';

const template = Handlebars.compile(source);
const file = template(context);

fs.writeFileSync(indexTo, file, 'utf8');
