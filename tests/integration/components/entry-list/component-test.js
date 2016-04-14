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
  assert.equal(
    this.$(testSelector('empty-message')).text(),
    this.get('i18n').t('entry.list.empty')
  );
});


test('it filters out archived if showArchived is false', function(assert) {
  let entry1 = new EntryFactory().build(1),
      entry2 = new EntryFactory().build(2),
      entry3 = new EntryFactory().build(2),
      entries = [entry1, entry2, entry3];

  entry1.archived = false;
  entry2.archived = true;
  entry3.archived = true;

  this.set('entries', entries);
  this.render(hbs`{{entry-list entries=entries showArchived=false}}`);
  assert.equal(this.$(testSelector('entries')).children().length, 1);
});
