<template>
  <Layout>
    <h1>Products</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>

    <ul>
      <li v-for="edge in $page.shopify.products.edges" :key="edge.node.id">
       <g-link :to="`/products/${edge.node.handle}`">
          {{ edge.node.title }}
        </g-link>
      </li>
    </ul>

    <Pager :info="$page.shopify.products.pageInfo"/>
  </Layout>
</template>

<page-query>
query allProducts($cursor: String) {
  shopify {
    products(first:10, after: $cursor) @paginate {
      edges {
        node {
          id,
          title,
          handle
        },
        cursor
      }
      pageInfo {
        hasNextPage,
        hasPreviousPage,
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome';

export default {
  metaInfo: {
    title: 'About us'
  },

  components: {
    Pager
  }
}
</script>
