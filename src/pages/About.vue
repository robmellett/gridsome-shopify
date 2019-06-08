<template>
  <Layout>
    <h1>About us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>

    <ul>
      <li v-for="edge in $page.shopify.products.edges" :key="edge.node.id">
       <g-link :to="`/products/${edge.node.handle}`">
          {{ edge.node.title }}
        </g-link>
      </li>
    </ul>

  </Layout>
</template>

<page-query>
query allProducts {
  shopify{
    products(first:10) {
      edges {
        node {
          id,
          title,
          handle
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About us'
  },
}
</script>
