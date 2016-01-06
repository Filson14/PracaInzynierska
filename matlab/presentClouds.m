MAX_PRECIP = 100;
load ('.\zapisane dane\rainfallPoints.mat');
load ('.\zapisane dane\catchment.mat');
x = linspace(floor(min(rainfallPoints(:,1))), ceil(max(rainfallPoints(:,1))), 50);
y = linspace(floor(min(rainfallPoints(:,2))), ceil(max(rainfallPoints(:,2))), 50);

[X, Y] = meshgrid(x,y);

middle_x = min(catchment(:, 1)) + (max(catchment(:, 1)) - min(catchment(:, 1)))/2;
middle_y = min(catchment(:, 2)) + (max(catchment(:, 2)) - min(catchment(:, 2)))/2;

Z1 = zeros(size(X,1), size(X,2));
Z2 = zeros(size(X,1), size(X,2));
for i=1:size(X,1)
    for j=1:size(X,2)
        Z1(i,j) = MAX_PRECIP * sphericalPrecip(X(i,j), Y(i,j), middle_x, middle_y, 0.2, 1.5);
        Z2(i,j) = MAX_PRECIP * 1/(1+(X(i,j)-middle_x)^2+0.4*(Y(i,j)-middle_y)^2);
    end
end


figure;
hold on;
surf(X, Y, Z1);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel('X');
ylabel('Y');
hold off;

figure;
hold on;
surf(X, Y, Z2);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel('X');
ylabel('Y');
hold off;