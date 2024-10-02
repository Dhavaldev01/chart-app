const jwt =  require("jsonwebtoken");


exports.isAuthenticated = async(req, res , next) =>{
    try {
        // const token = req.cookies.token;
        const token = req.cookies.token; 
        if(!token){
            return res.status(401).json({message: "User not authenticated."})
        }

        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({message:"Invalid token"});
        }
        req.id = decode.userId;
        // console.log("decode : " , decode);
        // console.log("isAuthontication ma : red.id: => " , req.id)
        // console.log("token : ", token);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" }); 
    }
};
    