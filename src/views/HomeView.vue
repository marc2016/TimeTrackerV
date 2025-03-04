<script setup lang="ts">
import { Dexie, type EntityTable } from 'dexie';
import { ref } from 'vue'

interface Friend {
  id?: number;
  name: string;
  age: number;
}

const db = new Dexie('FriendDatabase') as Dexie & {
  friends: EntityTable<Friend, 'id'>;
};

db.version(1).stores({
  friends: '++id, age',
});

await db.friends.clear()

const test = await db.friends
      .where('age')
      .below(40)
      .toArray()

     
let list = ref(test)
const value = ref(test.join(', '))

async function addFriend(friend: Friend) {
  await db.friends.add(friend);
  const test2 = await db.friends
      .where('age')
      .below(40)
      .toArray()

     
   list.value = test2
}

</script>

<template>
    
</template>
