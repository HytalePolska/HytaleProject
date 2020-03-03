using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Connector_test.Entitis
{
    public class Product
    {
        public double currency { get; set; }
        public string currency_code { get; set; }
        public double item_price { get; set; }
        public double ship_price { get; set; }
        public double qty { get; set; }
        public double qty_ship { get; set; }
        public string sku { get; set; }
        public int tax_class_value { get; set; }
        public string description_name { get; set; }
        public int product_ext_id { get; set; }
        public string product_exts_id { get; set; }
        public string ean { get; set; }
        public string model { get; set; }
        public int price_update { get; set; }    }
}