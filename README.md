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

- main component : ```<App/>```, it contains and shows the following:
- sub components: ```<ProductList/>``` , ```<Product/>```, ```<Cart/>```,
- header component: `<Header/>`: to redirect user to the requested page
- data still loading: `<Loading/>`
- error handling component: `<FetchError/>`

## Component layout
- `<App/>`: on loading, it fetches the requested products from a graphql API
- `<ProductList/>`: shows all products & groups them by type. 
  - The image [ `products.jpg` ] is a bit misleading:
    - it doesn't account for the fact products CANNOT be grouped by their type because the items in a given type don't have the same attributes and price.
    - When you click on a particular type it's not exactly clear WHAT to show: a product or products of a given type.
    - I decided to group the products together by their types and allow user to select a particular group at a time.
  - Here and in `<Product/>`, when user can select the number of a particular product to add to cart
    - eg. buy quantity: 12 of item id: 'mock_prod_id'
    - in both components, there is a value `itemsQuantity` which stores the selected quantity of an particular product id.
    - if `itemsQuantity[mock_prod_id_1234]` doesn't exist, then default value is 1.
    - `itemsQuantity[mock_prod_id_1234]` can contain only numbers - filters out anything else being typed using regex.
    - when user returns back to `<ProductList/>` or `<Product/>` - `itemsQuantity[mock_prod_id_1234]` is cleared do default value is 1.
      - This would help user not to purchase multple products my mistake (eg. when they are in a hurry and don't notice a previous choice)
- `<Product/>`: a particular product
- `<Cart/>`: list of selected items.
  - Here too, the picture is misleading, showing NOT the items but the product types of the items.

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
