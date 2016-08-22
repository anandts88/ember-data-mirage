import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Controller.extend({
  actions: {
    add() {
      get(this, 'model').save();
    }
  }
});
