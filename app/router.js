import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('entries.entry.edit', { path: 'entries/entry/:entry_id/edit' });
  this.route('entries.new', { path: 'entries/new' });
  this.route('entries', function() {
    this.route('entry', { path: ':entry_id' }, function() {
      this.route('show');
    });
  });
});

export default Router;
