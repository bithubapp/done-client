import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('bithub-admin functional smoke test', {
  beforeEach() {
    F.open('../../development.html');
  }
});
