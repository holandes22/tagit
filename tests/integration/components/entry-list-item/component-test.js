import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';
import EntryFactory from 'tagit/mirage/factories/entry';
import initializer from "tagit/instance-initializers/ember-i18n";

moduleForComponent('entry-list-item', 'Integration | Component | entry list item', {
  integration: true,
  setup() {
    initializer.initialize(this);
  }
});

test('it renders', function(assert) {
  let entry = new EntryFactory().build(1);
  entry.tags = ['a', 'b'];
  this.set('entry', entry);
  this.render(hbs`{{entry-list-item entry=entry}}`);
  assert.equal(this.$(testSelector('entry-link')).text().trim(), entry.link);
  assert.equal(this.$(testSelector('entry-notes')).text(), entry.notes);
  assert.equal(this.$(testSelector('entry-tags')).text(), entry.tags.join(''));
  assert.equal(this.$(testSelector('entry-archived')).data('archived'), entry.archived);
  assert.equal(this.$(testSelector('entry-ranking')).data('ranking'), entry.ranking);
});


test('it bubbles up delete action', function(assert) {
  let entry = new EntryFactory().build(1);
  let del = function(entryToDelete) {
    assert.equal(entry.id, entryToDelete.id);
  };
  this.set('entry', entry);
  this.set('actions', { del });

  this.render(hbs`{{entry-list-item entry=entry del=(action 'del')}}`);
  this.$(testSelector('del-button')).click();
});