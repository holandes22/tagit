import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized.join(',');
  },

  serialize(deserialized) {
    if (deserialized) {
      return deserialized.split(',');
    }
    return [];
  }
});
