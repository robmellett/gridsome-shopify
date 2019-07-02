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

    let hasNextPage = false;
    let queryCursor = ""; // after: "${queryCursor}"

    do {
      console.log(queryCursor);

      const { data } = await graphql(`
        query($cursor: String) {
          shopify {
            products(first: 5, after: $cursor) {
              pageInfo {
                hasNextPage,
                hasPreviousPage
              }
              edges {
                cursor,
                node {
                  id,
                  title,
                  handle
                }
              }
            }
          }
        }
      `);

      data.shopify.products.edges.forEach(({ node, cursor }) => {

        console.log(">>> " + node.title );

        createPage({
          path: `/products/${node.handle}`,
          component: './src/templates/ShopifyProduct.vue',
          context: {
            id: node.id,
            handle: node.handle,
            title: node.title
          }
        });

        // hasNextPage = data.shopify.products.pageInfo.hasNextPage;
        queryCursor = cursor;
      })
    }
    while(hasNextPage);
  });
}
