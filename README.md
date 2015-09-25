# EU Referendum – 1975 archive

| What         | Where   |
| -------------:| ------------- |
| Live URL      | http://ig.ft.com/sites/2015/eu-referendum-1975-archive/  |
| Vanity URL    | http://ft.com/eu-ref  |
| Spreadsheet   | https://docs.google.com/spreadsheets/d/1lRXhTum3BwbIcLn5BJeMpX5MHYH--cmR6wsE4tGrS8U/edit  |
| Republish     | http://bertha.ig.ft.com/republish/publish/js/1lRXhTum3BwbIcLn5BJeMpX5MHYH--cmR6wsE4tGrS8U/basic,stories,content?d=spreadsheet  |


## Quick start

1. Clone this repository.
2. `$ npm install && bower install && bundle install`
3. `$ npm start` to start the BrowserSync development server. (This is a wrapper around `$ gulp serve`).
4. Develop.

- ⚠️ Often the BrowserSync server seems to refresh your browser too soon, and you get served the old copy, so you often need to manually refresh again after a change.
- ⚠️ BrowserSync fails to pick up new files properly, so you should <kbd>CTRL+C</kbd> and re-run `npm start` after creating a new file.


## To build and deploy

Assuming you're set up with [igdeploy](https://github.com/ft-interactive/igdeploy) already (i.e. you have an `.igdeploy` file):

1. `$ gulp build && gulp deploy && gulp open`

That should deploy the site and open it in your browser.
