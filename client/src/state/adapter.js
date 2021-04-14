import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at)
});
