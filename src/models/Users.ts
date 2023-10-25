export interface Users {
      id:string,
      userName:string,
      NormalizedUserName:string,
      email:string,
      NormalizedEmail:string,
      EmailConfirmed:boolean
      passwordHash:string,
      SecurityStamp:string,
      ConcurrencyStamp:string,
      phoneNumber:string,
      PhoneNumberConfirmed:boolean
      TwoFactorEnabled:boolean
      LockoutEnd:Date,
      LockoutEnabled:boolean,
      AccessFailedCount:number
}
