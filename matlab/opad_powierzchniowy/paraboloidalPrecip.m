function z = paraboloidalPrecip(x, y)
global middle_x;
global middle_y;

x0 = middle_x;
y0 = middle_y;

h = 100;
alpha = 50e-12; 
beta = 70e-12;

z = h * (1 - (alpha * (x-x0).^2 + beta*(y-y0).^2));
[w,k] = size(z);
for i=1:w,
    for j=1:k,
        if z(i,j) < 0, z(i,j)=0; end
    end
end
end

