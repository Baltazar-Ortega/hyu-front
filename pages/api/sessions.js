import { withIronSession } from "next-iron-session";

const VALID_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { password } = req.body;

      // console.log("send password", password)
      // console.log("VALID PASSWORD: ", VALID_PASSWORD)

      if (password === VALID_PASSWORD) {
        // console.log("Si son iguales")
        req.session.set("user", { usuario: "administrador" });
        await req.session.save();
        // console.log("Usuario guardado: ", req.session.get("user"));
        return res.status(201).send(""); // Created
      }

      return res.status(403).send(""); // Forbidden
    }

    return res.status(404).send(""); // Not found
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
