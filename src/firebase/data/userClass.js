//create a constructor for the basic user 

//class organizer/concessionaire extends basic user 
//get export classes

class User extends userDBClass{
    constructor(){
       super()
    }


}

export default User;

class eventOrganizer extends User{
    constructor(uid){
        super(uid);
    }

    //
}

class concessionaire extends User{
    constructor(uid){
        super(uid);
        
    }
}
