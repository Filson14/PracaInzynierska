function z = funkcja_opadu_v2(x,y)
x0 = 1;  y0 = 4;
alpha = 1.5; 
h = 1;
wsp = 10;
z = wsp*(h+(x-x0).^2+alpha*(y-y0).^2).^(-1);
end

