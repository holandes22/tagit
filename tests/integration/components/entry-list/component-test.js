import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';
import EntryFactory from 'tagit/mirage/factories/entry';
import initializer from "tagit/instance-initializers/ember-i18n";
import _ from 'lodash/lodash';


moduleForComponent('entry-list', 'Integration | Component | entry list', {
  integration: true,
  setup() {
    initializer.initialize(this);
  }

});

test('it renders an entry list', function(assert) {
  let ids = _.range(3);
  let entries = ids.map((id) => {
      return new EntryFactory().build(id);
  });

  this.set('entries', entries);
  this.render(hbs`{{entry-list entries=entries}}`);
  assert.equal(this.$(testSelector('entries')).children().length, 3);
});


test('it shows a message if entry list is empty', function(assert) {
  this.inject.service('i18n');
  this.set('entries', []);
  this.render(hbs`{{entry-list entries=entries}}`);
  assert.equal(this.$(testSelector('entries')).children().length, 0);
  assert.equal(
    this.$(testSelector('empty-message')).text(),
    this.get('i18n').t('entry.list.empty')
  );
});
