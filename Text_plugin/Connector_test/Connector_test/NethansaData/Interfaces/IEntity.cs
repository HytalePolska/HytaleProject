using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Connector_test.Interfaces
{
   public interface IEntity<T>
    {
         T FromJson(string json);
         string ToJson(T obj);
         T GET_One(string condition);
         IEnumerable<T> GET_Many(string condition);
    }
}