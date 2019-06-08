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
      id,
      title,
      descriptionHtml
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

