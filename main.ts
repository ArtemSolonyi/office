import {Container} from 'inversify'
import {TYPES} from "./types/types";
import {App} from "./app";
import {UsersController} from "./controllers/users.controller";
import {UserService} from "./services/users.service";


const container = new Container()
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UsersController>(TYPES.UsersController).to(UsersController)
container.bind<App>(TYPES.Application).to(App)
const app = container.get<App>(TYPES.Application)

app.initApp()
export {container}