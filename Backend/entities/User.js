class User{
    constructor(id, username, password, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.DoB = DoB;
        this.FName = FName;
        this.SName = SName;
        this.PhoneNumber = PhoneNumber;
        this.points = points;
        this.address = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.countrCode = countryCode;
    }

    getid(){
        return this.id;
    }

    getusername(){
        return this.username;
    }

    gethashedPassword(){
        return this.password;
    }

    getemail(){
        return this.email;
    }
    
    getDoB(){
        return this.DoB;
    }

    getFName(){
        return this.FName;
    }
    
    getSName(){
        return this.SName;
    }
    
    getPhoneNumber(){
        return this.PhoneNumber;
    }

    getpoints(){
        return this.points;
    }

    getaddress(){
        return this.address;
    }

    setid(id){
        this.id = id;
    }

    setusername(username){
        this.username = username;
    }

    sethashedPassword(password){
        this.password = password;
    }

    setemail(email){
        this.email = email;
    }

    setDoB(DoB){
        this.DoB = DoB;
    }

    setFName(FName){
        this.FName = FName;
    }


    setSName(SName){
        this.SName = SName;
    }
    
    setPhoneNumber(PhoneNumber){
        this.PhoneNumber = PhoneNumber;
    }

    setpoints(points){
        this.points = points;
    }

    setaddress(address){
        this.address = address;
    }
    
}

export default User;