// ./lib/serializers/HowToStepSerializer.js

export default function HowToStepSerializer(data) {
    const { attributes } = data;
    return {
      schemaDescription: attributes?.field_schema_description,
      schemaName: attributes?.field_schema_name,
      schemaImage: attributes?.field_schema_image,
      schemaItemListElement: attributes?.field_schema_item_list_element,
    };
  }
