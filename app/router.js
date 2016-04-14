import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('entries', function() {
    this.route('entry', { path: ':entry_id' }, function() {
      this.route('edit');
      this.route('show');
    });
    this.route('new');
  });
});

export default Router;
