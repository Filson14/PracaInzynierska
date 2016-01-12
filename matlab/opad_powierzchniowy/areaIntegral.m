function precip = areaIntegral(fun,x1,x2,y1d,y2d,y1g,y2g)
% Obliczanie ca�ki podw�jnej w obszarze:
% x nale��ce do [x1, x2],
% y zawarte mi�dzy prost� ograniczaj�c� obszar:
%        od do�u - przechodz�c� przez punkty (x1,y1d) i (x2,y2d),
%        od g�ry -                           (x1,y1g) i (x2,y2g)

ymin = @(x) (y2d-y1d)/(x2-x1)*(x-x1)+y1d;
ymax = @(x) (y2g-y1g)/(x2-x1)*(x-x1)+y1g;
precip = integral2(fun,x1,x2,ymin,ymax,'RelTol',1e-6);
end