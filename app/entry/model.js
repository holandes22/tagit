import DS from 'ember-data';

export default DS.Model.extend({
  link: DS.attr('string'),
  notes: DS.attr('string', { defaultValue: '' }),
  archived: DS.attr('boolean', { defaultValue: false }),
  ranking: DS.attr('number', { defaultValue: 1 }),
  tags: DS.attr('tags')
});
