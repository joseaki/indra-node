import { PlanetSchema } from "src/schema/planets";
import { DataSource } from "typeorm";

let AppDataSource: DataSource;
export const getConnection = async () => {
  if (!AppDataSource) {
    let config = {
      type: "mysql",
      port: Number(process.env.MYSQL_PORT),
      host: process.env.MYSQL_HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [PlanetSchema],
    };
    console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(config, null, 2));
    if (process.env.NODE_ENV === "dev") {
      config = {
        type: "mysql",
        port: Number(process.env.LOCALDB_PORT),
        host: process.env.LOCALDB_HOST,
        username: process.env.LOCALDB_USERNAME,
        password: process.env.LOCALDB_PASSWORD,
        database: process.env.LOCALDB_NAME,
        synchronize: true,
        entities: [PlanetSchema],
      };
    }
    AppDataSource = new DataSource(config as any);

    await AppDataSource.initialize();
  }
  return AppDataSource;
};
