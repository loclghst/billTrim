import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';

class SnapshotStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case 'GET_SNAPSHOT_DATA':
        return [...action.data];
      default:
        return state;
    }
  }
}

export default new SnapshotStore;