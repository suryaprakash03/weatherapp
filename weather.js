//running a web server using expressjs
const exp = require("express");
const req = require("request");

const path = require("path");  //path all are inbuilt module in js.no need to install from npm
const hbs = require("hbs");  //handlebars module
const app = exp();

const p = path.join(__dirname,".");
const v = path.join(__dirname,"sview");  //default hbs checks the view folder for alternate naming use
const par = path.join(__dirname,"partial");    //html part can be used in multiple pages

app.set("view engine","hbs");
app.set("views",v);              //change the default folder name views to sview.set the folder name
hbs.registerPartials(par);       //set the folder name

app.get("/",(req,res)=>{
   res.render("index",{title : "weather App", creator : "surya prakash"});
});
app.get("/search",(req,res)=>{
    if(req.query.location)
    {
      let q = 0;
      async function getapi()
      {
         q = await location(req.query.location);
         q = JSON.parse(q);
        //  console.log(q);
         let s = "The location name is "+q.location.name+" The current date and time is "+q.location.localtime+" and the current temperature in degree celcius is "+q.current.temp_c+" and the condition is "+q.current.condition.text;
         res.send(s);
      }
      getapi();
        
    }
});

app.get("/about",(req,res)=>{
  res.render("about",{title : "about", creator : "surya prakash"});
});

app.get("*",(req,res)=>{
  res.render("error");        //default error route
});


async function location(l)
{
  if(String(typeof(l)) == String(undefined))
  {
    console.log("you need to give the location to find weather");
  }
  else
  {
    const url = `http://api.weatherapi.com/v1/current.json?key=76ee2ea77dd1423988090325242603&q=${l}`;
    let res = await fetch(url);
    let restxt = await res.text();
    return restxt;                    
  }
}

// app.use(exp.static(p));   //for displaying static content.displaying the entire folder this is important for serving just static pages note that is app.use not app.get.it executes first checks index.html then run.

// app.get("/",(req,res)=>{
//    res.send(p);
// });
// app.get("/about",(req,res)=>{
//   res.send({key : "value"});
// });

app.listen(4200,() => {console.log("running")});
// const l = process.argv[2];
// console.log(l);
// //the value of key is unique for each member to access the weather api
// location(l);
// console.log("first");
// function run(callback)
// {
//   let v = 1;
//   setTimeout(()=>{callback(v)},2000);
// }
// run((d)=>{console.log(d)});    // callback pattern pass pana function.async function la function args pass delay execute