using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Connector_test.Entitis
{
    public abstract class Entity<T>
    {
        public abstract T FromJSON();
        public  abstract string ToJSON();
    }
}