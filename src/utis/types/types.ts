
export type BookingCollection = {
    id: string,
    roomName: string,
    date: string,
    begining: string,
    hoursCount: number,
    price: number,
    seats: number[],
};

export type Seat = {
    number: number,
    type: {
        id:number,
        name:string
    },
};

export type BookingDetails = {
    roomName: string,
    date: string,
    begining: string,
    hoursCount: number,
    price: number,
    seats:Seat[]
};

export type Pc = {
    type: string,
    name: string,
};

export type Periphery = {
    name: string,
    typeName: string
}

export type RoomItem = {
    id: string,
    name: string
}

export type Team = {
    id:string,
    captainId: string,
    name: string
}

export type TeamTop = {
    name: string,
    winCount: number
}

export type Tournament = {
    id:string,
    name:string,
    teamsCount: number,
    date:string,
    begining:string,
}

export type UserTournament = {
    id:string,
    name:string,
    date: string,
    teamId: string
}


export type TournamentDetailed = {
    name:string,
    date:string,
    // teamsMaxCount: number,
    // rounds:Round[]
}

export type Batle = {
    firstTeamName: string,
    secondTeamName: string,
    firstTeamScore:number,
    secondTeamScore:number,
    date: string,
    time:string
}

export type TeamTournamentViewModel = {
    name:string,
    score:number
}

export type Round = {
    number: number,
    batles: Batle[],
    batlesMaxCount: number,
    date: string,
}

export type QrCode ={
    tournamentId:string,
    teamId:string
}

export type TeamDetailed = {
    id: string,
    name: string,
    captainName:string,
    members: TeamMember[]   
}
export type TeamMember = {
    name:string,
    position: string,
}

export type TreeData = {
    batleId:string,
    firstTeamId:string,
    secondTeamId: string,
    firstTeamName:string,
    secondTeamName: string,
    name: string,
    roundNumber: number,
    children: TreeData[]
};

export type Game = {
    name: string,
    imageUrl: string
}

export type Notification = {
    date: string,
    text: string
}

export type JoinRequest = {
    userId: string,
    teamId: string,
    username:string,
    usersurname:string
}

export type Chat = {
    chatId: string,
    otherId: string,
    otherUserName: string,
    otherUserSurname: string,
    isYouACaptain: boolean,
    teamId: string
}

export type ChatUser = {
    id:string,
    email:string,
}

export type Message = {
    message: string,
    SentDate:string,
    user:string
}

export type MessageToSend = {
    chatId: string,
    sender: string,
    message: string
}

export type ProfileType = {
    username: string,
    surname: string,
    email:string,
    phone:string,
    hasTeam: boolean,
    isCaptain: boolean
}


export type BatleToSelectWinner = {
  firstTeamName: string,
  firstTeamId: string,
  secondTeamName: string,
  secondTeamId: string,
  batleId:string,
}