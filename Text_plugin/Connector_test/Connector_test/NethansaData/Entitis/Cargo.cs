
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Connector_test.Entitis
{
   public class Cargo
    {
        public string _product_id;
        public string _variant_id;
        public string _sku;
        public string _name;
        public string _title;
        public decimal _weight1;
     
        public string _quantity;
        public decimal _tax;
        public decimal _price1;
      
        public string _require_shipping;
        public string _xmlDetails { get; set; }

        public string _price
        {
            get { return (_price1 / 100).ToString(); }
            set { _price1 = Convert.ToDecimal(value == string.Empty ? "0" : value); }
        }

        public string _weight
        {
            get { return (_weight1 / 1000).ToString(); }
            set { _weight1 = Convert.ToDecimal(value == string.Empty ? "0" : value); }
        }
    }
}
