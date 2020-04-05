# auth-system-postgres

- auth links

  - signup endpoint :
    - post request: https://karaz-1.herokuapp.com/signup
    - recieve in body : email ,name ,password , city
    - return {status:200,message: "sign up success and code is sent" }
    - errors : { status: 400, message: "email is not valid" } , {status: 409,message: "user is already signed up"} , { status: 401, message: "password is required" } , {status: 401,message: "password must be 8 character"},{status: 401,message: "password must contain numbers and letters"}

* login endpoint :

  - post request : https://karaz-1.herokuapp.com/login
  - recieve in body : email , password
  - return {status:200,message: "login success", token:"token value" ,
    user:{
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone,
    birthday: user.birthday
    city: user.location
    }
    }
  - errors: { status: 400, message: "user not found" }, { status: 401, message: "password is wrong" },{ status: 400, message: "user email is not verified" } , { status: 400, message:'code not true' }

* verify endpoint :

  - post request : https://karaz-1.herokuapp.com/verify
  - recieve in body : email , code
  - return { status: 200, message: "your account is verified" }
  - errors { status: 400, message: 'code is wrong' }

* forget password endpoint :

  - post request : https://karaz-1.herokuapp.com/forgetpassword
  - recieve in body : email
  - return {status:200,message: "code is sent"}
  - errors : { status: 400, message: "user not found" }

* confirm code endpoint

  - post request : https://karaz-1.herokuapp.com/confirmcode
  - recieve in body : email , code
  - return {status:200,message: "code is true"}
  - errors: { status: 400, message: 'code is wrong' }

* new password endpoint

  - post request : https://karaz-1.herokuapp.com/newpassword
  - recieve in body : email , code , password
  - return {status:200,message: "password reset success"}
  - errors: { status: 400, message: "code is wrong" }

* private route endpoint for token test
  - get request : https://karaz-1.herokuapp.com/users/private
  - recieve in header : x-access-token: token
  - return : herllo from private route mr name

- setting endpoints

  - edite user account

    - patch request : https://karaz-1.herokuapp.com/users/editeaccount
    - recieve in header : x-access-token: token , body: firstName:value , lastName:value,email:value , phone:value , bithday:date
    - return :{ status: 200, message: "account edite success" }
    - errors : { status: 400, message: "email is not valid" } , { status: 400, message: "phone is not valid" }

  - new password from account
    - patch request : https://karaz-1.herokuapp.com/users/newpassword
    - recieve in header : x-access-token: token , body: password:curruent password , newPassword : new passsword
    - return {"status": 200,"message": "password is reset"}
    - errors { status: 400, message: "curruent pasword is wrong" },{ status: 400, message: "password must be atleast 8 character" }

- add address :
  post request : https://karaz-1.herokuapp.com/users/addaddress
  recieve : header : x-access-token: token , body: city , block,streeet , details
  return : { status: 200, message: "address is added" }
