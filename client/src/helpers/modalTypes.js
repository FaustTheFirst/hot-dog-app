import { addHotDog, editHotDog, removeHotDog } from '../state/thunks';

export default {
  Create: [
    {
      fn: body => addHotDog(body),
      buttonName: 'create',
      color: 'green',
      status: 'creating',
      canDisable: true
    }
  ],
  Update: [
    {
      fn: ({ id, ...body }) => editHotDog({ id, body }),
      buttonName: 'edit',
      color: 'blue',
      status: 'updating',
      canDisable: true
    },
    {
      fn: ({ id }) => removeHotDog(id),
      buttonName: 'delete',
      color: 'red',
      status: 'deleting',
      canDisable: false
    }
  ]
};
