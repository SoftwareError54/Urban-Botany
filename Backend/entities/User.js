class User{
    constructor(id, userName, password, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.DoB = DoB;
        this.FName = FName;
        this.SName = SName;
        this.phoneNum = phoneNum;
        this.points = points;
        this.address = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }

    getID(){
        return this.id;
    }

    getuserName(){
        return this.userName;
    }

    getHashedPassword(){
        return this.password;
    }

    getEmail(){
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
    
    getphoneNum(){
        return this.phoneNum;
    }

    getPoints(){
        return this.points;
    }

    getAddressLine1(){
        return this.addressLine1;
    }

    getAddressLine2(){
        return this.addressLine2;
    }

    getCity(){
        return this.city;
    }

    getRegion(){
        return this.region;
    }

    getPostalCode(){
        return this.postalCode;
    }

    getCountryCode(){
        return this.countryCode;
    }

    setID(id){
        this.id = id;
    }

    setuserName(userName){
        this.userName = userName;
    }

    setHashedPassword(password){
        this.password = password;
    }

    setEmail(email){
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
    
    setphoneNum(phoneNum){
        this.phoneNum = phoneNum;
    }

    setPoints(points){
        this.points = points;
    }

    setAddressLine1(addressLine1){
        this.addressLine1 = addressLine1;
    }

    setAddressLine2(addressLine2){
        this.addressLine2 = addressLine2;
    }

    setCity(city){
        this.city = city;
    }

    setRegion(region){
        this.region = region;
    }

    setpostalCode(postalCode){
        this.postalCode = postalCode;
    }

    setCountryCode(countryCode){
        this.countryCode = countryCode;
    }
    
}

export default User;