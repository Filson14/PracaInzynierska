function Opad = opad_na_trojkacie( fun,X,Y )
%Funkcja oblicza wielko¶æ opadu na powierzchniê trójk±ta zadanego
%wspó³rzêdnymi 3 wierzcho³ków

% Dane wej¶ciowe:
% fun - wielko¶æ opadu w punkcie (x,y),
% X - wektor odciêtych x wierzcho³ków trójk±ta,
% Y - wektor rzêdnych y wierzcho³ków trójk±ta.


% Dana wyj¶ciowa:
% Opad - ilo¶æ wody, jaka spad³a na obszar zadanego trójk±ta.

% UWAGA: Jednostk± wyniku jest [jx*jy*jh/jp, gdzie:
% jx, jy - jednostka odciêtej x, rzêdnej y,
% jh - jednostka wielko¶ci opadu.
% W przypadku opadu podawanego jako wysoko¶æ s³upa wody - 12mm = 0.012m i
% x, y podawanych w metrach - otrzymamy objêto¶æ wody, jaka spad³a na
% zadany trójk±t.
% Podobnie w przypadku opadu podawanego jako ilo¶æ wody/m2 - 12 [litrów/m2] = 0.012m i
% x, y podawanych w metrach - otrzymamy objêto¶æ wody, jaka spad³a na
% zadany trójk±t.

% Sortowanie wierzcho³ków wzd³u¼ x - od lewej do prawej:
[Xs,IX] = sort(X); Ys = Y(IX);

Opad = 0;
Tol = sum(abs(Xs))*1e-6; 
if Xs(3)-Xs(1) < Tol, return, end  % Powierzchnia trójk±ta bliska 0
if Xs(2)-Xs(1) < Tol,
    % Ca³ka obliczana w pojedynczym obszarze normalnym
    if Ys(1) < Ys(2),
        Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(2),Ys(3));
    else
        Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(2),Ys(3),Ys(1),Ys(3)); 
    end
else if Xs(3)-Xs(2) < Tol,
    % Ca³ka obliczana w pojedynczym obszarze normalnym
        if Ys(2) < Ys(3)
            Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(2),Ys(1),Ys(3));
        else
            Opad = calka_w_obszarze_normalnym(fun,Xs(1),Xs(3),Ys(1),Ys(3),Ys(1),Ys(2));
        end
    else 
        Ym = (Ys(3)-Ys(1))/(Xs(3)-Xs(1))*(Xs(2)-Xs(1))+Ys(1);
        if Ys(2) > Ym           % ¶rodkowy wierzcho³ek u góry
            % Ca³ka obliczana w pierwszym obszarze normalnym
            Opad1 = calka_w_obszarze_normalnym(fun,Xs(1),Xs(2),Ys(1),Ym,Ys(1),Ys(2));    
            % Ca³ka obliczana w drugim obszarze normalnym
            Opad2 = calka_w_obszarze_normalnym(fun,Xs(2),Xs(3),Ym,Ys(3),Ys(2),Ys(3));
        else                    % ¶rodkowy wierzcho³ek na dole
            % Ca³ka obliczana w pierwszym obszarze normalnym
            Opad1 = calka_w_obszarze_normalnym(fun,Xs(1),Xs(2),Ys(1),Ys(2),Ys(1),Ym);    
            % Ca³ka obliczana w drugim obszarze normalnym
            Opad2 = calka_w_obszarze_normalnym(fun,Xs(2),Xs(3),Ys(2),Ys(3),Ym,Ys(3));
        end
        Opad = Opad1+Opad2;
    end
end

