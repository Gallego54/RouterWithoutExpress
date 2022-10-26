import Router from "./Router.js";


import http from 'http'
import url from 'url'



const router = Router();

router.post('xd', (req, res)=>{
    let payloadStr = JSON.stringify(req.body);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);

    res.write(payloadStr);
    res.end("\n");
})

router.get('socialismo/fernando', (req, res)=>{
  let payload = {
    socialismo: "socialismo fernando",
  };
  let payloadStr = JSON.stringify(payload);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);

  res.write(payloadStr);
  res.end("\n");
})

const PORT = 5000;

const server = http.createServer(function(req, res) {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;

  path = path.replace(/^\/+|\/+$/g, "");

  req.on("data", buffer => {
      const strJSON = buffer.toString('utf-8')
      req.body = JSON.parse(strJSON)
      req.params = JSON.parse(JSON.stringify(parsedURL.query));
  });
  req.on("end", _ => {
    const route =
      typeof router.searchRoute(path, req.method) !== "undefined" 
      ? router.searchRoute(path, req.method) 
      : (req, res) => { res.writeHead(404); res.end('NOT FOUND') };
 

    route(req, res);
  });
});

server.listen(5000, function() {
  console.log(`LISTEN ON PORT ${PORT}`);
});