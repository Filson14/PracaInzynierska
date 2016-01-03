function [ z ] = findValueFromSurface( x, y, v, p )
%FINDVALUEFROMSURFACE
%   x and y - coords of point for which to find a value
%   v - normal vector of the surface [ a b c]
%   p - point inside the surface
z = p(3) + (v(1)*(x - p(1)) + v(2)*(y - p(2)))/(-v(3));

end

