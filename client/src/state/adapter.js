import { createEntityAdapter } from '@reduxjs/toolkit';

export default createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt)
});
