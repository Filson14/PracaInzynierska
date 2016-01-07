% test funkcji obliczaj±cej opad na powierzchniê trójk±ta
close all
% PX = [1 2 3]; PY = [2 1 3];
PX = 5*rand(1,3)+17;  PY = 5*rand(1,3)+50;
PX = PX.*xDegree;
PY = PY.*yDegree;
[X,Y] = meshgrid(17:.1:22, 50:.1:55);                                
Z = ellipsoidalPrecip(X,Y);                                        
% Z = funkcja_opadu_v2(X,Y);                                        
% Z = funkcja_opadu_v3(X,Y);                                        
figure(1), surf(X,Y,Z);
V = 0:9;
figure(2), contour(X,Y,Z,V); hold on,
plot([PX,PX(1)],[PY,PY(1)])
Opad = opad_na_trojkacie(@funkcja_opadu_v1,PX,PY)
% Opad = opad_na_trojkacie(@funkcja_opadu_v2,PX,PY)
% Opad = opad_na_trojkacie(@funkcja_opadu_v3,PX,PY)
