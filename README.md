# Spoke coding test

## Tech stack

- React
- React hooks `useReducer` - state management tool (lightweight alternative to Redux)
- Sass - css preprocessor
- Eslint - code linter
- Jest & Enzyme - React testing tools

- I did not use the following (app was fairly simple, no need for these):
  - React Router - components were fairly simple, not too many pages to switch to

## App structure

- main component : ```<App/>```
- sub components: ```<Profile/>``` , ```<NotFound/>```

## Coding techniques / styles

  ### fetching graphql data
  - as per instruction: fetch the first 50 products
  - fetch the first 2 images for each product - we need only these in `ProductList` and `Product`.
  - grouping the products as arrays in object items `{'Heroes': [...], 'Polos': [...], 'Sharps': [...]}`:
    - done via object / array manipulation in `graphhelper.js` because the graphql server doesn't permit the following:
        - optaining 3 sets of renamed queries (observe that `Polo` is renamed to `Polos`)
          ```
          query{
            Heroes: products(first:50, productType: 'Heroes'){...}
            Sharps: products(first:50, productType: 'Sharps'){...}
            Polos: products(first:50, productType: 'Polo'){...}
          }
          ```


## Application

When it starts, ...

## Running

- You need an `.env` file (stored in the root folder) that exposes [ `API_URL` & `API_TOKEN` ]
  
    Remember `.env` files are generally NOT committed on git 

- If necessary, change the following default application port in `port_config.js`:
  - client [ 8080 ]
    
    Alternatively, store this info in the same `.env` file containing the tokens.
    

- Clone or download the application
- ```git clone``` or download this repository
- ```cd ____``` or ```cd ____-master```
- ```yarn install``` to download required packages (client-side)
- ```yarn start``` to run the application ==> it opens up a new browser


## Linting

- ESLint `yarn eslint`
- Sass lint `yarn sass-lint`


## Static typechecking with Flow

- Stop flow server `yarn flow stop`
- Start flow server `yarn flow start`
- Run flow `yarn flow status`


## Testing with jest & enzyme

- test: `yarn test`
