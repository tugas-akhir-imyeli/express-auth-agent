import express from "express";
export var router = express.Router();
import axios from "axios";

/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
    res.redirect("/revocation")
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.get("/connections", async function (req, res, next) {
  try{
    const connectionUrl = `${process.env.ARIES_URL}/connections`;
    const response = await axios.get(connectionUrl);
    const connections = response.data.results;
    const activeConnections = connections.filter((connection: any) => connection.state === "active");
    const invitationResponse = await axios.post(`${process.env.ARIES_URL}/out-of-band/create-invitation`, {
      "handshake_protocols": [
          "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0"
      ],
      "auto_accept": "auto"
  });
  const invitation = JSON.stringify(invitationResponse.data.invitation);
    res.render("connections", {connections: activeConnections, invitation: invitation});
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
    
})

router.post("/connections/delete", async function (req, res, next) {
  try{
    const {connection_id} = req.body;
    const connectionUrl = `${process.env.ARIES_URL}/connections/${connection_id}`;
    await axios.delete(connectionUrl);
    res.redirect("/connections");
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.post("/add-connection", async function (req, res, next) {
  try{
    const {conn_json} = req.body;
    const receiveInvitationUrl = `${process.env.ARIES_URL}/out-of-band/receive-invitation`;
    const response = await axios.post(receiveInvitationUrl, conn_json, {headers: {'Content-Type': 'application/json'}});
    return res.redirect("/connections");
  }catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
  
})
