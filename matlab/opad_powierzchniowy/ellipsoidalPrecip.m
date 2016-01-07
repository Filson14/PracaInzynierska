function z = ellipsoidalPrecip(x, y)
global middle_x;
global middle_y;

x0 = middle_x;
y0 = middle_y;
% x0 = 2;  y0 = 4;
h = 100;
alpha = h/10; 
betha = h/3;

z = h - alpha .* (x-x0).^2 - betha.*(y-y0).^2;
[w,k] = size(z);
for i=1:w,
    for j=1:k,
        if z(i,j) < 0, z(i,j)=0; end
    end
end
end

