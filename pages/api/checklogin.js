import { withIronSession } from "next-iron-session";

export default withIronSession(
  async (req, res) => {
    if (req.method === "GET") {
      const user = req.session.get("user");

      if (!user) {
        return res.status(404).send(""); // Not found
      } else {
        return res.status(201).send(""); // Created
      }
      return res.status(403).send(""); // Forbidden
    }
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
