# Github repository rank

## Available Scripts

In the project directory, you can run:

### `npm install` 
and
### `npm start`

## About

Application fetches members of React.js community using public github api, and allows to view, sort members, view member details and his repos, and also view selected repo details. You can easily find most starred and most contriubuting users in community.

## Challenges

There is rate limit in GH api, and it cannot serve more than 5000 request per hour per specific user
I used bottleneck to make sure not to go beyond that number

Also data from endpoints is served paginated, and ith takes some time to fetch all data for all members



