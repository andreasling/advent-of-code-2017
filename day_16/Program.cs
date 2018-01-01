using System;
using System.Linq;

namespace day_16
{
    class Program
    {
        static void Main(string[] args)
        {

            var programs = "abcdefghijklmnop".Select(c => c).Take(5);

            var moves = "s1,x3/4,pe/b".Split(',').Select(s => {



                return new {
                    operation = s[0],
                    operands = s.Split(null, 2)[0] /* new[] { s[1], s[3] } */
                };

            });

			Console.WriteLine(String.Join(string.Empty, programs));
            Console.WriteLine(String.Join(", ", moves));

        }
    }
}
