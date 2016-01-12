function [ z ] = findValueFromSurface( x, y, v, p )
%   x, y - wsp�rz�dne punktu szukanego
%   v - wektor normalny p�aszczyzny [A B C]
%   p - punkt nale��cy do p�aszczyzny
if v(3) == 0
    z = 0;
else
    z = p(3) + (v(1)*(x - p(1)) + v(2)*(y - p(2)))/(-v(3));
end