% test funkcji obliczaj±cej opad na powierzchniê trójk±ta
close all
% PX = [1 2 3]; PY = [2 1 3];
PX = 6*rand(1,3);  PY = 8*rand(1,3);

[X,Y] = meshgrid(0:.1:6, 0:.1:8);                                
% Z = funkcja_opadu_v1(X,Y);                                        
% Z = funkcja_opadu_v2(X,Y);                                        
Z = funkcja_opadu_v3(X,Y);                                        
figure(1), surf(X,Y,Z);
V = 0:9;
figure(2), contour(X,Y,Z,V); hold on,
plot([PX,PX(1)],[PY,PY(1)])
Opad = opad_na_trojkacie(@funkcja_opadu_v1,PX,PY)
% Opad = opad_na_trojkacie(@funkcja_opadu_v2,PX,PY)
% Opad = opad_na_trojkacie(@funkcja_opadu_v3,PX,PY)
