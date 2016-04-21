import Ember from 'ember';

export default Ember.Controller.extend({
  entry: Ember.computed('model.{link,notes,archived,ranking,tags}', function() {
    return this.get('model').toJSON();
  }),

  actions: {
    save(properties) {
      let model = this.get('model');
      model.setProperties(properties);
      this.model.save().then(() => {
        this.transitionToRoute('entries', { queryParams: { active: model.id } });
      });
    }
  }
});
