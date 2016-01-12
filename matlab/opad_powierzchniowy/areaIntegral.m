function precip = areaIntegral(fun,x1,x2,y1d,y2d,y1g,y2g)
% Obliczanie ca³ki podwójnej w obszarze:
% x nale¿¹ce do [x1, x2],
% y zawarte miêdzy prost¹ ograniczaj¹c¹ obszar:
%        od do³u - przechodz¹c¹ przez punkty (x1,y1d) i (x2,y2d),
%        od góry -                           (x1,y1g) i (x2,y2g)

ymin = @(x) (y2d-y1d)/(x2-x1)*(x-x1)+y1d;
ymax = @(x) (y2g-y1g)/(x2-x1)*(x-x1)+y1g;
precip = integral2(fun,x1,x2,ymin,ymax,'RelTol',1e-6);
end