//getting the products
class Products {
  async getProducts() {
    try {
    let contentful = await client.getEntries({
      content_type: 'comfyHouseProducts'
    })
      let products = contentful.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image }
      })
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
