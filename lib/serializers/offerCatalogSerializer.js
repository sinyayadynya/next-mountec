import { Serializer } from 'jsonapi-serializer';

// Serializer for the 'list_item' Paragraph
const ListItemSerializer = new Serializer('list_item', {
  attributes: ['item', 'description'], // update the attributes based on your 'list_item' structure
});

// Serializer for the media image
const MediaImageSerializer = new Serializer('media--image_object', {
  attributes: ['id', 'url'], // update the attributes based on your media image structure
});

// Serializer for the 'offer_catalog' custom block
const OfferCatalogSerializer = new Serializer('block_content--offer_catalog', {
  attributes: ['info', 'description', 'disambiguating_description', 'alternate_name', 'image', 'item_list_element'],
  image: {
    ref: 'id',
    included: true,
    relationship: 'image',
    serializer: MediaImageSerializer,
  },
  item_list_element: {
    ref: 'id',
    included: true,
    relationship: 'item_list_element',
    serializer: ListItemSerializer,
  },
  transform(record) {
    if (record.image && record.image.data) {
      record.imageUrl = record.image.data.attributes.url; // Update this path based on your media image structure
    }
    return record;
  },
});

export default OfferCatalogSerializer;
