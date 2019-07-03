<template>
  <Layout :title="$page.shopify.productByHandle.title">
    <h1 v-html="$page.shopify.productByHandle.title"></h1>
    <div v-html="$page.shopify.productByHandle.descriptionHtml"></div>
  </Layout>
</template>

<page-query>
query Product ($handle: String!) {
  shopify {
    productByHandle(handle: $handle) {
       collections(first: 10) {
        edges {
          cursor
        }
      }
      createdAt
      description
      descriptionHtml
      handle
      id
      images(first: 10) {
        edges {
          node {
            altText
            id
            src
          }
        }
      }
      onlineStoreUrl
      options(first: 10) {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      productType
      tags
      title
      variants(first: 10) {
        edges {
          node {
            availableForSale
            compareAtPrice
            id
            sku
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Layout from '~/layouts/Default.vue'

export default {
  components: {
    Layout
  },
  metaInfo () {
    return {
      title: this.$page.shopify.productByHandle.title
    }
  }
}
</script>

