


class SQL_Builder {
  constructor() {
    this.result = "";
  }

  Select(filds, table) {
    let i = 1;
    let size = filds.length;
    this.result += ' SELECT ';
    if (size != 0) {
      for (var key in filds) {
        this.result += filds[key];

        if (i < size)
          this.result += ',';
        i++;
      }
    }
    else {
      this.result += " * ";
    }

    this.result += ' FROM ' + table;

    return this;
  }
  Delete(table) {
    this.result += ' DELETE FROM ' + table;
    return this;
  }
  Insert(filds, table) {
    this.result += ' INSERT INTO ' + table;
    let size = this.Get_Size(filds);
    let i = 1;
    let fild = ' (';
    let values = ' VALUES(';
    for (var key in filds) {
      fild += key;

      if (typeof filds[key] === 'string')
        values += `\'${filds[key]}\'`;

      if (typeof filds[key] === "number")
        values += filds[key];


      if (i < size) {
        fild += ',';
        values += ',';
      }
      i++;
    }
    fild += ') ';
    values += ') ';
    this.result += fild + values;

    return this;
  }
  Update(filds, table) {
    this.result += ` UPDATE ${table} SET `;
    this.Condition(filds, ' , ');
    return this;
  }
  Where(filds) {
    this.result += ' WHERE ';
    
    if(typeof filds !== 'undefined' )
    this.Condition(filds, ' AND ');

    return this;
  }
  And() {
    this.result += ' AND ';
    return this;
  }
  Condition(dictionary, separator) {
    let i =0;
    let size = this.Get_Size(dictionary);
    let last_null = false;
    for (var key in dictionary) {

      if(typeof dictionary[key] !=='undefined')
       {
          this.result +=key+' = '+this.NumberOrString(dictionary[key]);

          if (i <size && last_null == false)
          this.result += separator;
          
          last_null = false;
       }
       else
        last_null =true;

      i++;
    }
    return this;
  }
  Get() {
    let ret = this.result;
    this.result = " ";
    return ret;
  }
  Get_Size(dictionary) {
    let i = 0;
    for (var k in dictionary) { i++ };
    return i;
  }
  NumberOrString(input) //jesli wyraz jest stringiem dodaje cudzysłow jesli nie po porstu go zwraca
  {
    if (typeof input === 'string')
   return  `\'${input}\'`;

  if (typeof input === "number")
  return   input;

  return 'str';
  }
  In(filds,TableName)
  {
    filds = JSON.parse(JSON.stringify(filds));
    let size = this.Get_Size(filds);
    this.result+= TableName+" In (";
    for(let i=0;i<size;i++)
    {
      this.result+= this.NumberOrString(filds[i][TableName]);
      if(i<size-1)
      this.result+=',';
    
    }
    this.result+=")"
        
    
    return this;
  }

}
module.exports = SQL_Builder;