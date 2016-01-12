function precip = precipOnTriangle( fun,X,Y )
%Funkcja oblicza wielkoœæ opadu na powierzchniê trójk¹ta zadanego
%wspó³rzêdnymi 3 wierzcho³ków

% Dane wejœciowe:
% fun - funkcja wyznaczaj¹ca wielkoœæ opadu w punkcie (x,y),
% X - wektor odciêtych x wierzcho³ków trójk¹ta,
% Y - wektor rzêdnych y wierzcho³ków trójk¹ta.

% Dana wyjœciowa:
% precip - iloœæ wody, jaka spad³a na obszar zadanego trójk¹ta.

% UWAGA: Jednostk¹ wyniku jest [jx*jy*jh/jp, gdzie:
% jx, jy - jednostka odciêtej x, rzêdnej y,
% jh - jednostka wielkoœci opadu.
% W przypadku opadu podawanego jako wysokoœæ s³upa wody - 12mm = 0.012m i
% x, y podawanych w metrach - otrzymamy objêtoœæ wody, jaka spad³a na
% zadany trójk¹t.
% Podobnie w przypadku opadu podawanego jako iloœæ wody/m2 - 12 [litrów/m2] = 0.012m i
% x, y podawanych w metrach - otrzymamy objêtoœæ wody, jaka spad³a na
% zadany trójk¹t.

% Sortowanie wierzcho³ków wzd³u¿ x - od lewej do prawej:
[Xs,IX] = sort(X); Ys = Y(IX);
precip = 0;
Tol = sum(abs(Xs))*1e-6; 
if Xs(3)-Xs(1) < Tol, return, end  % Powierzchnia trójk¹ta bliska 0
if Xs(2)-Xs(1) < Tol,
    % Ca³ka obliczana w pojedynczym obszarze normalnym
    if Ys(1) < Ys(2),
        precip = areaIntegral(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(2),Ys(3));
    else
        precip = areaIntegral(fun,Xs(1),Xs(3),Ys(2),Ys(3),Ys(1),Ys(3)); 
    end
else if Xs(3)-Xs(2) < Tol,
    % Ca³ka obliczana w pojedynczym obszarze normalnym
        if Ys(2) < Ys(3)
            precip = areaIntegral(fun,Xs(1),Xs(3),Ys(1),Ys(2),Ys(1),Ys(3));
        else
            precip = areaIntegral(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(1),Ys(2));
        end
    else 
        Ym = (Ys(3)-Ys(1))/(Xs(3)-Xs(1))*(Xs(2)-Xs(1))+Ys(1);
        if Ys(2) > Ym           % œrodkowy wierzcho³ek u góry
            % Ca³ka obliczana w pierwszym obszarze normalnym
            precip1 = areaIntegral(fun,Xs(1),Xs(2),Ys(1),Ym,Ys(1),Ys(2));    
            % Ca³ka obliczana w drugim obszarze normalnym
            precip2 = areaIntegral(fun,Xs(2),Xs(3),Ym,Ys(3),Ys(2),Ys(3));
        else                    % œrodkowy wierzcho³ek na dole
            % Ca³ka obliczana w pierwszym obszarze normalnym
            precip1 = areaIntegral(fun,Xs(1),Xs(2),Ys(1),Ys(2),Ys(1),Ym);    
            % Ca³ka obliczana w drugim obszarze normalnym
            precip2 = areaIntegral(fun,Xs(2),Xs(3),Ys(2),Ys(3),Ym,Ys(3));
        end
        precip = precip1+precip2;
    end
end