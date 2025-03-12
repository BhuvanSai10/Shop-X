const backendDomain = "http://localhost:5000"

const summaryApi = {
    signUp :{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn :{
        url:`${backendDomain}/api/signin`,
        method:"post"
    },
    currentUser:{
        url:`${backendDomain}/api/userDetails`,
        method:"get"
    },
    logout_user:{
        url:`${backendDomain}/api/userLogout`,
        method:"get"
    },
    addtocart:{
        url:`${backendDomain}/api/addtocart`,
        method:"post"
    },
    removefromcart:{
        url:`${backendDomain}/api/removefromcart`,
        method:"post"
    },

}

export default summaryApi;