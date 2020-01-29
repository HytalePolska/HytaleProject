
const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Groups";
class Group {
    constructor() {
        this.GroupID = '';
        this.G_Name='';
        this.G_Type='';
    }
  /////////////////////////////////////////////////
   static async GET(DB,data,res)
   {
    let query;
    let cond = [];
    let result;
   
    cond["G_type"] = data.G_Type;
    cond['GroupID'] = data.GroupID;
    cond['G_Name'] = data.G_Name;
    cond["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
    
    query= query_Builder.Select("*", Table_Name).Where(cond).Get();

    result = await DB(query);
     
    if(typeof res !== "undefined") 
      res.send(result);
    else 
       return JSON.parse(JSON.stringify(result));
    
   }
   ///////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
     let con = [];
     let result;
    con["GroupID"] =data.GroupID;  
    con["G_Name"] = data.G_Name;
    con["G_Type"] =data.G_Type;

    let wher = []; wher["G_GroupID"] =data.GroupID;   //check if group exists
    
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
    result = JSON.stringify(await DB(query));
      if (result != "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
         return "error";
       else
         res.send("The Player is already existing");
        return;
     }
    query = query_Builder.Insert(con, Table_Name).Get();   //add new group
    result =await DB(query);
     
    if(typeof res === 'undefined')
    return  result;
  else
    res.send("Group has been established");
   }
  ///////////////////////////////////////////////
   static async POST(DB,data,res)
   {
     let result;
    let con = [];
    con["G_Type"] =data.G_Type;
    con["G_Name"] =data.G_Name;
   
    let wher = []; wher["GroupID"] =data.GroupID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
    result = JSON.stringify(await DB(query));
      if (result != "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
         return "error";
       else
         res.send("The Player is already existing");
        return;
     }
    query = query_Builder.Update(con, Table_Name).Where(wher).Get();
    result =await DB(query); 
    if(typeof res == 'undefined')
        return  "true";
     else
       res.send(result);
   }
   /////////////////////////////////////////////////
   static async DELETE(DB,data,res)
   {
    let con = [];
    con["GroupID"] = data.GroupID;
    con["G_Type"] = data.G_Type;
    let query = query_Builder.Delete("S_Members").Where(con).Get(); //usuwanie czlonkow
    await DB(query); //wykonanie 
     query = query_Builder.Delete(Table_Name).Where(con).Get();//usuwanie grupy
    await DB(query);

    if(typeof res == 'undefined')
    return 'deleted';
   else
   res.send("Group has been deleted");
  
   }
   /////////////////////////////////////////////////

}
module.exports = Group;