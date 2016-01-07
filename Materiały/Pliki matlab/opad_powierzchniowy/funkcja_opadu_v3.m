function z = funkcja_opadu_v3(x,y)
x0 = 1;  y0 = 4;
alpha = 1.5; 
h = 1;
wsp = 10;
z = wsp*exp(-(x-x0).^2-alpha*(y-y0).^2);
end

