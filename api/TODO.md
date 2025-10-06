[-] Mindenek elött egy adatbázis kapcsolatot kell csinálnunk: PostgresSQL + TypeORM segitségével (elsőnek elég a mysql is)
    - yarn add --save @nestjs/typeorm typeorm pg
    - TypeORM: https://typeorm.io/docs/entity/entities
    - PG: https://www.postgresql.org/docs/18/index.html
[] Majd az autentikációt kell implementálni, middleware-l ellátva az API végpontokat 
        - JWT Token alapú legyen az autentikáció
        - Lejárati idő: 1 óra, refresh tokennel
        - Refresh token lejárata: 4 nap
        - Refresh tokenben: - UserId - TokenId - ExpiryDate - IsRevoked - UserAgent
        - A tokenben lesz tárolva a UserId


[] TÁVOLI TOVÁBBFEJLESZTÉS: 
        - Késöbb egy-két integrációt betenni mint, az automatizáláshoz amit havonta kérdezünk le:
            - Twitch: Hány csatornára van feliratkozva (https://dev.twitch.tv/docs/api/reference#check-user-subscription)
            - További feliratkozások és előfizetések akár checkbox-al kiválaszthatóak legyenek, mint: Youtube Premium, Spotify Premium, Netflix, 
            Disney+, HBO Max, Apple One stb.