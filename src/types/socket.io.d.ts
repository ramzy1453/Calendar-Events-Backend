import "socket.io";
import { JwtPayload } from "./global";

declare module "socket.io" {
  export interface Socket {
    user?: JwtPayload;
  }
}
