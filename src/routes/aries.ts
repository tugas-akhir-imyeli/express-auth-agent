import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import prisma from '../db';
export var router = express.Router();

dotenv.config();

/* GET home page. */
router.post("/webhook/topic/out_of_band", async function (req, res, next) {
  try{
    console.log(req.body,'\n\n')
    res.send().status(200);
  } catch(error:any){
    console.error(error.message);
    res.send({ message: "Internal Server Error", error: error }).status(500);
  }
});

router.post("/webhook/topic/connections", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/issue_credential_v2_0", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      if(req.body.state === "request-received"){
        const cred_ex_id = req.body.cred_ex_id;
        const issueUrl = `${process.env.ARIES_URL}/issue-credential-2.0/records/${cred_ex_id}/issue`
        const res = await axios.post(issueUrl, {"comment": "Here's the creds"});
        const cred_rev_id = res.data.indy.cred_rev_id
        const rev_reg_id = res.data.indy.rev_reg_id
        const nim = (await res.data.cred_ex_record.cred_offer.credential_preview.attributes.filter((attr)=> attr.name === "nim"))[0].value
        await prisma.issued_list.create({
            data: {
                cred_rev_id: cred_rev_id,
                rev_reg_id: rev_reg_id,
                nim: nim
            }
        });
      }
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });
  router.post("/webhook/topic/issue_credential_v2_0_indy", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });
  router.post("/webhook/topic/present_proof_v2_0", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/revocation_registry", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/issuer_cred_rev", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });

  router.post("/webhook/topic/problem_report", async function (req, res, next) {
    try{
      console.log(req.body,'\n\n')
      res.send().status(200);
    } catch(error:any){
      console.error(error.message);
      res.send({ message: "Internal Server Error", error: error }).status(500);
    }
  });