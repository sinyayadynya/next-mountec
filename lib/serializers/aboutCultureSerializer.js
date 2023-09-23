// lib/serializers/aboutCultureSerializer.js
const { Serializer } = require('jsonapi-serializer');

const aboutCultureSerializer = new Serializer('block_content--item_list', {
  attributes: ['id', 'label', 'alternate_name', 'body', 'item_list_element'],
  keyForAttribute: 'camelCase',

  item_list_element: {
    ref: 'id',
    included: true,
    attributes: ['type', 'id', 'item', 'description'],
  },

  dataLinks: {
    self: (data, blockContent) => {
      return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/block_content/item_list/${blockContent.id}`;
    },
  },
});

module.exports = aboutCultureSerializer;
