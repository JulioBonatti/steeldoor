export type User = {
    emailAddress: string,
    fullName: string,
    password: string,
    userType: string
}

export type UserKeys = Array<keyof User>