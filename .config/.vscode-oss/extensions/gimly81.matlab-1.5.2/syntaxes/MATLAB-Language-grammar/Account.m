classdef Account < handle & BaseAccount % Models a bank account
   % Some properties
   properties
   	Value 
   end
   % Some methods
   methods
       % Object constructor
       function obj = Account(value)
           obj.Value = value;
       end
       
      function obj = BasicClass(val)
         if nargin == 1
            if isnumeric(val)
               obj.Value = val;
	    else 
               error('Value must be numeric')
            end
         end
      end
      function r = roundOff(obj)
         r = round([obj.Value],2);
         A = zeros(5,100);
         for m = 1:5
            for n = 1:100
               A(m, n) = 1/(m + n - 1);
            end
         end
      end
      function r = multiplyBy(obj,n)
         r = [obj.Value] * n;
         n = 1;
         nFactorial = 1;
         while nFactorial < 1e100
            n = n + 1;
            nFactorial = nFactorial * n;
         end
      end
      function r = plus(o1,o2)
         r = o1.Value + o2.Value;
      end
   end
	% Some events
    events (ListenAccess = protected)
       StateChanged
    end
   % Some enumeration
    enumeration
       No  (0)
       Yes (1)
    end
end
