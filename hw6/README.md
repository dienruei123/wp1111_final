# Web Programming HW#6

###### Author: b10901038 吳典叡

### Run Program

1. Download node_modules
   (Important!! Must add modules in both frontend and backend)

```bash
yarn add
cd hw6/frontend
yarn add
cd hw6/backend
yarn add
```

- Run: First `yarn server` then `yarn start`

2. In `/backend`, make a copy of `.env.defaults` as `.env`, and paste your mongo db URL for testing

## Basic features

1. When `CLEAR` button is triggered, `DELETE` request will be sent and the database will be cleared; also, "Database cleared" string will be printed at message box.
2. In `Add Data` function, when input all 3 params, press `ADD` button, and the data will be sent to backend:
   - If there exists {Name, Subject} paired value in the database, then replace the data with new one and "Updating(...)" will be printed.
   - Otherwise add data in the database, and "Adding(...)" will be printed.
3. In `Query Data` function, choose the type of query(QueryType) and queryString, press `QUERY` button, and one of the following cases occurs:
   - Case 1: If data doesn't exist, then "QueryType(...)" not found!" will be printed.
   - Case 2: (Advanced feature )
4. Press `CLEAR` button will clear all the messages in the message box and print out "Database cleared".

## Advanced features

1. `Add Data` page and `Query Data` page are controlled by `Tabs` (imported from `material-ui/core`); will change views according to the active tab
2. `Add Data` view: Not only show "Updating(...), Adding(...)" messages in message box but also print out all data of the person(Name) by means of `Table` (import from `material-ui/core`)
3. `Query Data` view: Print out query results (if exists) by means of `Table`; while query results not existing will still print "QueryType(...)" not found!".

## Additional features
