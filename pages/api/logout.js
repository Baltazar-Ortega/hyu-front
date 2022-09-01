import { withIronSession } from "next-iron-session";

export default withIronSession(
  async (req, res) => {
    req.session.destroy()
    await req.session.save()
    res.send("logout realizado")
    // console.log("Se ha cerrado sesion")
  }, 
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: false
    },
    password: process.env.APPLICATION_SECRET
  });