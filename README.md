# auth-system-postgres

- auth links

  - signup endpoint :
    post request: https://karaz-1.herokuapp.com/signup
    recieve in body : email ,name ,password , city  
     return {status:200,message: "sign up success and code is sent" }

  - login endpoint :
    post request : https://karaz-1.herokuapp.com/login
    recieve in body : email , password
    return {status:200,message: "login success", token:"token value" }

  - verify endpoint :
    post request : https://karaz-1.herokuapp.com/verify
    recieve in body : email , code
    return {status:200,message: "login success", token:"token value" }

  - forget password endpoint :
    post request : https://karaz-1.herokuapp.com/forgetpassword
    recieve in body : email
    return {status:200,message: "code is sent"}

  - confirm code endpoint
    post request : https://karaz-1.herokuapp.com/confirmcode
    recieve in body : email , code
    return {status:200,message: "code is true"}

  - new password endpoint
    post request : https://karaz-1.herokuapp.com/newpassword
    recieve in body : email , code , password
    return {status:200,message: "password reset success"}

  - private route endpoint
    get request : https://karaz-1.herokuapp.com/users/private
    recieve in header : x-access-token: token
    return : herllo from private route mr name
