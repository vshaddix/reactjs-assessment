# ReactJS assesment application

This application is build only for learning purposes.

## Installation and starting the application
* `yarn install` and then `yarn start`

or you could run `npm install` and `npm start`

## Building
* `yarn build`

## How to run the tests
* `yarn test`

## Deployment
Currently, travis is set to automatically deploy the application on every commit.
You can view the live application at https://vshaddix.github.io/reactjs-assessment/

If you wish to create manual build, you could run `yarn build`

---

## Future ideas

- [ ] Check on every request if the API limit is reached and display an error page.
- [ ] Remove the `Load more` button and replace it with lazy rendering
- [ ] This could be reworked with redux in order to achieve the following ideas (redux is not mandatory, but it could become more easily maintainable):
[ ] Create a custom page for a single city and display multiple measurements for a single parameter.
[ ] Add some charts for the measurements
[ ] Filter the measurements by dates.

## Technical dept
- [ ] A lot of tests are missing currently (Unit and Snapshot).
- [ ] The filters could be moved to a component to keep the `App` cleaner and with less logic.
- [ ] Most of the methods don't have any JS Doc comments, would be good to add some.
