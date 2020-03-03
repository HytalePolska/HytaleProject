using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connector_test
{

   public enum E_TableSize
    {
        small,medium,big,flexible,huge
    }

   public class TableBuilder : MessagesBuilder
    {


        private char Pattern_hor = '=';
        private char Pattern_ver = '|';
        private E_TableSize size;

        public TableBuilder(E_MessageType type, E_TableSize size)
        {
            base.GetColor_MessageType(type);
            this.size = size;
        }


        public int TableBarSizeToInt()
        {
            switch(size)
            {
                case E_TableSize.small:
                    {
                        return 10;
                    }
                case E_TableSize.medium:
                    {
                        return 5;
                    }
                case E_TableSize.big:
                    {
                        return 3;
                    }
                case E_TableSize.huge:
                    {
                        return 1;
                    }
            }
            return 0;
        }

        public TableBuilder SetTitle(string text)
        {
            if (text.Length >= base.Max_Lenght - 4) return this;

            int bar_size = TableBarSizeToInt();
            string bar = string.Empty;
            string mid_msg = string.Empty;
            int i_start = 24 - text.Length / 2;



            if (size == E_TableSize.flexible)
            {
                bar = base.Bar(i_start - 1, i_start + text.Length + 2, Pattern_hor);
                for (int i = 0; i < i_start - 1; i++)
                    mid_msg += " ";

                mid_msg += Pattern_ver + " " + text + " " + Pattern_ver;
            }
            else
            {
                bar = base.Bar(bar_size, 48 - bar_size, Pattern_hor);

                for (int i = 0; i < 48; i++)
                    mid_msg += " ";

                mid_msg = mid_msg.Insert(24 - text.Length/2, text);
                mid_msg =  mid_msg.Insert(bar_size , Pattern_ver.ToString());
                mid_msg = mid_msg.Insert(48 - bar_size, Pattern_ver.ToString());
                
            }
              
        
                

            this.Result += bar + Environment.NewLine;
            this.Result += mid_msg + Environment.NewLine;
            this.Result += bar + Environment.NewLine;

            return this;
        }

        public TableBuilder SetText(string text, bool show_bar = false)
        {


            if (size == E_TableSize.flexible) return this;

            List<string> messages = new List<string>();

            int _size = TableBarSizeToInt();
            int bar_size = 48 - TableBarSizeToInt();
            int text_size = 48 - TableBarSizeToInt() * 2 -3;
            if (text.Length > bar_size)
            {
                int w = text.Length / text_size;
                for (int i = 0; i <= w; i++)
                {
                    if (i == w)
                      
                        messages.Add(text.Substring(i * text_size, text.Length - text_size * i - 1));
                    else
                        messages.Add(text.Substring(i *text_size, text_size));
                }
            }

            

            foreach (var msg in messages)
            {

                string temp = string.Empty;

                for (int i = 0; i < 48; i++)
                      temp += " ";

                temp = temp.Insert(_size+1, msg);
                temp = temp.Insert(_size, Pattern_ver.ToString());
                temp = temp.Insert(48 - _size, Pattern_ver.ToString());

                this.Result += temp;

               
                    this.Result += Environment.NewLine;
            }

            if (show_bar) this.Result += base.Bar(_size, 48 - _size, Pattern_hor);

            return this;
        }

        public TableBuilder SetList(List<string> records,char _char)
        {
            int max_size = 0;

            foreach(var r in records)
                if (r.Length > max_size) max_size = r.Length;


            return this;
        }

        public override string GetMessage()
        {
            return base.GetMessage();
        }



    }
}
