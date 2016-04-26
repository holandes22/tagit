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
  entry.link = 'https://example.com';
  this.set('entry', entry);
  this.render(hbs`{{entry-list-item entry=entry}}`);
  assert.equal(this.$(testSelector('entry-link')).text().trim(), entry.link);
  assert.equal(this.$(testSelector('entry-link')).attr('href'), entry.link);
  assert.equal(this.$(testSelector('entry-notes')).text(), entry.notes);
  assert.equal(this.$(testSelector('entry-tags')).text(), entry.tags.join(''));
  assert.equal(this.$(testSelector('entry-archived')).data('archived'), entry.archived);
  assert.equal(this.$('.ui.rating').children().length, 5);
  assert.equal(this.$('.ui.rating').children('.active').length, entry.rating);
});


test('it avoids adding href if link does not start with correct protocol', function(assert) {
  let entry = new EntryFactory().build(1);
  entry.link = 'http:notstarting.with.correct.protocol';
  this.set('entry', entry);
  this.render(hbs`{{entry-list-item entry=entry}}`);
  assert.equal(this.$(testSelector('entry-link')).text().trim(), entry.link);
  assert.equal(this.$(testSelector('entry-link')).attr('href'), undefined);
});
