function z = rationalPrecip(x, y)
global middle_x;
global middle_y;

x0 = middle_x;  y0 = middle_y;

alpha = 1.5; 
h = 1;
MAX_PRECIP = 100;
z = MAX_PRECIP * (h+(x-x0).^2+alpha*(y-y0).^2).^(-1);
end

