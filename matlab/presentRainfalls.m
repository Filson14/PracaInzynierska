load ('.\zapisane dane\rainfallPoints.mat');
load ('.\zapisane dane\catchment.mat');

xAxisLabel = 'X [m]';
yAxisLabel = 'Y [m]';
zAxisLabel = 'Wysokoœæ opadu [mm]';
close all;

x = linspace(floor(min(rainfallPoints(:,1))), ceil(max(rainfallPoints(:,1))), 70);
y = linspace(floor(min(rainfallPoints(:,2))), ceil(max(rainfallPoints(:,2))), 70);
x = x.*(xDegree);
y = y.*(yDegree);
middle_x = metricMiddleX;
middle_y = metricMiddleY;

catchment(:,1) = catchment(:,1).*(xDegree);
catchment(:,2) = catchment(:,2).*(yDegree);

[X, Y] = meshgrid(x,y);

Z1 = zeros(size(X,1), size(X,2));
Z2 = zeros(size(X,1), size(X,2));
for i=1:size(X,1)
    for j=1:size(X,2)
        Z1(i,j) = paraboloidalPrecip(X(i,j), Y(i,j));
        Z2(i,j) = rationalPrecip(X(i,j), Y(i,j));
    end
end


figure;
hold on;
surf(X, Y, Z1);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel(xAxisLabel);
ylabel(yAxisLabel);
zlabel(zAxisLabel);
hold off;

figure;
hold on;
surf(X, Y, Z2);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel(xAxisLabel);
ylabel(yAxisLabel);
zlabel(zAxisLabel);
hold off;