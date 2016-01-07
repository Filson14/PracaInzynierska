function [ precip ] = sphericalPrecip( x, y, x0, y0 , x_modif, y_modif)
%%
%  x, y - wspó³rzêdne punktu dla jakiego chcemy znaleŸæ wartoœæ
%  x0, y0 - wspó³rzêdne œrodka sfery
%  x_modify - modyfikator sfery wzd³u¿ osi X
%  y_modify - modyfikator sfery wzd³u¿ osi Y
%
%%
r = 1;
z0 = 0;
if ~exist('x_modif','var')
    x_modif = 1;
end

if ~exist('y_modif','var')
    y_modif = 1;
end

%     (x - x0)^2 + (y - y0)^2 + (z - z0)^2 = r^2
z = sqrt(r^2 - x_modif * (x - x0)^2 - y_modif * (y - y0)^2) + z0;

if z > 0
    precip = z;
else
    precip = 0;
end;
end

