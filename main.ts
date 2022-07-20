import {Container} from 'inversify'
import {TYPES} from "./types/types";
import {App} from "./app";
import {UsersController} from "./controllers/users.controller";
import {UserService} from "./services/users.service";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controllers";


const container = new Container()
container.bind<AuthController>(TYPES.AuthController).to(AuthController)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UsersController>(TYPES.UsersController).to(UsersController)
container.bind<App>(TYPES.Application).to(App)
const app = container.get<App>(TYPES.Application)

app.initApp()
export {container}