import knex from 'knex';
import { ISqlConfig } from '../helpers/interface/common.interface';

const KnexConnect = (sqlConfig: ISqlConfig) => {
  const knexMaster = knex({
    client: sqlConfig.client,
    connection: {
      host: sqlConfig.host,
      port: sqlConfig.port,
      user: sqlConfig.user,
      password: sqlConfig.password,
      database: sqlConfig.database,
      charset: 'utf8mb4',
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: sqlConfig.migrations,
    },
  });

  setTimeout(
    async () => {
      await checkConnection();
    },
    Math.floor(Math.random() * 5 + 1) * 500,
  );

  async function checkConnection() {
    try {
      const _result = await knexMaster.raw(`select 'I have ${sqlConfig.database}' as status`);
      if (sqlConfig.client === 'pg') {
        console.log('sql: connection', _result.rows[0].status);
      }

      // Auto Migrate Database
      let min = 10;
      let max = 20;
      let intTimeOut = (Math.floor(Math.random() * (max - min + 1)) + min) * 100;
      setTimeout(async () => {
        knexMaster.migrate
          .latest()
          .then(function (_migrate) {
            console.log(`sql: migrations ${sqlConfig.database} `, _migrate);
          })
          .catch(function (error) {
            console.error(`sql: migrations ${sqlConfig.database} error `, error);
          })
          .finally(function () {
            knexMaster.destroy();
            console.log(`sql: migrations disconnected`);
          });
      }, intTimeOut);
    } catch (error) {
      console.error(`sqlCluster: connection ${sqlConfig.database} error `, error);
      setTimeout(checkConnection, 2000);
    }
  }
};

export default KnexConnect;
