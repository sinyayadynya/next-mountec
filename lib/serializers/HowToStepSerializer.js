import { Serializer } from 'jsonapi-serializer';

const HowToStepSerializer = new Serializer('how_to_step', {
  attributes: ['name', 'description', 'image', 'item_list_element'],
  keyForAttribute: 'camelCase',
  transform(record) {
    // Add custom transformations here if needed
    // For example, you can flatten the 'image' media field
    if (record.image && record.image.data) {
      record.image = record.image.data.attributes;
    }

    return record;
  },
});

export default HowToStepSerializer;
