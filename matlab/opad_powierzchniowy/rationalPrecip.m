function z = rationalPrecip(x, y)
global middle_x;
global middle_y;

x0 = middle_x;  y0 = middle_y;

h = 100;
alpha = 50e-12; 
beta = 200e-12;
z = h * (1 + alpha .* (x - x0).^2 + beta .* (y - y0).^2).^-1;
end

