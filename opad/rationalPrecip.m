function [ precip ] = rationalPrecip( x, y, x0, y0 , x_modif, y_modif)
%%
%  x, y - wsp�rz�dne punktu dla jakiego chcemy znale�� warto��
%  x0, y0 - wsp�rz�dne �rodka powierzchni
%  x_modify - modyfikator sfery wzd�u� osi X
%  y_modify - modyfikator sfery wzd�u� osi Y
%
%%
if ~exist('x_modif','var')
    x_modif = 1;
end

if ~exist('y_modif','var')
    y_modif = 1;
end

z = 1/(1 + x_modif * (x-x0)^2 + y_modif * (y - y0)^2);

end

