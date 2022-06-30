import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import AppRoutes from './routes/index';
import DevConfig from './config/environments/development';

class App {
  public app: express.Application;
  public port: number;
  public config = new DevConfig();
  appRoutes = new AppRoutes();

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRouters(this.appRoutes.routers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
  // Initialize all the routes of the application
  private initializeRouters(router: any[]) {
    router.forEach((routes: any) => {
      this.app.use('/', routes);
    });
  }

  // Server will listen to this port
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  // Connecting to mongo DB
  public connectToTheDatabase() {
    console.log('Connecting to mongo DB', this.config.dbURL);
    mongoose.connect(this.config.dbURL);
  }
}

export default App;
