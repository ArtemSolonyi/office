import { Container } from 'inversify';
import { TYPES } from "./types/types";
import { App } from "./app";
import { UsersController } from "./controllers/users.controller";
import { UserService } from "./services/users.service";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controllers";
const container = new Container();
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.AuthService).to(AuthService);
container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.Application).to(App);
const app = container.get(TYPES.Application);
app.initApp();
export { container };
//# sourceMappingURL=main.js.map