[-] Mindenek elött egy adatbázis kapcsolatot kell csinálnunk: PostgresSQL + TypeORM segitségével (elsőnek elég a mysql is)
    - yarn add --save @nestjs/typeorm typeorm pg
    - TypeORM: https://typeorm.io/docs/entity/entities
    - PG: https://www.postgresql.org/docs/18/index.html
[] Majd az autentikációt kell implementálni, middleware-l ellátva az API végpontokat 
        - JWT Token alapú legyen az autentikáció
        - Lejárati idő: 1 óra, refresh tokennel
        - A tokenben lesz tárolva a UserId