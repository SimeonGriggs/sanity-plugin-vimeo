/**
 * Shorthand helper for writing Sanity fields
 *
 * @param {string} name Converts to first uppercase letter for title
 * @param {string} type Field type, defaults to 'string'
 * @param {array} arrayOf For 'array' and 'object' type fields, populates the field
 */
export function quickFields(name, type = 'string', arrayOf = [], preview = []) {
  const field = {
    name,
    title: name.charAt(0).toUpperCase() + name.slice(1),
    type,
  };

  if (arrayOf.length) {
    if (type === 'array') field.of = arrayOf;
    if (type === 'object') field.fields = arrayOf;
  }

  if (preview.length) {
    if (type === 'object') {
      field.preview = {
        select: {
          title: preview[0] || '',
          subtitle: preview[1] || '',
          media: preview[2] || '',
        },
      };
    }
  }

  console.log(field);

  return field;
}

/**
 * Arrays in Sanity need unique 'keys'
 * This function maps an existing key in the array to '_key'
 *
 * @param {arr} array The array to mutate
 * @param {string} uniqueArrayKey The key in this array to setup as the unique key
 */
export function addKeys(array, uniqueArrayKey) {
  return array.map(item => {
    item._key = item[uniqueArrayKey];

    return item;
  });
}
