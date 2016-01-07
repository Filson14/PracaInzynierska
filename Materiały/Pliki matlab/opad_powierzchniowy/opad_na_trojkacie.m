function Opad = opad_na_trojkacie( fun,X,Y )
%Funkcja oblicza wielko��opadu na powierzchni� tr�jk�ta zadanego
%wsp�rz�dnymi 3 wierzcho�k�w

% Dane wej�ciowe:
% fun - wielko�� opadu w punkcie (x,y),
% X - wektor odci�tych x wierzcho�k�w tr�jk�ta,
% Y - wektor rz�dnych y wierzcho�k�w tr�jk�ta.


% Dana wyj�ciowa:
% Opad - ilo�� wody, jaka spad�a na obszar zadanego tr�jk�ta.

% UWAGA: Jednostk� wyniku jest [jx*jy*jh/jp, gdzie:
% jx, jy - jednostka odci�tej x, rz�dnej y,
% jh - jednostka wielko�ci opadu.
% W przypadku opadu podawanego jako wysoko�� s�upa wody - 12mm = 0.012m i
% x, y podawanych w metrach - otrzymamy obj�to�� wody, jaka spad�a na
% zadany tr�jk�t.
% Podobnie w przypadku opadu podawanego jako ilo�� wody/m2 - 12 [litr�w/m2] = 0.012m i
% x, y podawanych w metrach - otrzymamy obj�to�� wody, jaka spad�a na
% zadany tr�jk�t.

% Sortowanie wierzcho�k�w wzd�u� x - od lewej do prawej:
[Xs,IX] = sort(X); Ys = Y(IX);

Opad = 0;
Tol = sum(abs(Xs))*1e-6; 
if Xs(3)-Xs(1) < Tol, return, end  % Powierzchnia tr�jk�ta bliska 0
if Xs(2)-Xs(1) < Tol,
    % Ca�ka obliczana w pojedynczym obszarze normalnym
    if Ys(1) < Ys(2),
        Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(2),Ys(3));
    else
        Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(2),Ys(3),Ys(1),Ys(3)); 
    end
else if Xs(3)-Xs(2) < Tol,
    % Ca�ka obliczana w pojedynczym obszarze normalnym
        if Ys(2) < Ys(3)
            Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(2),Ys(1),Ys(3));
        else
            Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(1),Ys(2));
        end
    else 
        Ym = (Ys(3)-Ys(1))/(Xs(3)-Xs(1))*(Xs(2)-Xs(1))+Ys(1);
        if Ys(2) > Ym           % �rodkowy wierzcho�ek u g�ry
            % Ca�ka obliczana w pierwszym obszarze normalnym
            Opad1 = calka_w_obszarze_normalnym(fun,Xs(1),Xs(2),Ys(1),Ym,Ys(1),Ys(2));    
            % Ca�ka obliczana w drugim obszarze normalnym
            Opad2 = calka_w_obszarze_normalnym(fun,Xs(2),Xs(3),Ym,Ys(3),Ys(2),Ys(3));
        else                    % �rodkowy wierzcho�ek na dole
            % Ca�ka obliczana w pierwszym obszarze normalnym
            Opad1 = calka_w_obszarze_normalnym(fun,Xs(1),Xs(2),Ys(1),Ys(2),Ys(1),Ym);    
            % Ca�ka obliczana w drugim obszarze normalnym
            Opad2 = calka_w_obszarze_normalnym(fun,Xs(2),Xs(3),Ys(2),Ys(3),Ym,Ys(3));
        end
        Opad = Opad1+Opad2;
    end
end

