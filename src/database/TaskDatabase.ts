import { appDataDir } from '@tauri-apps/api/path'
import Database from '@tauri-apps/plugin-sql'
import { Kysely } from 'kysely'
import { TauriSqliteDialect } from 'kysely-dialect-tauri';

import { TaskDatabase } from './TaskTypes';

const appData = await appDataDir();
const dialect = new TauriSqliteDialect({
  database: async prefix => Database.load(`${prefix}${appData}/task.db`),
})

const taskDb = new Kysely<TaskDatabase>({
  dialect
})

export default taskDb
