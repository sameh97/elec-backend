import { Container } from "inversify";

import { AppDBConnection } from "./config/database";

const container = new Container({ defaultScope: "Singleton" });

container.bind<AppDBConnection>(AppDBConnection).toSelf();


export default container;
