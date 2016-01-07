function z = funkcja_opadu_v1(x,y)
x0 = 1.2368e+06;  y0 = 5.7346e+06;
alpha = 1.5; 
h = 10;
z = h-(x-x0).^2-alpha*(y-y0).^2;
[w,k] = size(z);
for i=1:w,
    for j=1:k,
        if z(i,j) < 0, z(i,j)=0; end
    end
end
end

