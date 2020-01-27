


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
    this.Condition(filds, ' AND ');
    return this;
  }
  And() {
    this.result += ' AND ';
    return this;
  }
  Condition(dictionary, separator) {
    let i = 1;
    let size = this.Get_Size(dictionary);

    for (var key in dictionary) {
      if (typeof dictionary[key] === 'string')
        this.result += `${key}  = \'${dictionary[key]}\'`;

      if (typeof dictionary[key] === "number")
        this.result += `${key}  = ${dictionary[key]}`;

      if (i < size)
        this.result += separator;
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


}
module.exports = SQL_Builder;