import {observable} from "mobx"
import { HubConnection, LogLevel } from "@microsoft/signalr";

const notificationStore = observable({
    connection: HubConnection,
    setConnection(newConnection: any){
        this.connection = newConnection;
    },
});

export default notificationStore;