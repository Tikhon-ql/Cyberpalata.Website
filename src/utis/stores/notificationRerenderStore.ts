import {observable} from "mobx"
import { HubConnection, LogLevel } from "@microsoft/signalr";

const notificationRerenderStore = observable({
    state: false,
    setState(){
        this.state = !this.state;
    },
});

export default notificationRerenderStore;