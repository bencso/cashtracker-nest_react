import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

// @UseGuards(AuthGuard) - igy lehet majd használni a guardot, tulajdonképpen a Guard az egy őr, aki azt nézi hogy hozzáférhet-e az adott user a végponthoz.
//! Ha jól értem: nest guard = express middleware
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private config: ConfigService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Request letárolása
        const request = context.switchToHttp().getRequest();
        // Kiszedjük a tokent az authorizationből
        const authorizationHeader = request.header('Authorization');
        if (!authorizationHeader) throw new UnauthorizedException({
            message: 'Érvénytelen bejelentkezési adat(ok)',
            status: 401
        });
        const token = authorizationHeader.split('Bearer ')[1];
        if (!token) throw new UnauthorizedException({
            message: 'Érvénytelen bejelentkezési adat(ok)',
            status: 401
        });

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.get('JWT_TOKEN_SECRET')
            });

            //TODO: ide, majd még bele szeretném építeni hogy ha az adatbázisban lévő user agent (aki beloginolt) egyenlő ezzel a requestessel akkor go
            //! Igazából ez csak egy + ráerősítés az autentikációra
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException({
                message: 'Érvénytelen bejelentkezési adat(ok)',
                status: 401
            });
        }

        return true;
    }
}