import { Dexie, type EntityTable } from 'dexie';

const taskDb = new Dexie('TaskDatabase') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
};

taskDb.version(1).stores({
  tasks: '++id, name, description, done, createdAt, updatedAt',
});

export default taskDb;

// await db.friends.clear()

// const test = await db.friends
//       .where('age')
//       .below(40)
//       .toArray()

