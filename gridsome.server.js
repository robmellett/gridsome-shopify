// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = function (api) {
  
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api

    const contentType = addContentType({
      typeName: 'ShopifyProduct',
      route: 'products/:handle' // add this for one dynamic route...
    })
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api

    const { data } = await graphql(`
      query {
        shopify {
          products(first: 10) {
            edges {
              node {
                id,
                handle
              },
              cursor
            }
            pageInfo {
              hasNextPage,
              hasPreviousPage
            }
          }
        }
      }
    `)

   data.shopify.products.edges.forEach(({
     node
   }) => {
     createPage({
       path: `/products/${node.handle}`,
       component: './src/templates/ShopifyProduct.vue',
       context: {
         id: node.id,
         handle: node.handle,
         title: node.title
       }
     })
   })
  });
}